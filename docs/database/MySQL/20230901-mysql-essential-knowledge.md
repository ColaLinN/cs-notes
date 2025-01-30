---
sidebar_position: 1
title: Essential Knowledge of MySQL
tags: [MySQL, Database]
---

# Essential Knowledge of MySQL

## How is a query processed?

Connector: Long connection, Short connection, Reset Connection, etc.

Cache: Optional for the query. However, the cache is not useful because the data might be updated frequently. It is now not supported in MySQL8.0.

Analyzer: lexical analysis. Syntax analysis. Including checking whether a querying column exists or not.

Optimizer: Decide using which index. Start by reading which table while executing `join`.

Executor: Authentication. Maintaining binglog. Interacting with Storage Engine.

### Storage Engine

1. InnoDB
2. MyISAM: doesn’t support Txn, row lock, redolog-based crash-safe
3. Memory

# How is an update operation executed?

Executor: binlog

Storage Engine:  redolog, crash-safe

The two-phase committed of update: prepare redolog → update binlog → commit redolog

Process of restoring a temporary DB after misoperations such as accidental deletion: getting started from the recent backup DB → relay the binlog from the backup time to the time of accidental deletion → If the operations after the accidental deletion involves business, it needs to be reconciled with the business to recover.

Backup Period: daily, weekly, and monthly, etc

Determining which kind of Backup frequency to use is a trade-off between The Frequency of Backup and Recovery Time Objective(RTO).

## The Isolation of Transaction

The property of Transaction: ACID (Atomicity, Consistency, Isolation, Durability)

Possible Pitfalls/Hazards: Dirty Read, Non-repeatable Read, Phantom Read

Isolation Level: RU, Read Uncommitted < RC, Read Committed < RR, Repeatable Read < SR, Serizable Read

Avoid the Long Txn: set the `autocommit` as `1` to enable implicitly starting the Txn while executing a single command. For example, the start and end of a `select` operation also means the start and end of the corresponding Txn.

### Detect the Long Txn

```sql
select * from information_schema.innodb_trx where TIME_TO_SEC(timediff(now(),trx_started))>60
```

### Under the hood

1. ```
   undo log
   ```

   , read-view(读视图), MVCC(Multiple Version Concurrent Control)

   1. Scenarios:

      1. Repeatable Read: In a Txn, operations can read the data committed before the creation of `read-view` of this Txn.
      2. Read Committed: In a Txn, operations can read the committed update before it.
      3. Special Case: Current Read
         1. All of the `DML` will read the current value first and then update/insert the value.
         2. The same thing goes for `select` operation if it is `select .. lock in share mode` or `select ... for update`. They are acquiring `read lock` or `write lock` respectively.

   2. Principle:

      1. In Repeatable Read,

         1. The creation time of the 

            ```
            read-view
            ```

             depends on the start time of Txn

            1. Txns start with `start transaction with consistent snapshot` is regarded as `started` immediately.
            2. Or An operation is executed after the beginning of a Txn.

         2. ```
            snapshot
            ```

            /

            ```
            read-view
            ```

             is implemented based on the 

            ```
            undo log
            ```

            1. Every Txn will maintain
               1. an array of txn_id, including all of the uncommitted txn_id.
               2. The lower bound of txn_id and the upper bound of txn_id determine the `read-view` range.
            2. Every Txn will maintain
               1. The txn_id is lesser than the lower bound of the current txn_id: already committed before the current Txn, therefore they are visible
               2. The txn_id higher than the upper bound of the current txn_id: is not committed, so they are not visible
               3. The txn_id in the range of [lower_bound, upper_bound]:
                  1. If the txn_id is not in the array: it has been committed and is visible.
                  2. If the txn_id is in the array: it has not been committed yet, non-visible.

2. The time to delete the `undo log`: depends on the earliest `read-view`, so try to avoid the long Txn

- A previous real deadlock case in my work.

  1. Two Txn are trying to update the same order concurrently
  2. They almost get the `read lock` by `select * from order_fee_tab where order_id = 1`  at the beginning at the same time.
  3. There are lots of calculation/upstream requests which take time.
  4. The first Txn tries to execute `update order_fee_tab set fee_amount = amount_2 where order_id = 1` the value will be blocked because it is trying to wait until another Txn is still holding the `read lock` to get the `write lock`.
  5. The second Txn tries to execute `update order_fee_tab set fee_amount = amount_3 where order_id = 1` the value will cause a deadlock because it is also trying to wait until another Txn is still holding the `read lock` to get the `write lock`.

  More: The deadlock happens more frequently when the `DML` is `insert into order_fee_tab (order_id, fee_amount) values (2, 2)`   because the `write lock` of insert is more strict, including the gap lock, and next-key lock.

## Index

Index: used to expedite the query process

### Index struct Types

Hash Table, Array, Binary Balance Tree, B+ Tree

### Hash Table

1. Pros: Easy to query and add Key-Value Data
   1. Use Linked List to solve hash coalition problem
2. Cons: Hard to query a range of data, need to scan all data
3. Applicable Scenario: 只有等值查询

### Array

1. Pros: Easy to query data(binary query O(log(N))), easy to query a range of data
2. Cons: Hard to insert/update data, the time cost is high to relocate/rearrange the data
3. Applicable Scenario: Static Data Storage

### Binary Balance Tree

1. Pros: Easy to query data(binary query O(log(N))), easy to query a range of data. The time complexity of an update/insert is O(log(N)) to keep the binary tree balanced.
2. Cons: The time of query depends on the layers of the tree, normally 1M nodes of data will need a tree with 20 layers.

