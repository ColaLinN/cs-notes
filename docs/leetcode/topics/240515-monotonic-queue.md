



# 单调队列 Monotonic Queue

[239. 滑动窗口最大值 / Sliding Window Maximum](https://leetcode.cn/problems/sliding-window-maximum/)<br/>[LeetCode 中文站](https://leetcode.cn/problems/sliding-window-maximum/) · [LeetCode 国际站](https://leetcode.com/problems/sliding-window-maximum/)

**简要题意：** 长度为 k 的窗口从 nums 左端逐格移向右端。按顺序返回每个窗口内的最大值。

https://leetcode.cn/problems/sliding-window-maximum/solutions/2499715/shi-pin-yi-ge-shi-pin-miao-dong-dan-diao-ezj6/

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        ans = []
        q = deque()  # 双端队列
        for i, x in enumerate(nums):
            # 1. 入
            while q and nums[q[-1]] <= x:
                q.pop()  # 维护 q 的单调性
            q.append(i)  # 入队
            # 2. 出
            if i - q[0] >= k:  # 队首已经离开窗口了
                q.popleft()
            # 3. 记录答案
            if i >= k - 1:
                # 由于队首到队尾单调递减，所以窗口最大值就是队首
                ans.append(nums[q[0]])
        return ans
```

