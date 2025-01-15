# Prefill和Decode的分析

## Transfomer的批处理效应剖析

模型一开始接收Prompt，模型处理这个提示，生成第一个输出词元（Token），并且缓存生成的KVCache，称之为prefill阶段、初始化阶段（Inital Stage）。之后把前一个词元输入模型，输出下一个词元并更新KVCache，直到输出结束词元。这个过程我们称之为自回归（Auto Regression）。

1. 从GPU内存拷贝数据到GPU寄存器的过程是会有IO消耗的，这包括base_model、KV Cache和临时变量的加载等等。
2. 矩阵乘法
   1. 对于更高维度的矩阵乘法，向量矩阵乘发在除了最后一个维度之外的所有维度上进行广播。GPU如何执行批处理矩阵乘法，以计算KQV向量的X@Wk为例，在计算(b, s, h)@(h, h)时，会将x(b, s, h)重塑reshape为(bs, h)，计算完成再将(bs, h)重塑为(b, s, h)
3. transformer arithmetic文章中的flops和memory加载时间都是对于一个token而言的，其没有提到seq_len，是因为其将seq_len和batch_size统一在一起了，统称B。这是有道理的，在prefill阶段存在批处理效应，seq一起输入就是一种批处理了。在decode阶段也存在批处理效应，不过因为自回归的原因，seq_len都为1，只能去增大batch_size来增加处理的计算量。
4. 所以arithmetic文章中会把`Af/Amb=312/1.5=208` 个tokens作为一个衡量的指标，因为一般来说token的数量是不多的，内存加载很快时间不变，但计算量会随着token的增大而增大。
5. 批处理效应：将一个操作所需的`FLOPS/IO`的比值看做计算强度，一般来说计算强度越大，越能够有效利用GPU的计算能力。要将程序从momory bound优化为flops bound。
6. 内存使用
   1. 一般来说context(seq_len) `<2048`小于d_model，一般是`4096`，所以一般来说d_model的二次方会比seq_len的影响更大
   2. 由于softmax在预测阶段的flops和IO都是O(ns^2)级别，所以长context会带来大量的操作和内存需要。比方说seq_len为16384，注意力头n为32，其临时内存占用为`32*16384^2*sizeof(float16)`，约为16GB
   3. `softmax(QK_T)V`和QKV只使用为 `s*d_model=`
   4. 可以计算出KV Cache中一个token (s, d_model)所占的空间
7. prefill初始化阶段中
   1. 自注意力中的密集层（WKVZ）、FFN的密集层
      1. Flops是`O(bsh^2)`，而IO是`O(2bsh+h^2)`，其比值约为`O(1/(1/h+1/bs))`，
      2. h固定，而b或s越大，批处理效应越强。
   2. 自注意力层`softmax(QK_T/d^1/2)*V`
      1. 这层的Flops为`O(bs^2nd)`，IO为`O(2bsnd+bs^2n)`，比值为`O(1/(1/s+1/d))`。
      2. d值固定，所以s越大，批处理带来的提升越大。
8. decode自回归阶段中
   1. 自注意力中的密集层（WKVZ）、FFN的密集层
      1. Flops是`O(bh^2)`，而IO是`O(2bh+h^2)`，其比值约为`O(1/(1/h+1/b))`，
      2. 与prefill相同，h固定，而b或s越大，批处理效应越强。
      3. 这里批处理能带来的大幅效率提升。
   2. 自注意力层`softmax(QK_T/d^1/2)*V`
      1. 这层的Flops为`O(bsnd)`，IO为`O(bsnd+bsn+bnd)`，比值为`O(1/(1/s+1/d))`。
      2. 由比值可见，批处理在这里并没有什么作用。
9. 批处理
   1. 密集层和自注意层
      1. 批处理效应对于密集层的提升很大，对自注意层则没有太多帮助，对整个模型的推理提升很大。
   2. prefill和decode
      1. prefill阶段可以在seq层级进行batch，batching对于prefill的提升不大
      2. decode阶段由于每一次只能够处理一个token，多轮自回归下来比prefill阶段的时间开销大得多。
      3. 批处理对于decode的提升帮助很大。



