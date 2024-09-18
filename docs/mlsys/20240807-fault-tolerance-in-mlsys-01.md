



# Fault Tolerance in LLM Training/Serving Systems

MLSys 有下面几点优化方向，本文主要关注第三点

1. 效率
2. 易用性
3. 稳定性、成本

## 训练中的稳定性、成本优化、集群容错、弹性计算

相关工作	

- [x] Varuna EroSys22 Best Paper
- [ ] Bamboo NSDI23
- [ ] Gemini SOSP23
- [ ] Colossal-AI 2023
- [ ] Oobleck SOSP23
- [ ] TRANSOM: An Efficient Fault-Tolerant System for Training LLMs
- [x] Parcae NSDI24
- [ ] MegaScale NSDI24

### Varuna EroSys'22 Best Paper

简介

- Microsoft 发布的学术项目 https://github.com/microsoft/varuna

  EuroSys22 Best Paper 

- 可扩展的低成本大规模模型训练，解决了买不起 DGX （Nvidia 的大规模 AI 开发计算平台）的问题

问题

- 大模型训练成本高、硬件成本昂贵
- 网络要求高

方案

- 选择基于模型并行、流水线并行
  - 难点：找到流水线阶段数量和数据传输量之间的最佳平衡来节约简带宽

- 以spot instance这种不可靠但租赁成本低下的云实例，在普通网络下训练大模型
  - 难点：spot instance 是可被抢占的、低优先级的、竞价实例。申请要求不一定被满足，可能随时被抢占。需要在spot instance被抢占的情况下，快速决策新的并行训练方案 `=>` varuna 提出了 **快速重部署**


实验效果

- 流水线并行比张量并行需要的数据量更少
  - 训练Transformer模型，流水线并行平均每个显卡x样本需要传输的数据量为张量并行的1/300。

- 在维持大模型训练吞吐的基础上，将大模型的训练成本降低数倍
- `PP (Varuna) v.s. PP (Others)`，`Varuna > Megatron > DeepSpeed`
  - Varuna的流水线并行设计可以更好的应对网络拥塞情况。

- 可扩展性
  - 可以使用102张卡训练多达2000亿参数的模型，每张卡的吞吐为`27.3 TFlops/s/GPU`。（此处作者选择的模型参数取巧，属于非常瘦+长的NLP模型。）


结论

- 如何利用好spot instance低成本、可用资源丰富的的优点，同时解决其不可靠的问题，是Varuna的一大贡献点

`QA/limitation`

