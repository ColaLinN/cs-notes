---
title: 指数退避重试 Exponential Backoff Retry
tags:
  - distributed system
  - system
  - reliability
---

# 指数退避重试 Exponential Backoff Retry

调用一个接口，第一次超时了，要不要再试一次？

如果只是短暂的网络波动，再试一次可能就成功了。但如果服务已经过载，每个客户端都立刻重试，就会让它收到更多请求，恢复得更慢。

指数退避重试解决的是这个问题：**失败后先等待；如果仍然失败，就逐步拉长等待时间，给服务恢复的机会。**

## 每次乘 2，为什么叫“指数”？

最常见的等待序列是：

```text
首次请求 → 失败
等待 1 秒 → 第 1 次重试 → 失败
等待 2 秒 → 第 2 次重试 → 失败
等待 4 秒 → 第 3 次重试 → 失败
等待 8 秒 → 第 4 次重试 → 成功，结束
```

“每次乘 2”描述的是相邻两次等待时间的关系；“指数增长”描述的是等待时间与重试次数的关系。它们说的是同一件事。

设第一次重试前的等待时间为 `base_delay`，第 `n` 次重试从 1 开始计数：

```text
第 n 次重试前的等待时间 = base_delay × 2^(n - 1)
```

| 第 n 次重试 | 乘法展开 | 等待时间，初始值为 1 秒 |
| --- | --- | --- |
| 1 | 1 | 1 秒 |
| 2 | 1 × 2 | 2 秒 |
| 3 | 1 × 2 × 2 | 4 秒 |
| 4 | 1 × 2 × 2 × 2 | 8 秒 |
| 5 | 1 × 2 × 2 × 2 × 2 | 16 秒 |

线性增长是每次加固定值，例如 `1、2、3、4、5`；指数增长是每次乘固定倍数，例如 `1、2、4、8、16`。倍数不必是 2，只要大于 1，就可以形成指数增长的等待序列。

这里增长的是**两次尝试之间的等待间隔**。如果忽略请求本身耗时，上面几次请求发生在第 `0、1、3、7、15` 秒，而不是第 `0、1、2、4、8` 秒。

## 为什么不一直等 1 秒？

固定间隔重试没有根据连续失败调整频率。一个服务如果已经连续失败多次，客户端仍然每秒请求一次，就可能持续占用它的处理能力。

指数退避会让连续失败的客户端逐渐降低请求频率。不过它也有代价：服务已经恢复时，客户端可能还在等待，不能立即发现恢复。因此，初始间隔和最大间隔需要结合业务可以接受的延迟来设置。

实际算法通常给等待时间加一个上限：

```text
等待上限 = min(base_delay × 2^(n - 1), max_delay)
```

例如初始为 1 秒、最大为 30 秒，等待序列就是：

```text
1、2、4、8、16、30、30……
```

最大等待间隔只限制一次等待，**不会自动限制重试次数或整个操作的耗时**。

## 为什么还要加随机抖动 Jitter？

假设 1,000 个客户端同时请求失败，而且都使用相同的退避参数。它们会一起等待 1 秒，再一起请求；下一次一起等待 2 秒，再一起请求。

请求频率虽然下降了，但流量仍然集中在几个时间点。

一种常见做法叫 Full Jitter：先算出当前等待上限，再在 0 到这个上限之间随机选择实际等待时间。

```text
等待上限 = min(base_delay × 2^(n - 1), max_delay)
实际等待 = random(0, 等待上限)
```

例如当前上限为 8 秒，不同客户端可能分别等待 0.7 秒、3.2 秒和 6.5 秒，让请求分散开来。AWS 的[退避与抖动实验](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)比较了这些策略对竞争请求的影响。

**加入 Full Jitter 后，实际等待时间不一定逐次增长。指数增长的是随机区间的上限。** 第三次可能抽到 3 秒，第四次也可能只抽到 1 秒。

## Python 算法怎么写？

先写一个同步版本，把“是否值得重试”交给调用方判断：

```python
import math
import random
import time


def retry_with_backoff(
    operation,
    *,
    should_retry,
    max_retries=5,
    base_delay=1.0,
    max_delay=30.0,
    jitter=True,
):
    if not isinstance(max_retries, int) or max_retries < 0:
        raise ValueError("max_retries must be a non-negative integer")
    if not (math.isfinite(base_delay) and base_delay > 0):
        raise ValueError("base_delay must be finite and positive")
    if not (math.isfinite(max_delay) and max_delay > 0):
        raise ValueError("max_delay must be finite and positive")

    delay = min(base_delay, max_delay)

    for attempt in range(max_retries + 1):
        try:
            return operation()
        except Exception as error:
            if attempt == max_retries or not should_retry(error):
                raise

            wait = random.uniform(0, delay) if jitter else delay
            time.sleep(wait)
            delay = min(delay * 2, max_delay)
```

这里用 `delay × 2` 逐次更新，与直接计算 `base_delay × 2^attempt` 表达的是同一个算法；达到上限后就保持上限。

