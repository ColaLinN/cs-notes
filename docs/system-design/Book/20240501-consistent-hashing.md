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
      2. How to 