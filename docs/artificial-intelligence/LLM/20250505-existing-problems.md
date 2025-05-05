



现有的问题
1. prompt太难写（这是model的问题吗？这是人的问题，太懒惰，懒得划分章节、细化需求，定义输入输出是原罪）。
2. 不知道什么是最好的prompt，比如划分章节用什么效率高，输入输出放哪里比较好，动态的内容放哪里好
3. 不知道怎么样评估prompt的结果
4. 不知道怎么使用finetune、DPO去让模型学到领域知识
5. 不知道如何利用rag
6. 不知道deep research如何实现
7. 怎么样诱导模型生成结果
8. 怎么做alignment
9. evaluation最简单的方式就是100个request做一百次（尤其对于multi-agent而言，要排查其他input的影响），而不是一次做n个。

idea
1. 教育大家写prompt，比如最近的猜病，就是一种CTF，通过prompt引导llm来leak结果
2. 对于领域微调，大家不知道finetune还是rag效果好
3. 数据集的收集、清洗流程，大家也不知道