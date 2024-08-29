# Stress Testing

## 测试工具

| 工具           | 特点                                   | 优点                                | 缺点                              |
| -------------- | -------------------------------------- | ----------------------------------- | --------------------------------- |
| **wrk**        | 高效的HTTP压力测试工具，适合简单场景   | 性能高，命令行简单易用              | 不支持复杂场景，无法执行JS代码    |
| **JMeter**     | 多协议支持，适合复杂测试场景           | 强大的GUI，丰富插件，支持分布式测试 | 资源消耗大，学习曲线陡峭          |
| **Gatling**    | 基于Scala，适合高并发测试              | 高性能，强大DSL，直观报告           | 学习难度高，对Scala不熟悉者不友好 |
| **k6**         | 现代化工具，使用JavaScript编写测试脚本 | 轻量级，易集成到CI/CD管道           | 对复杂场景支持有限                |
| **Locust**     | 基于Python，用户行为模拟               | 易于编写Python脚本，支持分布式测试  | 高并发下性能可能受限              |
| **Siege**      | 简单的命令行工具，快速HTTP测试         | 简单易用，适合快速测试              | 功能基础，缺乏复杂场景支持        |
| **Artillery**  | 现代化工具，支持HTTP和WebSocket测试    | 易于维护，支持云端测试              | 社区和生态系统相对较小            |
| **BlazeMeter** | 云端平台，兼容JMeter和Gatling          | 支持大规模分布式测试，与JMeter兼容  | 大规模测试可能需要付费            |
| **Tsung**      | 分布式负载测试工具，多协议支持         | 高性能，支持大规模测试              | 配置复杂，文档较少                |

## Wrk

https://github.com/wg/wrk

Wrk 是现代的压力测试工具，可以在单机上运行并能够生成大量的请求。

