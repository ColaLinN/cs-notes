---
sidebar_position: 21
tags: [leetcode]
---

# 回溯之子集 Backtrace-Subset

## 思路

回溯三问
1. 子问题？
2. 当前操作？
3. 下一个子问题？

## 模板：78. 子集 / Subsets

[LeetCode 中文站](https://leetcode.cn/problems/subsets/) · [LeetCode 国际站](https://leetcode.com/problems/subsets/)

**简要题意：** nums 中元素互不相同，返回它的所有子集，包含空集和全集。子集顺序及子集内元素顺序不限。

### 示例

```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

### 模板一：从输入出发

![image-20240525203203182](./240315-backtrace-subset.assets/image-20240525203203182.png)

从输入的角度思考：对于当前元素，选择还是不选择？

- 选择当前元素

  ```python
  path.append(nums[i]) # append current number to path
  dfs(i+1)
  path.pop() # recover path
  ```

- 不选择当前元素

  ```python
  dfs(i+1) # skip current number
  ```


时间复杂度：搜索树有 O(2ⁿ) 个叶子；每份结果需要复制路径，总计 O(n·2ⁿ)。（原文的 O(n²) 标注有误。）

额外空间复杂度：`O(n)`，不计输出答案。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if n == 0:
            return []
        
        ans = []
        path = [] # 遍历的路径

        def dfs(i):
            if i == n: # 边界条件。当遍历到叶子节点后生成答案
                ans.append(path.copy()) # 这边使用copy()避免path地址引用改变已生成的结果，这边的copy其实也花了时间
                # ans.append(''.join(path)) # 这是把string类型的数组内容join起来
                return

            dfs(i+1) # 跳过当前数字

            path.append(nums[i]) # 添加到路径中
            dfs(i+1)
            path.pop() # 恢复现场
        dfs(0)
        return ans
```

### 模板二：从答案出发

从答案的角度思考：下一个要选择哪个元素？

- 搜索树上的每个结点都对应一个合法子集。

- 每一层枚举当前位置之后的所有候选元素。

算法步骤

1. 子问题？从下标 `>=i` 的数组中构造子集
2. 当前元素？应该选择满足 `j >= i` 的 `j` 元素加入路径
3. 下一个子问题？从下标 `>= j+1` 的数组中构造子集

![image-20240525201910106](./240315-backtrace-subset.assets/image-20240525201910106.png)

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if n == 0:
            return []
        
        ans = []
        path = [] # 遍历的路径

        def dfs(i):
            ans.append(path.copy()) # 使用copy()避免 path 地址引用改变已生成的结果，这边的copy其实也花了时间
            # ans.append(''.join(path)) # 这是把string类型的数组内容join起来
            if i == n: # 边界条件，返回
                return

            for j in range(i, n):
                path.append(nums[j]) # 添加到路径中
                dfs(j+1) 
                path.pop() # 恢复现场
        dfs(0) # 从零开始
        return ans
```

## 参考资料

1. [子集型回溯，分割回文串](https://www.bilibili.com/video/BV1mG4y1A7Gu/?spm_id_from=333.788&vd_source=66a0b89065d7f04805223fd7f2d613a6)
