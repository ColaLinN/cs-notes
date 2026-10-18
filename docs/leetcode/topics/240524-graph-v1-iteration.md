

# 图遍历 Graph Traversal, Topological Sort, Unicom Branch

## 深度优先搜索（DFS）

递归形式

```python
# Edge is the collection of edges<nodeA, nodeB>
def dfs(node):
  	visited[node] = True
    for edgeV, edgeW in Edge:
      if visited[edgeW] == False:
        	dfs(edgeW)
```

迭代形式

```python
def dfs(node):
  	s = [] # stack
    s.append(node)
    visited[node] = True
    while len(s) > 0:
      	v = s.pop()
        for edgeV, edgeW in Edge:
          	if visited[edgeW] == False:
              	s.append(edgeW)
                visited[edgeW] = True
```

## 广度优先搜索（BFS）

https://leetcode.cn/problems/word-ladder/

队列：广度优先搜索使用先进先出的队列逐层访问。

## 图的无回路判定



## 拓扑排序，有向图



## 强联通分支，有向图