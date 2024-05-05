---
sidebar_position: 23
title: Backtrace Permutation
tags: [leetcode]
---


# 回溯排列型（permutation)

需要考虑排除已选的数

【回溯算法套路③排列型回溯+N皇后【基础算法精讲 16】】 https://www.bilibili.com/video/BV1mY411D7f6/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

01 [46. Permutations](https://leetcode.cn/problems/permutations/)

```
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if n == 0:
            return []

        ans = []
        path = [0] * n
        def dfs(i, s): # 使用set来帮助统计path
            if i == n:
                ans.append(path.copy())
                return
            for x in s:
                path[i] = x
                dfs(i+1, s - {x}) # python的set的语法糖
        dfs(0, set(nums))
        return ans
```

