



[881. Boats to Save People](https://leetcode.cn/problems/boats-to-save-people/)

## Brute Force Approach

```python
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people = sorted(people)

        ans = 0
        # 暴力法
        j = len(people) - 1
        while j >= 0:
            if people[j] != -1:
                i = j - 1
                while (i >= 0 and people[i] + people[j] > limit) or (i >= 0 and people[i] == -1):
                    i -= 1
                if i >= 0:
                    people[i] = -1
                people[j] = -1
                ans += 1
            j -= 1
        return ans
```

## 卡点：一开始没有选择对向双指针贪心的原因

- 卡点：如果从两边向内缩进，怎么证明选择最小和最大的一定能满足最少船只数？
- 思考的卡点：如果从两边向内缩进，怎么证明这时选择最小和最大的一定能满足最少船只数？
  - 1）如果当前最大数加上最小数都大于 limit，那么最大数不可能找到和他同船的更小的数了，所以可以直接选最大数，ans += 1
  - 2）如果当前最大数加上最小数小于或等于 limit，那么如果最小数不和最大数匹配，后面和次大数匹配，最好的情况也是和最大最小匹配数的 ans 持平，不可能更好

## 对向双指针＋贪心

```python
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people = sorted(people)

        ans = 0
        # 滑动窗口
        i = 0
        j = len(people) - 1
        while i <= j:
            if i == j:
                return ans + 1
            else:
                if people[i] + people[j] <= limit:
                    i += 1
                j -= 1
                ans += 1
        return ans
```



