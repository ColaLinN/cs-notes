



[2831. Find the Longest Equal Subarray](https://leetcode.cn/problems/find-the-longest-equal-subarray/)

1274 / 1422 个通过的测试用例

```
[3,2,8,4,5,5,6,7,10,7,10,6,2,5,5]
```



```python
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        n = len(nums)


        res = 0
        max_n = nums[0]
        max_cnt = 0
        data = dict()
        i = 0
        j = 0
        while j < n:
            num = nums[j]
            if num in data:
                data[num] += 1
            else:
                data[num] = 1

            length = (j - i + 1)
            if num == max_n:
                max_cnt += 1
                if length - data[max_n] > k:
                    data[nums[i]] -= 1
                    i += 1
            else:
                if data[num] > data[max_n] and length - data[num] <= k:
                    max_n = num
                    max_cnt = data[num]
                if length - data[max_n] > k:
                    data[nums[i]] -= 1
                    i += 1
                    tmp = 0
                    for k in data:
                        if data[k] > tmp:
                            max_n = k
                            tmp = data[k]
                max_cnt = data[max_n]
                # for k in data:
                #     print("inner", i, j, k, data[k])
                #     if data[k] > max_cnt:
                #         max_n = k
                #         max_cnt = data[k]
            print(i, j, max_n, max_cnt)
            if res < max_cnt:
                res = max_cnt
            j += 1
        return res


```



Timeout

1413 / 1422 个通过的测试用例

```python
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        n = len(nums)


        res = 0
        max_n = nums[0]
        max_cnt = 0
        data = dict()
        i = 0
        j = 0
        while j < n:
            num = nums[j]
            if num in data:
                data[num] += 1
            else:
                data[num] = 1

            length = (j - i + 1)
            if num == max_n:
                max_cnt += 1
            elif data[num] > data[max_n] and length - data[num] <= k:
                    max_n = num
                    max_cnt = data[num]
            if length - data[max_n] > k:
                data[nums[i]] -= 1
                tmp = 0
                for j2 in data:
                    if data[j2] > tmp:
                        max_n = j2
                        tmp = data[j2]
                i += 1
            max_cnt = data[max_n]
            if res < max_cnt:
                res = max_cnt
            j += 1
        return res
```



passed

```python
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        pos_lists = defaultdict(list)
        for i, x in enumerate(nums):
            pos_lists[x].append(i - len(pos_lists[x]))

        ans = 0
        for pos in pos_lists.values():
            if len(pos) <= ans:
                continue  # 无法让 ans 变得更大
            left = 0
            for right, p in enumerate(pos):
                while p - pos[left] > k:  # 要删除的数太多了
                    left += 1
                ans = max(ans, right - left + 1)
        return ans
```

