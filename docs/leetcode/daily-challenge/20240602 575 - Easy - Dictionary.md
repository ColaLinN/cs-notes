



https://leetcode.cn/problems/distribute-candies/?envType=daily-question&envId=2024-06-02

> Alice has `n` candies, where the `ith` candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor.
>
> The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor's advice.
>
> Given the integer array `candyType` of length `n`, return *the **maximum** number of different types of candies she can eat if she only eats* `n / 2` *of them*.
>
> **Example 1:**
>
> ```
> Input: candyType = [1,1,2,2,3,3]
> Output: 3
> Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3 types, she can eat one of each type.
> ```
>
> **Example 2:**
>
> ```
> Input: candyType = [1,1,2,3]
> Output: 2
> Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.
> ```



## Solution 1, Hashmap

```python
class Solution:
    def distributeCandies(self, candyType: List[int]) -> int:
        cnt = 0
        candies = dict()
        for c in candyType:
            if c not in candies:
                candies[c] = True
                cnt += 1
        return cnt if cnt < len(candyType) // 2 else len(candyType) // 2
```



## Solution 2, Hashset

```python
class Solution:
    def distributeCandies(self, candyType: List[int]) -> int:
        types = set(candyType)
        return len(types) if len(types) < len(candyType) // 2 else len(candyType) // 2
```