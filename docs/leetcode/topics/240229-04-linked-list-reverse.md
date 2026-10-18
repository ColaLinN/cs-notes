---
sidebar_position: 13
tags: [leetcode]
---

# 反转链表系列 Linked List Reverse Series

## 思路

### 反转链表

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # dummy = ListNode(0, head)
        cur = head
        prev = None
        while cur:
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        return prev
```

![image-20240525152652093](./240229-04-linked-list-reverse.assets/image-20240525152652093.png)

### 每 K 个结点一组反转链表

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        pre = dummy
        cur = head
        
        # 1. Calc the length of linked list
        n = 0
        while cur:
            cur = cur.next
            n += 1
        
        cur = head
        for i in range(n//k):
            # init the p0
            p0 = pre
            for j in range(k):
                nxt = cur.next
                cur.next = pre
                pre = cur
                cur = nxt
            # After reversing, `cur` is point to next start point, 
            # `pre` is the original previous node of `cur``

            # connect the end of reversing linked list to the start point of next list
            p0.next.next = cur

            # cache the end of reversing linked list
            nxtP0 = p0.next

            # connecting the start of reversing linked list to the previous list
            p0.next = pre
            pre = nxtP0
        return dummy.next
```

![image-20240525162951593](./240229-04-linked-list-reverse.assets/image-20240525162951593.png)

## 206. 反转链表 / Reverse Linked List

[LeetCode 中文站](https://leetcode.cn/problems/reverse-linked-list/) · [LeetCode 国际站](https://leetcode.com/problems/reverse-linked-list/)

**简要题意：** 反转单链表中所有节点的连接方向，返回反转后的头节点；空链表返回空。

`prev` 与 `pre` 都表示前一个结点。

`next` 与 `nxt` 都表示下一个结点。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # dummy = ListNode(0, head)
        cur = head
        prev = None
        while cur:
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        return prev
```

## 92. 反转链表 II / Reverse Linked List II

