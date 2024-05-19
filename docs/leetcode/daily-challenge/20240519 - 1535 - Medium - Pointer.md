

[1535. Find the Winner of an Array Game](https://leetcode.cn/problems/find-the-winner-of-an-array-game/)

```python
class Solution:
    def getWinner(self, arr: List[int], k: int) -> int:
        cnt = 0

        if k >= len(arr):
            return max(arr)

        n = len(arr)
        i = 0
        ans = arr[0]
        while cnt != k:
            curI = i % n
            curJ = (i + 1) % n
            if arr[curI] > arr[curJ]:
                tmp = arr[curJ]
                arr[curJ] = arr[curI]
                arr[curI] = tmp
                cnt += 1
            elif arr[curI] < arr[curJ]:
                cnt = 1
                ans = arr[curJ]
            else:
                cnt = 0
                ans = arr[curJ]
            i = curJ
        return ans

```



[模拟，附若干进阶问题（Python/Java/C++/Go/JS/Rust）](https://leetcode.cn/problems/find-the-winner-of-an-array-game/solutions/2773465/mo-ni-fu-ruo-gan-jin-jie-wen-ti-pythonja-zx17/?envType=daily-question&envId=2024-05-19)