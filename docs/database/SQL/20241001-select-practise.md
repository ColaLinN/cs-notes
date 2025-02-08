

https://leetcode.cn/studyplan/sql-free-50/

## [1757. Recyclable and Low Fat Products](https://leetcode.cn/problems/recyclable-and-low-fat-products/)

enum equal comparision

```sql
# Write your MySQL query statement below
SELECT product_id
FROM Products
WHERE low_fats = "Y" and recyclable = "Y"
```

## [584. Find Customer Refere](https://leetcode.cn/problems/find-customer-referee/)

`is null`

```sql
# Write your MySQL query statement below
SELECT name
FROM Customer
WHERE referee_id != 2 or referee_id is null;
```

## [595. Big Countries](https://leetcode.cn/problems/big-countries/)

`>=`

```sql
# Write your MySQL query statement below
SELECT name, population, area
FROM World
WHERE area >= 3000000 or population >= 25000000
```

## [1148. Article Views I](https://leetcode.cn/problems/article-views-i/)

- `disctinct`
- `as id`
- ORDER BY 1 ASC

```sql
# Write your MySQL query statement below
SELECT distinct(author_id) as id
FROM Views
WHERE author_id = viewer_id
ORDER BY 1 ASC
```

## [1683. Invalid Tweets](https://leetcode.cn/problems/invalid-tweets/)

```python
# Write your MySQL query statement below
SELECT tweet_id
FROM Tweets
WHERE length(content) > 15
```

