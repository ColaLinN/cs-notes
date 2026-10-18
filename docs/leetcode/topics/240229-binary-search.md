---
sidebar_position: 12
tags: [leetcode]
---

# 二分搜索 Binary Search 

# Idea

红蓝染色法：

1. right 左移使右侧变蓝 (判断条件为 true )
2. left 右移使左侧变红 (判断条件为 false )
3. 故确定二分处 ( mid ) 的染色条件是关键

![image-20240229171154275](./240229-binary-search.assets/image-20240229171154275.png)

## Template

## bisect_left

`nums` 需按非递减顺序排列；返回第一个 `>= target` 的下标，不存在时返回 `len(nums)`。下面的区间均指尚未判断的下标。

三个例子统一使用 `nums = [1, 2, 2, 4, 5]`、`target = 2`。`< target` 为红色，`>= target` 为蓝色，答案是第一个蓝色位置 `1`。

### [i, j] 闭区间

```python
# [i, j] -> i <= j; i = mid + 1, j = mid - 1
def bisect_left(nums, target):
    i = 0
    j = len(nums) - 1
    while i <= j:
        mid = (i+j) // 2
        if nums[mid] < target:
            i = mid + 1
        else:
            j = mid - 1
    return i
```

两端都包含在待判断区间中，判断完 `mid` 后用 `mid + 1` 或 `mid - 1` 排除它。结束时 `i > j`，返回 `i`。

| 轮次 | `i` | `j` | 待判断区间 | `mid` | 判断 | 更新 |
|---|---:|---:|---|---:|---|---|
| 1 | 0 | 4 | `[0, 4]` | 2 | `nums[2] = 2 >= 2`，蓝色 | `j = 1` |
| 2 | 0 | 1 | `[0, 1]` | 0 | `nums[0] = 1 < 2`，红色 | `i = 1` |
| 3 | 1 | 1 | `[1, 1]` | 1 | `nums[1] = 2 >= 2`，蓝色 | `j = 0` |
| 结束 | 1 | 0 | 空区间 | — | `i > j` | 返回 `i = 1` |


### [i, j) 半开区间

```python
# [i, j) -> i < j; i = mid + 1, j = mid
def bisect_left(nums, target):
    i = 0
    j = len(nums)  # 使用半开区间 [i, j)
    while i < j:
        mid = (i + j) // 2
        if nums[mid] < target:  # 注意这里是 < 而不是 <=
            i = mid + 1
        else:
            j = mid
    return i

for i in range(1, 10):
    print(i, bisect_left([1,2,3,4,5], i))
```

左端包含、右端不包含。`j = mid` 已将 `mid` 排除；初始 `j = len(nums)` 不会被访问。结束时 `i == j`，返回 `i`。

| 轮次 | `i` | `j` | 待判断区间 | `mid` | 判断 | 更新 |
|---|---:|---:|---|---:|---|---|
| 1 | 0 | 5 | `[0, 5)`，下标 0～4 | 2 | `nums[2] = 2 >= 2`，蓝色 | `j = 2` |
| 2 | 0 | 2 | `[0, 2)`，下标 0～1 | 1 | `nums[1] = 2 >= 2`，蓝色 | `j = 1` |
| 3 | 0 | 1 | `[0, 1)`，只有下标 0 | 0 | `nums[0] = 1 < 2`，红色 | `i = 1` |
| 结束 | 1 | 1 | 空区间 | — | `i == j` | 返回 `i = 1` |


### (i, j) 开区间

```python
# (i, j) -> i + 1 < j; i = mid, j = mid
def bisect_left(nums, target):
    i = -1
    j = len(nums)
    while i + 1 < j:
        mid = (i+j) // 2
        if nums[mid] < target:
            i = mid
        else:
            j = mid
    return i + 1 # j
```

两端都不包含。`i` 是已知红色边界，`j` 是已知蓝色边界；初始 `-1` 和 `len(nums)` 是虚拟边界，不会被访问。结束时两端相邻，返回 `i + 1`，也就是 `j`。

