---
path: /posts/quick-sort
date: 2020-08-22T09:56:16.416Z
title: 아는 만큼 Quick Sort
---
QuickSort는 정렬할 데이터에서 어느 한 지점을 기준으로 그 기준보다 큰 것은 오른쪽, 그 기준보다 작은 것은 왼쪽으로 나누는 것을 무한 반복하다 보면 정렬이 된다는 알고리즘이다.
```
[5,3,6,1,2]
```
가장 간단하게 6을 선택하면
```
Left = [5,3]
Right = [1,2]
Pivot = 6
```
이렇게 될 것이다. 이 과정을 더 이상 나눌 수 없을 때 까지 왼쪽과 오른쪽에도 반복한다.
양 쪽 배열 모두 더 이상 나눌 수 없는 상태에 도달한다면, `왼쪽 배열 + 피봇 + 오른쪽 배열` 이렇게 결과를 만들어서 반환하면 된다. 이 과정을 재귀적으로 반복하다 보면 언젠가는 `정렬된 왼쪽 배열 + 가장 처음에 정한 피봇 + 정렬된 오른쪽 배열` 상태에 도달할 것이므로.

```
def quickSort(arr):
    if len(arr) > 0:
        p = 0
        pivot = arr[p]
        left = list(filter(lambda x: x < pivot, arr))
        right = list(filter(lambda x: x > pivot, arr))

        sorted_left = quickSort(left)
        sorted_right = quickSort(right)
        
        sorted_left.append(pivot)
        result = (sorted_left + sorted_right)

        return result
    else:
        return arr
```
