

# Transformer Inference Arithmetic

这篇文章介绍了 Transformer 模型中推理参数量、延时的计算，没有复杂的数学推导，与实验效果类似，有助于对 Transformer 有深入的理解。

前置知识：

-   对 Transformer 的基本理解 [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
-   参数计算的知识，[LLM Parameter Counting](https://kipp.ly/transformer-param-count/)

## LLM Parameter Counting by kipply

模型训练过程中的权重的参数都是浮点数，通常是 2 bytes 因为目前大部分训练都是在 half-precision（bfloat） 下进行的。2020 年 的 GPT-3 Paper 使用了 half-precision，注意不是所有的半精度都是 bfloat。

解码器由 self-attention 层与 FFN 层组成，权重大小如下

1.   self-attention 自注意力层
     1.   `Wq, Wk, Wv` 权重矩阵，其尺寸为 `(d_model, n_heads, d_head)`, 被用来把 input 映射成 QKV 向量
     2.   `Wo` 权重矩阵，其尺寸为 `(d_model, n_heads, d_head)`, 用于 self-attention 层的输出，接下来会传入 MLP 层（用于把拼接的 Z 映射为输出的 Z）
     3.   所以这层的权重大小为 `3*(d_model*n_heads*d_head)+d_model*n_heads*d_head=3*d_model*n_model+d_model*n_model=4*d_model^2`
     4.   实践中，（Attention Is All You Need），`d_model` （也即 d_embedding 的尺寸）为 512，`n_deads` 为 8，`d_head` 为 64（在大多数 Transformer 架构中，`d_head*n_head=d_model`；d_head 也称为 Key/Value Size）
2.   MLP 多层感知机，也称为 Linear Layer 线性层，FFN Layer 前向反馈层
     1.   这部分有两个全连接层，第一层大小为 `d_model*(4*d_model)=d_model^2*4`， 第二层大小为 ` (4*n*d_model)*d_model=d_model^2*4`，
     2.   所以这层的权重是两个 `d_model^2*4` 矩阵，总大小为 `d_model^2*8` ⭐️
     3.   实践中，MLP 层的隐藏层大小是 d_model 的 4 倍，即 `512*4=2048 `。每层都有一个偏置向量（此处不表），第一层偏置向量的大小为 `4*d_model`，第二层偏置向量的大小为 `d_model`，总计为 `5*d_model`
3.   Layer Normalization 层（此处不表），大小为 `d_model`
     1.   归一化权重（Layer Norm Weights）：用于层归一化的缩放参数。
     2.   归一化偏置（Layer Norm Biases）：用于层归一化的偏移参数。

在忽略偏置向量权重的情况下，可以计算模型的总权重如公式所示，

-    `4*d_model^2+8*d_model^2=12*d_model^2`，得到 

-   其中 nlayers 为 64，应该是堆叠编码器个数
-   d_model 则是上面提到的 input_embedding 的大小

![image-20241001113044239](20241001-transformer-inference-arithmetic.assets/image-20241001113044239.png)

以上的计算还忽略了 Layer Normalization `d_model` 的参数，MLP 的偏置参数，以及位置编码的参数（在 GPT2 和原始 Transformer 中为 `n_ctx+d_model`，在Gopher 280B 模型中，有 21.5B 个参数用于相对位置编码）

## LLM Parameter Counting by ChatGPT

在一个深度学习模型中，特别是像GPT这样的变压器模型，每个“块”通常包含以下组件。每个块（或层）通常包括一个自注意力层和一个前馈神经网络层。以下是每个块中的主要权重和参数：

### 1. 自注意力层（Self-Attention Layer）

- **查询权重（Query Weights）**：用于生成查询向量的权重矩阵。
- **键权重（Key Weights）**：用于生成键向量的权重矩阵。
- **值权重（Value Weights）**：用于生成值向量的权重矩阵。
- **输出权重（Output Weights）**：用于将注意力机制的输出映射回原始维度的权重矩阵。

### 2. 前馈神经网络层（Feedforward Layer）

- **第一层权重（Feedforward Layer 1 Weights）**：用于第一个线性变换的权重矩阵。
- **第一层偏置（Feedforward Layer 1 Biases）**：用于第一个线性变换的偏置向量。
- **第二层权重（Feedforward Layer 2 Weights）**：用于第二个线性变换的权重矩阵。
- **第二层偏置（Feedforward Layer 2 Biases）**：用于第二个线性变换的偏置向量。

### 3. 层归一化（Layer Normalization）

- **归一化权重（Layer Norm Weights）**：用于层归一化的缩放参数。
- **归一化偏置（Layer Norm Biases）**：用于层归一化的偏移参数。

### 具体参数和维度

#### 自注意力层

- \( W_Q \)：查询权重矩阵，尺寸为 \((d_{\text{model}}, d_k)\)。
- \( W_K \)：键权重矩阵，尺寸为 \((d_{\text{model}}, d_k)\)。
- \( W_V \)：值权重矩阵，尺寸为 \((d_{\text{model}}, d_v)\)。
- \( W_O \)：输出权重矩阵，尺寸为 \((d_v, d_{\text{model}})\)。

#### 前馈神经网络层

- \( W_1 \)：第一层权重矩阵，尺寸为 \((d_{\text{model}}, d_{\text{ff}})\)。
- \( b_1 \)：第一层偏置向量，尺寸为 \((d_{\text{ff}})\)。
- \( W_2 \)：第二层权重矩阵，尺寸为 \((d_{\text{ff}}, d_{\text{model}})\)。
- \( b_2 \)：第二层偏置向量，尺寸为 \((d_{\text{model}})\)。

#### 层归一化

- \( \gamma \)：归一化权重，尺寸为 \((d_{\text{model}})\)。
- \( \beta \)：归一化偏置，尺寸为 \((d_{\text{model}})\)。

其中，\( d_{\text{model}} \) 是模型的隐藏层维度，\( d_k \) 是查询和键的维度，\( d_v \) 是值的维度，\( d_{\text{ff}} \) 是前馈神经网络的隐藏层维度。

这些权重和参数在训练过程中通过反向传播算法进行调整，以最小化损失函数，从而使模型能够有效地执行其任务。

## 细分目录

-   KV Cache 解释了缓存 Self-attention 向量带来的性能提升，带来的权衡（tradeoffs）和成本。
-   Capacity 介绍了 KV Cache 的存储成本，把它与模型权重存储联系起来，讨论 capacity 对性能的影响
-   Model Parallelism 介绍了张量并行以及通信成本
-   Latency

## KV Cache







## Reference

1.   [Transformer Inference Arithmetic by kipply 2022](https://kipp.ly/transformer-inference-arithmetic/)
2.   [LLM Parameter Counting by kipply 2022](https://kipp.ly/transformer-inference-arithmetic/)