1. Megatron在spot VM集群的性能非常差，是否是给Megatron选择了比较差的模型并行策略(这里Varuna选择DP+PP，而Megatron选择DP+TP）?
   1. 也许原因在于Varuna和Megatron设计的出发点不同，Megatron会优先选择TP来节省内存，Varuna由于spot VM场景会优先考虑PP，兼顾内存节省和性能。
2. 为什么Varuna选择不考虑TP（张量并行），或者什么场景下可以不考虑TP维度的并行?
   1. TP会引入高额的通信开销，且通信在关键路径上，因此TP维度的通信往往是在机内使用NVLINK进行数据传输。
   2. Varuna的实验选择了一个非常大的batch size，大的batch size对于PP非常有利，PP的稳定阶段会很长
   3. 能在单卡上放下，就没有必要再考虑TP了。
3. **Varuna是否有考虑到结合大模型训练中的内存节省技术?**
   1. 没有考虑，只是利用了闲散的spot VM中GPU计算和网络资源，通过DP+PP将大模型训练起来，并没有考虑复杂的情况去最大化的利用可获取的资源。如果可用资源不足，那么可能就会等待并申请资源，直到被分配足够的资源才会开始训练。

### Parcae, NSDI24 paper, Proactive, Liveput-Optimized  DNN Training on Preemptible Instances

slide: https://www.usenix.org/system/files/nsdi24_slides-duan.pdf

https://github.com/JF-D/Parcae

- Availability Predictor
- Liveput Optimizer
- Fine-grained Live Migration
  - Intra-stage Migration
  - Inter-stage Migration
  - Pipeline Migration

优势

- Up to 10× higher throughput than checkpoint- and redundancy-based systems

### Colossal-AI

https://arxiv.org/abs/2110.14883

https://colossalai.org/zh-Hans/

## 推理稳定性/系统成本

-   [x] SpotServer ASPLOS'24
-   [ ] Anyscale [link](https://docs.anyscale.com/1.0.0/)
  - Fault Tolerance https://docs.anyscale.com/platform/services/production-best-practices/#avoid-head-node
  - Head node fault tolerance https://docs.anyscale.com/platform/services/head-node-ft
-   [ ] Skylab Any Instance [link](https://github.com/matheussantana/skylab)
-   [ ] MuxServe: Flexible Spatial-Temporal Multiplexing for Multiple LLM Serving https://arxiv.org/abs/2404.02015
-   [ ] DéjàVu  2024, KV-cache Streaming for Fast, Fault-tolerant Generative LLM Serving
-   [ ] 推理服务调度器 https://zhuanlan.zhihu.com/p/713712371
-   [ ] 

2023 年底 SpotServer 是首个面向可抢占集群的 LLM 推理系统

https://arxiv.org/abs/2311.15566

SpotServeR: Serving generative large language models on preemptible instances

### SpotServe: Serving Generative Large Language Models on Preemptible Instances

SpotServe是首个面向Spot Instance场景的LLM Serving System。最近有蛮多工作考虑使用廉价的弹性计算资源来降低AI Infra的成本，尤其是中小企业和个人用户，但主要都是面向大模型训练场景。对于LLM推理，使用Spot Instance的主要挑战就是处理Preemption所导致的Latency过长的问题。SpotServe借助于Re-parallelization和Live Context Migration （包括Params和KV-Cache）技术可以高效应对Preemption，可以实现在平均推理延迟几乎无影响的情况下，降低一半的云计算资源开销。

## Ideas

- [ ] 由于没有太多资源，可以做分布式大模型推理中的成本优化和集群容错
    - [ ] 没卡没资源怎么研究？
- [ ] 推理服务调度器
- [ ] 关注内存消耗？
- [ ] MP、PP、TP 的 分析
- [ ] 最低的要求：survey
- [ ] fault tolerance 的数据集，展现形式
- [ ] LLM 的 部署、推理

    - [ ] 如何多机多卡分布式部署LLM然后进行推理? `=>` 系统成本、容错

        - [ ] 现成的需求：我现在资源有限，量化后的GPTQ模型仍然超显存，有没有什么方法可以解决这个问题呢？我翻了一下午都是多机多卡训练的，没找到多机多卡部署推理的，刚开始学习这些，请大佬们帮帮 https://www.zhihu.com/question/636571157
        - [ ] 多个 LLM 的 serving 已经成为了一个重要且成本高的需求，Multiple LLM serving has emerged as a crucial and costly demand. Want to co-serve multiple LLMs with better utilization?
        - [ ] 由于分割推理与实际应用（如智能手机应用、物联网设备等）紧密相关，您的研究成果可能更容易转化为实际的应用案例，这对于发表论文和获得实习经验都是有益的。
        - [ ] 吐槽一下megatron - ChenShawn的文章 - 知乎
            https://zhuanlan.zhihu.com/p/692015516
        - [ ] 中低端 llm 框架产能过剩
        - [ ] 目前 NVIDIA 都需要根据客户反馈迭代优化大集群基建（卖给客户前 NVIDIA 自己都没有跑过），找到一个可以在多规模集群（GPU），训练都是大公司做，推理相对好一点
        - [ ] fine tune Llama 2 7B: Training a LLM with multiple computers: I’ve been trying to use h2o llm studio for training, and that’s worked ok until I updated my dataset, and now I get OOM errors. 
            - [ ] Links
                - [ ] https://www.reddit.com/r/LocalLLaMA/comments/1bm43yo/comment/kwa9wts/?share_id=OwsDq2zyN8m6cRGinOgxT&utm_content=2&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1
                - [ ] https://www.reddit.com/r/LocalLLaMA/comments/1bvd5z1/training_a_llm_with_multiple_computers/
            - [ ] 关键词：training, multiple computers, OOM errors while update dataset
            - [ ] Low-cost 4-way GTX 1080 with 35GB of VRAM inference PC https://www.reddit.com/r/LocalLLaMA/comments/1fb5sty/lowcost_4way_gtx_1080_with_35gb_of_vram_inference/
            - [ ] problem: how to stably running?
            - [ ] 个人用户，多台小型机器：
                - [ ] colab, kaggle
                - [ ] personal computer
        - [ ] 实际推理过程中，虽然可以返回token，但是也一直在报内存不够的错误。 https://www.53ai.com/news/qianyanjishu/2024070296570.html 苹果自己的MLX框架也推出了distributed的分布式部署方案，还有叫做exolabs的初创团队也披露了基于苹果设备的分布式推理方案（可以同时使用mac，ipad，iphone，甚至watch）
    - [ ] 结合 spotServer, colab, kaggle, mac, android, windows 来做推理
        - [ ] 网络带宽：上有比万兆网口更快的thunderbolt4（雷电4）口
- [ ] 训练
    - [ ] 不同模型+流水线并行分布式训练，梯度压缩





![image-20240908045906858](./20240807-fault-tolerance-in-mlsys-01.assets/image-20240908045906858.png)

##  Terms

- Megatron 系统
- TP 张量并行是什么？是模型并行 MP（算子间并行、算子内并行）吗？
- DGX ？（Nvidia 的大规模 AI 开发计算平台）
- Liveput
- preemption-aware
- 功耗墙，限制 cpu 频率
- 内存墙 memory wall

## Reference

1. Zhihu Articles
   1. **2024年大模型基础设施领域（训练、推理、硬件）有什么值得关注研究方向？ - Hsword的回答 - 知乎**
      https://www.zhihu.com/question/637480772/answer/3370398015
   2. NSDI 2024有哪些值得关注的文章？ - Hsword的回答 - 知乎
      https://www.zhihu.com/question/629886258/answer/3473458005
   3. MLSys 2024 参会“流水账” - Hsword的文章 - 知乎
      https://zhuanlan.zhihu.com/p/698259628
   4. ASPLOS 2024有哪些值得关注的论文？ - Hsword的回答 - 知乎
      https://www.zhihu.com/question/629886104/answer/3487721731
   5. 北大团队自研AI框架“河图”提出稀疏大模型训练新架构 - Hsword的文章 - 知乎
      https://zhuanlan.zhihu.com/p/435089498
   6. 系统论文速读系列 `<EuroSys 23>` Varuna: scalable, low-cost training of massive deep learning models - USTC-NHPCC的文章 - 知乎
      https://zhuanlan.zhihu.com/p/649126947
   7. 机器学习系统MLSys中有哪些比较有前途的研究方向？ - 微调的回答 - 知乎
      https://www.zhihu.com/question/494190733/answer/2247649541
   8. 维护一个大型开源项目是怎样的体验？ - 微调的回答 - 知乎
      https://www.zhihu.com/question/36292298/answer/1987403285
   9. GPU分布式训练推理——Accelerate - 李小肥的YY的文章 - 知乎
      https://zhuanlan.zhihu.com/p/650438817
   10. 如何多机多卡分布式部署LLM然后进行推理? - 知乎
         https://www.zhihu.com/question/636571157
2. Survey
   1. **大模型如何高效部署？CMU最新万字综述纵览LLM推理MLSys优化技术 - Hsword的文章 - 知乎**
      https://zhuanlan.zhihu.com/p/677635306
   2. Efficient Training of Large Language Models on Distributed Infrastructures: A Survey https://arxiv.org/abs/2407.20018 by https://jf-d.github.io/
   3. Deep Learning Workload Scheduling in GPU Datacenters: A Survey https://dl.acm.org/doi/full/10.1145/3638757
   4. Beyond efficiency: A systematic survey of resource-efficient large language models https://scholar.google.com/scholar?cites=6684929392857370268&as_sdt=2005&sciodt=0,5&hl=en
   5. Deep Learning Workload Scheduling in GPU Datacenters: Taxonomy, Challenges and Vision https://arxiv.org/abs/2205.11913
   6. ml-systems-papers https://github.com/byungsoo-oh/ml-systems-papers
   7. Efficient Training of Large Language Models on Distributed Infrastructures: A Survey https://arxiv.org/abs/2407.20018 by https://jf-d.github.io/
3. Existing Works
   1. Fault-tolerant Distributed Training with torch run https://pytorch.org/tutorials/beginner/ddp_series_fault_tolerance.html#further-reading A machine with multiple GPUs 
   2. Parcae: Spot Instance(Fault Tolerance)
   3. GPU分布式训练推理——Accelerate
   4. 拆解一下字节的烧钱工作，MegaScale！ - 蛋糕店的蜡烛的文章 - 知乎
      https://zhuanlan.zhihu.com/p/684712727 veScale https://github.com/volcengine/veScale
   5. Ollama Get up and running with Llama 3.1, Mistral, Gemma 2, and other large language models. https://github.com/ollama/ollama
   6. LocalAI Self-hosted and local-first. Drop-in replacement for OpenAI, running on consumer-grade hardware. No GPU required https://github.com/mudler
   7. MLX: An array framework for Apple silicon https://github.com/ml-explore/mlx
   8. llamafile https://github.com/Mozilla-Ocho/llamafile
   9. llama.cpp https://github.com/ggerganov/llama.cpp
4. Papers
   1. Google Scholar https://scholar.google.com/scholar?start=0&hl=en&as_sdt=2005&sciodt=0,5&cites=6684929392857370268&scipsc=
   1. Parcae https://www.usenix.org/system/files/nsdi24_slides-duan.pdf
   1. On Misbehaviour and Fault Tolerance in Machine Learning Systems  https://arxiv.org/pdf/2109.07989
5. People
   1. Hsword
   2. Chen Tianqi
6. Conference
   1. MLSys
      1. Efficient model training, inference, and serving
      2. Large language model (LLM) training, fine-tuning, and inference 
      3. Testing, debugging, and monitoring of ML applications
   2. ASPLOS
   3. OSDI
   4. SOSP
   5. NSDI
   6. EroSys