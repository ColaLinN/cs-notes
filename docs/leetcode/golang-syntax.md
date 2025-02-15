---
sidebar_position: 4
tags: [leetcode]
---



# Go常用语法 Golang Syntax

```go
1. var i int = 0
   1. is this a good written way? `var j int = `
   2. is it efficient?
2. var res = make([]int, 0)
3. for i < j
4. res  = []int{i+1, j+1}
5. res =  append(res, a, b, c)
6. var res = make([][]int, 0)
7. sort.Ints(nums)
8. `for i, v := range pow {}`
9. map := make(map[int]bool)
10. `if x, found := res["strID"]; found {
```

取商取余

```go
package main

import "fmt"

func main() {
    dividend := 7
    divisor := 3
    quotient := dividend / divisor
    remainder := dividend % divisor
    fmt.Println("Quotient:", quotient)   // 输出 Quotient: 2
    fmt.Println("Remainder:", remainder) // 输出 Remainder: 1
}
```

