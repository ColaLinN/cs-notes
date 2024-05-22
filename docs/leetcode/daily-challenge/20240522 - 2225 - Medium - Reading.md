



[2225. Find Players With Zero or One Losses](https://leetcode.cn/problems/find-players-with-zero-or-one-losses/)

```python
class Solution:
    def findWinners(self, matches: List[List[int]]) -> List[List[int]]:
        d = dict()
        for m in matches:
            winner, loser = m[0], m[1]
            if winner in d:
                if d[winner] >= 0:
                    d[winner] += 1
            else:
                d[winner] = 1

            if loser in d:
                if d[loser] >= 0:
                    d[loser] = -1
                else:
                    d[loser] -= 1
            else:
                d[loser] = -1
            
        noLose = []
        exactlyOnce = []
        for k, v in d.items():
            if v == -1:
                exactlyOnce.append(k)
            elif v >= 0:
                noLose.append(k)
        noLose = sorted(noLose)
        exactlyOnce = sorted(exactlyOnce)
        return [noLose, exactlyOnce]
```

