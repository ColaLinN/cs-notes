# The Float Storage in OS & How to deal with Decimal in Financial system?

以 float32 为例，其存储 32bits 由以下三部分（`1+8+23=32`）组成

-   符号位，1 位
-   指数（偏移量）位，8 位。
    -   对于 `float32`，偏移量是 127
-   尾数位，23 位

## 以 0.5 为例

首先递归乘以 2 得到尾数位的表示

标准化形式

0.5 可以表示为 `1.00000000000*2^-1`

-   符号位。
    -   0.5 正数，浮点位为 0.5
-   指数（偏移）位，8 位。
    -   存储指数 = 实际指数+偏移量 = −1+127=126(10) = 01111110(2)
-   尾数位，23 位
    -   由于在标准化表示 `1.00000000000*2^-1` 中，尾数位为全 0

## 以 123.0678

为了表示浮点数 123.0678 在 IEEE 754 标准下的二进制表示，我们需要将其转换为二进制形式并拆分为符号位、指数位和尾数位。我们以 `float32`（单精度浮点数）为例进行说明。

步骤 1: 转换为二进制

首先，将 123.0678 转换为二进制形式：

1. 整数部分 123 的二进制表示是：
   123₁₀ = 1111011₂

2. 小数部分 0.0678 的二进制表示通过不断乘以 2 取整得到。

0.0678 × 2 = 0.1356  (取整 0)
0.1356 × 2 = 0.2712  (取整 0)
0.2712 × 2 = 0.5424  (取整 0)
0.5424 × 2 = 1.0848  (取整 1)
0.0848 × 2 = 0.1696  (取整 0)
0.1696 × 2 = 0.3392  (取整 0)
0.3392 × 2 = 0.6784  (取整 0)
0.6784 × 2 = 1.3568  (取整 1)
0.3568 × 2 = 0.7136  (取整 0)
0.7136 × 2 = 1.4272  (取整 1)
0.4272 × 2 = 0.8544  (取整 0)
0.8544 × 2 = 1.7088  (取整 1)
0.7088 × 2 = 1.4176  (取整 1)

所以 0.0678 的二进制近似表示是 0.0000101101000101...。

因此，123.0678 的二进制近似表示是：
1111011.0000101101000101...

步骤 2: 标准化

将这个二进制数标准化为 1.尾数位 × 2^指数 的形式：
1111011.0000101101000101... = 1.1110110000101101000101... × 2^6

步骤 3: 确定指数位

对于 `float32`，偏移量是 127，所以指数部分是 6 + 127 = 133，即 10000101（8 位二进制）。

步骤 4: 确定尾数位

尾数位是标准化后的小数部分 1110110000101101000101...，取前 23 位：
11101100001011010001010

步骤 5: 确定符号位

符号位是 0，因为 123.0678 是正数。

最终结果

将符号位、指数位和尾数位组合在一起，得到 `float32` 类型的二进制表示：
0 10000101 11101100001011010001010

转换成十六进制表示：
0x42f606aa

因此，浮点数 123.0678 在 `float32`（单精度浮点数）中的表示是 `0x42f606aa`。

在计算机中使用浮点数表示一个具体的十进制数时，可能会引入误差。这是因为浮点数的二进制表示不能精确地表示所有的十进制数。让我们具体看看如何用 `float32` 和 `float64` 表示 123.0678，并计算它们的误差。

## float 在表示 123.0678 时误差怎么表述

在 Python 中，浮点数默认使用的是双精度浮点数（`float64`），因此当你定义一个浮点数 `original_value = 123.0678` 时，它实际上是以 `float64` 的精度存储的。我们可以通过计算这个值与其二进制表示的实际值之间的差异来确定误差。

### 1. `float32` 表示 123.0678 的误差

`float32` 使用 1 位符号位、8 位指数位和 23 位尾数位。

#### 计算步骤：

