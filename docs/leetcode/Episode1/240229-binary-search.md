---
sidebar_position: 12
title: Binary Search
tags: [leetcode]
---

# Idea

红蓝染色法：

1. right 左移使右侧变蓝 (判断条件为 true )
2. left 右移使左侧变红 (判断条件为 false )
3. 故确定二分处 ( mid ) 的染色条件是关键

![image-20240229171154275](./240229-binary-search.assets/image-20240229171154275.png)

## Template

### (i, j) and [i, j]

![image-20240525052016591](./240229-binary-search.assets/image-20240525052016591.png)

### [i, j) and [i, j]

![image-20240525052342672](./240229-binary-search.assets/image-20240525052342672.png)

### Explanation

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

下面是一个最终收敛到左闭右开区间 `[left, right)` 的例子

```go
    //...
    left := 0  # 初始值的设置其实可以直接设为0和n-1
    right := len(nums) - 1
    for left < right { // (1)
        mid := (left + right) / 2 // (2)
        if nums[mid] < nums[mid+1] { // (3) nums[mid] < nums[mid+1] can be abstract as a func `isRed()`
            left = mid + 1 // (4.1)
        } else {
            right = mid // (4.2)
        }
    }
```

影响红蓝染色法收敛结果的因素

1. `(1)` for 循环
2. `(4)` left 和 right 是否赋值 mid 或更进一步 (left = mid + 1 or right = mid -1)

```
1. (1) 这是影响收敛的重要条件，决定了left和right停下的条件，部分决定了开闭性质
   1. (1) left <= right，闭区间
   2. (1) left < right，半开半闭区间
   3. (1) left +1 < right，开区间
2. (2)一般为向下取整。（向下取整很少溢出，而向上取整可能会溢出，，需要分情况讨论。）
3. (3)是收敛的另一个重要条件
4. (4.1) (4.2)和(1)共同部分决定了left和right开闭的性质，如果设置与(1)不配套，会使得(1) for loop无法收敛
   1. (left, right) 闭区间。需要初始化 i = 0, j = n-1
      1. (1) left <= right
      2. (4.1) left = mid + 1
      3. (4.2) right = mid - 1
      4. (4.1) and (4.2) must be like the condition above, otherwise the program will trap into infinite loop
   2. [left, right)  左闭右开区间。需要初始化 i = -1, j = n-1
      1. Difference:
         1. 和3的区别在于(4.1)(4.2)
         2. 如果换成1的(4.1)(4.2)，收敛的时候会使得left==right，且不稳定，要么位于<target的地方，要么等于target的地方
         3. 如果换成4的(4.1)(4.2)，会无法收敛
      2. (1) left < right
      3. (4.1) left = mid + 1
      4. (4.2) right = mid
      5. (4.1) and (4.2) must be like the condition above, otherwise the program will trap into infinite loop
   3. (left, right]  左开右闭区间。需要初始化 i = 0, j = n
      1. (1) left < right
      2. (4.1) left = mid
      3. (4.2) right = mid - 1
   4. [left, right]  开区间。 需要初始化 i = -1, j = n
      1. Difference:
         1. 这里的初始化可以是left=0, right=n-1, 而不一定不用包含。
      2. (1) left + 1 < right
      3. (4.1) left = mid
      4. (4.2) right = mid 
```
## bisect_left (4 solutions)

### (i, j)

```python
# (i, j) -> i <= j; i = mid + 1, j = mid - 1
def bisect_left_v1(nums, target):
    i = 0
    j = len(nums) - 1
    while i <= j:
        mid = (i+j) // 2
        if nums[mid] < target: # red
            i = mid + 1
        else: # blue
            j = mid - 1
    return j + 1
```

### (i, j]

```python
# (i, j] -> i < j; i = mid + 1, j = mid
def bisect_left_v2(nums, target):
    i = 0
    j = len(nums)
    while i < j:
        mid = (i+j) // 2
        if nums[mid] < target: # red
            i = mid + 1
        else: # blue
            j = mid
    return j
```

### [i, j

There is problem, I cannot figure it out for now.

```python
# [i, j) -> i < j; i = mid, j = mid - 1
def bisect_left_v3(nums, target):
    i = 0
    j = len(nums) - 1
    while i < j:
        # print(i, j, nums[i], nums[j], target)
        mid = (i+j) // 2
        if mid <= 0: return 0
        # if mid == i: 
        if nums[mid] < target: # red
            i = mid
        else: # blue
            j = mid - 1
    return j
```

### [i, j]

```python
# [i, j] -> i + 1 < j; i = mid, j = mid
def bisect_left_v4(nums, target):
    i = -1
    j = len(nums)
    while i + 1 < j:
        mid = (i+j) // 2
        if nums[mid] < target: # red
            i = mid
        else: # blue
            j = mid
    return i + 1
```

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
