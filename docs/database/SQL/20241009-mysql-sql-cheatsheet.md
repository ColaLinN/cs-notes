

# MysQL SQL CheatSheet

## 连接MySQL

```sql
mysql -h <host> -P <port> -p<pass_word> -u<user_name> -D<db_name>
```

## 创建表

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
  column_name1 data_type [column_constraints],
  column_name2 data_type [column_constraints],
  ...
  table_constraints
) [TABLE_OPTIONS];
```

1. **`IF NOT EXISTS`**：可选部分，防止在表已经存在时创建错误。
2. **`table_name`**：表的名称。
3. **`column_name`**：列的名称。
4. **`data_type`**：列的数据类型，如 `INT`、`VARCHAR`、`DATE`、`TIMESTAMP` 等。
5. **`column_constraints`**：约束条件，如 `NOT NULL`、`DEFAULT`、`AUTO_INCREMENT`、`PRIMARY KEY` 等。
6. **`table_constraints`**：表级约束，如 `PRIMARY KEY`、`FOREIGN KEY`、`UNIQUE`、`CHECK`、`INDEX` 等。
7. **`TABLE_OPTIONS`**：表级配置，如 `ENGINE`、`DEFAULT CHARSET`、`COLLATION` 等。

sample

```
CREATE TABLE IF NOT EXISTS `test_db`.`order_tab_00000000` (
	id BIGINT PRIMARY KEY AUTO INCREMENT COMMENT 'the auto-increment id',
	order_id BIGINT UNSIGNED NOT NULL DEFAULT '0';
	buyer_user_id BIGINT UNSIGNED NOT NULL DEFAULT '0';
	shop_id BIGINT NOT NULL DEFAULT '0';
	fullfilment_type TINYINT UNSIGNED NOT NULL DEFAULT '0';
	service_fee BIGINT UNSIGNED NOT NULL DEFAULT '0';
	ctime BIGINT NOT NULL DEFAULT '0';
	mtime BIGINT NOT NULL DEFAULT '0';
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4
  COMMENT = 'Table to store the order info';
```

uftmb8 means to use the character of utf maximum bytes 8

## 查 DB、表的信息

```sql
show databases;
use xxDB;
show tables;

show indexes from xxx_tab;
DESC xxx_tab;

# Viewing Comments
SHOW TABLE STATUS WHERE Name = 'employees';

# Table comment
SHOW FULL COLUMNS FROM employees;
```

## 增删查改 CRUD

### select

Operators

1. Customised column：
   1. `SELECT 'Supplier' as Type, ContactName, City, Country FROM Suppliers` here the Supplier is the first column `type`
2. AND
3. OR: `WHERE Country = 'Germany' OR Country = 'Spain';`
4. Top: `SELECT TOP 3 * FROM Customers;`
5. Like
6. Wildcards(通配符)：used by `like` 
   1. `%` Represents zero or more characters
   2. `_` Represents a single characters
7. IN:  is a shorthand for multiple `OR` conditions.
8. Between: 
   1. The `BETWEEN` operator is inclusive: begin and end values are included. 
   2. `WHERE *column_name* BETWEEN *value1* AND *value2;*`

```sql
select count(*) from merchant_fx_markup_tier_tab where mtime > 1690818689;
```

backtick:

- To avoid reserved key conflicts: Sometimes, the database or table name might be the same as a MySQL reserved word. Using backticks can prevent syntax errors.

- Supports special characters: Backticks allow database and table names to contain special characters, spaces, and more.

```
SELECT * FROM `shopee_cb_wallet_cn_db`.`payout_tab_00000000`;
```

### insert

```sql
INSERT INTO ust_big_merchant_tab
(merchant_id, sub_account_id, merchant_status, ctime, mtime)
Values
(1, 1, 1, 1, 1),
(2, 2, 1, 2, 2),
(3, 3, 1, 3, 3);
```

### update

```sql
UPDATE tenpay_withdrawal_sync_segment_tab set end_time = 1709222400 where merchant_id = 1331505 and deleted = 0 and end_time > 1709222400;
```

### delete

```sql
DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
```

## 聚合函数 aggregation

### Distinct

```sql
SELECT DISTINCT Country FROM Customers;

-- same
SELECT COUNT(DISTINCT Country) FROM Customers;

-- same
SELECT Count(*) AS DistinctCountries
FROM (SELECT DISTINCT Country FROM Customers);
```

### group by

The `GROUP BY` statement groups rows that have the same values into summary rows, like "find the number of customers in each country".

The `GROUP BY` statement is often used with aggregate functions (`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`) to group the result set by one or more columns.

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s);
```

### order by desc|asc

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

### count(), max(), min(), sum(), avg()

1. Count(), returns the number of rows that matches a specified criterion.
2. MAX()
3. MIN()
4. SUM(), returns the total sum of a numeric column.
5. AVG(), returns the average value of a numeric column.

### 事务 Transaction

```sql
-- 开启事务
START TRANSACTION;
-- 执行查询或更新语句
SELECT ...;
UPDATE ...;
-- 提交事务
COMMIT;

-- 场景2
START TRANSACTION;
SELECT ...;
UPDATE ...;
-- 回滚事务
ROLLBACK;
```

**不要使用 BEGIN 开启事务，请使用 `START TRANSACTION`**。

-   在存储过程（Stored Procedure）、函数（Function）、触发器（Trigger）或事件（Event）中，BEGIN ... END 仅用于声明一个复合语句块（block）。
-   如果在 `BEGIN` 后面只是执行普通的 SQL CRUD 语句，那么其行为等同于 `START TRANSACTION`，**但并不推荐**使用这种方式。

## SWITCH CASE

### 语法

```
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```

### 实例1，在 select输出中使用

```
SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 30 THEN 'The quantity is greater than 30'
    WHEN Quantity = 30 THEN 'The quantity is 30'
    ELSE 'The quantity is under 30'
END AS QuantityText
FROM OrderDetails;
```

### 实例2，在order by中使用

```
SELECT CustomerName, City, Country
FROM Customers
ORDER BY
(CASE
    WHEN City IS NULL THEN Country
    ELSE City
END);
```

## join

Here are the different types of the JOINs in SQL:

- `(INNER) JOIN` 返回两表都有的内容
- `LEFT (OUTER) JOIN` 返回左表所有的内容，以及右表中匹配的内容
- `RIGHT (OUTER) JOIN` 返回右表所有的内容，以及左表中匹配的内容
- `FULL (OUTER) JOIN` 结合了 `LEFT JOIN` 和 `RIGHT JOIN` 的特性。它返回两个表中的所有记录，并将它们根据连接条件进行匹配。如果在连接条件中找不到匹配项，则结果集中仍然包含来自左表或右表的记录，但这些记录的另一侧将包含 `NULL` 值。

### Inner|left|right|full join

```
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
```

### cross join unnest

-   `UNNEST(items)` 将数组 `items` 展开为单独的行。
-   `CROSS JOIN` 将每个订单与其展开的每个项目进行连接。

```
SELECT order_id, item
FROM orders
CROSS JOIN UNNEST(items) AS item;
```

orders表为

| order_id | items               |
| -------- | ------------------- |
| 1        | ['apple', 'banana'] |
| 2        | ['orange', 'peach'] |

结果集为

| order_id | item   |
| -------- | ------ |
| 1        | apple  |
| 1        | banana |
| 2        | orange |
| 2        | peach  |

### self join

`SELF JOIN` 是指同一个表的连接，用于在同一个表中查找相关数据。通常用于需要比较同一表中不同行的数据的情况。

输入

| employee_id | name  | manager_id |
| ----------- | ----- | ---------- |
| 1           | Alice | NULL       |
| 2           | Bob   | 1          |
| 3           | Carol | 1          |
| 4           | Dave  | 2          |

```
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.employee_id;
```

输出

| employee | manager |
| -------- | ------- |
| Alice    | NULL    |
| Bob      | Alice   |
| Carol    | Alice   |
| Dave     | Bob     |

## union

`UNION` 操作符用于组合两个或多个 `SELECT` 语句的结果集。它会移除结果集中所有的重复值，仅保留唯一的记录。

需要是

1.  相同的列数：每个 `SELECT` 语句必须返回相同数量的列。
2.  相似的数据类型：对应列的数据类型必须相似或兼容。
3.  相同的列顺序：每个 `SELECT` 语句中的列顺序必须相同。

输入

表 `table1`:

| id   | name  |
| ---- | ----- |
| 1    | Alice |
| 2    | Bob   |

表 `table2`:

| id   | name  |
| ---- | ----- |
| 2    | Bob   |
| 3    | Carol |

Union sql

```
SELECT id, name FROM table1
UNION
SELECT id, name FROM table2;
```

输出

| id   | name  |
| ---- | ----- |
| 1    | Alice |
| 2    | Bob   |
| 3    | Carol |

The `UNION` operator is used to combine the result-set of two or more `SELECT` statements.

- Every `SELECT` statement within `UNION` must have the same number of columns
- The columns must also have similar data types
- The columns in every `SELECT` statement must also be in the same order

```
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

### union all

`UNION ALL` 操作符也用于组合两个或多个 `SELECT` 语句的结果集，但它不会移除重复值。所有记录，包括重复的记录，都会包含在结果集中。

```
SELECT id, name FROM table1
UNION ALL
SELECT id, name FROM table2;
```

结果如下，与union不同，不会去除重复的记录 Bob

| id   | name  |
| ---- | ----- |
| 1    | Alice |
| 2    | Bob   |
| 2    | Bob   |
| 3    | Carol |

## 格式化

### time convert

```sql
from_unixtime(create_time, "%Y%M%D%H") as timestamp
date(from_unixtime(create_time)) as date

to_unixtime(timestamp '2024-03-10 00:00:00 UTC+8')
to_unixtime(date_trunc('day', current_timestamp AT TIME ZONE 'Asia/Singapore' - interval '7' day)) AS start_time
```

### json extract

1. simple extraction
2. nested JSON objects
3. key-values inside array
4. array extraction

**case 1 simple extraction**

```sql
{
  "key1": {
    "key2": "value"
  }
}
```

usage =>

```sql
SELECT JSON_EXTRACT(json_column, '$.key1.key2')
FROM mytable
WHERE json_column IS NOT NULL;
```

**case 2 nested JSON objects**

if the JSON string in the `json_column` is structured like this:

```sql
{
  "key1": {
    "key2": {
      "key3": "value"
    }
  }
}
```

usage =>

```sql
JSON_EXTRACT(json_column, '$.key1.key2.key3')
```

**case 3 key-values inside array**

```sql
{
  "key1": [
    {
      "key2": "value1"
    },
    {
      "key2": "value2"
    }
  ]
}
```

usage =>

The `[*]` syntax is to extract all values in the array, rather than just a specific index.

```sql
$.key1[*].key2
```

**case 4 array as list**

```sql
cast(
	json_extract(
		_decoded_extinfo, '$.service_fee_info.info_list'
	) AS ARRAY<JSON>
) as service_fee_info_list
```

### cast

1. `BIGINT`
2. `Array<JSON>`
3. `DOUBLE`

```
cast(json_extract(_decoded_extinfo, '$.create_time')

cast(
	json_extract(_decoded_extinfo, '$.service_fee_info.info_list') 
	AS ARRAY<JSON>
)

CAST(service_fee AS double)
```

### format

```sql
FORMAT(value, format_pattern, culture)

//value	Required. The value to be formatted
//format	Required. The format pattern
//culture	Optional. Specifies a culture (from SQL Server 2017)
```

=>

```sql
DECLARE @d DATETIME = '12/01/2018';
SELECT FORMAT (@d, 'd', 'en-US') AS 'US English Result',
       FORMAT (@d, 'd', 'no') AS 'Norwegian Result',
       FORMAT (@d, 'd', 'zu') AS 'Zulu Result';
```

## 算数操作

https://www.w3schools.com/sql/sql_operators.asp

- +
- -
- X 
- / (Divide)
- % (Modulo)

| Operator | Description |
| :------- | :---------- |
| +        | Add         |
| -        | Subtract    |
| *        | Multiply    |
| /        | Divide      |
| %        | Modulo      |

Bitwise Operators

Comparison Operators

Compound

Logical Operators

## 变量

> from chatgpt

在 MySQL 中，可以使用 `SET` 或 `SELECT` 语句来设置变量。以下是在 MySQL 中设置变量的示例：

1. 使用 SET 语句：

```sql
SET @variable_name = value;
```

例如：

```sql
SET @myVariable = 10;
```

这将创建一个名为 `@myVariable` 的变量，并将其设置为 10。

2. 使用 SELECT 语句：

```sql
SELECT value INTO @variable_name;
```

例如：

```sql
SELECT COUNT(*) INTO @rowCount FROM myTable;
```

这将查询 `myTable` 表中的行数，并将结果存储在 `@rowCount` 变量中。

在 MySQL 中，变量的命名约定是以 `@` 符号开头，后面跟着变量的名称。可以根据需要设置不同的数据类型的变量，例如整数、字符串、日期等。

请注意，MySQL 中的变量作用范围是会话级别的，也就是说，在同一个会话中，变量可以在多个查询之间保持持久性。然而，当会话结束时，变量的值将被清除。

## 公用表表达式 `WITH`

`WITH` 子句也称为公用表表达式（CTE），在 SQL 中用于定义一个临时结果集，该结果集可以在后续的 `SELECT`、`INSERT`、`UPDATE` 或 `DELETE` 语句中引用。`WITH` 子句在定义后立即与后面的主查询连接在一起。它的作用范围仅限于紧接其后的一个 SQL 语句。

下面介绍两个 case

1. construct a table as your will
2. iteratively construct the CTE from top to down

### case 1 construct a table as your will

```sql
    regions (cid, currency, precision) AS (
        SELECT * FROM (
            VALUES
                ('BR', 'BRL', 2),
                ('CL', 'CLP', 0),
                ('CO', 'COP', 0),
                ('ID', 'IDR', 0),
                ('MX', 'MXN', 2),
                ('MY', 'MYR', 2),
                ('PH', 'PHP', 0),
                ('SG', 'SGD', 2),
                ('TH', 'THB', 0),
                ('TW', 'TWD', 0),
                ('VN', 'VND', 0)
        )
    ),
```

### case 2 iteratively construct the CTE from top to down

we can see that the below table2 is defined basd on the result of top table1

```
WITH
	tab_v1 AS (
		SELECT v1, v2, v3
		FROM tab_a_extract
		WHERE CONDITION
	),
	tab_v2 AS (
		SELECT v1, v2
		FROM tab_v1
		CROSS JOIN UNIEST ()
	)
```

=>

```
WITH
    item_service_fee_info_list AS(
        SELECT orderid, cast(json_extract(_decoded_extinfo, '$.service_fee_info.info_list') AS ARRAY<JSON>) as service_fee_info_list
        FROM marketplace.shopee_order_item_v3_db__order_item_v3_tab__reg_continuous_s0_live
        WHERE grass_region = 'VN'
          AND cast(json_extract(_decoded_extinfo, '$.create_time') >= 1676473200
          AND cast(json_extract(_decoded_extinfo, '$.create_time') AS BIGINT) < 1676473200 + 86400
    ),
    item_service_fee_info AS (
        SELECT orderid, service_fee_info
        FROM item__list
        CROSS JOIN UNNEST (service_fee_info_list) AS T (service_fee_info)
    )
```

## Sample

### 1

```mysql
WITH
    time_range AS (
        SELECT
            to_unixtime(date_trunc('day', current_timestamp AT TIME ZONE 'Asia/Singapore' - interval '7' day)) AS start_time,
            to_unixtime(date_trunc('day', current_timestamp AT TIME ZONE 'Asia/Singapore')) AS end_time
            -- to_unixtime(timestamp '2023-07-17 00:00:00 UTC+8') AS start_time,
            -- to_unixtime(timestamp '2023-07-24 00:00:00 UTC+8') AS end_time
    ),
    regions (cid, currency, precision) AS (
        SELECT * FROM (
            VALUES
                ('BR', 'BRL', 2),
                ('CL', 'CLP', 0),
                ('CO', 'COP', 0),
                ('ID', 'IDR', 0),
                ('MX', 'MXN', 2),
                ('MY', 'MYR', 2),
                ('PH', 'PHP', 0),
                ('SG', 'SGD', 2),
                ('TH', 'THB', 0),
                ('TW', 'TWD', 0),
                ('VN', 'VND', 0)
        )
    ),
    orders AS (
        SELECT
            grass_region AS region,
            CAST(json_extract(_decoded_extinfo, '$.service_fee_info.fee_amount') AS bigint) AS service_fee,
            CAST(json_extract(_decoded_extinfo, '$.comm_fee') AS bigint) AS commission_fee,
            CAST(json_extract(_decoded_extinfo, '$.buyer_service_fee.buyer_service_fee') AS bigint) AS buyer_service_fee,
            CAST(json_extract(_decoded_extinfo, '$.card_txn_fee_info.card_txn_fee') AS bigint) AS seller_transaction_fee
        FROM marketplace.shopee_order_v4_db__order_v4_tab__reg_continuous_s0_live CROSS JOIN time_range
        WHERE
            create_time >= time_range.start_time AND create_time < time_range.end_time
        UNION
        SELECT
            'BR' AS region,
            CAST(json_extract(_decoded_extinfo, '$.service_fee_info.fee_amount') AS bigint) AS service_fee,
            CAST(json_extract(_decoded_extinfo, '$.comm_fee') AS bigint) AS commission_fee,
            CAST(json_extract(_decoded_extinfo, '$.buyer_service_fee.buyer_service_fee') AS bigint) AS buyer_service_fee,
            CAST(json_extract(_decoded_extinfo, '$.card_txn_fee_info.card_txn_fee') AS bigint) AS seller_transaction_fee
        FROM marketplace.shopee_order_v4_br_db__order_v4_tab__reg_continuous_s0_live CROSS JOIN time_range
        WHERE
            create_time >= time_range.start_time AND create_time < time_range.end_time
    ),
    aggregate AS (
        SELECT
            region,
            SUM(service_fee) AS service_fee,
            SUM(commission_fee) AS commission_fee,
            SUM(buyer_service_fee) AS buyer_service_fee,
            SUM(seller_transaction_fee) AS seller_transaction_fee
        FROM orders
        GROUP BY region
        ORDER BY region ASC
    )
SELECT
    from_unixtime(start_time) AS start_time,
    from_unixtime(end_time) AS end_time,
    region,
    format('%.' || format('%d', precision) || 'f', CAST(service_fee AS double) / 100000) AS service_fee,
    format('%.' || format('%d', precision) || 'f', CAST(commission_fee AS double) / 100000) AS commission_fee,
    format('%.' || format('%d', precision) || 'f', CAST(buyer_service_fee AS double) / 100000) AS buyer_service_fee,
    format('%.' || format('%d', precision) || 'f', CAST(seller_transaction_fee AS double) / 100000) AS seller_transaction_fee
FROM
    aggregate
    JOIN regions ON aggregate.region=regions.cid
    CROSS JOIN time_range;
```

### 2 

这是一段使用了SQL的WITH语句的代码。

这段代码中，首先定义了五个CTE（item_service_fee_info_list、item_service_fee_info、orders、faulty_orders和returns），然后在主查询中使用了这些CTE。


```sql
WITH
    item_service_fee_info_list AS(
        SELECT orderid, cast(json_extract(_decoded_extinfo, '$.service_fee_info.info_list') AS ARRAY<JSON>) as service_fee_info_list
        FROM marketplace.shopee_order_item_v3_db__order_item_v3_tab__reg_continuous_s0_live
        WHERE grass_region = 'VN'
          AND cast(json_extract(_decoded_extinfo, '$.create_time') AS BIGINT) >= 1676473200
          AND cast(json_extract(_decoded_extinfo, '$.create_time') AS BIGINT) < 1676473200 + 86400
    ),
    item_service_fee_info AS (
        SELECT orderid, service_fee_info
        FROM item_service_fee_info_list
        CROSS JOIN UNNEST (service_fee_info_list) AS T (service_fee_info)
    ),
    orders AS (
        SELECT orderid, cast(json_extract(_decoded_extinfo, '$.escrow_to_seller') AS BIGINT) as escrow_to_seller
        FROM marketplace.shopee_order_v4_db__order_v4_tab__reg_continuous_s0_live
        WHERE grass_region = 'VN'
          AND create_time >= 1676473200
          AND create_time < 1676473200 + 86400
    ),
    faulty_orders AS (
        SELECT item_service_fee_info.orderid as orderid, 
        cast(json_extract(service_fee_info, '$.updated_fee_amount') AS BIGINT) as updated_fee_amount,
        cast(json_extract(service_fee_info, '$.fee_amount') AS BIGINT) as initial_fee_amount
        FROM item_service_fee_info
        WHERE cast(json_extract(service_fee_info, '$.updated_fee_amount') AS BIGINT) > 0 
          AND cast(json_extract(service_fee_info, '$.updated_fee_amount') AS BIGINT) < cast(json_extract(service_fee_info, '$.fee_amount') AS BIGINT)
          AND cast(json_extract(service_fee_info, '$.updated_fee_amount') AS BIGINT) IS NOT NULL                                                                                                                                                                                                              
    ),
    returns AS (
        SELECT orderid, cast(json_extract(_decoded_return_info, '$.refund_amount_adjustable') AS BOOLEAN) AS refund_amount_adjustable, refund_amount, 
          cast(json_extract(_decoded_return_info, '$.max_refundable_amount') AS BIGINT) as max_refundable_amount
          FROM marketplace.shopee_return_v2_db__return_v2_tab__reg_continuous_s0_live
        	WHERE grass_region = 'VN'
          AND status IN (2,5)
    )
SELECT faulty_orders.orderid, faulty_orders.initial_fee_amount, faulty_orders.updated_fee_amount, returns.refund_amount, returns.max_refundable_amount FROM faulty_orders
INNER JOIN returns ON returns.orderid = faulty_orders.orderid
WHERE returns.refund_amount_adjustable
  AND (faulty_orders.initial_fee_amount * ((returns.max_refundable_amount - returns.refund_amount) / 100000) / returns.max_refundable_amount * 100000 <= faulty_orders.updated_fee_amount - 100000
  OR faulty_orders.initial_fee_amount * ((returns.max_refundable_amount - returns.refund_amount)/ 100000) / returns.max_refundable_amount * 100000 >= faulty_orders.updated_fee_amount + 100000)
```

## 3 Order by year

```
WITH status_map AS (
    SELECT 1 AS status_int, 'Active' AS status
    UNION ALL
    SELECT 2 AS status_int, 'Inactive' AS status
    UNION ALL
    SELECT 3 AS status_int, 'Pending' AS status
)
SELECT 
    t.region,
    YEAR(t.timestamp) AS year,
    t.status_int,
    s.status,
    COUNT(*) AS count
FROM 
    my_table t
JOIN 
    status_map s ON t.status_int = s.status_int
GROUP BY 
    t.region, 
    YEAR(t.timestamp),
    t.status_int,
    s.status
ORDER BY
    t.region, 
    YEAR(t.timestamp),
    t.status_int;
```

## Reference

1. w3school https://www.w3schools.com/sql/sql_groupby.asp
2. SQL JSON_EXTRACT Walkthrough With Examples https://www.beekeeperstudio.io/blog/sql-json-extract
3. json extract real case: https://stackoverflow.com/questions/15701579/how-to-retrieve-json-data-from-mysql