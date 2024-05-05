---
sidebar_position: 2
title: Python Frequently Used Syntax
tags: [leetcode]
---

## Built-in Types

### Numeric Types

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

**Char** 

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
c = chr(ord('a'))
print(c) # 'a'
cZ = ord('a') + 25
print(chr(cZ) # z. 122 == 97 + 25
```

### Casting

Casting in python is therefore done using constructor functions:

- int() - constructs an integer number from an integer literal, a float literal (by removing all decimals), or a string literal (providing the string represents a whole number)
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

### Sequence Types - Array (List)

Usual ops

1. append
2. pop
3. insert
4. binsect_insert
5. not in/ in
6. range(): `list(range(5, 10))`
7. Iterator
8. `[a for a, b, c in tupleX]   `
9. 

### Sequence Types Tuple

zip()

```python
student_tuples = [
    ('john', 'A', 15),
    ('jane', 'B', 12),
    ('dave', 'B', 10),
]
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

## Containers

### Heap

### Stack

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

与或非，AND OR NOT

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

## FUF (Frequently Used Built-in Function)

### **Len**

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

## Reference

1. [Built-in Types, Python Doc](https://docs.python.org/3/library/stdtypes.html#)
2. [More Control Flow Tools, Python Doc](https://docs.python.org/3/tutorial/controlflow.html)
3. [Sorting Techniques, Python Doc](https://docs.python.org/3/howto/sorting.html#sorting-basics)
4. [Bisect, Python Doc](https://docs.python.org/3/library/bisect.html)
5. [What does * represent in function argument list in python?, StackOverflow](https://stackoverflow.com/questions/57667742/what-does-represent-in-function-argument-list-in-python)
6. [Python Lambda, W3C](https://www.w3schools.com/python/python_lambda.asp)
