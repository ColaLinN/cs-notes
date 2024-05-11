



[2105. Watering Plants II](https://leetcode.cn/problems/watering-plants-ii/)

```python
class Solution:
    def minimumRefill(self, plants: List[int], capacityA: int, capacityB: int) -> int:
        n = len(plants)
        i = 0
        j = n-1
        a = capacityA
        b = capacityB
        ans = 0
        while i <= j:
            if i == j:
                ans += 1 if max(a, b) < plants[i] else 0
                break
            if a < plants[i]:
                a = capacityA
                ans += 1
            a -= plants[i]
            i += 1
            if b < plants[j]:
                b = capacityB
                ans += 1
            b -= plants[j]
            j -= 1
        return ans
```

