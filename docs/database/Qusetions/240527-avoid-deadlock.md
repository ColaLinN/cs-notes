

https://medium.com/@tanishiking/avoid-deadlock-caused-by-a-conflict-of-transactions-that-accidentally-acquire-gap-lock-in-innodb-a114e975fd72

The database schema is something like this

```sql
CREATE TABLE `blog` (
    `id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(512) NOT NULL,
    `content` TEXT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

The following problematic case that will occur deadlocking

```sql
SELECT * FROM `blog` WHERE id = ... FOR UPDATE;
-- the following query will executed only when
-- the row was not found in the first query.
INSERT INTO `blog` (id, title, content) VALUES (...);
```

