# MySQL Execution Flow

## 一个查询是怎么执行的？

1. 连接器：长连接，短连接，重置连接等

2. 缓存：查询的可选项。然而，缓存并不总是有用的，因为数据可能被频繁更新。在MySQL 8.0不支持了。
3. 分析器：词法分析（lexical analysis），语法分析（syntax analysis）。包括检查一个查询列是否存在。
4. 优化器：决定了使用哪个索引。当执行`join`读表时开始执行。
5. 执行器：验证；管理binlog；与存储引擎交互。

## 存储引擎

1. InnoDB
2. MyISAM: 不支持事务、行级锁、基于redolog的崩溃恢复
3. Memory

## 一个更新操作是怎么执行的？

1. 执行器：管理binlog

2. 存储引擎：更新redolog，崩溃恢复管理

3. 两阶段提交更新

   1. prepare redolog → update binlog → commit redolog

## 在误删除操作后如何恢复临时DB？

   1. 从最近的Backup DB开始恢复。
   2. 重放binlog，从backup的截止时间到误删除操作的时间。
   3. 另，如果误删除操作涉及业务，需要和biz商量。

4. 备份频率：每天，每周，每月等。

   1. 决定使用那种备份频率是备份频率和回复时间目标（Recovery Time Objective, RTO）的权衡。
