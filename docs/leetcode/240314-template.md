---
sidebar_position: 1
title: Algorithmn Template
tags: [leetcode]
---

# Algorithmn Template

双指针

1. 相向双指针
2. 同向双指针

二分查找

链表

1. 反转
2. 快慢
3. 删除

二叉树

1. 深度遍历
2. 广度遍历
3. 前中后序遍历
4. 层序遍历

回溯

1. 子集型
1. 组合型
1. 排列型

动态规划

1. Core
2. 01 backup
3. Linear
4. state machine
5. Tree-based
6. etc

数据结构



## 双指针

### 1 双向双指针

经典题目有

1. 目标数
2. 三个目标数
3. 小于某个数的连续子集
4. 接雨水 Waterfall
   1. 也是一种前缀集的题

```
def findTarget(nums, target):
	
```

### 2 同向双指针

## 回溯

### 1 子集型（选或不选）

讲解：

1. 本质上是看选不选某个元素，是一个增量构造答案的过程，这个过程适合用递归解决。
2. 举例
   1. 构造长为n的字符串
   2. 枚举一个字母
   3. 构造长为n-1的字符串
3. 回溯三问：
   1. 当前操作？当前的`i`元素要不要跳过
   2. 子问题？从下标`>=i`的数字中构造子集
   3. 下一个子问题？从下标`>=i+1`的数字中构造子集
4. 两个视角（不是很清楚为什么两个视角不同，其实在我看来都差不多）
   1. 输入的视角
   2. 答案视角



经典例题