作者做了很多实验

1. 微基准实验
2. 端到端的实验

评论说可以直接估算，可以不用做实验，会发现瓶颈在读weights的显存带宽。weights和kv cache总量除显存带宽就可以了，和一次单batch单token预测的latency很接近。

## LLM推理做chunked prefill，捎带decode

基于 chunked prefill 理解 prefill 和 decode 的计算特性 - Chayenne Zhao的文章 - 知乎
https://zhuanlan.zhihu.com/p/718715866

《SARATHI: Efficient LLM Inference by Piggybacking Decodes with Chunked Prefills》

要点

1. prefill通常是compute bound，GPU利用率高。decode是memory bound，GPU利用率低。
2. decode的单个token的开销远远高于prefill阶段
3. Tensor Parallize 卡间通讯需求大，而 Pipeline Paralize 需要不断优化 pipeline bubble。
4. Chunked Prefill
   1. 将请求的prompt拆成长短一致的chunk进行多机器并行处理
   2. 在prefill的bubble中捎带decode或下一个请求的prefill
5. 为做了 chunk 之后，可以在 chunk 的 bubble 处捎带 decode 请求。这么做是有利于 decode 的，因为 decode 的 memory 开销除了要从 GPU memory 中 fetch KV Cache 之外，还有一部分开销是要 fetch 模型参数。通过捎带的 decode 的耗时会显著降低到原本的 10%。
6. 通过reuse model parameters来降低了decode的开销，也减少了pipeline bubble的影响。



## Pytorch将张量的第一维视为batch_size

PyTorch 会自动将张量的第一维视为 `batch_size`，即批次大小。默认情况下，PyTorch 的大多数神经网络模块（如 `nn.Linear`、`nn.Conv2d` 等）和操作（如 `torch.mean`、`torch.sum` 等）会沿着第一维进行并行计算，通过批次维度同时传入模型。，从而让整个批次的样本同时通过模型。

1. **批次张量的创建**：在数据预处理或加载阶段，通常会将多个样本（图像、序列等）打包成一个批次张量。例如，一个形状为 `(batch_size, 3, 224, 224)` 的张量表示一个包含 `batch_size` 个样本的图像批次，每个图像的通道数为 3，大小为 `224x224`。

2. **并行计算**：当批次张量输入到模型的 `forward` 方法中时，PyTorch 会自动沿批次维度进行广播，逐样本地对每个样本执行相同的计算。例如，对于 `nn.Linear` 层的前馈操作，它会对批次中的每个样本应用相同的权重矩阵。

3. **自动微分和批次处理**：通过批次操作，PyTorch 能高效地利用 GPU 加速。批次操作可以充分利用 GPU 的并行计算能力，并在反向传播过程中同时计算每个样本的梯度。这在训练过程中可以提高计算速度并稳定模型的更新。

以下是一个简单示例，展示了如何用批次张量输入并同时处理多个批次：

```python
import torch
import torch.nn as nn

# 定义一个简单的全连接层
class SimpleModel(nn.Module):
    def __init__(self, input_size, output_size):
        super(SimpleModel, self).__init__()
        self.fc = nn.Linear(input_size, output_size)
    
    def forward(self, x):
        return self.fc(x)

# 实例化模型
model = SimpleModel(input_size=10, output_size=5)

# 创建一个包含 32 个样本的批次，每个样本的特征向量大小为 10
batch_input = torch.randn(32, 10)

# 通过模型进行前向传播，计算同时应用于 32 个样本
output = model(batch_input)

# 输出形状：torch.Size([32, 5])
print(output.shape)
```

在这个示例中，`batch_input` 是一个包含 32 个样本的张量（即 `batch_size=32`），每个样本具有 10 个特征。在前向传播时，模型的 `fc` 层会同时对这 32 个样本应用相同的权重，并生成一个形状为 `(32, 5)` 的输出，表示每个样本的 5 个输出特征。

这种批次处理方式让模型在 GPU 上高效运行，因为 GPU 能够一次性处理整个批次的数据，极大地提高了并行计算能力，降低了训练和推理的时间。
