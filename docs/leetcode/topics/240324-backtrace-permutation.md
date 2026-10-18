---
sidebar_position: 22
tags: [leetcode]
---

# 回溯之排列 Backtrace-Permutation

> 排列需要区分元素的顺序。

需要考虑排除已选的数

## 示例

全排列 `A(n, n)` = `3 * 2 *1`

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

## 46. 全排列 / Permutations

[LeetCode 中文站](https://leetcode.cn/problems/permutations/) · [LeetCode 国际站](https://leetcode.com/problems/permutations/)

**简要题意：** 给定元素互不相同的 nums，返回所有排列。结果数组的顺序不限，但每个排列内部的顺序代表一个不同答案。

```python
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

## 51. N 皇后 / N-Queens

[LeetCode 中文站](https://leetcode.cn/problems/n-queens/) · [LeetCode 国际站](https://leetcode.com/problems/n-queens/)

**简要题意：** 在 n×n 棋盘上放置 n 个皇后，使任意两个不同行、不同列且不在同一斜线上，返回全部棋盘方案。

从第 0 行开始，遍历在每个 j 放棋子是否可行：即是否前面的 `[0, i-1]` 的 `j` 直线、对角线已经摆放了棋子

- 可行：加入 path 往下递归
- 不可行：跳过

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        ans = []
        path = []
        def canPlace(i, j):
            for k in path:
                if j == k:
                    return False
            for k in range(i-1, -1, -1):
                cnt = i - k
                if j + cnt < n and path[k] == j + cnt: return False
                if j - cnt >= 0 and path[k] == j - cnt: return False
            return True

        def genResult():
            res = []
            for p in path:
                tmp = ""
                for i in range(p):
                    tmp += "."
                tmp += "Q"
                for i in range(p+1, n, 1):
                    tmp += "."
                res.append(tmp)
            ans.append(res)

        def dfs(i):
            if i == n:
                genResult()
                return
            for j in range(n):
                if canPlace(i, j):
                    path.append(j)
                    dfs(i+1)
                    path.pop()
        dfs(0)
        return ans
```

## 参考资料

1. [排列型回溯+N皇后 【基础算法精讲 16】](https://www.bilibili.com/video/BV1mY411D7f6/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70)
