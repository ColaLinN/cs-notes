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

### **Sequence Types - Array (List)**

Usual ops

1. append
2. pop
3. insert
4. binsect_insert
5. not in/ in
6. range(): `list(range(5, 10))`
7. Iterator

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

Iterate over a sequence of numer

```python
for i in range(5):
    print(i)
```

### While Loop



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

Default as Ascending sort

```python
sorted([5, 2, 3, 1, 4])
# [1, 2, 3, 4, 5]
```

Key Functions

- The *key* parameter should be a func takes an element, returns a key for sorting purposes.
- A common pattern is to sort complex objects using some of the object’s indices as keys

```python
# Using part of the indices as keys
student_tuples = [
    ('john', 'A', 15),
    ('jane', 'B', 12),
    ('dave', 'B', 10),
]
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



### Binary Search

bisect_left



## Reference

1. [Built-in Types, Python Doc](https://docs.python.org/3/library/stdtypes.html#)
2. [More Control Flow Tools, Python Doc](https://docs.python.org/3/tutorial/controlflow.html)
3. [Sorting Techniques, Python Doc](https://docs.python.org/3/howto/sorting.html#sorting-basics)
4. 
