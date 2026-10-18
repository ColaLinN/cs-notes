# 状态机动态规划 State Machine DP

## 思路

![image-20240512221510697](./240512-dp-state-machine.assets/image-20240512221510697.png)

## 122. 买卖股票的最佳时机 II / Best Time to Buy and Sell Stock II

[LeetCode 中文站](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/) · [LeetCode 国际站](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

**简要题意：** prices[i] 为第 i 天股价。可完成多次买入卖出，但任意时刻最多持有一股。可在同一天先卖再买。返回最大总利润，不交易时利润为 0。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        f0 = 0
        f1 = -inf
        for i, p in enumerate(prices):
            new_f0 = max(f0, f1 + p)
            f1 = max(f1, f0 - p)
            f0 = new_f0
        return f0
```

## 123. 买卖股票的最佳时机 III / Best Time to Buy and Sell Stock III：最多完成两笔交易

[LeetCode 中文站](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/) · [LeetCode 国际站](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

**简要题意：** 给定每日股价，最多完成两次买入和卖出，同一时间只能持有一股，求最大利润。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        dp=[[[0,0] for i in range(3)] for j in range(len(prices))]
        dp[0][1][0]=dp[0][2][0]=0
        dp[0][1][1]=dp[0][2][1]=-prices[0]
        for i in range(1,len(prices)):
            for j in range(1, 3):
                dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j][1] + prices[i])
                dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i])
        return dp[len(prices)-1][2][0]
```

## 188. 买卖股票的最佳时机 IV / Best Time to Buy and Sell Stock IV：最多完成 k 笔交易

[LeetCode 中文站](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/) · [LeetCode 国际站](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

**简要题意：** 给定每日股价和交易上限 k，最多完成 k 次交易，同一时间只能持有一股，求最大利润。

```markdown
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```

### 递归要点

- 持有时 `hold == 1`，卖出 `dfs(i, j, 0) = max(dfs(i-1, j, 0), dfs(i-1, j - 1, 1) + prices[i])`
- 不持有时 `hold == 0`, 买入 `dfs(i, j, 1) = max(dfs(i-1, j, 1), dfs(i-1, j, 0) - prices[i])`
- 买入或卖出算作一次交易。代码中的 `j-1` 可以是在买股票的时候，也可以是在卖股票的时候

![image-20240513012542461](./240512-dp-state-machine.assets/image-20240513012542461.png)

### dfs 递归写法

```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        @cache
        def dfs(i: int, j: int, hold: bool) -> int:
            if j < 0:
                return -inf
            if i < 0:
                return -inf if hold else 0
            if hold:
                return max(dfs(i - 1, j, True), dfs(i - 1, j - 1, False) - prices[i])
            return max(dfs(i - 1, j, False), dfs(i - 1, j, True) + prices[i])
        return dfs(n - 1, k, False)
```

### 用另一种形式去做边界值也是可以的

```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        @cache
        def dfs(i: int, j: int, hold: bool) -> int:
            # if j < 0:
            #     return -inf
            # if i < 0:
            #     return -inf if hold else 0
            if j == 0:
                return -inf if hold else 0
            if i == 0:
                return -prices[i] if hold else 0
            if hold:
                return max(dfs(i - 1, j, True), dfs(i - 1, j - 1, False) - prices[i])
            return max(dfs(i - 1, j, False), dfs(i - 1, j, True) + prices[i])
        return dfs(n - 1, k, False)
```

### 递归写法，翻译上面的第一个 dfs 的边界值处理

1. 理解为什么是 dfs(n - 1, k, False)，因为 k == 0 时是最多交易 0 次，是有意义的。
2. 递归中 j 是从 -1 到 k，所以有 k+2 个不同的 j，这个维度是 k+2
3. 如果把 `i == -1` 作为边界，就需要处理从 `-1` 到 `n-1` 的所有 `i`，共 `n+1` 种取值，因此这一维需要 `n+1` 个位置。

![image-20240513010017067](./240512-dp-state-machine.assets/image-20240513010017067.png)

```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        f = [[[-inf] * 2 for _ in range(k + 2)] for _ in range(n + 1)]
        for j in range(1, k + 2):
            f[0][j][0] = 0
        for i, p in enumerate(prices):
            for j in range(1, k + 2):
                f[i + 1][j][0] = max(f[i][j][0], f[i][j][1] + p)
                f[i + 1][j][1] = max(f[i][j][1], f[i][j - 1][0] - p)
        for i in range(n+1):
            print(f[i])
        return f[-1][-1][0]
```

### 状态表 `f` 示例

![image-20240513011111890](./240512-dp-state-machine.assets/image-20240513011111890.png)

## 至少交易k次

## 正好交易k次

## 309. 买卖股票的最佳时机含冷冻期 / Best Time to Buy and Sell Stock with Cooldown

[LeetCode 中文站](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/) · [LeetCode 国际站](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

**简要题意：** 可以多次买卖股票且最多持有一股。卖出后的下一天是冷冻期，不能买入；再下一天可以。返回最大利润。

## 714. 买卖股票的最佳时机含手续费 / Best Time to Buy and Sell Stock with Transaction Fee

[LeetCode 中文站](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) · [LeetCode 国际站](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

**简要题意：** 可多次买卖股票，同一时间只能持有一股，每笔完整交易支付一次手续费，求最大利润。

## 参考资料

1. [买卖股票的最佳时机【基础算法精讲 21】](https://www.bilibili.com/video/BV1ho4y1W7QK/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70)
