---
sidebar_position: 18
title: Binary Tree Front, Middle, and Post Order Traversal
tags: [leetcode]
---



## Traversal

1.   Front Order Traversal: `root, left, right`
2.   Middle Order Traversal: `left, root, right`
3.   Post Order Traversal: `left, right, root`

## Traversal Recursion Template

```python
res = []
def dfs(node):
  	if node == None: return None
    if node.left: dfs(node.left)
    res.append(node.val)
    if node.right: dfs(node.right)
   	return None
```

## Traversal Iteration Template

在递归方法的函数调用栈中，

模版，下面代码为中序遍历，在 root 节点上压入 null 节点来辨别 root 节点。

```python
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode*> st;
        if (root != NULL) st.push(root);
        while (!st.empty()) {
            TreeNode* node = st.top();
            if (node != NULL) {
                st.pop(); // 将该节点弹出，避免重复操作，下面再将右中左节点添加到栈中
                if (node->right) st.push(node->right);  // 添加右节点（空节点不入栈）

              	// =======  只要改变这两行“push root 节点”的代码，就可以实现 Front Order Traversal 和 Post Order Traversal
                st.push(node);                          // 添加中节点
                st.push(NULL); // 中节点访问过，但是还没有处理，加入空节点做为标记。

                if (node->left) st.push(node->left);    // 添加左节点（空节点不入栈）
            } else { // 只有遇到空节点的时候，才将下一个节点放进结果集
                st.pop();           // 将空节点弹出
                node = st.top();    // 重新取出栈中元素
                st.pop();
                result.push_back(node->val); // 加入到结果集
            }
        }
        return result;
    }
};
```



## [98. Validate Binary Search Tree](https://leetcode.cn/problems/validate-binary-search-tree/)

### My Original Recursion Solution

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def isBST(root, low, high):
            if root == None: return True
            if root.val >= high or root.val <= low: return False
            isLeftValid = isBST(root.left, low, root.val)
            isRightValid = isBST(root.right, root.val, high)
            return isLeftValid and isRightValid
        return isBST(root, float("-inf"), float("inf"))
```

### Front Order Traversal

由于是前序，只能把范围往下传

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode], left=-inf, right=inf) -> bool:
        if root == None:
            return True
        return left < root.val < right and self.isValidBST(root.left, left, root.val) and self.isValidBST(root.right, root.val, right)
```

### Middle Order Traversal

中序则可以看成是遍历递增数组，当前值必须小于前一个值

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    minValue = -inf
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        if root == None:
            return True
        if self.isValidBST(root.left) == False:
            return False
        if self.minValue >= root.val: 
            return False
        self.minValue = root.val
        if self.isValidBST(root.right) == False:
            return False
        return True

```

### Post Order Traversal

后序则需要把范围往上传来判断root是否合法

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # 后序遍历
        def check(p):
            if p == None:
                return inf, -inf #保证后序遍历中和root节点的值判断不会出错
            lmin, lmax = check(p.left)
            rmin, rmax = check(p.right)
            if not (lmax < p.val < rmin):
                return -inf, inf
            return min(lmin, p.val), max(rmax, p.val)
        return check(root)[1] != inf

```

## Reference

1. [二叉树：前中后序迭代方式统一写法](https://zhuanlan.zhihu.com/p/260497281)
2. 
