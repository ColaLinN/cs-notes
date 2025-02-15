# [LCP 61. 气温变化趋势](https://leetcode.cn/problems/6CE719/)

Tricks

Easy way to find the direction for `a` and `b`

```python
            if a == b: return 0
            elif a < b: return 1
            else: return -1
```

Another approach

```python
(a < b) - (a > b)
# if a == b: (0) - (0) = 0
# elif a < b: (1) - (0) = 1
# else a > b: (0) - (1) = -1
```



```python
class Solution:
    def temperatureTrend(self, temperatureA: List[int], temperatureB: List[int]) -> int:
        def getDirection(a, b):
            return (a < b) - (a > b)
            if a == b: return 0
            elif a < b: return 1
            else: return -1

        res = 0
        cnt = 0
        for i in range(len(temperatureA)-1):
            if getDirection(temperatureA[i], temperatureA[i+1]) == getDirection(temperatureB[i], temperatureB[i+1]):
                cnt += 1
                res = max(cnt, res)
            else:
                cnt = 0
        return res
            

```

