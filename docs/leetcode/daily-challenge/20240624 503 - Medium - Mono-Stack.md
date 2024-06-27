[503. Next Greater Element II](https://leetcode.cn/problems/next-greater-element-ii/)

```python
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [-1] * n
        st = []
        for i in range(n * 2 - 1, -1, -1):
            x = nums[i % n]
            while st and x >= st[-1]:
                # 由于 x 的出现，栈顶元素永远不会是左边元素的「下一个更大元素」
                st.pop()
            if st and i < n:
                ans[i] = st[-1]
            st.append(x)
        return ans
```

