---
sidebar_position: 17
tags: [leetcode]
---

# 二叉树与递归，相似平衡 Binary Tree and Recursion v2

## 100. 相同的树 / Same Tree

[LeetCode 中文站](https://leetcode.cn/problems/same-tree/) · [LeetCode 国际站](https://leetcode.com/problems/same-tree/)

**简要题意：** 两棵二叉树的结构完全相同，且对应结点的值相等时称为相同的树。判断给定的 p、q 是否相同。

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if p == None or q == None:
            return p == q
        return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

## 101. 对称二叉树 / Symmetric Tree

[LeetCode 中文站](https://leetcode.cn/problems/symmetric-tree/) · [LeetCode 国际站](https://leetcode.com/problems/symmetric-tree/)

**简要题意：** 判断二叉树是否关于根节点左右镜像对称，结构和对应节点值都必须匹配。

理解递归的关键：把“整棵树是否对称”转化为“左右两棵子树是否互为镜像”，再比较外侧与内侧的子树。

![image-20240525172101822](./240309-08-binary-tree-and-recursion-v2.assets/image-20240525172101822.png)

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if p == None or q == None:
            return p == q
        return p.val == q.val and self.isSameTree(p.left, q.right) and self.isSameTree(p.right, q.left)

    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        return self.isSameTree(root.left, root.right)
```

## 110. 平衡二叉树 / Balanced Binary Tree

[LeetCode 中文站](https://leetcode.cn/problems/balanced-binary-tree/) · [LeetCode 国际站](https://leetcode.com/problems/balanced-binary-tree/)

**简要题意：** 判断二叉树是否平衡：每个节点的左右子树高度差都不超过 1。

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def getHeight(p):
            if p == None: 
                return 0
            leftHeight =  getHeight(p.left)
            if leftHeight == -1: 
                return -1
            rightHeight = getHeight(p.right)
            if rightHeight == -1: 
                return -1
            if abs(leftHeight - rightHeight) > 1: 
                return -1
            return max(leftHeight, rightHeight) + 1
        return getHeight(root) != -1
```

## 199. 二叉树的右视图 / Binary Tree Right Side View

[LeetCode 中文站](https://leetcode.cn/problems/binary-tree-right-side-view/) · [LeetCode 国际站](https://leetcode.com/problems/binary-tree-right-side-view/)

**简要题意：** 从右侧观察二叉树，返回从上到下每层最右边可见节点的值。

![image-20240525173509990](./240309-08-binary-tree-and-recursion-v2.assets/image-20240525173509990.png)

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        ans = []
        def dfs(p, depth):
            if p == None: return
            if len(ans) == depth:
                ans.append(p.val)
            dfs(p.right, depth+1)
            dfs(p.left, depth+1)
        dfs(root, 0)
        return ans
```

## 参考资料

1. [二叉树与递归 - 深入理解](https://www.bilibili.com/video/BV1UD4y1Y769/)
2. [如何灵活运用递归？基础算法精讲 10](https://www.bilibili.com/video/BV18M411z7bb/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70)