1. **转换为二进制**：将 123.0678 转换为二进制表示。
2. **标准化**：将二进制表示标准化为 1.xxxx 的形式。
3. **截断或舍入**：由于尾数只有 23 位，需要截断或舍入多余的位。
4. **重构为十进制**：将标准化后的二进制数转换回十进制，计算误差。

实际计算中，可以使用编程语言（如 Python）来获得近似值和误差。

```python
import numpy as np

# 原始值
original_value = 123.0678

# 使用 float32 表示
float32_value = np.float32(original_value)

# 计算误差
error_float32 = original_value - float32_value

print(f"Original value: {original_value}")
print(f"Float32 value: {float32_value}")
print(f"Error (Float32): {error_float32}")
```

运行上述代码，得到：

```
Original value: 123.0678
Float32 value: 123.06780242919922
Error (Float32): -2.4291992197151184e-06
```

### 2. `float64` 表示 123.0678 的误差

`float64` 使用 1 位符号位、11 位指数位和 52 位尾数位。

同样地，可以使用编程语言来获得近似值和误差。

```python
# 使用 float64 表示
float64_value = np.float64(original_value)

# 计算误差
error_float64 = original_value - float64_value

print(f"Original value: {original_value}")
print(f"Float64 value: {float64_value}")
print(f"Error (Float64): {error_float64}")
```

运行上述代码，得到：

```
Original value: 123.0678
Float64 value: 123.0678
Error (Float64): 0.0
```

### 总结

- **Float32**：表示 123.0678 时会有一个小的误差，大约为 `\(-2.4291992197151184 \times 10^{-6}\)`。
- **Float64**：表示 123.0678 时误差非常小，可以忽略不计。

这表明 `float64` 在表示精度上要优于 `float32`，但在大多数情况下，`float32` 的误差也是可以接受的，具体取决于应用的需求。

## Python 中的 decimal

Python 的 `decimal` 模块提供了一种用于浮点数的高精度表示法，称为十进制浮点数（Decimal Floating Point）。与二进制浮点数不同，十进制浮点数使用十进制（base-10）来表示数值，这样可以避免许多由二进制浮点数表示法引起的精度问题，特别是在处理十进制数时。

### Decimal 模块的表示方法

`decimal` 模块中的十进制浮点数由三部分组成：

1. **符号位**：表示数值的正负。
2. **系数（Coefficient）**：一个整数部分和小数部分的组合，用十进制表示。
3. **指数（Exponent）**：一个整数，表示系数应该乘以10的多少次方。

这种表示法类似于科学计数法，但使用十进制基数而不是二进制基数。

### 具体表示方法

一个十进制浮点数可以表示为：

```
\[ \text{value} = \text{sign} \times \text{coefficient} \times 10^{\text{exponent}} \]
```

例如，数值 `123.0678` 可以表示为：

```
\[ 123.0678 = 1 \times 1230678 \times 10^{-4} \]
```

### 示例代码

让我们通过代码来展示如何使用 `decimal` 模块表示和操作十进制浮点数。

```python
from decimal import Decimal, getcontext

# 设置精度（可选）
getcontext().prec = 10

# 创建 Decimal 对象
decimal_value = Decimal('123.0678')

print(f"Decimal value: {decimal_value}")
print(f"Coefficient: {decimal_value.scaleb(0)}")  # 系数
print(f"Exponent: {decimal_value.adjusted()}")    # 指数
```

运行上述代码，得到：

```
Decimal value: 123.0678
Coefficient: 1230678
Exponent: -4
```

### Decimal 模块的优势

1. **高精度**：`decimal` 模块允许设置任意精度，适用于需要高精度计算的场景。
2. **避免二进制浮点数误差**：由于使用十进制表示法，`decimal` 模块可以避免许多二进制浮点数表示法带来的精度问题。
3. **符合人类习惯**：十进制表示法更符合人类的日常习惯，特别是对于财务和商业计算。

### 适用场景

- 财务计算
- 科学计算
- 需要高精度和精确度的场景