1. [78. Subsets](https://leetcode.cn/problems/subsets/)

```
Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

Rug

python

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
        
        # (2) 这是从答案的角度来考虑的（选哪个数）。每个叶子节点都是答案
        # 我们可以每层都递归数组的所有元素，但要注意下一个数的下标应当大于当前数的下标。
        # 比如之前添加过子数组[1,2]，接下来不应该加[2,1]了
        # 也就是说递归思路如下
        # - 当前元素？应该选择 j >= i 的j元素
        # - 子问题？从下标 >=i 的数组中构造子集
        # - 下一个子问题？从下标 >= i+1 的数组中构造子集
        def dfsV2(i): # 深度遍历
            ans.append(path.copy()) # 这边使用copy()避免path地址引用改变已生成的结果，这边的copy其实也花了时间
            if i == n: # 边界条件。当遍历到叶子节点后生成答案
                # ans.append(''.join(path)) # 这是把string类型的数组内容join起来
                return

            for j in range(i, n): # 枚举选中的数字
                path.append(nums[j]) # 添加到路径中
                dfsV2(j+1) # 这回是把当前数字放到path里
                path.pop() # 恢复现场，lol
        dfsV2(0) # 从零开始
        return ans

```

### 2 组合型与剪枝（选哪个）

### 3 排列型

## 线性DP

### 最长公共子序列

【最长公共子序列 编辑距离】 https://www.bilibili.com/video/BV1TM4y1o7ug/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

术语

1. 子数组、子串：subarray/substring，一般是连续的
2. 子序列：subsequence，是不连续的

启发思路：

1. 两个字符串的每个字母对，本质上也是选或不选。

考虑字符串S1和S2的最后一对字母X与Y，有

1. 选X和Y
2. 选X，不选Y
3. 不选X，选Y
4. 不选X，不选Y

则最长公共子序列有两种情况，对于s1[i]=X和s2[j]=Y

1. 如果X=Y
   1. dfs(i, j) = max(dfs(i-1, j), dfs(i, j-1), dfs(i-1, j-1)+1)
   2. 对于dfs(i, j)，如果X=Y。那么dfs(i-1, j-1)的长度一定>=max(dfs(i-1, j), dfs(i, j-1))，所以我们在X=Y的情况下可以忽略dfs(i-1, j), dfs(i, j-1)，所以有：
   3. dfs(i, j) = dfs(i-1, j-1)+1
2. 如果X≠Y
   1. dfs(i, j) = max(dfs(i-1, j), dfs(i, j-1), dfs(i-1, j-1))
   2. 对于X≠Y，dfs(i-1, j)不考虑j的情况就变成了dfs(i-1, j-1)。dfs(i, j-1)不考虑i的情况也变成了dfs(i-1, j-1)。dfs(i-1, j-1)是被max(dfs(i-1, j), dfs(i, j-1))包含在内的，所以有：
   3. dfs(i, j) = max(dfs(i-1, j), dfs(i, j-1))

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n = len(text1)
        m = len(text2)
        dp = [[0 for j in range(m+1)] for i in range(n+1)]

        for i in range(1, n+1, 1):
            for j in range(1, m+1, 1):
                if text1[i-1] == text2[j-1]:
                  	# note, here dp[i-1][j-1] should plus 1 because we count current `text1[i-1] == text2[j-1]`
                    dp[i][j] = max(dp[i-1][j-1] + 1, dp[i-1][j], dp[i][j-1])
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        print(dp)
        return dp[n][m]
```

### 最长递增子序列

【最长递增子序列【基础算法精讲 20】】 https://www.bilibili.com/video/BV1ub411Q7sB/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

动态规划做法：

1. 递归：`dfs[j] = max(nums[i]) + 1`
   1. 子问题：结尾为nums[j]的最长递增子序列长度是？
   2. 当前操作：往前`[0, j)`枚举小于nums[j]的nums[i]
   3. 下一个子问题：结尾为nums[i]的最长递增子序列长度是？
2. 时间复杂度`O(n^2)`，空间复杂度`O(n)`

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        @cache
        def dfs(j):
            res = 0
            for i in range(j):
                if nums[i] < nums[j]:
                    res = max(res, dfs(i))
            return res + 1
        return max(dfs(i) for i in range(len(nums)))
```

数组版记忆化搜索

- 时间复杂度`O(n^2)`，空间复杂度`O(n)`

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        cache = [-inf] * len(nums)
        # @cache
        def dfs(j):
            if cache[j] >= 0: return cache[j]
            res = 0
            for i in range(j):
                if nums[i] < nums[j]:
                    res = max(res, dfs(i))
            cache[j] = res + 1
            return cache[j]
        return max(dfs(i) for i in range(len(nums)))
```

递归改递推：`f[j] = max(f[i]) + 1`

- 时间复杂度`O(n^2)`，空间复杂度`O(n)`

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        f = [0] * len(nums)
        for j in range(len(nums)):
            for i in range(j):
                if nums[i] < nums[j]:
                    f[j] = max(f[i], f[j]) 
            f[j] += 1
        return max(f)
```

进一步优化时间复杂度，引入新概念：g数组

1. g数组的长度代表当前最长递增子序列长度
   1. 更新算法
      1. 如果找到g数组中第一个大于nums[i]的元素g[k]，将g[k]更新为nums[i]
      2. 如果g数组中没有大于nums[i]的元素，则把nums[i]加到g数组的后面
   2. 可以反证、归纳证明g一定是严格递增的
      1. 假设`j-1 <= j`有`g[j-1] == g[j]`，但是根据我们的更新算法，对于`i <= j`, g[i]一定小于g[j]，与`g[j-1] == g[j]`矛盾
2. 时间复杂度`O(nlongn)`, 即数组长度n乘以每次二分查找的logn
3. 空间复杂度`O(n)`

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        g = []
        for i in range(len(nums)):
            k = bisect_left(g, nums[i])
            if k == len(g):
                g.append(nums[i])
            else:
                g[k] = nums[i]
        return len(g)
```

进一步优化空间复杂度为O(1)

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        ng = 0
        for i in range(len(nums)):
            k = bisect_left(nums, nums[i], 0, ng)
            if k == ng:
                nums[k] = nums[i]
                ng += 1
            else:
                nums[k] = nums[i]
        return ng
```

## 区间DP



## 状态压缩DP