[LeetCode 中文站](https://leetcode.cn/problems/reverse-linked-list-ii/) · [LeetCode 国际站](https://leetcode.com/problems/reverse-linked-list-ii/)

**简要题意：** 反转单链表中从第 left 到第 right 个节点的部分，下标从 1 开始，其余节点保持不变。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        cur = head
        pre = dummy
        for i in range(left-1):
            pre = cur
            cur = cur.next

        p0 = pre # p0 is the node before the reversed starting node
        # leftNext = cur # p0.next
        for i in range(right-left+1):
            nxt = cur.next
            cur.next = pre 
            pre = cur
            cur = nxt
        p0.next.next = cur
        p0.next = pre
        return dummy.next
```

## 25. K 个一组翻转链表 / Reverse Nodes in k-Group

[LeetCode 中文站](https://leetcode.cn/problems/reverse-nodes-in-k-group/) · [LeetCode 国际站](https://leetcode.com/problems/reverse-nodes-in-k-group/)

**简要题意：** 每 k 个节点为一组反转链表，最后不足 k 个的部分保持原样，不能只交换节点值。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        pre = dummy
        cur = head
        
        # 1. Calc the length of linked list
        n = 0
        while cur:
            cur = cur.next
            n += 1
        
        cur = head
        for i in range(n//k):
            # init the p0
            p0 = pre
            for j in range(k):
                nxt = cur.next
                cur.next = pre
                pre = cur
                cur = nxt
            # After reversing, `cur` is point to next start point, 
            # `pre` is the original previous node of `cur``

            # connect the end of reversing linked list to the start point of next list
            p0.next.next = cur

            # cache the end of reversing linked list
            nxtP0 = p0.next

            # connecting the start of reversing linked list to the previous list
            p0.next = pre
            pre = nxtP0
        return dummy.next
```

## 24. 两两交换链表中的节点 / Swap Nodes in Pairs

[LeetCode 中文站](https://leetcode.cn/problems/swap-nodes-in-pairs/) · [LeetCode 国际站](https://leetcode.com/problems/swap-nodes-in-pairs/)

**简要题意：** 两两交换链表中相邻节点，若最后剩一个节点则保持原样，不能只交换节点值。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        pre = dummy
        cur = head
        while cur:
            p0 = pre
            for i in range(2):
                if cur == None:
                    break
                next = cur.next
                cur.next = pre
                
                pre = cur
                cur = next
            p0.next.next = cur
            preTmp = p0.next
            p0.next = pre
            pre = preTmp
        return dummy.next
```

## 2816. 翻倍以链表形式表示的数字 / Double a Number Represented as a Linked List

[LeetCode 中文站](https://leetcode.cn/problems/double-a-number-represented-as-a-linked-list/) · [LeetCode 国际站](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/)

**简要题意：** 非负整数以高位在前的链表表示，将其乘以 2，并用相同形式返回结果。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def doubleIt(self, head: Optional[ListNode]) -> Optional[ListNode]:
        def reverseList(head):
            cur = head
            pre = None
            while cur:
                next = cur.next
                cur.next = pre
                pre = cur
                cur = next
            return pre 
        def addTwoLists(headA, headB):
            curA = headA
            curB = headB
            quotient = 0
            while curA and curB:
                curSum = curA.val + curB.val + quotient
                quotient = curSum // 10
                remain = curSum - quotient*10
                curA.val = remain
                if curA.next == None:
                    if quotient != 0:
                        curA.next = ListNode(quotient)
                    break
                curA = curA.next
                curB = curB.next
            return headA
        rHead = reverseList(head)
        dHead = addTwoLists(rHead, rHead)
        return reverseList(dHead)
```

## 445. 两数相加 II / Add Two Numbers II

[LeetCode 中文站](https://leetcode.cn/problems/add-two-numbers-ii/) · [LeetCode 国际站](https://leetcode.com/problems/add-two-numbers-ii/)

**简要题意：** 两个非负整数按高位在前存入链表，返回它们的和，结果也用高位在前的链表表示。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def reverseList(head):
            cur = head
            pre = None
            while cur:
                next = cur.next
                cur.next = pre
                pre = cur
                cur = next
            return pre 
        def addTwoLists(headA, headB):
            curA = headA
            curB = headB
            quotient = 0
            while curA and curB:
                curSum = curA.val + curB.val + quotient
                quotient = curSum // 10
                remain = curSum - quotient*10
                curA.val = remain
                if curA.next == None:
                    if curB.next != None:
                        curA.next = ListNode(0)
                    elif quotient != 0:
                        curA.next = ListNode(quotient)
                        break
                elif curB.next == None:
                    curB.next = ListNode(0)
                curA = curA.next
                curB = curB.next
            return headA
        rl1 = reverseList(l1)
        rl2 = reverseList(l2)
        al1 = addTwoLists(rl1, rl2)
        ral1 = reverseList(al1)
        return ral1
```

## 2. 两数相加 / Add Two Numbers

[LeetCode 中文站](https://leetcode.cn/problems/add-two-numbers/) · [LeetCode 国际站](https://leetcode.com/problems/add-two-numbers/)

**简要题意：** 两个非负整数按低位在前存入链表，逐位相加，返回同样以低位在前表示结果的新链表。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def reverseList(head):
            cur = head
            pre = None
            while cur:
                next = cur.next
                cur.next = pre
                pre = cur
                cur = next
            return pre 
        def addTwoLists(headA, headB):
            curA = headA
            curB = headB
            quotient = 0
            while curA and curB:
                curSum = curA.val + curB.val + quotient
                quotient = curSum // 10
                remain = curSum - quotient*10
                curA.val = remain
                if curA.next == None:
                    if curB.next != None:
                        curA.next = ListNode(0)
                    elif quotient != 0:
                        curA.next = ListNode(quotient)
                        break
                elif curB.next == None:
                    curB.next = ListNode(0)
                curA = curA.next
                curB = curB.next
            return headA
        al1 = addTwoLists(l1, l2)
        return al1
```

题面语句释义

1. `k` 是不大于链表长度的正整数。若结点总数不是 `k` 的倍数，末尾不足 `k` 个结点的部分应保持原来的顺序。
   1. “结点数量不是 `k` 的倍数”意味着末尾会剩下一组不足 `k` 个的结点。
   2. “保持原样”意味着这部分不进行反转。

## 参考资料

1. [灵神视频，反转链表](https://www.bilibili.com/video/BV1sd4y1x7KN/?spm_id_from=333.788&vd_source=66a0b89065d7f04805223fd7f2d613a6)