

[826. Most Profit Assigning Work](https://leetcode.cn/problems/most-profit-assigning-work/)

Timeout

```
class Solution:
    def maxProfitAssignment(self, difficulty: List[int], profit: List[int], worker: List[int]) -> int:
        n = len(difficulty)
        m = len(worker)

        d = sorted(zip(difficulty, profit), key=lambda dp: dp[0])
        print(d)

        res = 0
        for k in range(m):
            max_p = 0
            for j in range(n):
                if d[j][0] > worker[k]: 
                    break
                if d[j][0] <= worker[k] and d[j][1] > max_p:
                    max_p = d[j][1]
            res += max_p

            # w = worker[k]
            # i = 0
            # j = n-1
            # while i < j:
            #     mid = (i + j) // 2
            #     mv = d[mid][0]
            #     if mv <= w:
            #         i = mid + 1
            #     else:
            #         j = mid
            # print(d[i])
            # if d[i][0] <= w:
            #     res += d[i][1]
            # elif i > 0 and d[i-1][0] <= w:
            #     res += d[i-1][1]
        return res
```



1. Sort `<Difficulty, Profit>`
2. Sort `worker`
3. Iterate through `worker`
   1. For each worker, iterate through all `jobs` whose `difficulty` is `<=`to the current `worker's` ability `worker[i]`
   2. Maintain the `max_p` while iterating the `jobs`
   3. Increment the current job's `res` by `max_p`
   4. return `res`

```python
class Solution:
    def maxProfitAssignment(self, difficulty: List[int], profit: List[int], worker: List[int]) -> int:
        jobs = sorted(zip(difficulty, profit), key=lambda dp: dp[0])
        worker = sorted(worker)

        res = 0
        j = max_p = 0
        for i in range(len(worker)):
            while j < len(jobs) and jobs[j][0] <= worker[i]:
                max_p = max(max_p, jobs[j][1])
                j += 1
            res += max_p
        return res
```

