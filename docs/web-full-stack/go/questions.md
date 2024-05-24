

可以使用 Go 自带的命令: `go tool compile -N -l -S hello.go`, 将代码翻译成对应的汇编指令。

或者，直接可以使用 `Compiler Explorer` 这个在线工具。对于上述示例代码可以直接在这个链接看其汇编结果: [go.godbolt.org/z/3xw5Cj](https://go.godbolt.org/z/3xw5Cj)。如下图：



1. [Golang 源码分析计划](https://www.cyhone.com/go_internal/)
2. [Goroutine vs coroutine, thread and Process](https://stackoverflow.com/questions/18058164/is-a-go-goroutine-a-coroutine)
3. [Go 1.18 泛型全面讲解：一篇讲清泛型的全部](https://segmentfault.com/a/1190000041634906)
4. 

-   说一说对slice的认识
-   slice如何做深拷贝