-   它结合了多线程设计和可扩展的事件通知系统（比如 epoll 和 kqueue）。
-   可以使用 `LuaJIT` 脚本来生成 HTTP 请求，响应处理和自定义的报告。官方样例可见 [link](https://github.com/wg/wrk/tree/master/scripts)

### 基本使用

下面这个命令使用了 12 个线程，保持 400 个 HTTP 连接，测试时长 30 秒。

```
wrk -t12 -c400 -d30s http://127.0.0.1:8080/index.html
```

输出如下

```
Running 30s test @ http://127.0.0.1:8080/index.html
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   108.34ms  138.31ms   1.93s    92.09%
    Req/Sec   217.35    105.66   515.00     65.71%
  58791 requests in 30.09s, 124.30MB read
  Socket errors: connect 155, read 299, write 0, timeout 471
Requests/sec:   1953.92
Transfer/sec:      4.13MB
```

-   第一二行标明基本的参数，运行时间、线程数和连接数
-   随后展示了以线程为单位，请求的延时（Latency）和每秒请求数（Req/Sec）的数据统计
    -   平均值（Avg），标准差（Stdev），最大值（Max），标准差范围内的百分比（+/- Stdev）
    -   延时
        -   平均延迟为 108.34ms，表示从发送请求到收到响应的平均时间是108.34毫秒。
        -   标准差为 138.31ms
        -   最大请求延时为 1.93s
        -   在标准差延时内的请求占比 92.09%
    -   每秒请求数
        -   平均每秒请求数为 217.35，表示每个线程平均每秒处理217.35个请求。
            -   所以总请求数为（`217.35 x 12 x 30`）
    
        -   标准差为 105.66
        -   最大请求延时为 515
        -   标准差百分比为 65.71%
    
    -   在 30 秒内总共有 58791 个请求，在测试期间，从服务器读取的数据总量为 124.30MB。
    
-   `Socket errors`：在测试过程中发生的 Socket 连接相关的错误统计。
    -   connect 155：在尝试建立连接时发生了155次错误。这可能是由于服务器负载过高，导致无法建立新的连接。
    -   read 299：在读取数据时发生了299次错误，可能是由于网络问题或服务器在发送数据时出现了异常。
    -   write 0：在写入数据时没有发生任何错误。
    -   timeout 471：出现了471次超时错误，表示客户端在等待服务器响应时超过了预期的时间。超时可能表明服务器在处理请求时遇到了瓶颈，响应时间过长。
-   Requests/sec：系统平均每秒处理了1953.92个请求。这个指标反映了系统的吞吐量，即在给定时间内可以处理的请求数量。
-   Transfer/sec：系统每秒传输的数据量为4.13MB。这表示在测试期间，系统每秒钟向客户端发送了大约4.13MB的数据量。

### 参数

-   连接数
-   延时
-   线程数
-   LuaJIT 脚本
-   指定 HTTP Header
-   是否打印延时统计
-   是否记录超时请求

```
-c, --connections: total number of HTTP connections to keep open with
                   each thread handling N = connections/threads

-d, --duration:    duration of the test, e.g. 2s, 2m, 2h

-t, --threads:     total number of threads to use

-s, --script:      LuaJIT script, see SCRIPTING

-H, --header:      HTTP header to add to request, e.g. "User-Agent: wrk"

    --latency:     print detailed latency statistics

    --timeout:     record a timeout if a response is not received within
                   this amount of time.
```

## 脚本

### 生命周期

在 `wrk` 的 Lua 脚本中，生命周期可以分为几个主要的阶段，每个阶段对应特定的函数或操作：

1.  **初始化阶段**：
    -   在这个阶段，可以定义全局变量或执行一次性初始化操作。
    -   通常用来设置请求的默认属性，如 `wrk.method`、`wrk.path`、`wrk.headers` 等。
2.  **请求生成阶段**：
    -   通过定义 `request()` 函数来生成每个请求的内容。
    -   这个函数在每次请求时都会被调用，生成并返回一个请求字符串。
3.  **响应处理阶段**：
    -   通过定义 `response(status, headers, body)` 函数来处理服务器返回的响应。
    -   这个函数会在每次收到响应时被调用，用于分析响应内容、记录日志或执行其他操作。
4.  **结束阶段**：
    -   这个阶段通常是脚本执行完所有请求后，可能执行一些清理操作或生成报告的逻辑。
    -   通常在这个阶段，没有特定的内置函数会被自动调用，但可以在脚本末尾手动添加清理代码。

这些阶段构成了 `wrk` Lua 脚本的基本生命周期，每个阶段的函数在特定的时间点被执行，帮助控制整个负载测试的流程。

### 注意事项

简单的请求修改不会影响性能，但如果你在脚本中加入了复杂的逻辑处理，每秒可以模拟的请求数就会减少。

-   简单修改（不会影响性能）修改HTTP方法、路径、添加头部信息或请求体

    ```
    -- 修改HTTP方法为POST，设置路径，并添加一个自定义Header
    wrk.method = "POST"
    wrk.path = "/api/resource"
    wrk.headers["Content-Type"] = "application/json"
    wrk.body = '{"key": "value"}'
    ```

-   复杂修改（可能影响性能）

    ```lua
    -- 为每个请求动态生成路径和请求体，并使用 response() 函数处理响应。这个函数在每次请求时都会被调用，生成并返回一个请求字符串。
    request = function() 
        local id = math.random(1, 1000)
        wrk.path = "/api/resource/" .. id
        wrk.body = '{"key": "' .. id .. '"}'
        return wrk.format("POST", wrk.path, nil, wrk.body)
    end
    
    response = function(status, headers, body)
        -- 处理响应，例如日志记录或统计分析
        if status ~= 200 then
            print("Non-200 response: " .. status)
        end
    end
    ```

 `wrk` 内置的 Lua 脚本本身不支持线程间的状态共享。

-   在 `wrk` 的 Lua 脚本中，全局变量在每个线程中都是独立的，也就是说每个线程都会有自己独立的一份全局变量。
-   可以使用 wrk 的 init 函数来初始化每个线程，并确保 counter 的递增操作在线程之间是同步的。这通常需要使用一些外部机制（例如 Redis）来共享状态。

## 官方脚本样例

官方脚本

-   设置 HTTP POST 请求参数
-   按计数变更请求
-   在每次请求前延时 10~50 毫秒
-   在满足特定条件时停止一个线程
-   在 `wrk` 负载测试完成后输出延迟的关键百分位数，并以 CSV 格式展示
-   使用 `wrk` 负载测试工具模拟一个简单的身份验证流程，获取一个认证令牌（token），并将该令牌附加到所有后续请求的头部中
-   其他
    -   多服务器场景下，给 thread 分配随机服务器地址，测试负载均衡

详情

-   设置 HTTP POST 请求参数

```lua
-- example HTTP POST script which demonstrates setting the
-- HTTP method, body, and adding a header

wrk.method = "POST"
wrk.body   = "foo=bar&baz=quux"
wrk.headers["Content-Type"] = "application/x-www-form-urlencoded"
```

-   按计数变更请求

```lua
-- example dynamic request script which demonstrates changing
-- the request path and a header for each request
-------------------------------------------------------------
-- NOTE: each wrk thread has an independent Lua scripting
-- context and thus there will be one counter per thread

counter = 0

request = function()
   path = "/" .. counter
   wrk.headers["X-Counter"] = counter
   counter = counter + 1
   return wrk.format(nil, path)
end
```

-   在每次请求前延时 10~50 毫秒

```lua
-- example script that demonstrates adding a random
-- 10-50ms delay before each request

function delay()
   return math.random(10, 50)
end
```

-   在满足特定条件时停止一个线程，以及计数

```lua
-- example script that demonstrates use of thread:stop()

local counter = 1

function response()
   if counter == 100 then
      wrk.thread:stop() -- <==== stop thread while counter is euqal to 100
   end
   counter = counter + 1
end
```

-   在 `wrk` 负载测试完成后输出延迟的关键百分位数，并以 CSV 格式展示
    -   50% (中位数): 表示一半请求的延迟在这个时间内。
    -   99.999%: 表示几乎所有请求（即99.999%）的延迟在这个时间内，帮助识别极端情况的响应时间。

```lua
-- example reporting script which demonstrates a custom
-- done() function that prints latency percentiles as CSV

done = function(summary, latency, requests) -- 这是 wrk 在测试完成后调用的钩子函数，通常用于生成和输出测试结果。它接受三个参数
   io.write("------------------------------\n")
   for _, p in pairs({ 50, 90, 99, 99.999 }) do
      n = latency:percentile(p)
      io.write(string.format("%g%%,%d\n", p, n))
   end
end
```

-   使用 `wrk` 负载测试工具模拟一个简单的身份验证流程，获取一个认证令牌（token），并将该令牌附加到所有后续请求的头部中

```lua
-- example script that demonstrates response handling and
-- retrieving an authentication token to set on all future
-- requests

token = nil
path  = "/authenticate"

request = function()
   return wrk.format("GET", path)
end

response = function(status, headers, body)
   if not token and status == 200 then
      token = headers["X-Token"]
      path  = "/resource"
      wrk.headers["X-Token"] = token
   end
end
```

## 脚本复合实例

这里仅使用一个线程

```shell
wrk -t1 -c1 -d20s -s test_script.lua https://xxxx.conm
```

结果

```
Running 5s test @ https://sgpass.info
  1 threads and 1 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   194.88ms   44.27ms 319.48ms   72.00%
    Req/Sec     5.60      2.80    10.00     72.00%
  25 requests in 5.01s, 8.11MB read
Requests/sec:      4.99
Transfer/sec:      1.62MB
------------------------------
50%,190971
90%,249831
99%,319484
99.999%,319484
```

lua 脚本 

-   检查是否已达到最大请求页数，停止测试

```lua
// test_script.lua
-- 定义全局变量
counter = 1
max_pages = 50

-- 请求生成
request = function()
    -- 检查是否已达到最大请求次数，停止测试
    if counter > max_pages then
        wrk.thread:stop()
    end

    local path = "/?page=" .. counter
    counter = counter + 1
    return wrk.format("GET", path)
end

response = function(status, headers, body)
    if status ~= 200 then
        print("Non-200 response: " .. status)
    end
end

done = function(summary, latency, requests)
    io.write("------------------------------\n")
    for _, p in pairs({ 50, 90, 99, 99.999 }) do
       n = latency:percentile(p)
       io.write(string.format("%g%%,%d\n", p, n))
    end
 end
```

## 其他

### wrk 钩子函数

以 `request()` 为例

-   在 `wrk` 负载测试工具中，`request()` 函数是一个特殊的钩子函数，**自动**由 `wrk` 工具在每次需要生成一个新的 HTTP 请求时调用。
-   用户不需要手动调用 `request()` 函数，它会在测试过程中被 `wrk` 反复调用。

### function request() 和 request = function() 的区别

-   `function request()` 是一种语法糖，立即创建并分配函数，通常在作用域定义时更加清晰。

-   `request = function()` 提供了更高的灵活性，适合在需要动态或条件性地分配函数时使用。

### 计算统计量的公式和解释

1. 平均值 (Avg)
   
    平均值是通过将所有请求的延迟时间相加，然后除以总请求数得出的。  
    公式：
    
    ![image-20240829102643059](240829-stress-testing.assets/image-20240829102643059.png)
    
    其中，`Latency_i` 是第 `i` 个请求的延迟，`n` 是请求的总数。
    
2. 标准差 (Stdev)
   
    标准差反映了数据的分散程度。首先计算每个请求延迟与平均延迟之间的差，然后对这些差的平方求平均，最后开方得到标准差。 
    公式：
    
    ![image-20240829102616883](240829-stress-testing.assets/image-20240829102616883.png)
    
    标准差表示数据点如何分布在平均值周围，数值越大，分布越分散。
    
3. 最大值 (Max**)**
   
    最大延迟是所有请求延迟中的最大值。  
    公式：
    
    ![image-20240829102653490](240829-stress-testing.assets/image-20240829102653490.png)

4. +/- Stdev 和百分比 (% within Stdev)
   
    这个指标表示数据点在平均值的一个标准差范围内的百分比。  
    要计算在一个标准差范围内的数据百分比，可以计算每个请求延迟是否在以下范围内：
    
    ![image-20240829102705355](240829-stress-testing.assets/image-20240829102705355.png)
    
    然后计算在这个范围内的请求数占总请求数的百分比。

### 延时和每秒请求数的标准差和标准差百分比有什么现实意义

-   延时的标准差和百分比帮助评估系统响应时间的一致性和用户体验的稳定性。
-   每秒请求数的标准差和百分比帮助评估系统在负载下的处理能力是否稳定，以及是否存在吞吐量上的瓶颈或波动。

1.   延时的标准差 (Latency Stdev)

-   现实意义：
    -   稳定性衡量：延时的标准差反映了请求的响应时间的稳定性。较低的标准差表示大多数请求的延时接近平均值，说明系统在负载下表现稳定；较高的标准差则表明延时的波动较大，可能出现了不稳定的响应时间，这在实际应用中可能导致用户体验不一致。
    -   瓶颈识别：高延时的标准差可能表明某些请求因为资源竞争、系统瓶颈或其他因素导致响应时间明显变长。这可以帮助识别需要优化的部分。
-   标准差百分比 (% within Stdev)：
    -   现实意义
        -   集中度评价：标准差百分比表示有多少请求的延时落在平均值的一个标准差范围内。高百分比（如90%以上）意味着大多数请求的响应时间相对集中，用户体验更一致；低百分比则说明有较多的请求响应时间波动较大，可能需要进一步分析和优化。

2. 每秒请求数的标准差 (Req/Sec Stdev)

-   现实意义：
    -   吞吐量稳定性：每秒请求数的标准差反映了系统在单位时间内处理请求的稳定性。较低的标准差表示系统在负载下能够以稳定的速率处理请求，而较高的标准差则可能表明系统在负载下的吞吐量波动较大，可能会在某些时刻处理能力下降，导致性能不一致。
    -   峰值和负载处理能力：如果标准差高且伴随有较大的吞吐量波动，说明系统可能在高峰时段或高负载下表现不稳定，可能需要增加资源或调整系统配置。
-   标准差百分比 (% within Stdev)：
    -   现实意义
        -   吞吐量一致性：标准差百分比表示有多少时间单位内的请求数落在平均值的一个标准差范围内。高百分比（如80%或以上）表明系统处理请求的能力大部分时间内保持一致，低百分比则提示可能存在显著的吞吐量波动，系统在某些情况下的表现可能不如预期。

### wrk 请求没有触发 vercel analystic 的检测

原因分析

-   `wrk` 是一个纯粹的HTTP请求工具：它发送的请求不会执行任何页面上的JavaScript代码。
-   `vercel analytics` 或其他基于浏览器的分析工具，通常依赖于在页面加载时运行的JavaScript脚本来跟踪和报告用户活动。如果这些脚本没有运行，就不会有数据发送给分析工具的服务器。

日志中的请求

-   服务器日志中记录的请求是直接记录在服务器端的所有请求，和请求的来源无关。无论请求来自 `wrk`、浏览器、或者其他工具，都会在服务器日志中出现。因此，`wrk` 生成的请求仍然会出现在服务器日志中。

如果你希望模拟真实的用户行为，包括触发页面上的JavaScript（如 `vercel analytics`），可以考虑使用以下工具或方法：

1.  使用浏览器自动化工具：
    -   使用工具如 Selenium 或 Puppeteer 来模拟浏览器行为，这些工具可以加载页面并执行所有的JavaScript代码。
2.  手动插入统计数据：
    -   在你的 `wrk` 脚本中添加特定的请求，例如通过调用一个API来手动记录统计数据，但这需要你对 `vercel analytics` 的实现有更深入的了解。
3.  **使用带有**JavaScript**引擎的负载工具**：
    -   使用像 `JMeter` 配合 `WebDriver Sampler` 或 `Gatling` 这种支持JS的工具，可以在测试时运行页面中的JavaScript。

这些方法可以帮助你在进行负载测试时，也触发 `vercel analytics` 或其他基于JavaScript的统计工具。