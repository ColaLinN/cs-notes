# LLM为什么使用Decoder only架构？

1. 淘汰掉BERT这种encoder-only，因为它用masked language modeling预训练，不擅长做生成任务
   1. Encoder的双向注意力存在低秩问题，可能会削弱模型的表达能力，就生成任务而言，引入双向注意力并无实质好处。
   2. 相比之下decoder-only的模型用next token prediction%预训练，兼顾理解和生成，在各种下游任务上的zero-shot和few-shot泛化性能都很好
2. 尽管Encoder-Decoder和Prefix-LM架构在理论上具备兼顾理解与生成的能力，但在实际应用中，Decoder-only架构凭借其在泛化性能、训练难度、位置编码特性、计算效率和生态系统等方面的优势，成为当前大规模语言模型的主流选择
   1. 泛化性能优势，
      1. Decoder 在零样本（zero-shot）和少样本（few-shot）学习任务中表现更为优异
      2. Encoder-decoder需要在一定量的标注数据上做multitask finetuning才能够激发最佳性能
   2. 训练任务难度与模型能力，Decoder-only架构的预训练任务（即下一词预测）相对更具挑战性，使得模型在学习通用表征时具有更高的上限
   3. 隐式位置编码特性，ecoder-only架构中的因果注意力机制（causal attention）具有隐式的位置编码功能，能够打破Transformer模型固有的位置不变性
   4. 计算效率与工程实现，Decoder-only模型在处理多轮对话等任务时，可以复用键值缓存（KV-Cache），提高计算效率。
   5. 路径依赖与生态系统，OpenAI等领先研究机构率先采用Decoder-only架构并取得成功，形成了技术路径依赖，积累了丰富的经验和工具。

## Reference

1. LLM为什么Decoder only架构  https://www.xiaohongshu.com/discovery/item/67e7bfda000000001c00d7b5
2. ChatGPT https://chatgpt.com/share/67e7d8bb-5428-800c-a0bc-65c930dfc922