---
sidebar_position: 2
title: Python Frequently Used Syntax
tags: [leetcode]
---

## Built-in Types

Python3 的六个标准数据类型中：

- **不可变数据（3 个）：**Number（数字）、String（字符串）、Tuple（元组）；
- **可变数据：均为序列（3 个）：**List（列表）、Dictionary（字典）、Set（集合）。

python 函数的参数传递：

- **不可变类型：**类似 c++ 的值传递，如 整数、字符串、元组。如fun（a），传递的只是a的值，没有影响a对象本身。比如在 fun（a）内部修改 a 的值，只是修改另一个复制的对象，不会影响 a 本身。
- **可变类型：**类似 c++ 的引用传递，如 列表，字典。如 fun（la），则是将 la 真正的传过去，修改后fun外部的la也会受影响

### Numeric Types

```python
a, b, c, d= 10,10.0,True,3+4j
print(type(a),type(b),type(c),type(d))
# <class 'int'> <class 'float'> <class 'bool'> <class 'complex'>

del(a,...)
```

### Bool

### **String**

Iterate over the character in a string

```python
# Approach 1
for i in range(len(wordStr)):
	print(wordStr[i])
# Approach 2
for c in word:
  print(c)
```

Python 字符串不能被改变。向一个索引位置赋值，比如word[0] = 'm'会导致错误。

切片一个点是：左起点包含，终点不包含

```python
a="1234567891"
print(a[0]) #1
print(a[2:5]) #345
print(a[0:-3]) #1234567
print(a[-5:-1]) #6789
print(a[-2:]) #91 :代表1

# 字符串转列表： return eval(str) 
# 字符串转数字： return int(str) 
# 四则运算： return eval(str)
```

**字符串转元组**

```python
a="baidu"
print(list(a)[-1::-1]) #['u', 'd', 'i', 'a', 'b']
```

**split()**

