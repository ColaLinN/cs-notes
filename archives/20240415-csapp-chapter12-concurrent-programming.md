# 并行编程 Parallel Programming

如果逻辑控制流在时间上重叠，那么它们就是并发的（concurrent）

## 应用级并发编程

1. 访问慢速IO设备
2. 与人交互
3. 推迟工作来降低延迟
4. 服务多个网络客户端
5. 在多核机器上进行并行计算

## 现代操作系统提供三种构造并发程序的方法

1. 进程
   1. 由内核进行调度和维护
   2. 因为进程有独立的虚拟空间，需要用IPC（interprocess communication）来和其他进程进行显式的进程间通信
   3. 劣：进程控制和IPC的开销大，慢
   4. 优：独立地址空间
2. IO多路复用（I/O multiplexing）
   1. 应用程序在一个进程的上下文中显式地调度它们自己的逻辑流
   2. 共享一个地址空间
3. 线程
   1. 其他两种方式的混合体，由内核进行调度和维护
   2. 共享一个地址空间

## 方法1 进程

IPC:

1. 管道
2. 先进先出（FIFO）
3. 系统V共享内存
4. 系统V信号量（semaphore）

## 方法2 基于IO多路复用的并发编程

1. 并发编程：譬如同时监听输入和客户端连接请求
2. 事件驱动的（event-driven）程序。将逻辑流模型化为状态机

实例：现代高性能服务器 Node.js，Nginx，Tornado

优势：

1. 相对于基于进程的并发服务器，基于事件驱动的服务器灵活性更高、更高效（因为不需要进程上下文切换）
2. 共享一个地址空间，流之间共享数据变得容易、GDB调试单个进程很容易

劣势：

1. 编码复杂，控制粒度越细越复杂，因为相当于实现一个类似内核进程管理的东西来管理多个逻辑流
2. 不能充分利用多核处理器？

## 方法1 线程（thread）是运行在进程上下文中的逻辑流

1. 每个进程一开始都是单一线程，即主线程（main thread）
2. 主线程可以创建对等现成（peer thread），一个线程可以杀死任何对等线程，他们都能读写相同的共享数据

优：上下文切换开销少
Posix线程（Pthreads）是C程序中处理线程的一个标准接口

并行编程中，同步开销巨大，线程越多，在同步互斥中花的时间也许会更多。线程多不是好事，比如线程数多于内核数就会有反效果。

其他概念：

1. 线程安全性（thread safety），线程安全（thread-safe）被多个线程反复调用都能产生正确的结果，反之我们称为线程不安全（thread-unsafe）
2. 可重入函数（reentrant function），被多个线程调用时，不会引用任何共享数据
3. 在线程中调用已存在的库函数
   1. 有些库函数是线程不安全的。 固然可以用”加锁-复制“来解决，但是
      1. 加锁开销大
      2. 复杂结构复制开销大
      3. 加锁-复制对有些像rand函数的（依赖跨越调用的静态状态的第二类函数）函数并不用有效
   2. Linux为线程不安全的函数提供了可重入版本，以”_r“后缀结尾
4. 竞争（race）
5. 死锁（deadlock）
   1. 应用顺序加锁，再顺序释放锁的顺序规则来避免死锁

## 协程（go routine）

## Reference

1. CSAPP: Chapter12 Optimize Program Performance

