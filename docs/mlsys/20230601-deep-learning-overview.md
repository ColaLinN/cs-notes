

# Deep Learning Overview

## ML/DL知识点导览

- 机器学习
  - 概论
    - 有监督学习和无监督学习
    - 模型评估与模型选择
      - 训练测试误差
      - 过拟合与模型选择
      - 正则化与交叉验证
    - 标注问题
    - 泛化能力
  - 分类
  - 聚类（非监督学习）
    - K-means
    - Hierarchical Clustering and Transformations
    - Density-Based Clustering
    - Cluster Quality
  - 关联规则 Association Rule
  - 回归
  - 经典模型
    - 线性回归，逻辑回归
    - 感知机
    - KNN
    - 朴素贝叶斯
    - 决策树
    - 支持向量机 SVM
    - 提升方法 AdaBoost 算法
    - 隐马尔可夫模型
- 深度学习
  - 特征工程
  - 多层感知机 MLP
  - 卷积神经网络 CNN
  - 现代卷积神经网络 AlexNet GoogleLeNet etc
  - 循环神经网络 RNN 序列模型、语言模型
  - 现代循环神经网络
    - 门控循环单元 GRU
    - 长短期记忆网络 LSTM
    - 深度循环神经网络
    - 双向循环神经网络
    - 编码器与解码器
    - 序列到序列学习
  - 注意力
    - 注意力机制 Attention
    - 使用注意力机制的Seq2Seq
    - 自注意力和位置编码
    - BERT
  - 应用分类
    - 计算机视觉
      -   人脸识别
      -   体态识别
      -   无人驾驶
      -   图片合成
      -   超分辨率
      -   医学图片
    - 自然语言处理
      -   文本分类
      -   文本合成
      -   文本摘要
      -   实体命名识别
    - 图神经网络
    - 时序数据
    - 强化学习
    - 音频
    - 推荐系统
    - 多模态
    - LLM
      - AIGC
      - 代码生成

## 深度学习思维导图（v0.1）

1.   算法模型
     1.   分类器
          1.   KNN K-Nearest Neighbor
     2.   线性分类器（线性神经网络）
          1.   线性回归 Linear Regression
               1.   y = xw +b
               2.   输出实数，自然区间。
               3.   有显示解，单层神经网络的基础
               4.   一根线是怎么分类的呢？
          2.   Softmax回归
               1.   Softmax是一个操作子 = exp(xi)/sum(exp(x))
               2.   是多类分类模型
               3.   输出概率
               4.   用Cross Entropy 交叉熵损失
     3.   SVM support vector machine 支持向量机
          1.   f(x) = wx+b (x为n，w可以为n*m，生成m个score，然后依score分类)
          2.   Loss = 1/nΣΣmax(0, xi - xj + 1)+λΣΣ
          3.   输入一x[], 输出各类别的值，s1，s2，s3
     4.   感知机 Perceptron Learning Algorithm(PLA)，是一个二分类模型。神经元，只输出1、-1
          1.   o =σ(<w, x>) +b) = σ(X)
               -   1 if X in σ > 0
               -   -1 otherwise
          2.   损失函数为：max(0, -yX)
               1.   所以正确为0，错误>0
          3.   收敛定理。
          4.   不能拟合XOR函数 -> 第一次AI寒冬
     5.   多层感知机
          1.   非线性激活函数，即单层感知机的σ，使得多层感知机不再线性。
               1.   sigmoid(x) = 1 / (1 + exp(-x))
               2.   tanh(x) = (1 - exp(-2x)) / (1 + exp(-2x))
               3.   rectified linear unit ReLU(x) = max(x, 0)  不用做指数运算，快
2.   一些概念
     1.   预处理
          1.   正则化 regulation
               1.   log
               2.   处理成id
               3.   L1
               4.   L2
     2.   优化
          1.   损失函数 Loss Func
               1.   L1
               2.   L2 均方误差
               3.   Cross Entropy 交叉熵损失
          2.   SGD 随机梯度下降法
               1.   随机批量来近似损失
               2.   无偏损失
               3.   单个样本的梯度期望和所有样本的1/n梯度期望差不多
          3.   学习率
          4.   拟合结果
               1.   过拟合、欠拟合
          5.   权重衰减
          6.   Dropout
     3.   超参数
          1.   学习率的大小
               1.   问题：学习率太大了有什么后果呢？梯度爆炸
          2.   随机梯度下降
          3.   epoch大小
          4.   w、b的初始化
          5.   对于CNN有新的超参数
               1.   步幅
               2.   填充
               3.   输出通道是卷积层的超参数
     4.   其他的概念
          1.   链式法则求导的计算图 in Tensor/Torch/
          2.   反向求导 Backpropagation
          3.   One Hot Encoding 一位有效编码，均方损失
          4.   概率论：均值、方差 、正态分布、似然估计、y_hat?
          5.   MLP好调，如果调出来效果不好可以继续用更好的进阶模型比如CNN，RNN，LSTM，Transformer。
               1.   SVM可能效果好，但是
          6.   xi是数，yi是类
          7.   梯度裁剪：防止梯度爆炸或梯度消失，减少一个批次的训练对模型参数的影响，赋予模型一定程度的稳定性

## 参考

1. Limu 动手学习深度学习
2. Standford cs231n 
3. NUS CS5228
4. 统计学习方法
