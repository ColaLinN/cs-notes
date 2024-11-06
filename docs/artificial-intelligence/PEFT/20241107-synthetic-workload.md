

# Generate Synthetic Workload 

为了对LLM实验中请求模式进行仿真，我们需要构造工作负载轨迹（Workload traces）。

在多LoRA Adapter的场景下，有以下重要的参数

- Adapter的数量 `n`
- 请求速率 `R`，所有请求的每秒请求数
- 对每个adapter的请求数量
  1. 长尾分布（幂律分布）
- 请求的间隔
  1. 使用Gamma Arrival Process 来建模
- 输入输出长度 `len_input|prompt, len_output`
  1. 均匀分布 `U[Il, Iu]` 
  2. 长尾分布（幂律分布）
- 请求时长 `duration`
  - 一般可以设定一个固定值（？）



- Adapter的数量 `n`
- Gamma Arrival Process（Gamma到达过程）建模每个Adapter的请求到达间隔。用于控制请求到达的时间模式和波动性。比传统的泊松分布能更准确地描述真实请求分布
  - 变异系数 `cv` = 标准差 / 均值。它描述请求间隔的波动性、请求到达的规律性，cv 越大，间隔时间的波动性越大，cv 越小，请求到达越均匀。
- 幂律分布建模的是所有适配器之间的请求速率的分布，用于描述不同适配器之间的负载差异
  - 设第 i 个 adapter 的请求速率 `λi`
  - 指数 `α` 控制了不均匀性（少数Adapter的请求多，大多数Adapter的请求低。）当 `α` 较小，Adapter之间的差异较大，意味着少数Adapter的请求量会非常高。当 α 较大，请求的分布更加均匀，Adapter之间的差异减小
- 总请求速率 `R`。R 表示系统中所有适配器的总请求速率，单位为每秒请求数
  - 所有适配器的请求速率 `λi` 的总和等于 `R`
- 输入输出长度。每个请求的输入和输出数据长度分别从均匀分布 `U[Il, Iu]` 和 `U[Ol, Ou]` 中抽样
- 默认请求时长（Duration）为 5 分钟