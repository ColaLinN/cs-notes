---
sidebar_position: 4
title: Backtrace Combination
tags: [leetcode]
---




# 组合型（选哪个）

01 [77. Combinations](https://leetcode.cn/problems/combinations/)

```
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        ans = []
        path = []
        def dfs(i):
            d  = k - len(path)
            if len(path) == k:
                ans.append(path.copy())
                return
            for j in range(i, d-1, -1):
                path.append(j)
                dfs(j-1)
                path.pop()
        dfs(n)
        return ans
```



02 [216. Combination Sum III](https://leetcode.cn/problems/combination-sum-iii/)

```
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        ans = []
        path = []
        def dfs(i, t):
            d = k - len(path)
            if t < 0 or t > (i + i - d + 1) * d // 2:
                return
            if len(path) == k:
                ans.append(path.copy())
                return
            for j in range(i, d-1, -1):
                path.append(j)
                dfs(j-1, t-j)
                path.pop()
        dfs(9, n)
        return ans
```



03 [22. Generate Parentheses](https://leetcode.cn/problems/generate-parentheses/)

```
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans = []
        path = [''] * (n*2)
        def dfs(i, left): # the number of left bracket
            if i == n*2:
                ans.append(''.join(path))
                return 
            if left < n:
                path[i] = '('
                dfs(i+1, left+1)
            if i-left < left:
                path[i] = ')'
                dfs(i+1, left)
        dfs(0, 0)
        return ans
```

