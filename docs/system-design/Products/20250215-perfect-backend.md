# 一个合格的后端系统

如果

- 你需要在当前的项目里找到可以优化的点
- 你觉得目前的系统开发没有意思，但暂时也没有想跳槽和转组。

不妨从以下的角度来思考日常的工作是否有可以改进的点。

1. 代码仓库
   1. 合理规划各种文件夹，常见有cmd、internal、utils、service、dataaccess、handlers、config、proto等文件夹
   2. Makefile、Scripts、gitlab CICD、gitlab
   3. 代码质量。如果判断你的代码质量好不好，你就想像有一个和你对立的人来review你的代码都挑不出任何一点毛病，那就合格了。
2. 文档
   1. PRD、TRD、TD、Master TD你都会写吗？从头设计一个需求、甚至系统，每个细节都写清楚，估算API的QPS、内存使用量、估算DB的CURD压力、数据存储估算、Kafka的生产消费压力、存储估算，是否需要缓存？如果涉及核心链路（下单），是否有降级方案（fallback strategy），是否有合理的系统、业务监控，系统架构（system architecture），必要的时序图（sequence diagram），流程图（flow diagram），如果涉及迁移（migration）和弃用（deprecated）的部分是否需要提前通知上下游团队获得知情？
   2. 开评审会（TD/PRD Review）让产品、技术、QA、项目经理来共同评审。
3. 测试
   1. 冒烟测试Smoking Testing/Canary，也就是系统的健康检测、连通性测试
   2. 单测Unit Testing，代码应当有合理的抽象，对于大部分核心链路有单测，虽然不可能达到100%（永远不可能），但可以尽可能提高单测量到70%~80%
   3. 集成测试Integration Testing，对于一些DB、Redis，应当有集成的测试
   4. 回归测试Regression Testing，使用一些线上的数据
4. 数据库、缓存
   1. 一般都是MySQL了，需要考虑的不多。主要把索引和表sharding设计好即可。必要情况下需要考虑db sharding。
   2. 如果使用Redis，可以思考缓存雪崩、击穿、穿透等问题，key、value能够有多大？除了键值还可以使用什么数据结构？
5. MQ（削峰填谷、异步处理、持久化请求）
   1. 削峰填谷：互联网系统通常会有一些突增高并发的场景，比如节日大促、秒杀，这时候就需要借助MQ来削峰填谷
   2. 异步处理：对于一些耗时长的请求，可以发出MQ msg后便返回，msg随后便会被consumer处理（如果频率不高且对性能要求高，可以考虑触发cronjob运行）
   3. 持久化请求：consumer在处理长耗时msg时有可能会宕掉，但只要其未commit消息（kafak），就能够在恢复后重新拉取msg进行处理
6. 定时任务平台Cronjob
   1. 需要能够配置环境、区域reigon、镜像image、运行AZ、所需容器cpu cores、memory
   2. 能够定时精准触发、错误重试、错误报警、接入日志平台
7. 配置平台（config）
   1. 配置中心一般大厂都有，用于配置、隔离各个环境（test、uat、staging、live）的upstream API config、feature configs、app cofigs、DB/MQ configs等
8. 可观测性（Service Observability）
   1. 监控报警系统（monitors、alert）
      1. 对于系统重要的接口应当有监控（P99错误率，QPS），报警应当有Email、IM、Phone
      2. 对于重要的业务指标应当有业务监控，比如订单量，订单计税量
   2. 日志系统（log）
      1. 日志系统一般大厂都有，也可以自己部署开源的日志系统
      2. 在打log时需要合理安排INFO、ERROR、WARN、FATAL的log级别
      3. 需要打log的地方不要省。常规有incoming request、outgoing request的log、DB/Redis的CURD的指令log、对上游RPC/HTTP调用的log、出现特定error时的log、kafka开始消费到消费结束时的log、config的更新log、以及服务的运行log（service start、service down等）。
   3. tracing系统
9. 数据平台
   1. ingest DB into Hive table
   2. create ETL task
10. 网关平台
   11. 负责DNS、ALB（Application Load balancing）、NLB（Network Load Balancing）
   12. RPC system
13. 容灾、降级、限流、高可用、操作一致性
    1. 容灾：在系统某个容器、甚至某个数据中心（机房）宕掉的时候有backup容器、机器来处理
    2. 降级：同上情况，在出现重大灾难时如果不能够维持原有的服务，应当在系统设计时考虑好fallback的方案
    3. 限流：对incoming请求的QPS的限制，对outgoing请求的QPS的限制
    4. 高可用：在当前系统的整体CPU usage和Memory usage过高时易于（自动）扩容
    5. 操作一致性：对于一些需要确保要么完成、要么回滚的操作；或是对同个数据进行写操作的；应当引入合理的事务、或分布式锁（基于redis）
