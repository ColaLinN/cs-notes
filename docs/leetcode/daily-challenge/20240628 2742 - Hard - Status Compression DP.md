

[2742. Painting the Walls](https://leetcode.cn/problems/painting-the-walls/)

- 所谓的状态压缩，就是把几个状态（比如 i 和 j）合并成一个状态 j

本题解释

1. 如果我们从后往前刷墙壁，
2. 对于第 n-1 的墙壁，设置两个变量：付费时间 i 和 免费时间 j
   1. 如果当前选择付费刷第 n-1 的墙壁，则付费时间 i + time[n-1]，当前开销加上 cost[n-1]
   2. 如果选择免费刷第 n-1 的墙壁，则免费时间 j -1
3. 状态压缩
   1. 因为付费时间 i 和 免费时间 j 两个变量太多了
   2. 我们其实只需要他们的差值就可以判断之后是否可以免费刷墙：免费时间减去付费时间，下面用 j 表示
4. 所以 `dp(n-1, 0) = min(dp(i-1, j + time[i]) + cost[i], dp(i-1, j-1))`

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        @cache
        def dp(i, j):
            if j > i:
                return 0
            elif i < 0:
                return inf
            return min(dp(i-1, j + time[i]) + cost[i], dp(i-1, j-1))
        return dp(len(cost)-1, 0)
```

