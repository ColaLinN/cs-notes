---
sidebar_position: 14
title: Linked List Fast Slow Series
tags: [leetcode]
---

灵神视频 https://www.bilibili.com/video/BV1KG4y1G7cu/?vd_source=66a0b89065d7f04805223fd7f2d613a6



## [876. Middle of the Linked List](https://leetcode.cn/problems/middle-of-the-linked-list/)

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = head
        fast = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
        return slow
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func middleNode(head *ListNode) *ListNode {
    slow := head
    fast := head
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    return slow
}
```

## [141. Linked List Cycle](https://leetcode.cn/problems/linked-list-cycle/)

```
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func hasCycle(head *ListNode) bool {
    slow := head
    fast := head
    for fast != nil && fast.Next != nil {
        fast =  fast.Next.Next
        slow = slow.Next
        if slow == fast {
            return true
        }
    }
    return false
}
```

## [142. Linked List Cycle II](https://leetcode.cn/problems/linked-list-cycle-ii/) Find the entry point of Cycle

问题

1. 如何检查有环？
2. 如何找到环的入口？

### 如何检查有环？

用快慢指针，因为快指针和慢指针的相对速度是 1，如果有环，则快慢指针必定在环内相遇。

### 如何找到环的入口？

- 如果检查有环且慢指针

### Python

```python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        fast = head
        slow = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                while head != slow:
                    slow = slow.next
                    head = head.next
                return head
        return None
```

### Go

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func detectCycle(head *ListNode) *ListNode {
    slow := head
    fast := head
    for fast != nil && fast.Next != nil {
        fast =  fast.Next.Next
        slow = slow.Next
        if slow == fast {
            for head != nil && slow != nil {
                if slow == head {
                    return head
                }
                slow = slow.Next
                head = head.Next
            }
            return nil
        }
    }
    return nil
}
```



