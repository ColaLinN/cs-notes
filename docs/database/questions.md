

## MySQL 一个语句的执行过程



## 深入浅出索引

https://time.geekbang.org/column/article/69236

https://time.geekbang.org/column/article/69636

## where 和 order by 中的索引

https://time.geekbang.org/column/article/73479

> 如果 where 已经用了一个索引，order by 是否会 apply 到索引上，是否需要涵盖到索引上才会变快
>
> 假设我们有 index(status, result, target_id), 我们的语句是 select * from xx_tab where result = 1 order by  status。这个能用到什么索引呢？

**实际情况**

在这种情况下，由于索引的定义是 `(status, result, target_id)`，而 `WHERE` 子句使用了 `result`，但并没有使用 `status` 作为过滤条件，所以索引的利用有些局限性：

- `WHERE result = 1` 这个条件不会完全利用到索引的最左部分 `status`，只能部分使用索引，从 `result` 开始进行扫描。
- `ORDER BY status` 可能无法利用到索引，因为当前的索引顺序不支持直接按 `status` 排序，尤其在 `result` 列已经被用于过滤的情况下

**索引的实际利用**

- 数据库会先查找符合 `result = 1` 的记录，可能会使用部分索引扫描或进行全表扫描，然后进行内存中的排序操作以满足 `ORDER BY status`。

**优化建议**

为了更好地利用索引来优化查询速度，可以考虑以下两种方法：

1. 调整查询语句或索引：
   - 如果将索引定义为 `INDEX(result, status, target_id)`，那么数据库可以先利用 `result` 进行过滤，再利用 `status` 直接进行排序，这样可以完全利用索引，避免额外的排序开销。
2. 添加单独的索引：
   - 如果 `result` 是常用的过滤条件，而 `status` 也是常用的排序条件，可以考虑为 `status` 和 `result` 添加单独的索引（如 `INDEX(result, status)`），这样数据库能够更高效地执行查询。

**原因**

`WHERE` 子句的执行优先级通常高于 `ORDER BY` 子句。这是因为查询优化器在处理查询时会先过滤掉不符合 `WHERE` 条件的行，然后再对剩余的行进行排序。

## MySQL为什么有时候会选错索引？

https://time.geekbang.org/column/article/71173

## Count(*)

https://time.geekbang.org/column/article/72775

## MySQL 保证数据不丢

https://time.geekbang.org/column/article/76161

## 读写分离有哪些坑

https://time.geekbang.org/column/article/77636

## Join 使用及其优化

https://time.geekbang.org/column/article/79700

https://time.geekbang.org/column/article/80147

## 分页 limit offset 对查询语句的影响，也就是 offset 是怎么执行的



## MySQL最多有多少行？一个表最大多大？

