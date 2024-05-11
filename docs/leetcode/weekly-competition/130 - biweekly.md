





[100299. Check if Grid Satisfies Conditions](https://leetcode.cn/problems/check-if-grid-satisfies-conditions/)

```python
class Solution:
    def satisfiesConditions(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        m = len(grid[0])
        
        for j in range(m):
            for i in range(n):
                if j != m-1 and grid[i][j] == grid[i][j + 1]:
                    return False
                if i != n-1 and grid[i][j] != grid[i + 1][j]:
                    return False
        return True
                    
```



[100302. Maximum Points Inside the Square](https://leetcode.cn/problems/maximum-points-inside-the-square/)

```python
class Solution:
    def maxPointsInsideSquare(self, points: List[List[int]], s: str) -> int:
        sl = []
        for c in s:
            sl.append(c)
        # print(sl)
        
        n = len(points)
        pl = [0] * n
        for i in range(n):
            x = points[i][0]
            y = points[i][1]
            pl[i] = max(abs(x), abs(y))
        # print(pl)
        
        ps = zip(pl, sl)
        sortedPS = sorted(ps, key=lambda p: p[0])
        
        res = 0
        # curlen = 0
        # curCnt = 0
        breakLen = float("inf")
        clist = []
        for s in sortedPS:
            if s[1] in clist:
                breakLen = s[0]
                break
            else:
                clist.append(s[1])
        for s in sortedPS:
            if s[0] < breakLen:
                res+=1
            else:
                break
        return res
```





[100289. Minimum Substring Partition of Equal Character Frequency](https://leetcode.cn/problems/minimum-substring-partition-of-equal-character-frequency/)

Timeout

```python
class Solution:
    def minimumSubstringsInPartition(self, s: str) -> int:
        @cache
        def isBalanced(i, j):
            if i == j:
                return True
            cnt = [0] * 26
            for k in range(i, j + 1, 1):
                cnt[ord(s[k]) - ord("a")] += 1
            maxCnt = max(cnt)
            for i in range(26):
                if cnt[i] != 0 and cnt[i] != maxCnt:
                    return False
            return True

        @cache
        def minBalanceNum(i, j):
            if i == j:
                return 1
            if isBalanced(i, j):
                # print(i, j, s[i:j])
                return 1
            minCnt = j - i
            for k in range(i, j + 1, 1):
                if k == i:
                    minCnt = min(minCnt, 1 + minBalanceNum(k + 1, j))
                elif k == j:
                    minCnt = min(minCnt, minBalanceNum(i, k-1) + 1)
                else:
                    minCnt = min(minCnt, minBalanceNum(i, k-1) + minBalanceNum(k, j))
                # if i == 0 and j == 7 and minCnt > (minBalanceNum(i, k)+minBalanceNum(k, j)):
                #     print(i, k, j, s[i:k], s[k:j], minBalanceNum(i, k), minBalanceNum(k, j))
                if minCnt == 2:
                    break
            # print("res", i, j, minCnt)
            return minCnt

        return minBalanceNum(0, len(s) - 1)

```





