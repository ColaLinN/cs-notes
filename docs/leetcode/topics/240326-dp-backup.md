---
sidebar_position: 24
title: Backup DP
tags: [leetcode]
---

# 背包动态规划 Backup DP

## 背包问题

【0-1背包 完全背包】 https://www.bilibili.com/video/BV16Y411v7Y6/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

1. 递归，自顶向下
2. 记忆化搜索
3. 递推，自底向上
4. 二维数组
5. 一维数组

### 零一背包

有 n 个物品，第 i 个物品的体积为 w[i]，价值为 v[i]，**每个物品至多选一个**，求体积和不超过 capacity 时的最大价值和。

1. 当前 dfs 维
2. `dfs[i][j] = max(dfs[i-1][j], dfs[i-1][j-w[i]] + v[i]])`
3. 一维数组递推，从右往左

### 完全背包

有 n 个物品，第 i 个物品的体积为 w[i]，价值为 v[i]，**每个物品可以重复选**，求体积和不超过 capacity 时的最大价值和。

1. 一维数组递推，从左往右

### 常见变形

1. 至多装capacity，求方案数/最大价值和
2. 恰好装capacity，求方案数/最大/最小价值和
3. 至少装capacity，求方案数/最小价值和

## 01 [494. Target Sum](https://leetcode.cn/problems/target-sum/) 01 背包

### 递归写法，记忆化搜索

1. if nums[i] > c
   1. dfs(n, c) = dfs(n-1, c)
2. else
   1. dfs(n, c) = dfs(n-1, c) + dfs(n-1, nums[i]-c)

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # p
        # s-p
        # p-(s-p)=t
        # p=(t+s)/2
        n = len(nums)
        s = sum(nums)
        cap = (s+target)/2
        @cache
        def dfs(i, c):
            if i < 0:
                return 1 if c == 0 else 0
            if nums[i] > c:
                return dfs(i-1, c)
            return dfs(i-1, c)+ dfs(i-1, c-nums[i])
        return dfs(n-1, cap)
```

### 记忆化搜索，二维数组

```
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # p
        # s-p
        # p-(s-p)=t
        # p=(t+s)/2
        n = len(nums)
        target += sum(nums)
        if target < 0 or target % 2:
            return 0
        cap = target//2

        cache = [[-1] * (cap+1) for _ in range(n)]
        # @cache
        def dfs(i, c):
            if i < 0:
                return 1 if c == 0 else 0
            if cache[i][c] != -1:
                return cache[i][c]
            res = 0
            if nums[i] > c:
                res = dfs(i-1, c)
            else:
                res = dfs(i-1, c)+ dfs(i-1, c-nums[i])
            cache[i][c] = res
            return res
        return dfs(n-1, cap)
```

### 递推写法，自底向上的记忆化搜索

f[n] [c] = f[n-1] [c] + f[n-1] [nums[i] - c]

1. if nums[i] > c
   1. f[n+1] [c] = f[n] [c]
2. else
   1. f[n+1] [c] = f[n] [c] + f[n] [nums[i] - c]

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # p
        # s-p
        # p-(s-p)=t
        # p=(t+s)/2
        n = len(nums)
        target += sum(nums)
        if target < 0 or target % 2:
            return 0
        target = target//2  # target

        f = [[0] * (target+1) for _ in range(n+1)]
        f[0][0] = 1
        for i, x in enumerate(nums):
            for c in range(target+1):
                # if i == 0:
                #     if x == c:
                #         f[i][c] = 1
                # else:
                if x > c:
                    f[i+1][c] = f[i][c]
                else:
                    f[i+1][c] = f[i][c] + f[i][c-x]
        return f[n][target]
        
        
# 空间优化成两行数组，因为每次计算下一个数组都只需要上一个数组的值
        f = [[0] * (target+1) for _ in range(2)]
        f[0][0] = 1
        for i, x in enumerate(nums):
            for c in range(target+1):
                # if i == 0:
                #     if x == c:
                #         f[i][c] = 1
                # else:
                if x > c:
                    f[(i+1)%2][c] = f[i%2][c]
                else:
                    f[(i+1)%2][c] = f[i%2][c] + f[i%2][c-x]
        return f[n%2][target]

# 优化成一维数组（按照惯例/定律，因为我们从左往右更新，所以一维数组从右往左遍历迭代）
        f = [0] * (target+1) 
        f[0] = 1
        for i, x in enumerate(nums):
            for c in range(target, -1, -1):
                if x > c:
                    f[c] = f[c]
                else:
                    f[c] = f[c] + f[c-x]
        return f[target]

# 继续优化，把x>c的判断用range来取代，因为是原地，所以不用更新
        f = [0] * (target+1) 
        f[0] = 1
        for i, x in enumerate(nums):
            for c in range(target, x-1, -1):
                f[c] = f[c] + f[c-x]
        return f[target]
```

## 02 [322. Coin Change](https://leetcode.cn/problems/coin-change/) 完全背包

### 递归思路，自顶向下记忆化搜索

1. if remained_amount < x， 只能不选当前硬币
   1. dfs(n, amount) = dfs(n-1, amount)
2. Else，选或不选当前硬币，且可以重复选择当前硬币
   1. dfs(n, amount) = min(dfs(n-1, amount), dfs(n, amount-nums[n])+1)

### 递推

1. 二维数组
   1. f[n] [amount] = min(f[n-1] [amount], f[n] [amount-nums[n]]+1)
2. 一维数组
   1. f[c] = min(f[c], f[c-x]+1)，从左往右更新，因为下一个数的计算基于更新后的前一个数

### 递归

```
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        target = amount
        n = len(coins)
        @cache
        def dfs(i, c):
            if i < 0:
                if c == 0: return 0 # we should return 0 as this(i=0, c=0) is a valid end status
                else: return inf
            if c < coins[i]:
                return dfs(i-1, c)
            else:
                return min(dfs(i-1, c), dfs(i, c-coins[i])+1)
        return dfs(n-1, target) if dfs(n-1, target) < inf else -1
```

### 一维数组递推法

```
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        target = amount
        # 当前硬币，选或不选
        # 递归：dfs(n, amount) = min(dfs(n-1, amount), dfs(n, amount-nums[n])+1)
        # if i < 0 and amount != 0: return inf, which implies the "-1"
        # 递推：f[n][amount] = min(f[n-1][amount], f[n][amount-nums[n]]+1)
        f = [inf] * (target+1)
        f[0] = 0
        for i, x in enumerate(coins):
            for c in range (x, target+1):
                f[c] = min(f[c], f[c-x]+1)
        return f[target] if f[target] != inf else -1
```



## 03 [518. Coin Change II](https://leetcode.cn/problems/coin-change-ii/)

管你0-1背包还是完全背包我都一把梭

### 递归

```
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        target = amount
        n = len(coins)
        @cache
        def dfs(i, c):
            if i < 0:
                if c == 0: return 1 # we should return 0 as this(i=0, c=0) is a valid end status
                else: return 0
            if c < coins[i]:
                return dfs(i-1, c)
            else:
                return dfs(i-1, c) + dfs(i, c-coins[i])
        return dfs(n-1, target)
```

### 递推

```
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        target = amount
        f = [0] * (target+1)
        f[0] = 1 # the key point, 因为算的是组合数，所以我们需要返回1
        for i, x in enumerate(coins):
            for c in range (x, target+1):
                f0 = f[c]
                f1 = f[c-x]
                f[c] = f0 + f1
        return f[target]
```