几个细节决定了这段循环的行为：

- 首次调用立即执行，失败之后才等待。
- `max_retries=5` 表示首次调用之外最多再试 5 次，总共最多调用 6 次。
- 成功立即返回；不应重试的异常立即抛出。
- 最后一次失败直接抛出原异常，不再进行没有意义的等待。
- 开启抖动时，`delay` 表示等待上限；关闭时，它才是实际等待时间。

下面是一个可以直接运行的演示：

```python
calls = 0


def fetch_data():
    global calls
    calls += 1
    print(f"第 {calls} 次调用")
    if calls < 3:
        raise TimeoutError("temporary timeout")
    return {"status": "ok"}


result = retry_with_backoff(
    fetch_data,
    should_retry=lambda error: isinstance(error, TimeoutError),
    max_retries=3,
    base_delay=0.1,
    max_delay=1.0,
    jitter=False,
)
print(result)
```

这段演示会先失败两次，分别等待 0.1 秒和 0.2 秒，第三次调用成功。换成真实请求时，需要将 `should_retry` 对应到所用客户端的异常类型和接口契约；不同 HTTP 库不一定使用 Python 内置的 `TimeoutError`。

## 放进真实业务前，还缺什么？

### 1. 判断哪些失败值得重试

退避决定“什么时候再试”，不能判断“再试有没有用”。

| 情况 | 通常如何处理 |
| --- | --- |
| 暂时的连接失败、超时 | 确认重复执行安全后，考虑重试 |
| HTTP 429 限流 | 按接口约定重试，处理 `Retry-After` 提示 |
| HTTP 503 服务暂时不可用 | 按接口约定，考虑退避重试 |
| 参数格式错误、权限不足 | 修正请求或权限，原样重试通常无效 |
| 业务余额不足等确定性失败 | 按业务规则处理 |

具体是否可重试，应由服务的错误定义决定，不能把所有异常或所有 HTTP 5xx 一律吞掉重试。[AWS 的重试模式说明](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html)也强调了暂时性故障与不可恢复故障的区别。

上面的教学代码不解析 HTTP 响应头。如果接口要求等待 `Retry-After` 指定的时间，就应按该约定安排下一次尝试；若等待会超过业务截止时间，则结束或延后整个任务。

### 2. 超时不代表服务端没有执行

支付请求已经成功扣款，但成功响应在网络中丢失，客户端看到的仍然可能是超时。如果直接重新发起一笔支付，就可能重复扣款。

需要让多次尝试使用同一个业务幂等键，并由服务端可靠地去重、返回已有结果。这个问题与站内的 [RPC 请求语义](../../distributed-systems/02-rpc-semantics.md)直接相关。

指数退避只控制发送时间，不能提供 exactly-once 保证。AWS 的[幂等 API 设计说明](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)进一步讨论了如何让重复请求保持相同的业务效果。

### 3. 限制总耗时，并为每次调用设置超时

假设最多重试 5 次，关闭抖动时，单是等待就可能花掉：

```text
1 + 2 + 4 + 8 + 16 = 31 秒
```

这还没有算 6 次请求本身的耗时。对一个只能等待 3 秒的页面请求，这套配置显然不合适。

上面的函数只限制重试次数和单次等待。生产实现还需要总截止时间：使用单调时钟计算剩余预算，在等待和再次调用前检查，并把剩余预算传递给真正执行请求的客户端。每次远程调用本身也必须有超时；外层重试循环无法中断一个永远不返回的同步函数。

### 4. 避免每一层都独立重试

如果 A 调用 B、B 调用 C，每层都最多尝试 3 次，那么一次 A 的请求最多可能触发 9 次 C 调用。调用链越深，放大越明显。

通常应明确由哪一层负责重试，并检查所用 SDK 是否已经内置了重试机制。在退避之外，还可以用重试预算、限流或熔断约束故障期间的额外流量。AWS 的[超时、重试与抖动实践](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)分析了这些机制之间的关系。

## 如何检查实现是否正确？

验证时可以替换等待函数和随机数生成器，记录调用和等待，不必真的等几十秒：

| 场景 | 应有行为 |
| --- | --- |
| 首次成功 | 调用 1 次，等待 0 次 |
| 失败两次后成功 | 调用 3 次，等待 2 次 |
| `max_retries=0` | 只调用 1 次，失败立即抛出 |
| 非重试错误 | 立即抛出，不等待 |
| 达到重试上限 | 抛出最后一次异常，不额外等待 |
| 关闭抖动，初始 1 秒、上限 3 秒 | 等待依次为 1、2、3、3 秒 |
| 开启 Full Jitter | 每次等待都在当次上限范围内 |

理解指数退避，先记住相邻两次等待间隔的关系：`下一次 = 上一次 × 倍数`。真正使用时，再一起确定可重试错误、幂等性、等待上限、随机抖动、最大次数和时间预算。
