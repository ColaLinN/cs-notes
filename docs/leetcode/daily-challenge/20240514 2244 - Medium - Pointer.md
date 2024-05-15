





[2244. Minimum Rounds to Complete All Tasks](https://leetcode.cn/problems/minimum-rounds-to-complete-all-tasks/)

思路比较简单，但是有些 hidden case 需要考虑

1. sort，把一样的数聚到一起
2. 对于每个数字计算出现的次数 cnt，判断其是否可以被 2, 3 整除，并得到最小的 cnt
   1. 先 `%3` 再 `%2` 
   2. 如果 1 不行，再考虑 `%3 + 3` 再 `%2`
3. 

```python
class Solution:
    def minimumRounds(self, tasks: List[int]) -> int:
        tasks = sorted(tasks)
        res = 0
        i = 0
        n = len(tasks)
        def calc1(cnt):
            print(cnt)
            ocnt = cnt
            times = 0
            times += cnt // 3
            cnt = cnt % 3
            times += cnt // 2
            cnt = cnt % 2
            if cnt > 0:
                cnt = ocnt
                if cnt // 3 > 0:
                    times = cnt // 3 - 1
                    cnt = cnt % 3 + 3
                    times += cnt // 2
                    cnt = cnt % 2
                if cnt > 0:
                    return -1
            return times
        def calc2(cnt):
            times = 0
            times += cnt // 2
            cnt = cnt % 2
            times += cnt // 3
            cnt = cnt % 3
            if cnt > 0:
                return -1
            return times

        while i < n:
            j = i
            while j < n and tasks[j] == tasks[i]:
                j += 1
            cnt = j - i
            if calc1(cnt) > 0:
                res += calc1(cnt)
            elif calc2(cnt) > 0:
                res += calc2(cnt)
            else: 
                return -1
            i = j
        return res
```



hidden case 1

```
[66,66,63,61,63,63,64,66,66,65,66,65,61,67,68,66,62,67,61,64,66,60,69,66,65,68,63,60,67,62,68,60,66,64,60,60,60,62,66,64,63,65,60,69,63,68,68,69,68,61]
```

有 7 个 60，最佳的情况是 `322`，而 `331` 不符合要求



hidden case 2

```
[5,5,5,5]
```

有 4 个 5，需要考虑全 `%2` 的情况，而不是只考虑先 `%3` 再 `%2`