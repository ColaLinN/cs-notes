---
sidebar_position: 5

tags: [System Design]
---

# 一致性哈希 Consistent Hashing

一致性哈希主要是用来解决哈希不均的问题



Where does each key live/partition in the Shard Store System?

1. Keys are partitioned/sharded
2. how to assign keys
3. Goals:
   1. balance load, even as servers join and leave
   2. minimize key movement/redistirbuted work when configuration changes
   3. No centralization (remove the shardmaster)
4. Proposal1: Hashing
   1. For n nodes, a key *K* goes to *hash(K) mod n*
   2. Description:
      1. balance load: satisfied by the randomness of hash functions
         1. TODO: hash 
   3. Problem: cannot satisfy the goal2
5. Proposal2: Consistent hash
   1. We also hash the server's identity
   2. Description
      1. The outcome of consistent hashing is really elegant
      2. How to walk? Clockwise, counter-clockwise, either ok
      3. What if add a new node?
         1. move the keys from the original server to new server
   3. Nice
      1. TODO: the keys are moved locally
      2. on average, K/n keys move between two nodes
   4. Problem
      1. How to keep balance?
         1. virtual node



## virtual node

虚拟节点越多：

- 哈希环越密，key 分布越均匀；

- 每台机器被分配到的 key 越接近于平均值。

经验上，每个虚拟节点平均负责的 key 数为：

```
virtual_node_key_share = total_keys / total_virtual_nodes
```

所以，新机器要承担相当数量的 key，就需要与其它机器一样多的虚拟节点。

| 情况                             | 应该添加多少虚拟节点                        |
| -------------------------------- | ------------------------------------------- |
| 所有机器虚拟节点数量相同（推荐） | 与其它机器一样（如 100 个）                 |
| 按能力加权分配                   | 根据新机器性能调整，如 2 倍 CPU 可给 200 个 |
| 快速扩容测试/轻量加入            | 可以临时先加少量（如 20 个），后续动态调整  |

## Sample

初始状态（还没加入节点 D）

哈希环如下（顺时针方向）：

```
less


CopyEdit
   0
   ↑
A#97 ──▶ B#12 ──▶ C#55 ──▶ A#31 ──▶ B#90
   ↑                                 │
   └─────────────────────────────────┘
```

说明：

- 每个“虚拟节点”（A#97、B#12 等）是一个物理节点（A、B、C）的虚拟副本，按哈希值排列在一个环上。
- 假设有一个 key，它的哈希值落在 B#12 之前（比如落在 A#97 和 B#12 之间），这个 key 会被分配给 B#12。

**加入新节点 D（带多个虚拟节点）**

我们现在在环中加上 D 的虚拟节点，比如 D#15、D#60、D#88：

```
less


CopyEdit
   0
   ↑
A#97 ──▶ D#15 ──▶ B#12 ──▶ C#55 ──▶ D#60 ──▶ A#31 ──▶ D#88 ──▶ B#90
   ↑                                                                    │
   └────────────────────────────────────────────────────────────────────┘
```

哪些 key 会被迁移：

- 之前落在 A#97 ~ B#12 区间的 key 分配给了 B#12；
- 现在有了 D#15，这些 key 中落在 A#97 ~ D#15 区间的部分，会转交给 D 负责。

说明如下：

```
less


CopyEdit
迁移前：
  A#97 ~ B#12 区间的 key → B 负责

迁移后：
  A#97 ~ D#15 → D 接管（只这部分迁移）
  D#15 ~ B#12 → 还是B

其余区间：
  不变
```

------

结论：

- 加一个新节点（带虚拟节点）后，只会影响新虚拟节点所在“前一段”区间的 key。
- 所有其他 key 依旧由原来的节点负责。
- 这样就大大减少了 key 的迁移量，实现“最小影响扩容”。