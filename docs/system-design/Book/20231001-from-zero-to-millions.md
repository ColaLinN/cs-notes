---
sidebar_position: 1
id: from-zero-to-millions
tags: [System Design, Scalability, Load Balancer, Cache, Database, CDN, Message Queue, Logging, Metrics, Automation]
---

# 从零到一百万用户 Scale from zero to millions of user

## Single server

Everything is running on one server: web, app, database, cache, etc.

Besides, DNS(Domain Server System) is paid service provided by 3rd parties



With the growth of user base, one server is not enough.

## Separating Database and Server

Separating web/mobile traffic(web tier) and database(data tier) servers allows them to be scaled independently

Choices:

- Relational Database(RDBMS Relational Database Management System), 
  - such as MySQL, Oracle database, PostgreSQL, etc.
  - It represents data in tables and rows, join operation across tables is allowed.
  - 40+ years history
- Non-Relational Database(NoSQL), 
  - such as CouchDB, Neo4j, HBase, Redis, etc.
  - four categories: Key-Value stores, graph stores, column stores, and document stores.
  - Join operation is generally supported.

Usually select Relational Database, but NoSQL databases might be the right choice if:

- application requires super-low latency
- data are unstructured, don't have any relational data
- only need to serialize and unserialize data(JSON, XML, YAML, etc)
- need to store a massive amount of data

Scale

1. Vertical scaling, referred to as `scale up`, means the process of adding more power(CPU, RAM, etc) to servers.
   1. Pros: easily to perform
   2. Cons: have upper-limit, cannot add resources to a single server ultimately; doesn't have failover and redundancy.
2. Horizontal scaling, referred to as `scale-out`, which is scaling by adding more servers into the pool of resources.



Now, users are connecting to server directly, and the server has no failover and redundency. User will experience slow response or fail to connect to the server if server offlines.

## Load Balancer

A load balancer evenly distributes incoming traffic among web servers that are defined in a load-balanced set.

User can only get and reach the public IP of load balancer. For better security, private IPs are used for communication between servers. Private IPs are only reacheable internally in the same network.

With the load balancer, we are able to solve no failover problem, improve the availability(provide redundency) in server level.

- If one server goes offline, the load balancer will distribute all the traffic to the other heathy server
- If the traffic grows up rapically, and two servers are not enough to handle the traffic, load balancer can handle this problem gracefully.



For now, we are going to solve the failover and availability problem in databse.

## Databse replication

Database replication can be used in many databse management system, usually with a master/slave relationship between the original(master) and the copies(slaves).

Master generally supports write operations. Slave databases gets copies of the data from master databse and only support read operations. 

Most applications require a much higher ratio of reads to writes; thus, the number of slave databases in a system is usually larger than the number of master databases.

Advatanges

- Better performance
- Better realiablity and availablity



Now we are going to improve the load/response time

**Cache**

A cache is the temporary storage for storing the result of expensive requests in memory, so the subsequent requests are served more quickly.

Add a new cache tier:

- better system performance
- reduce the databse workloads
- able to scale the cache tier independently

Cache strategy:

- read-through cache, which is check cache first then databse

Considerations for using cache:

- What to cache. Should be aware that cache is usually not persistent, should cache the frequently queried and not frequently modified data.
- Expiration Policy. A appropriate TTL for the time-sensetive content. Too long will lead to stale data. Too short will lead to useless cache.
- Consistency. Keeping the data store and the cache in sync. 
- Mitigating failures. To avoid SPOF(A single point of failure), multiple cache servers across different data centers are recommended.
- Eviction Policy. Once cache is full, the existing items might be removed due to the newly added items. Thus, the eviction policy is introduced to solve this problem, usch as LRU(Least-Recently-Used), which is the most popular cache eviction policy, LFU(Least-Frequently-Used) and FIFO(First-In-First-Out).



## CDN(Content Delivery Network)

A CDN is geographically dispersed servers used to deliver static content. CDN servers cache static content like images, videos, CSS, JavaScript files, etc.

Dynamic content cache is able to cache the HTML page that are based on requests path, query strings, cookies, and request headers.

Servering flow:

1. When user A visists a website, a CDN server closest to the user will deliver the static content.
2. If the content doesn exist in the CDN, CDN will qeuery the files from the origin, which can be a web server or an online server like Amazon S3.
3. Origin will return the file with the HTTP header TTL(Time-To-Live) which describes how long the image should be cached.
4. The CDN caches the file(the file will be cached until the TTL expires) and retruns it to user A.
5. User B requests the same file.
6. CDN will return the file if it TTL doesn't expires.

