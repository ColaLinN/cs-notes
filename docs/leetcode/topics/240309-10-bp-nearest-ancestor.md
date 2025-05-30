---
sidebar_position: 19
tags: [leetcode]
---

# 二叉树与递归，最近祖先 Binary Tree and Recursion, Nearest Ancestor of Binary Tree

## [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

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

## [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)

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

## Reference

1. [二叉树与递归 - 最近公共祖先](https://www.bilibili.com/video/BV1W44y1Z7AR/)
