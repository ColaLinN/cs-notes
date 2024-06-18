





## [522. Longest Uncommon Subsequence II](https://leetcode.cn/problems/longest-uncommon-subsequence-ii/)

## Brute Froce TLE

```python
class Solution:
    def findLUSlength(self, strs: List[str]) -> int:
        d = dict()
        def getAllSubsequence(si, s, i, ca):
            # print(si, s, i, ca)
            if i >= len(s):
                cs = "".join(ca)
                if cs not in d[si]:
                    d[si].append(cs)
                return
            # print(s, i)
            ca.append(s[i])
            getAllSubsequence(si, s, i+1, ca)
            ca.pop()
            getAllSubsequence(si, s, i+1, ca)
        for i in range(len(strs)):
            d[i] = []
            # print(strs[i])
            getAllSubsequence(i, strs[i], 0, [])
            # print(d)

        cnt = -1
        for si in range(len(strs)):
            for subsequence in d[si]:
                exist = False
                for si2 in range(len(strs)):
                    if si2 == si:
                        continue
                    if subsequence in d[si2]:
                        # print(subsequence, d[si2])
                        exist = True
                        break
                if not exist:
                    cnt = max(cnt, len(subsequence))
        return cnt
```

## 枚举+判断子序列

https://leetcode.cn/problems/longest-uncommon-subsequence-ii/solutions/2813217/mei-ju-pan-duan-zi-xu-lie-pythonjavaccgo-8256/

```python
class Solution:
    def findLUSlength(self, strs: List[str]) -> int:
        # 判断 s 是否为 t 的子序列
        def is_subseq(s: str, t: str) -> bool:
            i = 0
            for c in t:
                if s[i] == c:
                    i += 1
                    if i == len(s):  # 所有字符匹配完毕
                        return True  # s 是 t 的子序列
            return False

        ans = -1
        for i, s in enumerate(strs):
            if len(s) > ans and \
               all(j == i or not is_subseq(s, t) for j, t in enumerate(strs)):
                ans = len(s)
        return ans
```





## [392. Is Subsequence](https://leetcode.cn/problems/is-subsequence/)

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        def isSub(s, t):
            si = 0
            for c in t:
                if si < len(s) and c == s[si]:
                    si += 1
                if si == len(s):
                    return True
            if si == len(s):
                return True
            return False
        return isSub(s, t)
```



