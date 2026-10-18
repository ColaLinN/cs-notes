



# 单调栈 Monotonic Stack

[739. 每日温度 / Daily Temperatures](https://leetcode.cn/problems/daily-temperatures/)<br/>[LeetCode 中文站](https://leetcode.cn/problems/daily-temperatures/) · [LeetCode 国际站](https://leetcode.com/problems/daily-temperatures/)

**简要题意：** 对每天的温度，计算至少还要等多少天才能遇到严格更高的温度。之后没有更高温度则记为 0。

https://leetcode.cn/problems/daily-temperatures/solutions/2470179/shi-pin-jiang-qing-chu-wei-shi-yao-yao-y-k0ks/

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        ans = [0] * n
        st = []
        for i in range(n - 1, -1, -1):
            t = temperatures[i]
            while st and t >= temperatures[st[-1]]:
                st.pop()
            if st:
                ans[i] = st[-1] - i
            st.append(i)
        return ans
```

