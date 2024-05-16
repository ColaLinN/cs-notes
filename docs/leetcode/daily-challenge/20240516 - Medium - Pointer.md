







```python
class Solution:
    def numberOfWeeks(self, milestones: List[int]) -> int:
        res = 0
        milestones = sorted(milestones)
        finished = 0
        n = len(milestones)
        for i in range(n):
            if i == n - 1:
                res += 1 if milestones[i] - finished > 0 else 0
                break
            if milestones[i] - finished > 0:
                print(milestones[i] - finished)
                res += (milestones[i] - finished) * (n-i)
                finished = milestones[i]
        return res
```

cannot pass

```python
class Solution:
    def numberOfWeeks(self, milestones: List[int]) -> int:
        i = 0
        j = len(milestones) - 1
        res = 0
        finihsed = 0
        milestones = sorted(milestones)
        skipCnt = 0

        while i <= j:
            # print(milestones)
            if i == j and milestones[i] > 0:
                res += 1
                break
            big = milestones[j]
            if big == 0:
                j -= 1
            elif big >= milestones[i]:
                res += milestones[i] * 2
                milestones[j] -= milestones[i]
                milestones[i] = 0
                # i += 1
                skipCnt += 1
                print(milestones)


                milestones = sorted(milestones)
                i = skipCnt - 1
                j = len(milestones) - 1

                
        return res



```



https://leetcode.cn/problems/maximum-number-of-weeks-for-which-you-can-work/solutions/2779207/tan-xin-ju-ti-gou-zao-fang-an-pythonjava-3xyq/?envType=daily-question&envId=2024-05-16