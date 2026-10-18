---
sidebar_position: 1
tags: [leetcode, python]
---

# Python 数据结构精简实现 Python Data Structures

以当前题集为范围，优先使用 Python 标准库；需要理解内部状态的数据结构，再给出可以直接运行的精简实现。每段代码独立使用，包含所需导入。自定义节点类型用于本地练习，LeetCode 已提供同名类型时使用平台定义。

## 如何选择

| 需要做什么 | 首选结构 | 代表题目 |
| --- | --- | --- |
| 按下标访问、原地修改、保存 DP 状态 | `list` | 48. 旋转图像 / Rotate Image<br/>[leetcode.cn](https://leetcode.cn/problems/rotate-image/) / [leetcode.com](https://leetcode.com/problems/rotate-image/)<br/>300. 最长递增子序列 / Longest Increasing Subsequence<br/>[leetcode.cn](https://leetcode.cn/problems/longest-increasing-subsequence/) / [leetcode.com](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 查找、去重、计数、分组 | `dict`、`set`、`Counter`、`defaultdict` | 1. 两数之和 / Two Sum<br/>[leetcode.cn](https://leetcode.cn/problems/two-sum/) / [leetcode.com](https://leetcode.com/problems/two-sum/)<br/>49. 字母异位词分组 / Group Anagrams<br/>[leetcode.cn](https://leetcode.cn/problems/group-anagrams/) / [leetcode.com](https://leetcode.com/problems/group-anagrams/) |
| 后进先出、维护嵌套状态 | `list` 栈 | 20. 有效的括号 / Valid Parentheses<br/>[leetcode.cn](https://leetcode.cn/problems/valid-parentheses/) / [leetcode.com](https://leetcode.com/problems/valid-parentheses/)<br/>155. 最小栈 / Min Stack<br/>[leetcode.cn](https://leetcode.cn/problems/min-stack/) / [leetcode.com](https://leetcode.com/problems/min-stack/) |
| 先进先出、层序遍历 | `deque` 队列 | 102. 二叉树的层序遍历 / Binary Tree Level Order Traversal<br/>[leetcode.cn](https://leetcode.cn/problems/binary-tree-level-order-traversal/) / [leetcode.com](https://leetcode.com/problems/binary-tree-level-order-traversal/)<br/>232. 用栈实现队列 / Implement Queue using Stacks<br/>[leetcode.cn](https://leetcode.cn/problems/implement-queue-using-stacks/) / [leetcode.com](https://leetcode.com/problems/implement-queue-using-stacks/) |
| 维护下一个更大值、窗口最值 | 单调栈、单调队列 | 739. 每日温度 / Daily Temperatures<br/>[leetcode.cn](https://leetcode.cn/problems/daily-temperatures/) / [leetcode.com](https://leetcode.com/problems/daily-temperatures/)<br/>239. 滑动窗口最大值 / Sliding Window Maximum<br/>[leetcode.cn](https://leetcode.cn/problems/sliding-window-maximum/) / [leetcode.com](https://leetcode.com/problems/sliding-window-maximum/) |
| 反转、删除、快慢指针 | 单链表 | 206. 反转链表 / Reverse Linked List<br/>[leetcode.cn](https://leetcode.cn/problems/reverse-linked-list/) / [leetcode.com](https://leetcode.com/problems/reverse-linked-list/)<br/>141. 环形链表 / Linked List Cycle<br/>[leetcode.cn](https://leetcode.cn/problems/linked-list-cycle/) / [leetcode.com](https://leetcode.com/problems/linked-list-cycle/) |
| 层级关系、有序查找 | 二叉树、BST | 98. 验证二叉搜索树 / Validate Binary Search Tree<br/>[leetcode.cn](https://leetcode.cn/problems/validate-binary-search-tree/) / [leetcode.com](https://leetcode.com/problems/validate-binary-search-tree/)<br/>700. 二叉搜索树中的搜索 / Search in a Binary Search Tree<br/>[leetcode.cn](https://leetcode.cn/problems/search-in-a-binary-search-tree/) / [leetcode.com](https://leetcode.com/problems/search-in-a-binary-search-tree/) |
| 多个节点之间的连接 | 邻接表、并查集 | 200. 岛屿数量 / Number of Islands<br/>[leetcode.cn](https://leetcode.cn/problems/number-of-islands/) / [leetcode.com](https://leetcode.com/problems/number-of-islands/)<br/>207. 课程表 / Course Schedule<br/>[leetcode.cn](https://leetcode.cn/problems/course-schedule/) / [leetcode.com](https://leetcode.com/problems/course-schedule/)<br/>743. 网络延迟时间 / Network Delay Time<br/>[leetcode.cn](https://leetcode.cn/problems/network-delay-time/) / [leetcode.com](https://leetcode.com/problems/network-delay-time/) |
| 反复取最小值、维护前 k 大 | `heapq` | 215. 数组中的第 K 个最大元素 / Kth Largest Element in an Array<br/>[leetcode.cn](https://leetcode.cn/problems/kth-largest-element-in-an-array/) / [leetcode.com](https://leetcode.com/problems/kth-largest-element-in-an-array/)<br/>1046. 最后一块石头的重量 / Last Stone Weight<br/>[leetcode.cn](https://leetcode.cn/problems/last-stone-weight/) / [leetcode.com](https://leetcode.com/problems/last-stone-weight/) |
| 快速计算连续区间之和 | 前缀和数组 | 303. 区域和检索 / Range Sum Query - Immutable<br/>[leetcode.cn](https://leetcode.cn/problems/range-sum-query-immutable/) / [leetcode.com](https://leetcode.com/problems/range-sum-query-immutable/)<br/>560. 和为 K 的子数组 / Subarray Sum Equals K<br/>[leetcode.cn](https://leetcode.cn/problems/subarray-sum-equals-k/) / [leetcode.com](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 按字符前缀检索 | Trie | 208. 实现 Trie / Implement Trie (Prefix Tree)<br/>[leetcode.cn](https://leetcode.cn/problems/implement-trie-prefix-tree/) / [leetcode.com](https://leetcode.com/problems/implement-trie-prefix-tree/) |
| 限定容量并按最近访问顺序淘汰 | `OrderedDict` | 146. LRU 缓存 / LRU Cache<br/>[leetcode.cn](https://leetcode.cn/problems/lru-cache/) / [leetcode.com](https://leetcode.com/problems/lru-cache/) |

并查集用于补充图专题中的连通分量操作；它不能替代有向图的拓扑排序或最短路径。树状数组、线段树尚未出现在当前练习实现中，这里先不展开。

## 1. 数组与矩阵：list

`list` 是动态数组。下标访问、末尾修改为 O(1)；末尾追加的摊还时间为 O(1)；中间插入、删除和成员查找为 O(n)。切片会复制元素，长度为 k 的切片需要 O(k) 时间和额外空间。

```python
nums = [3, 1, 2]
nums.append(4)
last = nums.pop()
nums.sort()
assert nums == [1, 2, 3]
assert last == 4

# 每行必须独立创建，避免不同位置共享同一个行对象。
m, n = 2, 3
matrix = [[0] * n for _ in range(m)]
matrix[0][0] = 1
assert matrix == [[1, 0, 0], [0, 0, 0]]
```

**边界：** `pop()` 前先确认非空。`b = a` 不复制数组；`a[:]` 只复制外层，二维数组需要逐行复制。不要用 `[[0] * n] * m` 创建需要独立修改的多行矩阵。

## 2. 哈希表、集合与计数

`dict` 和 `set` 的查找、插入、删除平均为 O(1)，不是最坏情况保证。下面的例子使用整数、字符串等常见不可变键；`list` 不能直接作为键。

```python
from collections import Counter, defaultdict

seen = set()
seen.add(3)
seen.discard(9)  # 不存在也不会报错
assert 3 in seen

positions = {value: i for i, value in enumerate([2, 7, 11])}
assert positions[7] == 1

counts = Counter("aab")
assert counts["a"] == 2
assert counts["z"] == 0

groups = defaultdict(list)
for word in ["eat", "tea", "tan"]:
    groups["".join(sorted(word))].append(word)
assert groups["aet"] == ["eat", "tea"]
```

**边界：** 同一个键再次赋值会覆盖旧值。`Counter` 中计数降到 0 的键不会自动删除；用 `len(counts)` 判断不同元素数时，要先清理零计数键。遍历字典时不要直接增删其键。

## 3. 栈与最小栈 Stack / MinStack

普通栈直接用 `list.append()`、`list.pop()`。最小栈为每个元素额外保存“截至当前位置的最小值”，所有操作均为 O(1)，空间 O(n)。

```python
class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        minimum = value if not self.stack else min(value, self.getMin())
        self.stack.append((value, minimum))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]


stack = MinStack()
for value in [3, 1, 1, 2]:
    stack.push(value)
stack.pop()
stack.pop()
assert stack.top() == 1
assert stack.getMin() == 1
```

**边界：** 重复最小值要分别保留。与第 155 题的调用约定一致，`pop`、`top`、`getMin` 只在非空时调用；`pop` 不返回删除的元素。

## 4. 队列与双栈队列 Queue

普通 BFS 队列优先用 `deque`，两端增删为 O(1)。不要用 `list.pop(0)`，它会移动后续元素。

```python
from collections import deque

queue = deque([1, 2])
queue.append(3)
assert queue.popleft() == 1
assert list(queue) == [2, 3]
```

第 232 题要求用栈实现队列，因此维护入栈和出栈两个栈。只有出栈为空时，才把入栈元素逐个倒过去。

```python
class MyQueue:
    def __init__(self):
        self.incoming = []
        self.outgoing = []

    def push(self, value):
        self.incoming.append(value)

    def _move(self):
        if not self.outgoing:
            while self.incoming:
                self.outgoing.append(self.incoming.pop())

    def pop(self):
        self._move()
        return self.outgoing.pop()

    def peek(self):
        self._move()
        return self.outgoing[-1]

    def empty(self):
        return not self.incoming and not self.outgoing


queue = MyQueue()
queue.push(1)
queue.push(2)
assert queue.pop() == 1
queue.push(3)
assert queue.peek() == 2
assert queue.pop() == 2
assert queue.pop() == 3
assert queue.empty()
```

**复杂度与边界：** 每个元素只转移一次，出队、查看队首的摊还时间为 O(1)，单次转移可能为 O(n)，空间 O(n)。`pop`、`peek` 仅在非空时调用。

## 5. 单调栈 Monotonic Stack

存储尚未找到答案的下标。以“右侧第一个严格更大值”为例，新值更大时弹出旧下标，填入距离。

```python
def next_greater_distance(nums):
    answer = [0] * len(nums)
    stack = []
    for i, value in enumerate(nums):
        while stack and nums[stack[-1]] < value:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer


assert next_greater_distance([73, 74, 75, 71, 69, 72, 76, 73]) == [
    1, 1, 4, 2, 1, 1, 0, 0
]
assert next_greater_distance([2, 2, 3]) == [2, 1, 0]
```

**复杂度与边界：** 每个下标入栈、出栈各至多一次，总时间 O(n)，空间 O(n)。这里寻找“严格更大”，所以相等时不弹出；找“更大或相等”时需要调整条件。没有答案时保留 0，空数组返回空数组。

## 6. 单调队列 Monotonic Queue

以固定窗口最大值为例，双端队列保存下标，对应值从队首到队尾严格递减：队首移除过期下标，队尾移除不再可能成为最大值的候选。

```python
from collections import deque


def sliding_max(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError("k 必须在 [1, len(nums)] 内")
    queue = deque()
    answer = []
    for i, value in enumerate(nums):
        while queue and queue[0] <= i - k:
            queue.popleft()
        while queue and nums[queue[-1]] <= value:
            queue.pop()
        queue.append(i)
        if i >= k - 1:
            answer.append(nums[queue[0]])
    return answer


assert sliding_max([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7]
assert sliding_max([2, 2, 2], 2) == [2, 2]
```

**复杂度与边界：** 时间 O(n)，队列最多保存 k 个下标，辅助空间 O(k)，另需保存输出。保留较新的相等值是安全的，因为它更晚过期。原题要求数组非空且窗口合法；这里对非法窗口显式抛出异常。

## 7. 单链表 Linked List

核心操作是重连节点，不是交换节点值。哑节点可以统一处理头节点的插入和删除。

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def from_list(values):
    dummy = tail = ListNode()
    for value in values:
        tail.next = ListNode(value)
        tail = tail.next
    return dummy.next


def to_list(head):
    values = []
    while head:
        values.append(head.val)
        head = head.next
    return values


def reverse_list(head):
    previous = None
    while head:
        following = head.next
        head.next = previous
        previous, head = head, following
    return previous


head = from_list([1, 2, 3])
assert to_list(reverse_list(head)) == [3, 2, 1]
assert reverse_list(None) is None
```

**复杂度与边界：** 反转耗时 O(n)、额外空间 O(1)；构造链表和转换数组另需 O(n) 空间。`to_list` 和这个反转模板只处理无环链表；环形链表要先用快慢指针判环，不能直接转换，否则会无限遍历。

## 8. 二叉树与二叉搜索树 Binary Tree / BST

二叉树节点保存左右孩子。下面用迭代中序遍历，避免树退化成链时递归过深。

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def inorder(root):
    stack = []
    node = root
    while node or stack:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        yield node.val
        node = node.right


def search_bst(root, target):
    while root and root.val != target:
        root = root.left if target < root.val else root.right
    return root


root = TreeNode(2, TreeNode(1), TreeNode(3))
assert list(inorder(root)) == [1, 2, 3]
assert search_bst(root, 3) is root.right
assert search_bst(root, 4) is None
assert list(inorder(None)) == []
```

**复杂度与边界：** 中序遍历时间 O(n)，栈空间 O(h)，h 为树高。BST 搜索时间 O(h)、额外空间 O(1)；普通 BST 不保证平衡，最坏时间为 O(n)。中序结果严格递增是严格 BST 的性质，普通二叉树不满足。验证 BST 要检查整个左右子树的值域，不能只比较直接孩子。

## 9. 邻接表与图遍历 Graph

无权图用 `list[list[int]]`；带权图用 `list[list[tuple[int, int]]]` 保存 `(邻居, 权重)`。网格图可以直接枚举相邻坐标，无需额外建图。

```python
from collections import deque


def make_graph(n, edges, directed=False):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        if not directed:
            graph[v].append(u)
    return graph


def bfs_distance(graph, start):
    distance = [-1] * len(graph)
    distance[start] = 0
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if distance[v] == -1:
                distance[v] = distance[u] + 1
                queue.append(v)
    return distance


graph = make_graph(4, [(0, 1), (1, 2)])
assert bfs_distance(graph, 0) == [0, 1, 2, -1]
```

**复杂度与边界：** 建图与完整 BFS 的时间上界为 O(V + E)，邻接表空间 O(V + E)，BFS 辅助空间 O(V)。节点编号需在 `[0, n)` 内，起点必须存在。入队时标记访问，避免环和重复边导致重复入队。BFS 求的是无权图最短边数；第 743 题的非负带权最短路需要 Dijkstra 和优先队列。

## 10. 并查集 Union-Find

用于反复合并集合、判断两个节点是否连通。路径压缩配合按大小合并；`components` 记录当前连通分量数量。

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x):
        while x != self.parent[x]:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.size[a] < self.size[b]:
            a, b = b, a
        self.parent[b] = a
        self.size[a] += self.size[b]
        self.components -= 1
        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)


uf = UnionFind(4)
assert uf.union(0, 1)
assert uf.union(1, 2)
assert not uf.union(0, 2)
assert uf.connected(0, 2)
assert uf.components == 2
```

**复杂度与边界：** 初始化时间和空间 O(n)，合并与查询的摊还时间为 O(α(n))，α 为反阿克曼函数，实践中接近常数。下标需合法；`size` 只在根节点上有效。不能直接删除边，也不能用它判断有向可达性。用于岛屿问题时，应只统计陆地集合，不能把水格也算成岛屿。

## 11. 堆与优先队列 Heap

`heapq` 默认是最小堆，根在 `heap[0]`。最大堆可以存负值；维护前 k 大时，则保存容量为 k 的最小堆。

```python
import heapq


def kth_largest(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError("k 必须在 [1, len(nums)] 内")
    heap = nums[:k]
    heapq.heapify(heap)
    for i in range(k, len(nums)):
        value = nums[i]
        if value > heap[0]:
            heapq.heapreplace(heap, value)
    return heap[0]


assert kth_largest([3, 2, 1, 5, 6, 4], 2) == 5
assert kth_largest([2, 2, 1], 2) == 2

max_heap = [-value for value in [2, 7, 4]]
heapq.heapify(max_heap)
assert -heapq.heappop(max_heap) == 7
```

**复杂度与边界：** `heapify` 为 O(n)，单次入堆、出堆为 O(log n)，查看根为 O(1)。上面的第 k 大实现耗时 O(n log(k + 1))，额外空间 O(k)，不修改原数组。重复值分别计入排名。堆数组只保证父节点不大于孩子，并非整体有序；存 `(优先级, 对象)` 时，同优先级可能触发对象比较，可增加唯一序号作为第二项。

## 12. 前缀和 Prefix Sum

长度为 n 的数组对应长度为 n + 1 的前缀和，`prefix[0] = 0`，统一处理从第 0 个元素开始的区间。

```python
class NumArray:
    def __init__(self, nums):
        self.prefix = [0]
        for value in nums:
            self.prefix.append(self.prefix[-1] + value)

    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]


array = NumArray([-2, 0, 3, -5, 2, -1])
assert array.sumRange(0, 2) == 1
assert array.sumRange(0, 5) == -3
```

**复杂度与边界：** 预处理时间和空间 O(n)，静态区间查询 O(1)。这里查询闭区间 `[left, right]`，要求 `0 <= left <= right < n`。原数组有负数也可使用；但数组更新后，原前缀和会失效。第 560 题还需哈希表记录前缀和出现次数，并初始化 `{0: 1}`，以计入从下标 0 开始的答案。

## 13. 字典树 Trie

每个节点用字典存子节点，用独立布尔值标记一个单词是否在此结束。这样不会把“存在前缀”误判为“完整单词存在”。

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.end = True

    def _walk(self, text):
        node = self.root
        for char in text:
            node = node.children.get(char)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def startsWith(self, prefix):
        return self._walk(prefix) is not None


trie = Trie()
trie.insert("apple")
assert trie.search("apple")
assert not trie.search("app")
assert trie.startsWith("app")
trie.insert("app")
assert trie.search("app")
```

**复杂度与边界：** 长度为 L 的插入、查询平均时间 O(L)，总空间 O(S)，S 为插入字符串的总字符数上界。重复插入同一单词不增加路径。本实现支持空字符串，插入后根节点即为单词终点；第 208 题要求单词和查询前缀非空、仅含小写英文字母。

## 14. LRU 缓存 LRU Cache

用 `OrderedDict` 同时保存键值和最近访问顺序：左侧最久未使用，右侧最近使用。读取命中、更新已有键都要刷新顺序。

```python
from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity):
        if capacity < 0:
            raise ValueError("capacity 不能为负数")
        self.capacity = capacity
        self.data = OrderedDict()

    def get(self, key):
        if key not in self.data:
            return -1
        self.data.move_to_end(key)
        return self.data[key]

    def put(self, key, value):
        self.data[key] = value
        self.data.move_to_end(key)
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)


cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
assert cache.get(1) == 1
cache.put(3, 3)
assert cache.get(2) == -1
cache.put(1, 10)
assert cache.get(1) == 10
```

**复杂度与边界：** 哈希与顺序维护配合，`get`、`put` 平均为 O(1)，空间 O(capacity)。第 146 题要求容量为正数；本实现额外支持容量为 0，此时不保存任何条目。原题允许用 -1 表示未命中；一般业务若也允许缓存 -1，需要另设未命中标记。手写版本可用哈希表定位节点，再用带哑头尾节点的双向链表完成移到末尾和删除最旧节点。
