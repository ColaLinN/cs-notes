

## 400

https://leetcode.cn/contest/weekly-contest-400

这周周赛第四题非常简单，用 dp 会在 804 / 813 会 TLE 超时。其实一次遍历加 set 就搞定了。 整了好久没有开窍

第四题曾经出现过，所以灵神只给了 2200 分

对应的模版叫 `logTrick`，可以用于 “子序列 AND, OR, GCD, LCM”

参考 127 双周赛灵神题解 【子数组OR 子序列DP【力扣双周赛 127】】 https://www.bilibili.com/video/BV19t421g7Pd/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

## 131 Biweekly

https://leetcode.cn/contest/biweekly-contest-131

距离 AK 就差一点点，738 样例出奇的大。 目测是线段树或者数段数组吧，但不会写只能用二叉树来模拟，超时了

- `1 <= queries.length <= 15 * 104`

![image-20240526003239310](./summary.assets/image-20240526003239310.png)

![image-20240526003059467](./summary.assets/image-20240526003059467.png)



这些术语通常用于编程竞赛或在线判题系统中，用于描述提交代码的结果。以下是每个术语的解释：

1. **ak** (All Kill): 在该竞赛中通过所有题目。也称为“满贯”或“全过”。

2. **ac** (Accepted): 通过该题目。程序成功运行并且输出结果正确。

3. **wa** (Wrong Answer): 错误答案。程序成功运行，但输出结果不正确。

4. **tle** (Time Limit Exceeded): 超时。程序运行时间超过了题目规定的时间限制。

5. **mle** (Memory Limit Exceeded): 超过内存限制。程序使用的内存超过了题目规定的内存限制。

6. **ce** (Compilation Error): 编译错误。程序未能成功编译，通常是由于语法错误或其他编译时错误。



需要学习一下 leetcode 对于 tle 和 mle 的限制

以及需要估算 tle 和 mle 的能力

## 398

做出来了三题

- 第二题、第三题错误了很多次，应该提高自己的构造样例、找到反例、找到特殊样例的能力
- 第四题是有思路的，很明显的状态 dp