| 轮次 | `i` | `j` | 待判断区间 | `mid` | 判断 | 更新 |
|---|---:|---:|---|---:|---|---|
| 1 | -1 | 5 | `(-1, 5)`，下标 0～4 | 2 | `nums[2] = 2 >= 2`，蓝色 | `j = 2` |
| 2 | -1 | 2 | `(-1, 2)`，下标 0～1 | 0 | `nums[0] = 1 < 2`，红色 | `i = 0` |
| 3 | 0 | 2 | `(0, 2)`，只有下标 1 | 1 | `nums[1] = 2 >= 2`，蓝色 | `j = 1` |
| 结束 | 0 | 1 | 空区间 | — | `i + 1 == j` | 返回 `j = i + 1 = 1` |


## [162. Find Peak Element](https://leetcode.cn/problems/find-peak-element/)

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        # we use [left, right) left closed and right open interval
        # red blue painting approach to solve this problem
        left = 0
        right = len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < nums[mid+1]:
                left = mid + 1
            else:
                right = mid
        return left
```

## [34. Find First and Last Position of Element in Sorted Array](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if len(nums) == 0:
            return [-1, -1]
        def lowBound(nums, target):
            # we use left open and right open interval here
            left = -1
            right = len(nums)
            while left + 1 < right:
                mid = (left + right) // 2
                if nums[mid] >= target:
                    right = mid
                else:
                    left = mid
            return left
        left = lowBound(nums, target) + 1 # plus 1 to make it ranges from [0, len(nums)]
        right = lowBound(nums, target+1)
        if left == len(nums) or nums[left] != target: # left is after the end, or left is not equal to the target
            return [-1, -1]
        else:
            return [left, right]
```

## [153. Find Minimum in Rotated Sorted Array](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)

```
class Solution:
    def findMin(self, nums: List[int]) -> int:
        def isBlue(mid):
            if nums[mid] > end:
                return False
            else:
                return True
        # left open right closed interval
        left = 0
        right = len(nums)
        end = nums[-1]
        while left < right:
            mid = (left + right) // 2
            if isBlue(mid):
                right = mid
            else:
                left = mid + 1
        return nums[right]
```

## [154. Find Minimum in Rotated Sorted Array II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)

```
class Solution:
    def findMin(self, nums: List[int]) -> int:
        end = nums[-1]
        i = 0
        while i < len(nums) and nums[i] == end: # 跳过开头的重复数字，来避免[3,1,3], right变成0
            i+=1
        if i == len(nums): # 如果全部一样则直接返回结果
            return end
        nums = nums[i:] #跳过重复数字

        def isBlue(mid):
            if nums[mid] <= end:
                return True
            else:
                return False
        # left closed right open interval
        left = 0
        right = len(nums)
        while left < right:
            mid = (left + right) // 2
            if isBlue(mid):
                right = mid
            else:
                left = mid + 1
        return nums[right]
```

## [33. Search in Rotated Sorted Array](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

![image-20240525054453365](./240229-binary-search.assets/image-20240525054453365.png)

```
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        end = nums[-1]
        def isBlue(mid):
            if nums[mid] > end:
                return target <= nums[mid] and target > end #target在mid的左边大于end的那段递增线段
            else:
                return target <= nums[mid] or target > end #target在最小和mid的中间，或者在左边大于end的递增线段
        left = 0
        right = len(nums) - 1
        while left < right:
            mid = (left+right) //2
            if isBlue(mid):
                right = mid
            else:
                left = mid + 1
        if nums[right] != target:
            return -1
        return right
```

## [2529. Maximum Count of Positive Integer and Negative Integer](https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/)

```
class Solution:
    def maximumCount(self, nums: List[int]) -> int:
        left = 0
        right = len(nums) - 1
        while left < right:
            mid = (left + right) //2
            if nums[mid] >= 0:
                right = mid -1
            else:
                left = mid
        neg = left+1
        pos = left
        while left < len(nums) and nums[left] <=0:
            left+=1
        pos = len(nums) - 1 - left
        return max(neg, pos)
```

## others

### (i, j) and [i, j]

![image-20240525052016591](./240229-binary-search.assets/image-20240525052016591.png)

### [i, j) and [i, j]

![image-20240525052342672](./240229-binary-search.assets/image-20240525052342672.png)

开区间指的是区间边界的两个值不包括在内，格式为：

```
(a, b)
a < x < b
```

闭区间指的是区间边界的两个值包括在内，格式为：

```
[a,b]
a <= x <=b
```
