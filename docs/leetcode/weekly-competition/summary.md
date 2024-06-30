## 402

- [x] 1
- [x] 2
- [ ] 3
- [x] 4 (Late Submission, AC after competition finished)

`3/4`

今天11点才开始周赛，半小时ak前两题，自己花了点时间做出来第四题（想不出一个条件看灵神视频讲解发现了）

第三题用 dp 总是超时、或者超出空间。

## 403

- [x] 1
- [x] 2
- [x] 3
- [x] 4 (Late Submission, AC after competition finished)

`4/4`

今天11点才开始周赛，半小时ak前三题，然后花了一小时多才AC第四题， mark 第一次 ac 第四题

![Image](./summary.assets/GQu39GIbYAEMZBt.jpeg)

Abstract

1. Solution:  Array Traversal
   1. around 10 mins，属实不应该
   2. TODO:  python 数组删除元素不熟悉？应该不是，就是手搓太慢了而已
2. Array Traversal
   1. around 10 mins

3. Status DP
   1. around 10 mins
   2. TODO: 状态压缩是什么，为什么叫状态压缩

4. Array Traversal, Enumerate all possibilities
   1. around 1 hour 10 mins
   2. TODO: 
      1. Better solution
      2. 贴瓷砖 https://leetcode.cn/problems/tiling-a-rectangle-with-the-fewest-squares/description/
      3. 蒙德里安的梦想

## 402

- [x] 1
- [x] 2
- [x] 3
- [ ] 4

`3/4`

昨天早上做周赛的时候，第四题虽然看出来是树状数组，但是还是三题早退了，无他，不熟悉罢了。 这周目标加两个，把树状数组和线段树搞明白！

## 401

`2/3`

- [x] 1
- [x] 2
- [ ] 3
- [ ] 4

第三题和第四题是连着的，但是写的 DP 在第三题和第四题总是在最后几个 case 超时。。

## 400

`3/4`

- [x] 1
- [x] 2
- [x] 3
- [ ] 4

https://leetcode.cn/contest/weekly-contest-400

这周周赛第四题非常简单，用 dp 会在 804 / 813 会 TLE 超时。其实一次遍历加 set 就搞定了。 整了好久没有开窍

第四题曾经出现过，所以灵神只给了 2200 分

对应的模版叫 `logTrick`，可以用于 “子序列 AND, OR, GCD, LCM”

参考 127 双周赛灵神题解 【子数组OR 子序列DP【力扣双周赛 127】】 https://www.bilibili.com/video/BV19t421g7Pd/?share_source=copy_web&vd_source=5d4accef9045e3ed4e08bbb7a80f3c70

## 131 Biweekly

`3/4`

- [x] 1
- [x] 2
- [x] 3
- [ ] 4

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

`3/4`

- [x] 1
- [x] 2
- [x] 3
- [ ] 4

做出来了三题

- 第二题、第三题错误了很多次，应该提高自己的构造样例、找到反例、找到特殊样例的能力
- 第四题是有思路的，很明显的状态 dp