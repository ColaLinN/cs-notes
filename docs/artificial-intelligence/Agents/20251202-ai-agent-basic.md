# AI Agent 

## AI Agent和Workflow的区别是什么？

workflow是固定流程

agent能够自主规划：分析任务，分解任务，解决错误，动态调用工具，记忆，推理，多步思考。

## ReAct、Act、CoT有什么区别？

- ReAct是Reasoning+Observe+Act
- Act就是Act Only
- CoT是Reasoning

## CoT和Step by Step有什么区别？为什么会好？

Step by step是以前通过prompt去引导模型分步思考生成结果。

而CoT则是在预训练时引导模型生成单独的推理，test-time-scaling，额外的token可以self-correct。

- Chain of Thought是一种提示技术（prompting technique），通过引导大语言模型展示其推理过程的中间步骤，从而提高其在复杂任务中的表现。最早由Google Research团队在2022年提出，通过论文 "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"正式引入。

## Agentic Search是什么？

Claude Code放弃了传统 RAG，转而采用 Agentic Search。从依赖外部 infra（如向量数据库）的 RAG 系统，转向让模型具备主动检索与工具使用能力的 Agentic 方法。

1. 性能更强：从直觉到实证。Agentic Search 的表现“显著优于所有其他方案”。最初团队只是凭直觉（vibes）觉得这种方式更贴近开发者思维。但在长期实践后，大家确实普遍认为代码生成质量更高、响应更自然。

2. Agentic Search 在实时系统中直接执行代码搜索，不依赖外部存储或预处理数据。这让系统天然具备同步性与安全性，也显著降低了工程维护成本。

   传统 RAG 的实现依赖对代码进行向量化处理（embedding）并存入向量数据库，这一过程带来了大量工程复杂性和安全隐患：

   - 更新滞后：代码频繁变更导致向量数据过时；
   - 安全风险：向量数据必须托管在某处，可能面临数据泄露的风险；
   - 不适用于高敏场景：内部代码高度机密，任何形式的外部数据库都是潜在风险源。

3. 更符合开发实际

   - 在开发者的日常实践中，最可靠的工具往往是最透明的。Agentic Search 使用的 grep、glob 等传统搜索方式，本身就是工程师熟悉且信任的工具链。

## Agentic RAG是什么？

让Agent自己推理思考

- 什么时候该检索（Proactivity-driven）？
- 检索后如何反思（Reflection-driven）？
- 什么时候基于反馈优化（Feedback-driven）？

## RAG是企业落地AI的第一工程

超长 Context ≠ 长记忆

- 超长 Context 的问题：模型一次性塞进 1M tokens，成本极高，推理效率差，还存在噪声干扰。
- 真正的长记忆：是“随时可检索、随时可更新”，而不是一股脑往上下文里堆数据。这就必然会回到 RAG 或其变种（Graph RAG、Agentic RAG）。

RAG的优势

1. 存量知识问题。企业已有的大量PDF、邮件、数据库，不可能靠“长上下文”一口气喂进去。
2. 动态更新问题。新知识进来后，必须能即时查询和替换答案，长Context做不到增量更新。
3. 成本问题。用RAG做100个文档查询，token成本可能是长Context方案的1/10甚至更低。

# Reference

1. R1的这种有反思和自我纠正的cot，比一般的step by step更好的原因是什么啊？https://www.xiaohongshu.com/discovery/item/6822e74a0000000022007153?source=webshare&xhsshare=pc_web&xsec_token=ABs3j-Wu_fF4r7stR6s9I6VSv02G3moDXwtC7Q-fTh6KU=&xsec_source=pc_share
2. RAG是企业落地AI的第一工程 59https://www.xiaohongshu.com/discovery/item/68b8db35000000001d003b37?source=webshare&xhsshare=pc_web&xsec_token=ABNuf6q4BycUPvxF4Y3rwiujCdcYRpqvnSxXtgtgP9sx8=&xsec_source=pc_share
3. Agentic-RAG为什么必须要做 https://www.xiaohongshu.com/discovery/item/68fdfa850000000004021a96?source=webshare&xhsshare=pc_web&xsec_token=AB12n3l7JIED3R9jxd1R4HhZR-1Jq2m3pEVeAKRcXMxAE=&xsec_source=pc_share

