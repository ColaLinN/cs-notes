---
sidebar_position: 19
tags: [leetcode]
---

# 二叉树与递归，最近祖先 Binary Tree and Recursion, Nearest Ancestor of Binary Tree

## 236. 二叉树的最近公共祖先 / Lowest Common Ancestor of a Binary Tree

[LeetCode 中文站](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/) · [LeetCode 国际站](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

**简要题意：** 给定二叉树及其中两个节点，返回同时拥有这两个后代的最深节点；节点可以是自己的后代。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if root == p or root == q or root == None:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left == None:
            if right == None:
                return None
            else:
                return right
        else:
            if right == None:
                return left
            else:
                return root
```

## 235. 二叉搜索树的最近公共祖先 / Lowest Common Ancestor of a Binary Search Tree

[LeetCode 中文站](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/) · [LeetCode 国际站](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

**简要题意：** 给定二叉搜索树及其中两个节点，返回同时拥有这两个后代的最深节点；节点可以是自己的后代。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if root == None or root == p or root == q:
            return root
        minV, maxV = min(p.val, q.val), max(p.val, q.val)
        if minV < root.val < maxV:
            return root
        if root.val < minV:
            return self.lowestCommonAncestor(root.right, p, q)
        return self.lowestCommonAncestor(root.left, p, q)
```

## 参考资料

1. [二叉树与递归 - 最近公共祖先](https://www.bilibili.com/video/BV1W44y1Z7AR/)
