---
sidebar_position: 21
title: Backtrace Subset
tags: [leetcode]
---

## Idea

1. 本质上是看选不选某个元素，是一个增量构造答案的过程，这个过程适合用递归解决。
2. 回溯三问
   1. 当前操作？当前的 `i` 元素要不要跳过
   2. 子问题？从下标 `>=i` 的数字中构造子集
   3. 下一个子问题？从下标 `>=i+1` 的数字中构造子集
3. 举例
   1. 构造长为n的字符串
   2. 枚举一个字母
   3. 构造长为 `n-1` 的字符串
4. 两个视角（不是很清楚为什么两个视角不同，其实在我看来都差不多）
   1. 输入的视角
   2. 答案视角

## [78. Subsets](https://leetcode.cn/problems/subsets/)

### Sample

```
Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

### 输入的视角

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if n == 0: # 为空直接返回
            return []
        
        ans = [] # 答案列表
        path = [] # 回溯遍历的路径

        # (1) 这是从输入的角度考虑，（选或不选）。
        # 遍历一颗满二叉树（即每一层的元素都是满的，所以遍历的时间复杂度实际上是2^n）
        def dfs(i): # 深度遍历
            if i == n: # 边界条件。当遍历到叶子节点后生成答案
                ans.append(path.copy()) # 这边使用copy()避免path地址引用改变已生成的结果，这边的copy其实也花了时间
                # ans.append(''.join(path)) # 这是把string类型的数组内容join起来
                return

            dfs(i+1) # 跳过当前数字

            path.append(nums[i]) # 添加到路径中
            dfs(i+1) # 这回是把当前数字放到path里
            path.pop() # 恢复现场，lol
        dfs(0) # 从零开始
        return ans
```

### 答案的角度

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # (2) 这是从答案的角度来考虑的（选哪个数）。每个叶子节点都是答案
        # 我们可以每层都递归数组的所有元素，但要注意下一个数的下标应当大于当前数的下标。
        # 比如之前添加过子数组[1,2]，接下来不应该加[2,1]了
        # 也就是说递归思路如下
        # - 当前元素？应该选择 j >= i 的j元素
        # - 子问题？从下标 >=i 的数组中构造子集
        # - 下一个子问题？从下标 >= i+1 的数组中构造子集
        def dfs(i): # 深度遍历
            ans.append(path.copy()) # 这边使用copy()避免path地址引用改变已生成的结果，这边的copy其实也花了时间
            if i == n: # 边界条件。当遍历到叶子节点后生成答案
                # ans.append(''.join(path)) # 这是把string类型的数组内容join起来
                return

            for j in range(i, n): # 枚举选中的数字
                path.append(nums[j]) # 添加到路径中
                dfsV2(j+1) # 这回是把当前数字放到path里
                path.pop() # 恢复现场，lol
        dfs(0) # 从零开始
        return ans
```

## Reference

1. [子集型回溯，分割回文串](https://www.bilibili.com/video/BV1mG4y1A7Gu/?spm_id_from=333.788&vd_source=66a0b89065d7f04805223fd7f2d613a6)