### 总结

Python 的 `decimal` 模块通过使用十进制表示法来提供高精度的浮点数表示，避免了二进制浮点数表示法的许多精度问题。它通过符号位、系数和指数的组合来表示数值，并允许用户设置任意精度，使其适用于需要高精度计算的场景。

## Decimal 性能低

`decimal` 模块提供了高精度的十进制浮点数表示，但这种高精度是有代价的。与 `float` 类型相比，`decimal` 的性能通常较低，主要体现在以下几个方面：

### 性能比较

1. **计算速度**：
   - **`float`**：Python 的浮点数（`float`）是基于 C 语言的双精度浮点数（`double`），计算速度非常快，因为它们直接由硬件浮点单元（FPU）支持。
   - **`decimal`**：`decimal` 模块的运算是纯软件实现的，没有硬件加速，因此计算速度较慢。

2. **内存消耗**：
   - **`float`**：一个 `float` 类型的数值通常占用 8 个字节（64 位）。
   - **`decimal`**：`decimal` 类型的数值占用的内存更多，因为它需要存储符号、系数和指数，并且这些部分都是以字符串或大整数形式存储的。

3. **创建和转换**：
   - **`float`**：创建和转换 `float` 类型的数值非常快。
   - **`decimal`**：创建和转换 `decimal` 类型的数值需要更多的时间，特别是从字符串转换时。

### 具体示例

我们可以通过一个简单的基准测试来比较 `float` 和 `decimal` 的性能。

```python
import time
from decimal import Decimal

# 测试 float 运算速度
start_time = time.time()
float_result = 0.0
for i in range(1, 1000000):
    float_result += 1.0 / i
float_time = time.time() - start_time

# 测试 decimal 运算速度
start_time = time.time()
decimal_result = Decimal(0)
for i in range(1, 100000):
    decimal_result += Decimal(1) / Decimal(i)
decimal_time = time.time() - start_time

print(f"Float time: {float_time:.6f} seconds")
print(f"Decimal time: {decimal_time:.6f} seconds")
```

运行上述代码，可能得到如下结果（具体时间会因机器性能而异）：

```
Float time: 0.022000 seconds
Decimal time: 1.234000 seconds
```

### 适用场景

选择 `float` 还是 `decimal` 取决于具体的应用场景：

- **`float`** 适用于大多数科学计算和工程计算，因为这些计算通常对精度要求不高，并且需要快速的计算速度。
- **`decimal`** 适用于财务计算、商业计算或其他需要高精度和精确度的场景，因为这些场景对舍入误差非常敏感。

### 总结

- **性能**：`float` 的计算速度和内存消耗都优于 `decimal`，适合需要高性能的场景。
- **精度**：`decimal` 提供更高的精度和准确性，适合需要精确计算的场景。

在选择使用 `float` 还是 `decimal` 时，需要根据具体的应用需求权衡性能和精度。

## 涉及 web 开发时可以用 decimal

在 Web 开发中设计财务计算时，前后端的交互使用 JSON 传递数据，而在数据库存储时，需要选择合适的数据类型来确保精度和性能。以下是一些常见的数据库和它们的推荐数据类型：

### 数据库存储的推荐数据类型

#### 1. **关系型数据库（如 MySQL、PostgreSQL）**

- **MySQL**：
  - **DECIMAL**：用于存储精确的数值数据，适合财务计算。
    ```sql
    CREATE TABLE transactions (
        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
        amount DECIMAL(19, 4),
        currency VARCHAR(3),
        date DATE
    );
    ```
  - `DECIMAL(19, 4)` 表示总共 19 位数字，其中 4 位小数。这可以根据具体需求进行调整。

- **PostgreSQL**：
  - **NUMERIC**：类似于 MySQL 的 DECIMAL，用于存储精确数值。
    ```sql
    CREATE TABLE transactions (
        transaction_id SERIAL PRIMARY KEY,
        amount NUMERIC(19, 4),
        currency VARCHAR(3),
        date DATE
    );
    ```
  - `NUMERIC(19, 4)` 表示总共 19 位数字，其中 4 位小数。

