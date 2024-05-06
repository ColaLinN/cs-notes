---
sidebar_position: 3
title: MySQL Transaction
tags: [MySQL, Database]
---



15.3.1 START TRANSACTION, COMMIT, and ROLLBACK Statements

https://dev.mysql.com/doc/refman/8.0/en/commit.html



If we don't sepcify `START TRANSACTION` at the beginning, MySQL runs with autocommit mode enabled, 

- which means a statement is atomic as if it was surrounded by `STRAT TRANSACTION` and `COMMIT`. 
- You can not rollback the effect. However, if an error occurs, the statement is rolled back.



BEGIN and BEGIN WORK are supported as aliases of START TRANSACTION for initiating a transaction.



You can change the isolation level or access mode for transactions with the [`SET TRANSACTION`](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html) statement. See [Section 15.3.7, “SET TRANSACTION Statement”](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html).
