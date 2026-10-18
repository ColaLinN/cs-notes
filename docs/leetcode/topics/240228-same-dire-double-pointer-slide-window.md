---
sidebar_position: 11
tags: [leetcode]
---

# 同向指针滑窗 Same Direction Pointer/Sliding Window

## 思路

同向双指针可以维护长度可变的滑动窗口。

关键是找到单调性：移动边界后，能够一次判断一批子数组或元素是否满足条件。

> 同向双指针是一种可变的滑动窗口，固定的叫做滑动窗口。最重要的就是要发现单调性，发现可以通过一次比较来发现多个相同条件的子数组/元素

## 滑动窗口模板速查

```python
# https://leetcode.cn/problems/max-consecutive-ones-iii/solutions/609055/fen-xiang-hua-dong-chuang-kou-mo-ban-mia-f76z/
def findSubArray(nums):
    n = len(nums)
    left, right = 0, 0
    sums = 0 # 用于统计 子数组/子区间 是否有效，根据题目可能会改成求和/计数
    res = 0 # 保存最大的满足题目要求的 子数组/子串 长度
    while right < n:
        sums += nums[right] # 增加当前右边指针的数字/字符的求和/计数
        
        while 区间[left, right]不符合题意: # 此时需要一直移动左指针，直至找到一个符合题意的区间
            sums -= nums[left] # 移动左指针前需要从 counter 中减少left位置字符的求和/计数
            left += 1 # 移动左指针，注意不能跟上面一行代码写反
        
        # 到 while 结束时，我们找到了一个符合题意要求的 子数组/子串
        res = max(res, right - left + 1) # 需要更新结果
        right += 1 # 移动右指针，去探索新的区间
    return res
```

## 209. 长度最小的子数组 / Minimum Size Subarray Sum

[LeetCode 中文站](https://leetcode.cn/problems/minimum-size-subarray-sum/) · [LeetCode 国际站](https://leetcode.com/problems/minimum-size-subarray-sum/)

**简要题意：** 在正整数数组 `nums` 中，找和至少为 `target` 的最短非空连续子数组，返回长度；不存在时返回 0。

子数组（subarray）是数组中一段**连续且非空**的元素序列。

```
func minSubArrayLen(target int, nums []int) int {
    left := 0
    minLen := len(nums) + 1 // This is to mock the infinite
    sum := 0
    for right := 0 ; right < len(nums) ; right++ {
        sum += nums[right]
        for sum >= target {
            if minLen > right - left + 1 {
                minLen = right - left + 1
            }
            sum -= nums[left]
            left++
        }
    }
    if minLen == len(nums) + 1 { // Skip the non-updated case
        return 0
    } else {
        return minLen
    }
}
```

## 3. 无重复字符的最长子串 / Longest Substring Without Repeating Characters

[LeetCode 中文站](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) · [LeetCode 国际站](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**简要题意：** 给定字符串，返回不含重复字符的最长连续子串长度。

```
func lengthOfLongestSubstring(s string) int {
    charMap := make(map[byte]bool)
    res := 0
    left := 0
    for right := 0 ; right < len(s); right++ {
        for charMap[s[right]] {
            charMap[s[left]] = false
            left++
        }
        charMap[s[right]] = true
        if res < right - left + 1 {
            res = right - left + 1
        }
    }
    return res
}
```

## 713. 乘积小于 K 的子数组 / Subarray Product Less Than K

[LeetCode 中文站](https://leetcode.cn/problems/subarray-product-less-than-k/) · [LeetCode 国际站](https://leetcode.com/problems/subarray-product-less-than-k/)

**简要题意：** 给定正整数数组，统计元素乘积严格小于 k 的非空连续子数组数量。

```
func numSubarrayProductLessThanK(nums []int, k int) int {
    // left = 0
    // right starts from 0
    // if product <= k, 
    //      it means the [left, right], [left+1, right], ..., [right, right] all meet the requirement
    //      and we can proceed right++
    // else, we can proceed left++ until product <= k
    left := 0
    cnt := 0
    product := 1
    // edge case, when the target k is 1, it's impossible to find a subarrays 
    // based on the current constraints 1 <= nums[i]
    // it's also for preventing the codes trapping into the infinite loop
    if k <= 1 {
        return 0
    }
    for right := 0 ; right < len(nums) ; right++ {
        product *= nums[right]
        for product >= k { // it implies that the left <= right, the minimum of product is 1
            product /= nums[left]
            left++
        }
        if product < k { // only cares about the cases which are less than the target
            cnt += right-left+1
        }
    }
    return cnt
}
```

## 1004. 最大连续 1 的个数 III / Max Consecutive Ones III

[LeetCode 中文站](https://leetcode.cn/problems/max-consecutive-ones-iii/) · [LeetCode 国际站](https://leetcode.com/problems/max-consecutive-ones-iii/)

**简要题意：** `nums` 只含 0 和 1。最多将 k 个 0 翻转为 1，返回可以得到的最长连续 1 的长度。

```
func longestOnes(nums []int, k int) int {
    left := 0
    maxCnt := 0
    oneCnt := 0
    zeroCnt := 0
    for right := 0 ; right < len(nums) ; right++ {
        if nums[right] == 1 {
            oneCnt ++
        } else {
            zeroCnt ++
        }

        for zeroCnt > k {
            if nums[left] == 1 { // skip number in the left
                oneCnt--
            } else {
                zeroCnt--
            }
            left++
        } 
        if maxCnt < oneCnt + zeroCnt {
            maxCnt = oneCnt + zeroCnt
        }
    }
    return maxCnt
}
```

## 283. 移动零 / Move Zeroes

[LeetCode 中文站](https://leetcode.cn/problems/move-zeroes/) · [LeetCode 国际站](https://leetcode.com/problems/move-zeroes/)

**简要题意：** 原地将数组中的所有 0 移到末尾，同时保持其他元素的相对顺序。

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        N = len(nums)
        i = 0
        for i in range(len(nums)): # while j < len(nums):
            if nums[i] != 0:
                continue
            for j in range(i+1, len(nums)):
                if nums[j] != 0:
                    nums[i] = nums[j]
                    nums[j] = 0
                    break
```

## 参考资料

1. [滑动窗口模板](https://leetcode.cn/problems/max-consecutive-ones-iii/solutions/609055/fen-xiang-hua-dong-chuang-kou-mo-ban-mia-f76z/)
2. [C++ 滑动窗口模板速查](https://leetcode.com/problems/frequency-of-the-most-frequent-element/solutions/1175088/C++-Maximum-Sliding-Window-Cheatsheet-Template!/)
3. [C++ 线性时间滑动窗口：用“至多”推导“恰好”的技巧](https://leetcode.com/problems/count-vowel-substrings-of-a-string/solutions/1563765/c-on-time-sliding-window/comments/1141941/)