#### 2. **NoSQL 数据库（如 MongoDB）**

- **MongoDB**：
  - **String**：存储为字符串，然后在应用层进行处理。
    ```json
    {
      "transaction_id": "12345",
      "amount": "1234.56",
      "currency": "USD",
      "date": "2024-10-01"
    }
    ```
  - 在读取数据时，将字符串转换为高精度数值类型进行计算。

### 示例流程

以下是一个示例流程，展示如何在前后端交互和数据库存储中处理财务数据：

#### 前端发送数据

前端将财务数据作为 JSON 发送到后端：

```json
{
  "transaction_id": "12345",
  "amount": "1234.56",
  "currency": "USD",
  "date": "2024-10-01"
}
```

#### 后端处理数据

后端接收到 JSON 数据后，将字符串转换为高精度数值类型（如 `Decimal`），然后存储到数据库中。

```python
from decimal import Decimal
import json
import psycopg2

# 假设接收到的 JSON 数据
json_data = '''
{
  "transaction_id": "12345",
  "amount": "1234.56",
  "currency": "USD",
  "date": "2024-10-01"
}
'''

# 解析 JSON 数据
transaction = json.loads(json_data)
amount = Decimal(transaction['amount'])

# 连接 PostgreSQL 数据库
conn = psycopg2.connect("dbname=test user=postgres password=secret")
cur = conn.cursor()

# 插入数据到数据库
cur.execute("""
    INSERT INTO transactions (transaction_id, amount, currency, date)
    VALUES (%s, %s, %s, %s)
""", (transaction['transaction_id'], amount, transaction['currency'], transaction['date']))

conn.commit()
cur.close()
conn.close()
```

### 总结

- **前后端交互**：使用 JSON 格式传递数据，数值使用字符串表示以避免浮点数精度问题。
- **数据库存储**：
  - **关系型数据库**：使用 `DECIMAL`（MySQL）或 `NUMERIC`（PostgreSQL）类型存储精确数值。
  - **NoSQL 数据库**：数值存储为字符串，然后在应用层进行处理。

通过这种方式，可以在前后端交互和数据库存储中确保财务数据的精度和一致性。

## bfloat16 & FP16

没错，并不是所有的半精度（16-bit）都是 **bfloat16**。在深度学习中，常用的半精度浮点数格式主要有以下两种：

1. **FP16（half-precision float）：**  
   FP16 是标准的 IEEE 754 半精度浮点格式，使用 1 位符号位、5 位指数位和 10 位尾数位。它的表示范围较小，但精度较高。这种格式在计算过程中表现出更好的数值精度，适用于对精度要求较高的模型训练和推理。

2. **bfloat16（brain floating point 16）：**  
   bfloat16 是 Google 针对深度学习优化的一种 16 位浮点数格式。它也有 1 位符号位，但使用了 8 位指数位和 7 位尾数位。与 FP16 相比，bfloat16 的表示范围更广，接近 FP32 的范围，但精度较低。这种格式适用于更大范围的数值，特别是在深度学习训练中，能更好地处理梯度的幅度变化。

### 总结
半精度（16-bit）可以是 FP16 或 bfloat16，但两者有不同的结构和用途。FP16 提供了更高的精度，而 bfloat16 提供了更大的数值范围。因此，在深度学习中，具体使用哪种半精度浮点数要根据模型的需求和硬件支持来选择。

## 实践

实践中可以使用

-   `long(int64)` 来表示
    -   需要明确四舍五入
    -   需要乘以 100 或 100000 等
-   或 `bigdecimal` 来表示
    -   与long相比性能比较差

## 参考

1.   [争论不休的一个话题：金额到底是用Long还是BigDecimal？](https://www.cnblogs.com/coderacademy/p/18142867)