- **[结论](https://www.cnblogs.com/python-coder/p/10073329.html)：split()的时候，多个空格当成一个空格；split(' ')的时候，多个空格都要分割，每个空格分割出来空。**

  [split详解](https://www.cnblogs.com/ilovecpp/p/12802178.html)

  1、`split()` 函数
  语法：`str.split(str="",num=string.count(str))[n]`

  参数说明：
  `str`: 表示为分隔符，默认为空格，但是不能为空('')。若字符串中没有分隔符，则把整个字符串作为列表的一个元素
  `num`: 表示分割次数。如果存在参数num，则仅分隔成 num+1 个子字符串，并且每一个子字符串可以赋给新的变量

  `n`：表示选取第n个分片

```python
string = "www.gziscas.com.cn"
print(string.split('.'))# ['www', 'gziscas', 'com', 'cn']
print(string.split('.',2))# ['www', 'gziscas', 'com.cn']
print(string.split('.',2)[1])#gziscas

import os
print(os.path.split('/dodo/soft/python/'))#('/dodo/soft/python', '')
print(os.path.split('/dodo/soft/python'))#('/dodo/soft', 'python')
str="hello boy<[www.baidu.com]>byebye"
print(str.split("[")[1].split("]")[0]) # www.baidu.com
```

**strip()**

- **描述**Python strip() 方法用于移除字符串头尾指定的字符（默认为空格或换行符）或字符序列。
- **注意：**该方法只能删除开头或是结尾的字符，不能删除中间部分的字符。

```python
str.strip([chars]);

str = "00000003210Runoob01230000000"; 
print str.strip( '0' );  # 去除首尾字符 0

str2 = "   Runoob      ";   # 去除首尾空格
print str2.strip();
```

**str.lower() **转换字符串中所有大写字符为小写。

**str.isalnum()** 检测字符串是否由字母和数字组成。

**Character** 

There is no [built-in](https://docs.python.org/3/library/stdtypes.html) type for character in Python, there are `int`, `str` and `bytes`. If you intend to user character, you just can go with `str` of length 1.

`ord()`

- Convert `char` to Unicode Integer

```python
num = ord("a")
print(num) # 97. It is the Unicode integer of "a"
```

`chr()`

- Convert an Unicode Integer to `char`

```python
cZ = ord('a') + 25
print(chr(cZ) # z. 122 == 97 + 25
```

### Casting

Casting in python is therefore done using constructor functions:

- int(x [,base]) - constructs an integer number from an integer literal, a float literal (by removing all decimals), or a string literal (providing the string represents a whole number)
- float() - constructs a float number from an integer literal, a float literal or a string literal (providing the string represents a float or an integer)
- str() - constructs a string from a wide variety of data types, including strings, integer literals and float literals

```python
x = int(1)   # x will be 1
y = int(2.8) # y will be 2
z = int("3") # z will be 3

x = float(1)     # x will be 1.0
y = float(2.8)   # y will be 2.8
z = float("3")   # z will be 3.0
w = float("4.2") # w will be 4.2

x = str("s1") # x will be 's1'
y = str(2)    # y will be '2'
z = str(3.0)  # z will be '3.0'
```

### Sequence Types - Tuple

tuple的元素不可改变，但它可以包含可变的对象

```python
student_tuples = [
    ('john', 'A', 15),
    ('jane', 'B', 12),
    ('dave', 'B', 10),
]
print(student_tuples[0])
```

zip()

- Iterate over several iterables in parallel, producing tuple with an item from each one.

```python
for item in zip([1, 2, 3], ['sugar', 'spice', 'everything nice']):
    print(item)
# (1, 'sugar')
# (2, 'spice')
# (3, 'everything nice')
```

### Array (List)

Usual ops

1. append
2. pop
3. insert
4. binsect_insert
5. not in/ in
6. range(): `list(range(5, 10))`
7. Iterator
8. `[a for a, b, c in tupleX]   `
9. `a1.remove(2)`
10. `del demo[1]`

加号 **+** 是列表连接运算符，星号 ***** 是重复操作。

Python 列表截取可以接收第三个参数，参数作用是截取的步长

```python
a=[1,2,3]
print(a+a) #[1, 2, 3, 1, 2, 3]
print(a*4) #[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
print(a[::2]) #[1, 3]

# 判断是否为空
if list
```

### Set

集合（set）是由一个或数个形态各异的大小整体组成的，构成集合的事物或对象称作元素或是成员。

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}
print(sites)   # 输出集合，重复的元素被自动去掉
s.add(123)
s.clear()
# 移除元素 如果元素不存在，不会报错 remove 如果元素不存在，会报错
s1.discard(32)
# 集合pop随机移除某个元素并且获取那个参数,集合pop没有参数
re2 = s2.pop()


>>>x = set('runoob')
>>> y = set('google')
>>> x, y
(set(['b', 'r', 'u', 'o', 'n']), set(['e', 'o', 'g', 'l']))   # 重复的被删除
>>> x & y         # 交集  s3.intersection(s4)
set(['o'])
>>> x | y         # 并集  s3.union(s4)
set(['b', 'e', 'g', 'l', 'o', 'n', 'r', 'u'])
>>> x - y         # 差集  s1.difference(s2)
set(['r', 'b', 'u', 'n'])
>>>
```

### Mapping Types - Dictionary

```python showLineNumbersEEE
a = dict()
# highlight-next-line
if x not in a:

# get all the values inside a dic
# This will error
a.values()
# Uncaught TypeError: Cannot read properties of null (reading 'toUpperCase')
```

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过**键来存取**的，而不是通过偏移存取。

用 **{ }** 标识，它是一个无序的 **键(key) : 值(value)** 的集合。

键(key)必须使用不可变类型。在同一个字典中，键(key)必须是唯一的。

```python
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2]     = "2 - 菜鸟工具"
print (dict['one'])   # 输出键为 'one' 的值 1 - 菜鸟教程
print (dict.keys())   # 输出所有键 dict_keys(['one', 2])
print (dict.values()) # 输出所有值 dict_values(['1 - 菜鸟教程', '2 - 菜鸟工具'])

""" 一些操作函数 """
dict.get(key, default=None)# 返回指定键的值，如果键不在字典中返回 default 设置的默认值
key in dict #如果键在字典dict里返回true，否则返回false<---
dict.pop(key[,default]) #删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。
dict.values() #返回一个迭代器，可以使用 list() 来转换为列表
dict.items() #以列表返回可遍历的(键, 值) 元组数组
dict.keys() #返回一个迭代器，可以使用 list() 来转换为列表
dict.update(dict2) #把字典dict2的键/值对更新到dict里

"""  实践  """
dictA={x:x**2 for x in range(10)} #创建A
dictA[9]=666 #更新
dictB={1:11111,} #创建B 《---
dictA.update(dictB) #用B替换或添加A 《---
print(dictA) #打印
print(dictA.get("22")) #尝试获得键22的值，None
print(22 in dictA) #False 《---
print(dictA.pop(2)) #删除、弹出键值2的值《---
print(dictA.items()) #A字典的项
for item in dictA.values():
    print(item) #打印所有项
```

## Containers

### Heap

```python
class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        pairs = sorted(zip(quality, wage), key=lambda p: p[1] / p[0])  # 按照 r 值排序
        h = [-q for q, _ in pairs[:k]]  # 加负号变成最大堆
        heapify(h)
        sum_q = -sum(h)
        ans = sum_q * pairs[k - 1][1] / pairs[k - 1][0]  # 选 r 值最小的 k 名工人
        for q, w in pairs[k:]:  # 后面的工人 r 值更大
            if q < -h[0]:  # 但是 sum_q 可以变小，从而可能得到更优的答案
                sum_q += heapreplace(h, -q) + q  # 更新堆顶和 sum_q
                ans = min(ans, sum_q * w / q)
        return ans
```

### Stack

```python
Stack()    #items = [] 建立一个空的栈对象。
push(item) #items.append(item) 把一个元素添加到栈的最顶层。
pop()      #items.pop() 删除栈最顶层的元素，并返回这个元素。！
peek()     #items[-1] 返回栈最顶层的元素，并不删除它。！
clear()    #del(self.items) 清空栈。
isEmpty()  #self.items == [] 判断栈是否为空。
size()     #返回栈中元素的个数。
print(q)   #print(self.items)
```

### Queue

```python
import collections
d = collections.deque()
d.append(1)
print(len(d))
d.appendleft(x) #将元素 x 加到队头
d.append(x) #将元素 x 加到队尾
d.popleft() #将队头元素弹出，并作为返回值，如果双端队列为空会报错
d.pop() #将队尾元素弹出，并作为返回值，如果双端队列为空会报错
d[0] #访问并返回队头元素，但不弹出，如果双端队列为空会报错
d[-1] #访问并返回队尾元素，但不弹出，如果双端队列为空会报错
d[j] #通过索引访问任意一项，如果索引（队列内部以 0 索引开头）超过范围会报错

q = Queue()    #items = []  #定义一个空队列，无参数，返回值是空队列。
enqueue(item)  #items.append(item)  #在队列尾部加入一个数据项，参数是数据项，无返回值。
dequeue()      #items.pop(0) 删除队列头部的数据项，不需要参数，返回值是被删除的数据，队列本身有变化。
peek()     	   #items[0] 返回栈最顶层的元素，并不删除它。！
isEmpty()      #self.items == [] 检测队列是否为空。无参数，返回布尔值。
clear()        #del(items) 清空队列，无参无返回值
size()         #len(items) 返回队列数据项的数量。无参数，返回一个整
print(q)	   #print(self.items)
```

### Tree

### Linkedlist

## Control Flow

### Boolean Operations — `and`, `or`, `not`

| Operation | Result                                     | Notes                                                        |
| :-------- | :----------------------------------------- | :----------------------------------------------------------- |
| `x or y`  | if *x* is true, then *x*, else *y*         | short-circuit operator, only evaluate second one while first is false |
| `x and y` | if *x* is false, then *x*, else *y*        | short-circuit operator, only evaluate second one while first is true |
| `not x`   | if *x* is false, then `True`, else `False` | `not` has a lower priority than non-Boolean operators, so `not a == b` is `not (a == b)` |

### Comparisons

| Operation | Meaning                 |
| :-------- | :---------------------- |
| `<`       | strictly less than      |
| `<=`      | less than or equal      |
| `>`       | strictly greater than   |
| `>=`      | greater than or equal   |
| `==`      | equal                   |
| `!=`      | not equal               |
| `is`      | object identity         |
| `is not`  | negated object identity |

### If Statement

- `if` 
- `elif`
- `else`

```python
x = 1
if x <= 0:
    print('Less than zero')
elif x == 0:
    print('Zero')
else:
    print('Greater than zero')
```

### For Loop

⚠️: Never alter the container you're looping on, because iterators on that container are not going to be informed of your alterations and quite likely to produce a very different loop and/or an incorrect one.

Python's iteration Iterates items of any sequence

```python
words = ['cat', 'window', 'defenestrate']
for w in words:
    print(w, len(w))
```

Sequence, map

```python
data = [('red', 5), ('blue', 1), ('yellow', 8), ('black', 0)]
for d in data:
  print(d)
```

Iterate over a sequence of numer

```python
for i in range(5):
    print(i)
```

### While Loop

```python
i = 1
while i < 6:
  if i == 5:
    continue
    # break
  print(i)
  i += 1
else:
  print("i is no longer less than 6")
```

### Switch



## Bitwise Operations on Integer Types

```python
'''
逻辑运算符
'''
and #且
or  #或
not #反

'''
位运算符
'''
& #与
| #或
^ #异或
~ #取反
<< #左移动运算符
>> #右移动运算符
x>>=1
即x=x>>1
```

与或非异或，AND OR NOT XOR

AND

```python
m = 3
m &= 1 # m = 1
print(m)
m &= 2 # m = 0
print(m)
```

OR

- Can be used to define multiple flags with a single integer

```python
m = 0
m |= 1
m |= 2
m |=16
print(m == 0b10011) # True
```

NOT

```python
```

XOR

任何数异或 0 都等于它自己

任何数异或自己都等于 0

```python
from operator import xor
xor(bool(a), bool(b))  # Note: converting to bools is essential
```

操作符  `^`

```
xor = bool(a) ^ bool(b)
```

## FUF (Frequently Used Built-in Function)

### Range

`range(start, stop[, step])`

- Left closed and right open interval [ )

- Parameters

  - start: default as 0

  - stop: the stop index, not inclued in res

  - step: default as 1

```python
print([i for i in range(10, 5, -1)])
# [10, 9, 8, 7, 6]
```

### Len

- check the len of a string, list, dic, etc.

```python
len([1, 2, 3, 4, 5, 6]) # 6
len({"a": True, "b": True}) # 2
len("abc") # 3
```

### **Sorting**

`sorted()`

- Build a new sorted list from an iterable

**Default** is Ascending sort by the first key

```python
sorted([5, 2, 3, 1, 4])
# [1, 2, 3, 4, 5]

# Sample Datam, sort by the first key
student_tuples = [
    ('john', 'A', 15),
    ('jane', 'B', 12),
    ('dave', 'B', 10),
]
sorted(student_tuples)
# [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

**Key Functions**

- The *key* parameter should be a func takes an element, returns a key for sorting purposes.
- A common pattern is to sort complex objects using some of the object’s indices as keys

```python
# Using part of the indices as keys
sorted(student_tuples, key=lambda student: student[2])   # sort by age
# [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]

# Sorting by the arrtibute of a object
class Student:
    def __init__(self, name, grade, age):
        self.name = name
        self.age = age
    def __repr__(self): 
    		# The repr() function returns a printable string describing the object that is passed in.
        return repr((self.name, self.age)) 

student_objects = [
    Student('john', 15),
    Student('jane', 12),
    Student('dave', 10),
]
# sorted(student_objects, key=lambda student: student.age)   # sort by age
[('dave', 10), ('jane',  12), ('john', 15)]
```

**Ascending and Descending: `reverse=True|False`**

```python
sorted(student_tuples, key=lambda student: student[2], reverse=True)
# [('john', 'A', 15), ('jane', 'B', 12), ('dave', 'B', 10)]
sorted(student_tuples, key=lambda student: student[2], reverse=False)
# [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

**Comparison Functions**

A comparision function will return

- Negative value for less-than
- Zero if inputs are equal
- Positive value for greater-than

```python
sorted(words, key=cmp_to_key(strcoll))  # locale-aware sort order
```

**Next Level: Sort Stable and Complex Sort**

The sort is stable that remains the original order of records with same key.

So we can sort by key1 in ascending order first, then sort by key2 in descending order.

```python
s = sorted(student_objects, key=attrgetter('age'))     # sort on secondary key
sorted(s, key=attrgetter('grade'), reverse=True)       # now sort on primary key, descending
[('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

**Next Level: The sort routines use `<` when making comparisons between two objects**

```python
Student.__lt__ = lambda self, other: self.age < other.age
sorted(student_objects)
# [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

Ther other similars:

- **max**(*iterable*, ***, *key=None*)
- **min**(*iterable*, ***, *key=None*)

### Binary Search

bisect.bisect_left(a, x, lo=0, hi=len(a), *, key=None)

- Intro
  - The module is called [`bisect`](https://docs.python.org/3/library/bisect.html#module-bisect) because it uses a basic bisection algorithm to do its work. 
  - It calls `__lt__()` instead of `__wq__()`, the insertion point will be before any existing x.
- The *lo* and *hi* are used to specify a subset
- It partitions the array into two slices such that
  - left = all(elem < x for elem in a[lo : ip])
  - right = all(elem >= x for elem in a[ip : hi])
- key specifies a [key function](https://docs.python.org/3/glossary.html#term-key-function)
- The `*` before key means that parameter(s) that comes after `*` are keyword only parameters.
  - for example, `def test(delay, result=None, *, loop=None):` only accepts `test(1,2,loop=2)` not `test(1,2,2)`


```python
import bisect
data = [('red', 5), ('blue', 1), ('yellow', 8), ('black', 0)]
data = sorted(data, key=lambda r:r[1])
print(data)
# [('black', 0), ('blue', 1), ('red', 5), ('yellow', 8)]
keys = [d[1] for d in data]
for k in keys:
  print(k, bisect.bisect_left(keys, k), data[bisect.bisect_left(keys, k)])
# 0 0 ('black', 0)
# 1 1 ('blue', 1)
# 5 2 ('red', 5)
#8 3 ('yellow', 8)
```

### Lambda

A lambda function is a simple anonymous function.

Syntax: `lambda arguments : expression`

```python
def myfunc(n):
  return lambda a : a * n
```

### Filter

filter()函数用于过滤序列，过滤掉不符合条件的元素，返回符合条件的元素组成新列表。

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = ''.join(filter(str.isalnum,s)).lower()
        return s==s[::-1]
```

## Others

### Input and Ouput

```python
#输入
str = input("请输入：");
print ("你输入的内容是: ", str)

#输出
import math
# 可选项 : 和格式标识符可以跟着字段名。 这就允许对值进行更好的格式化。 下面的例子将 Pi 保留到小数点后三位：
print('常量 PI 的值近似为 {0:.3f}'.format(math.pi)) #新版
print('常量 PI 的值近似为 %5.3f' % math.pi) #旧版
# 常量 PI 的值近似为：3.142

print("%d"%1) #旧版输出1
print("{0}".format(1)) #新版输出1
print(1) #;-)

a='Google'
b='Runoob'
print("法1",a,"和",b) #逗号
print('法2 {Google} 和 {Runoob}'.format(Google='Google', Runoob='Runoob'))# 如果在 format() 中使用了关键字参数, 那么它们的值会指向使用该名字的参数。
print('法3 {0} 和 {1}'.format('Google', 'Runoob')) #
```

### Deep Copy and Shallow Copy

所以python的传值和传址是根据传入参数的类型来选择的

传值的参数类型：数字，字符串，元组

传址的参数类型：列表，字典

- `copy.copy()` 浅拷贝，可以拷贝单层数组（constructs a new compound object and then inserts *references* into it to the objects found in the original.）

- `copy.deepcopy()` 深拷贝，可以拷贝数组里的数组（constructs a new compound object and then recursively, inserts *copies* into it of the objects found in the original.）

Sample

```python
# -*- coding: UTF-8 -*-
import copy

a=[1,2,3,4,5,['a','b']]
#原始对象
b=a#赋值，传对象的引用
c=copy.copy(a)#对象拷贝，浅拷贝
d=copy.deepcopy(a)#对象拷贝，深拷贝
a[1]=666
print("a=",a,"    id(a)=",id(a),"id(a[5])=",id(a[5]))
print("b=",b,"    id(b)=",id(b),"id(b[5])=",id(b[5]))#与a相同
print("c=",c,"    id(c)=",id(c),"id(c[5])=",id(c[5]))#c[5]列表的地址与a相同,其他不同
print("d=",d,"    id(d)=",id(d),"id(d[5])=",id(d[5]))#
print("*"*70)

a.append(6)#修改对象a
a[5].append('c')#修改对象a中的['a','b']数组对象
print("a=",a,"    id(a)=",id(a),"id(a[5])=",id(a[5]))
print("b=",b,"    id(b)=",id(b),"id(b[5])=",id(b[5]))
print("c=",c,"       id(c)=",id(c),"id(c[5])=",id(c[5]))
print("d=",d,"            id(d)=",id(d),"id(d[5])=",id(d[5]))
```

### Random

```python
import random
#import map
#print(map(int,input().split(""))
A=[0 for i in range(8)]
for j in range(100000):
    i=49
    while(i>48):
        #i=6*(random.randint(1,6)-1)+random.randint(1,6)
        i=7*(random.randint(1,7)-1)+random.randint(1,7)#从1-48中取出1-8
    i=i%8+1 #从1-48中取出1-8
    A[i-1]+=1
print(A)
```

### @cache

递归时用来记忆相同参数的返回

```python
@cache
def dfs(i,j):
  if i == n: return 0
	if j == m: return 0
  return max(dfs(i+1, j), dfs(i, j+1)) + grid[i][j]
```

## Reference

1. [Built-in Types, Python Doc](https://docs.python.org/3/library/stdtypes.html#)
2. [More Control Flow Tools, Python Doc](https://docs.python.org/3/tutorial/controlflow.html)
3. [Sorting Techniques, Python Doc](https://docs.python.org/3/howto/sorting.html#sorting-basics)
4. [Bisect, Python Doc](https://docs.python.org/3/library/bisect.html)
5. [What does * represent in function argument list in python?, StackOverflow](https://stackoverflow.com/questions/57667742/what-does-represent-in-function-argument-list-in-python)
6. [Python Lambda, W3C](https://www.w3schools.com/python/python_lambda.asp)
7. [分享｜从集合论到位运算，常见位运算技巧分类总结！——灵神](https://leetcode.cn/circle/discuss/CaOJ45/)
8. [copy — Shallow and deep copy operations](https://docs.python.org/3/library/copy.html)
9. [Python Value Reference](https://www.cnblogs.com/CheeseZH/p/5165283.html)
