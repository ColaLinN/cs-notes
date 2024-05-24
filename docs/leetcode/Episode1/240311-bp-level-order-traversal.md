---
sidebar_position: 20
title: Binary Tree Level Order Traversal
tags: [leetcode]
---



[102. Binary Tree Level Order Traversal](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # queue = deque()
        # queue.append(root)
        queue = [root]
        res = []
        while len(queue) > 0:
            tmp = []
            nxt = []
            for i in range(len(queue)):
                cur = queue[i]
                if cur != None:
                    tmp.append(cur.val)
                    nxt.append(cur.left)
                    nxt.append(cur.right)
            if len(tmp) > 0:
                res.append(tmp)
            queue = nxt
        return res
```



