

[2079. Watering Plants](https://leetcode.cn/problems/watering-plants/)

```python
class Solution:
    def wateringPlants(self, plants: List[int], capacity: int) -> int:
        steps = 0
        c = capacity
        for i in range(len(plants)):
            steps += 1
            if c < plants[i]:
                steps += i * 2
                c = capacity
            c -= plants[i]
        return steps       
```

