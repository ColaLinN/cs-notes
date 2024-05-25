

[2903. Find Indices With Index and Value Difference I](https://leetcode.cn/problems/find-indices-with-index-and-value-difference-i/)

```python
class Solution:
    def findIndices(self, nums: List[int], indexDifference: int, valueDifference: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + indexDifference, n, 1):
                if abs(nums[i] - nums[j]) >= valueDifference:
                    return [i, j]
        return [-1, -1]
```

