



Scenario

1.   Query Order Optimization
     1.   DB Index Degsing, escpecially for time
     2.   `start_time > x and end_time <x` how to make an efficient index
          1.   假设我有一个含 order_id，start_time和end_time的查询 where order_id = x and start_time > 100 and end_time < 200，mysql的index该怎么优化呢？=> `CREATE INDEX idx_order_time ON your_table_name (order_id, start_time, end_time);`
     3.   how to query by order_id and order_sn while there is sharding?
          1.   currently they do this by TIDB query with index
     4.   每年都有几billion的order，如何去分表分库，并且如果按order_id来做为sharding key后，如何在没有制定order_id的情况下去做索引，当下业界是如何实现的？
          1.   分表分库是处理大规模数据的有效方案。通过使用全局索引、广播查询或中间件等方法，可以在没有指定 `order_id` 的情况下进行高效查询。
          2.   看起来目前是根据data studio和
     5.   
2.   



The system design in production

1.   order
2.   order fee
3.   settlement
4.   seller wallet
5.   others



The system design in books

1.   chatgpt website (mainly fe)
2.   recommendation systems
3.   login functionality
4.   consistent hashing
5.   id generation
6.   web crawler
7.   YouTube systems
8.   from zero to 1 million