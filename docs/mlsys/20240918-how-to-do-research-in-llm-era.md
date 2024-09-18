# How to do research in the era of LLM

大模型时代下做科研的四个思路

【大模型时代下做科研的四个思路【论文精读·52】】 https://www.bilibili.com/video/BV1oX4y1d7X6/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

1. 高效、低成本与轻量 Efficient
   1. 慢的变快，heavy变 lightweight
   2. 例子 PEFT Parameters Efficient Finetuning
      1. 基于 CLIP 预训练模型，固定预训练模型的参数，添加 adaptor 层去优化
      2. 实验做的很全面，有消融实验，也和 sota 做了比较，也在多个数据集和多个模型上印证了效果
2. 借助已有的工作 Existing Stuff new direction
   1. 能不做 pretraining 就不做 pretraining，能做已有的东西就尽量借助已有的东西，用别人预训练好的模型（pretained model）。Clip 出来后，有那么多几百上千的模型出来调用 Clip 的模型去做各种非常有意思的应用。可以选择比较新的研究方向避免竞争，不用去刷榜
   2. 例子：ICLR23 Unsupervised Semantic Segmentation with self-supervised object-centric representations
      1. 借助预训练模型来给无监督的数据集识别目标标记mask、并聚簇分类（自监督），由此训练 Object-Centric 模型
      2. 最终效果超过 sota，且能够学习到新的类别。
3. 易用性 Plug-and-Play 
   1. 尽量做一些即插即用的模块
   2. 可以是模型上的模块，也可以是一个目标函数，新的函数或新的 data augmentation 的方法。简单的东西，能够应用到各种任务上。
   3. 不需要刷榜，选多个 baseilnes，在能够承受的 setting 之下做实验，足以说明有效性，不需要在大数据集上实验。
   4. 例子：MixGen: A New Multi-Modal Data Augmentation
      1. 由来：多模态的论文上基本都没有做数据增广，或者做的不全面，但数据增广在 CV 中是很关键的一环，所以考虑在多模态中思考新的数据增广。
      2. 解决方案：调研发现以前的数据增广确实不合理，所以提出了新的数据增广的方式，图片插值，文本段相加。
4. 数据集，评估与综述 Dataset,  evaluation, and survey
   1. 构建优化数据集
      1. 从头构建需要很多资源（人力物力钞能力），但合并增强已有的数据集，优化已有的数据集就很容易
      2. 例子：BigDetection: A Large-scale Benchmark for Improved Object Detector Pre-training
         1. 每个class都不一样，难点在于怎么merge这些class，怎么去分布这些类别。还有是想做预训练还是想做下游任务，到底想target哪个domain，也决定了你物体的类别到底该多细粒度，
         2. 对新数据集也可以做out of distribution的分析，robustness的分析，few shot zero shot的分析，以及各种测评，提出新的evaluation metrics。
   2. 写一篇以分析评估为主的文章
   3. 写一篇综述论文