### B+ Tree

1. Terms:
   1. N-Node Tree; If the N is 1200, there will be only 4 layers of tree to store 1.7B data. `1200^3`
   2. Primary Key Index(Clustered Index)
      1. Key: Primary Key
      2. Value: the full columns
   3. Non-Primary Key Index(aka Normal Index, Non-Clustered Index)
      1. Key: Non-Primary Key
      2. Value: Primary Key → Lookup/Ref(回表)
2. Main Mechanisms:
   1. Multiple-Column Indexes
   2. leftmost prefix principle(最左匹配)
      1. MySQL can use multiple-column indexes for queries that test all the columns in the index, or queries that test just the first column, the first two columns, the first three columns, and so on.
      2. [MySQL8.0 Manul](https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html#:~:text=For example%2C if you have a three-column index on (col1%2C col2%2C col3)%2C you have indexed search capabilities on (col1)%2C (col1%2C col2)%2C and (col1%2C col2%2C col3).) For example, if you have a three-column index on `(col1, col2, col3)`, you have indexed search capabilities on `(col1)`, `(col1, col2)`, and `(col1, col2, col3)`.
   3. Index condition pushdown(索引下推) is introduced in MySQL 5.6, in order to reduce the lookup times by checking the value of the rest existing indexes in the tree.
3. Best Practises:
   1. Use auto-increment for the primary index to avoid rearranging nodes(merge, split)
   2. Don’t  use an unordered/big integer as the Primary Key to avoid the abuse of capacity for building a Non-Primary Index
   3. Better to use
   4. Reset the Primary Key Index Tree
      1. It will reset the Non-Primary Key Index Tree as well
   5. Reset the Normal Index Tree
      1. May impact the query request traffic

Others: Skip Table; LSM; etc

## Lock

### Global Lock

1. FTWRL(Flush Table with Read Lock).

   1. It will block all of the operations such as DML, DDL, and COMMIT of TCL. The table is only readable when the FTWRL is on.
   2. Scenario: Logical Backup of the Whole DB.

2. ```
   mysqldump -single-transaction
   ```

    in Innodb engine

   1. With `-single-transaction`, the backup can be done in a repeatable txn, in which a view is supported by MVCC of InnoDB.
   2. Best choice to backup DB, because it will not affect all of the other operations.

3. Tips: There is another command that can be used to backup DB: 

   ```
   set global readonly=true
   ```

   1. It will set the DB to readable only globally.

   2. The 

      ```
      FTWRL
      ```

       is even better than this because

      1. This `readonly` env variable is used to judge whether a DB is master/slave DB.
      2. Disaster/Exception Recovery: `FTWRL` can be released if the client crashes but this command cannot.

### Table Lock

1. Lock and Unlock Commands such as 

   ```
   lock tables t1 read, t2 write
   ```

   1. It is not recommended since InnoDB supports the Row Lock.

2. MDL(Meta Data Lock)

   1. MDL-Read
      1. This lock will be used in reading.
      2. The lock will not be released before the Txn commit
   2. MDL-Write
      1. It will be captured when there is a DDL request
      2. If there is an MDL-Write in the MDL lock waiting queue, all of the rest MDL lock requests will be blocked.
   3. Best Practise:
      1. If there is a long txn with MDL-Read → a DDL is executed, which means the MDL-Write is in the waiting queue, the subsequent operations will be all blocked until the long Txn is completed.
      2. Therefore, to avoid the long blocking of operations, we can
         1. Avoid conducting long txn
         2. Use `wait n`  params in DDL, in order to give up the waiting DML-Write. Can retry until it succeeds.

### Row Lock

1. Two-Phase Lock Protocol
   1. Try to acquire the lock when need it.
   2. Release lock when the Txn is completed or the sentence is completed.
2. Deadlock and Deadlock Detection
   1. Strategy to process Deadlock
      1. Wait until timeout. This can be set by `innodb_lock_wait_timeout=Xs`
      2. Detect the deadlock proactively and roll back one of the Txn in the deadlock queue. `innodb_deadlock_detect=on`
   2. Avoid Deadlock
      1. Ensure the deadlock doesn't happen.
      2. Reduce the concurrency, that is, to control the QPS of update/insert in which acquire the same lock.
         1. Analyze the biz operations
         2. Introduce rate-limiter in proxy of different layer
         3. Sharing the original data into different rows/data

# Others

- Common Conceptions

  These **SQL** commands are mainly categorized into five categories [link](https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/)

  1. DDL – Data Definition Language `CREATE, ALTER, TRUNCATE, RENAME, DROP`
  2. DML – Data Manipulation Language `INSERT, UPDATE, DELETE, CALL, EXPLAIN CALL, LOCK`
  3. DQL – Data Query Language `SELECT`
  4. DCL – Data Control Language `GRANT, REVOKE`
  5. TCL – Transaction Control Language `COMMIT, SAVEPOINT, ROLLBACK, SET TRANSACTION, SET CONSTRAINT`

  Lock

  1. Read Lock, also known as Shared Lock or S Lock, is not conflicted with Read Lock
  2. Write Lock, also known as Exclusive Lock or X Lock, is an exclusive lock. It will block all of the other requests that use locks.

# Some Questions to be answered:

1. The performance of MySQL
2. The time took to insert a record
3. The Maximum Size of the MySQL table
4. The Average time to process the..
5. How is the lookup actually processed？



Reference:

1. [MySQL 45 Talks](https://time.geekbang.org/column/139)
