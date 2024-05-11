





[2391. Minimum Amount of Time to Collect Garbage](https://leetcode.cn/problems/minimum-amount-of-time-to-collect-garbage/)

```python
class Solution:
    def garbageCollection(self, garbage: List[str], travel: List[int]) -> int:
        steps = [0] * 3
        def findMPG(h):
            m = p = g = 0
            for c in h:
                if c == "M":
                    m += 1
                elif c == "P":
                    p += 1
                else:
                    g += 1
            return [m, p, g]
        
        res = 0
        for i in range(len(garbage)):
            cntList = findMPG(garbage[i])
            res += sum(cntList)
            for j in range(3):
                if cntList[j] > 0:
                    steps[j] = i

        for i in range(1, len(travel)):
            travel[i] += travel[i-1]
        for i in range(3):
            if steps[i] > 0:
                res += travel[steps[i]-1]
        return res
```

