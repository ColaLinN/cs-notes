





## [2779. Maximum Beauty of an Array After Applying Operation](https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation/)

```python
class Solution:
    def maximumBeauty(self, nums: List[int], k: int) -> int:
        nums.sort()
        ans = left = 0
        for right, x in enumerate(nums):
            while x - nums[left] > k * 2:
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

