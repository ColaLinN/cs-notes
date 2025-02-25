# Golang Type System

## 基本类型 Basic Types

如下所示，有17种预先定义的built-in types

- Built-in string type: `string`.
- Built-in boolean type: `bool`.
- Built-in numeric types:
  - `int8`, `uint8` (`byte`), `int16`, `uint16`, `int32` (`rune`), `uint32`, `int64`, `uint64`, `int`, `uint`, `uintptr`.
    - Note, `byte` is a built-in alias of `uint8`, and `rune` is a built-in alias of `int32`.
  - `float32`, `float64`.
  - `complex64`, `complex128`.

通过反射也可以获取，如整数、浮点数、布尔值等。通过 reflect.TypeOf() 获取基本类型的信息。

```go
var x int = 42
t := reflect.TypeOf(x)
fmt.Println(t.Kind()) // 输出：int

var y float64 = 3.14
t2 := reflect.TypeOf(y)
fmt.Println(t2.Kind()) // 输出：float64
```

## 复合类型 Composite Types

### 函数（function）

function也是一种类型，可以通过反射获取函数的签名（参数和返回值类型）。

```go
f := func(a int, b int) int {
    return a + b
}
t := reflect.TypeOf(f)
fmt.Println(t.Kind())    // 输出：func
fmt.Println(t.NumIn())   // 输出：2 (函数的输入参数个数)
fmt.Println(t.NumOut())  // 输出：1 (函数的输出参数个数)
```

### 指针（pointer）

pointer是指向某个值的地址类型。通过反射，我们可以检查指针类型及其指向的元素类型。

```go
var ptr *int
t := reflect.TypeOf(ptr)
fmt.Println(t.Kind())    // 输出：ptr
fmt.Println(t.Elem())    // 输出：int (指针指向的类型)
```

### 接口（interface）

接口是定义行为的类型，它定义了一组方法集，但并不实现这些方法。接口类型可以通过反射 `reflect.TypeOf()` 获取类型信息，判断一个变量是否实现了该接口。

```go
type Shape interface {
    Area() float64
}

var s Shape
t := reflect.TypeOf(s)
fmt.Println(t.Kind()) // 输出：interface
```

### 结构体（struct）

结构体是一个数据类型，它可以包含多个字段（数据成员）。通过反射，可以动态地获取结构体字段的名称、类型以及字段值等信息。

```go
type Rectangle struct {
    Width, Height float64
}

r := Rectangle{Width: 3, Height: 4}
t := reflect.TypeOf(r)
fmt.Println(t.Kind()) // 输出：struct
fmt.Println(t.Name()) // 输出：Rectangle

// 获取结构体字段信息
for i := 0; i < t.NumField(); i++ {
    field := t.Field(i)
    fmt.Printf("Field %d: %s, Type: %s\n", i, field.Name, field.Type)
}
```

### 数组（array）

数组是固定大小的元素序列。通过反射，我们可以获得数组的大小和元素类型。

```go
arr := [3]int{1, 2, 3}
t := reflect.TypeOf(arr)
fmt.Println(t.Kind())  // 输出：array
fmt.Println(t.Len())   // 输出：3 (数组长度)
fmt.Println(t.Elem())  // 输出：int (数组元素类型)
```

### 切片（slice）Container Types

切片是一种动态数组，可以在运行时增长或缩小。切片与数组类似，但其大小是可变的。

```go
slice := []string{"apple", "banana", "cherry"}
t := reflect.TypeOf(slice)
fmt.Println(t.Kind()) // 输出：slice
fmt.Println(t.Elem()) // 输出：string (切片元素类型)
```

### 映射（map）Container Types

映射是一个无序的键值对集合。反射可以用于获取映射的键和值的类型。

```go
m := map[string]int{"one": 1, "two": 2}
t := reflect.TypeOf(m)
fmt.Println(t.Kind())    // 输出：map
fmt.Println(t.Key())     // 输出：string (映射的键类型)
fmt.Println(t.Elem())    // 输出：int (映射的值类型)
```

## 类型定义

自从Go 1.9，类型定义（type alias declaration）可分为

1. type definition declaration

2. type alias declaration

如下，使用type关键字做type definition declaration，指定的名字成为type的标识符

```
// Define a solo new type.
type NewTypeName SourceType

// Define multiple new types together.
type (
	NewTypeName1 SourceType1
	NewTypeName2 SourceType2
)
```

## struct和interface之间的转换

- **结构体 → 接口**：如果结构体实现了接口定义的所有方法，那么可以将结构体类型的变量赋值给接口变量。
  - 这种转换是隐式的，如`var s Shape = r`，不需要显式的类型转换。
- **接口 → 结构体**：要将接口转换为具体的结构体类型，需要使用类型断言（type assertion）。
  - 直接使用 `v := Shape(newRect)` 来将接口转换为另一个接口，如果 `newRect` 没有实现 `Shape` 接口，会导致程序发生 panic。
  - 类型断言是 Go 语言中的一个机制，允许检查一个接口变量是否持有某种类型的值。`v, ok := newRect.(Shape)` 这种写法用于判断 `newRect` 是否实现了 `Shape` 接口。

## 如何判断某个struct是否实现了interface？

通过 `reflect.TypeOf()` 和 `Implements()` 方法，可以动态检查一个类型是否实现了接口的所有方法。

1. `Implements` 用于检查某个类型是否实现了指定的接口。
   - 对于 `Rectangle` 和 `Circle`，都会返回 `true`，因为它们分别实现了 `Shape` 接口中的 `Area` 方法。
   - 对于 `int` 类型，返回 `false`，因为 `int` 并没有实现 `Shape` 接口。
   - 需要提供一个接口的反射类型作为 `Implements` 方法的参数，通常可以通过 `reflect.TypeOf((*Interface)(nil)).Elem()` 获取接口的反射类型。
2. `reflect.TypeOf(r)`：获取变量 `r`（类型为 `Shape`，但实际是 `Rectangle`）的反射类型。
3. `reflect.TypeOf((*Shape)(nil)).Elem()`：返回 `Shape` 接口的反射类型。

示例 https://go.dev/play/p/MnP5-G6aP8i

```go
package main

import (
	"fmt"
	"reflect"
)

type Shape interface {
	Area() float64
}

type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return 3.14 * c.Radius * c.Radius
}

func main() {
	var r Shape = Rectangle{Width: 3, Height: 4}
	var c Shape = Circle{Radius: 5}

	// 获取反射类型
	rectType := reflect.TypeOf(r)
	circleType := reflect.TypeOf(c)

	// 判断 Rectangle 类型是否实现了 Shape 接口
	fmt.Println(rectType.Implements(reflect.TypeOf((*Shape)(nil)).Elem())) // 输出: true

	// 判断 Circle 类型是否实现了 Shape 接口
	fmt.Println(circleType.Implements(reflect.TypeOf((*Shape)(nil)).Elem())) // 输出: true

	// 判断一个非接口类型是否实现了接口
	// 例如，检查 int 类型是否实现了 Shape 接口
	intType := reflect.TypeOf(42)
	fmt.Println(intType.Implements(reflect.TypeOf((*Shape)(nil)).Elem())) // 输出: false
}
```



## Reference

1. Go Slices: usage and internals https://go.dev/blog/slices-intro
2. Go Type System Overview https://go101.org/article/type-system-overview.html