Considerations for using cache:

- Cost. CDNs are run by third-party providers, you are chagred for the data transfers in and out of the CDN.
- The location and distribution. The locations should be appropriate to the users of your services.
- Expiration Policy. Same as cache: A appropriate TTL for the time-sensetive content. Too long will lead to stale data. Too short will lead to useless cache.
- CDN fallback. The server should consider how it will cope with the CDN failure, including detection, alert and operations.
- Invalidating file. (1)Invalidate proactically before TTL expires. (2)Versioning objects.



With the growth of users, the traffic is increasing. Thus, we need to consider scale the web server horizontally(Add more instances/machines).

## Stateless Web Tier

There is some stateful data, data from one request to next request, such as the user session.

Stateful server: stateful data is stored in servers, which causes

- hard to scale the servers
- specific users can only access specific servers witht the statful data

Stateless server: 

- Simpler, More Scalable, More reliable

The state data can be stored in both Cache(Local or Remote), RDB, NoSQL. Cache is the poupular choice because of good scalability and performance.

After removing the stateful data from web server, the web servers can be (auto)scaled based on the traffic load.



As the business grows rapidily, the servers need to server many users internationally. To improve availability and better user experience across wider geographical regions, supporting multiple data centers is crucial.

## Data Centers

Split the servers and databases by regions. Users are GeoDNS-routed based on the users' locations, as known as geo-route, to the closest correspoding dc, with a split traffic of X% in A and (100-X)% in B.

Considerations:

- Traffic Redirection: need to use the distributing tool, such as GeoDNS, to distribute the traiffic evenly and redirect the traiffic to heathly DC.
- Data Synchronisation across geographical DC. Asynchronous syncrhonisation is a popular choice.
- Test and Deployment. With the multi-data center setup, it is important to have a auto-test to test the servers arcoss different locations. Automated deployment tool is vital to keep services consistent through all the data centers.



## Message Queue

A Message Queue, well known as Kafka, Rabbit Queue, is durable component. It supports asynchornous communication to help decouple servers.

It servers as a buffer to distribute asynchronous messages.

- Producer/Publisher
  - Post messages to MQ when Consumer is unavaliable
- Consumer/Subscriber
  - Consume the messages from MQ and perform specific actions even when Producer is unavailable.

Both Producers and Consumers can be scaled independently.



## Logging, Metrics, Automation

When working with a small number of users, logging, metrics, and automation are good practise but not a necessity.

However, they are crucial for maintaing the servers when the business have grown large.

Logging is to note down the info, error, warning, debug, etc. messages for monitors.

- Log should be aggregated and stored in a centralised system for easy search and viewing.

Metrics 

- Machine Metrics: CPU, Memory, servies heath
- Aggregated Level Metrics: such as the performance of entire database tier, cache tier, etc.
- Business Metrics: daily active users, retention, revenue, etc.

Automation: When system gets big and complex, automation tool is key to improve the productivity.

- Continuous Integration and Continuous Deployment
- Automated build, test, deploy process, etc.



## Database Scaling

Vertical Scaling. AKA scaling up, is the scaling by more powerful machine with faster CPU, larger RAM/DB, etc.

- Pros: easy to scale

- Cons: 
  - Physical Limitation in single machine
  - No Failover, Redundancy. Greater risk of Single Point of Failures(SPOF)
  - High Cost. Powerful single server is much more expensiver than single server.

Horizontal Scaling. AKA Sharding

Considerations for using Sharding

- Sharding Evenly, Resharding needs. Consistent Sharding
- Celebrity Problem. need to allocate a shard for each celebrity
- Join table problem. Once the tables are splited into different DBs, join cannot be performed efficiently.



## Summary - Millions users and more

To support the growth of large users base more than millions, more optimization is needed. With the optimization introduced as the foundationality, the further ways are similar.

The improvements involved in this chapter is:

1. Split single server to Web Tier and DB Tier
2. Load Balancer to distribute the traiffic evenly
3. Stateless server
4. Support Horizontal/Vertical Scaling in each Tiers. Better Redundancy, reliability, and performance.
5. CDN for caching the static/dynamic data such as JS, CSS, HTML, File, etc.
6. Use Cache for frequently used data
7. Data Centers for users across geographical areas
8. Message Queue to decouple the servers, to 
9. Logging, Metrics, Automation Tool for monitors and efficient development.



## Reference

1. System Design Interview by Alex Xu