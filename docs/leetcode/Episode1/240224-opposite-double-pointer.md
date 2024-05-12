---
sidebar_position: 10
title: Opposite Double Pointer
tags: [leetcode]
---



https://www.bilibili.com/video/BV1bP411c7oJ/?vd_source=66a0b89065d7f04805223fd7f2d613a6

数组是排好序的

1. 如果是暴力的话，相当于用O(1)的时间只能获得O(1)的信息
2. 如果是双向指针的画，相当于用O(1)的时间知道了O(n)的信息，排除掉了O(n)的可能。

## 01 [167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

```golang
func twoSum(numbers []int, target int) []int {
    var i int = 0
    var j = len(numbers) - 1
    var res = make([]int, 0)
    for i < j {
        var curSum int = numbers[i] + numbers[j]
        if curSum < target {
            i +=1
        } else if curSum > target {
            j -=1
        } else {
            res = []int{i + 1, j +1}
            break
        }
    }
    return res
}
```

https://leetcode.cn/problems/two-sum/description/

### 两数之和，哈希

```golang
func twoSum(nums []int, target int) []int {
    var numMap = make(map[int]int)
    for i, value := range nums {
        numMap[value] = i
    }

    res := make([]int, 0)
    for i, value := range nums {
        if idx, ok := numMap[target - value]; ok {
            if idx == i {
                continue
            } else {
                res = []int{i, idx}
                break
            }
        }
    }
    return res
}
```

## 02 [15. 三数之和](https://leetcode.cn/problems/3sum/submissions/505014360/)

```golang
func threeSum(nums []int) [][]int {
    var n int = len(nums)
    sort.Ints(nums)
    var res = make([][]int, 0)
    for i := 0 ; i < n - 2 ; i++ {
        if nums[i] + nums[n-2] + nums[n-1] < 0 { //optimize 1
            continue
        }
        if nums[i] + nums[i+1] + nums[i+2] > 0 { //optimize 2
            break
        }

        var target int = - nums[i]
        var j int = i + 1
        var k int = n - 1
        for j < k {
            var curSum int = nums[j] + nums[k]
            if curSum < target {
                j +=1
            } else if curSum > target {
                k -=1
            } else {
                res = append(res, []int{nums[i], nums[j], nums[k]})
                for j++; j < k && nums[j-1] == nums[j]; j++ {} //skip repeated number
                for k--; k > j && nums[k] == nums[k+1]; k-- {} //skip repeated number
            }
        }
        for i < n -2 && nums[i] == nums[i+1] { //skip repeated number
            i += 1
        }
    }
    return res
}
```

## 03 [16. 最近的三数之和](https://leetcode.cn/problems/3sum-closest/description/)

```
func threeSumClosest(nums []int, target int) int {
    sort.Ints(nums)

    var n int = len(nums)
    var res = 0
    var minAbs int = 0x0FFFF //学习灵神的最大值
    for i := 0 ; i < n - 2 ; i++ {
        // if nums[i] + nums[n-2] + nums[n-1] - target < 0 { //optimize 1
        //     continue
        // }
        // if nums[i] + nums[i+1] + nums[i+2] > 0 { //optimize 2
        //     break
        // }
        var x int = nums[i]
        var j int = i + 1
        var k int = n - 1
        for j < k {
            var sum = x + nums[j] + nums[k] 
            var diff = sum - target
            var abs = diff

            if diff <= 0 {
                abs = -diff
                j++
                // for j++; j < k && nums[j-1] == nums[j]; j++ {} //skip repeated number
            } else {
                k--
                // for k--; k > j && nums[k] == nums[k+1]; k-- {} //skip repeated number
            }
            if abs < minAbs {
                res = sum
                minAbs = abs
            }
        }
        // for i < n -2 && nums[i] == nums[i+1] { //skip repeated number
        //     i += 1
        // }
    }
    return res
}
```

## 05 [2824. Count Pairs Whose Sum is Less than Target](https://leetcode.cn/problems/count-pairs-whose-sum-is-less-than-target/)

### 可以暴力，暴力反而是最快的😅

```
func countPairs(nums []int, target int) int {
    var cnt int = 0
    for i := 0; i < len(nums) - 1; i++ {
        for j := i+1; j < len(nums); j++ {
            if nums[i] + nums[j] < target {
                cnt += 1
            }
        }
    }
    return cnt
}
```

### 双向双指针

```
func countPairs(nums []int, target int) int {
    sort.Ints(nums)

    var cnt int = 0
    for i := 0; i < len(nums) - 1; i++ {
        // if i > 0 && nums[i-1] == nums[i] {
        //     continue
        // }

        var k int = len(nums) - 1
        for i < k {
            if nums[i] + nums[k] >= target {
                k--
            } else {
                cnt += k -i
                break
            }
        }
    }
    return cnt
}
```



# 06 [611. Valid Triangle Number](https://leetcode.cn/problems/valid-triangle-number/)

主要的思想也没有比暴力好多少

```
func triangleNumber(nums []int) int {
    sort.Ints(nums)

    cnt := 0
    for i := 0; i < len(nums) - 2; i++ {
        if nums[i] == 0 {
            continue
        }

        x := nums[i]
        for j := i+1; j < len(nums) - 1; j++ {
            var k int = len(nums) - 1
            for j < k {
                if x + nums[j] <= nums[k] {
                    k--
                } else {
                    cnt += k-j
                    break
                }
            }
        }
    }
    return cnt
}
```



## 双指针02，前缀和的思想

### 01 [11. Container With Most Water](https://leetcode.cn/problems/container-with-most-water/)

```
func maxArea(height []int) int {
    res := 0
    left := 0
    right := len(height) - 1
    for left < right {
        curAmount := 0
        if height[left] <= height[right] {
            curAmount = height[left] * (right-left)
            left++
        } else {
            curAmount = height[right] * (right-left)
            right--
        }
        if res < curAmount {
            res = curAmount
        }
    }
    return res
}
```

## 02 [42. Trapping Rain Water](https://leetcode.cn/problems/trapping-rain-water/)

```
func trap(height []int) int {
    res := 0
    left := 0
    right := len(height) - 1
    preMax := 0
    sufMax := 0
    for left < right {
        if height[left] > preMax { //更新preMax
            preMax = height[left]
        }
        if height[right] > sufMax { //更新sufMax
            sufMax = height[right]
        }

        if preMax <= sufMax {
            res = res + preMax - height[left]
            left++
        } else {
            res = res + sufMax - height[right]
            right--
        }
    }
    return res
}
```

