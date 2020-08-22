---
path: /posts/heap-sort
date: 2020-08-22T09:55:14.660Z
title: 아는 만큼 Heap Sort
---
Heap Sort는 root node가 자식보다 크거나 작다는 속성을 이용한 정렬 방법이다.

부모 노드가 자식보다 항상 크다는 Max Heap 기준으로, Max Heap에서 계속 root node만 뽑으면 무조건 정렬된 데이터를 얻을 수 있을 것이다. 여기서 핵심은, root node를 삭제한 후 새로운 root node를 가져다 놓는 과정이다. 그러면 자신의 왼쪽과 오른쪽 서브트리가 모두 heap인 상태에서 자신만 heap이 아닌 상태가 되는데, 다시 heap의 속성을 만족하게 만들어야 한다. 이것을 Max Heapify 라고 부른다.
Heapify는 어렵지 않은데, 자신이 두 자식모다 클 때까지 자식 노드 중에 더 큰 것과 자리를 비교하는 것을 무한 반복하면 되는 것이다.
```
"""
부모는 (i-1)/2
자식은 2i+1, 2i+2
"""
def max_heapify(arr, i):
    current = arr[i]
    try:
        child_1 = arr[(2*i)+1]
    except:
        child_1 = 0

    try:
        child_2 = arr[(2*i)+2]
    except:
        child_2 = 0

    if (child_1 < current and child_2 < current):
        return

    """
    child_1과 child_2 사이에 더 큰값을 current와 바꾼 후,
    바뀐 current 자리에서 max_heapify 호출
    """
    if (child_1 > child_2):
        addr = (2*i)+1
    else:
        addr = (2*i)+2

    temp = arr[i]
    arr[i] = arr[addr]
    arr[addr] = temp

    i = addr
    
    max_heapify(arr, i)

    return arr
```

보통 Heap을 배열에 저장하고, 배열의 인덱스가 0이라고 했을 때 array의 i번째 index의 부모의 위치는 (i-1)/2, 또 그것의 자식의 위치는 각각 2i+1, 2i+2 이다. 이것은 직접 array로 heap을 구현하면 아주 쉽게 알 수 있는 사실이니, 이것을 적극 활용한다면 heapify를 구현할 수 있다.

그러면 root node를 꺼내어 결과 array에 붙이고, 마지막 node를 root 로 옮긴 후 heapify를 해서 정상적인 heap tree로 만들고, 다시 root node를 꺼내어 결과 array에 붙이고, ...

이 과정을 heap tree가 텅텅 빌 때까지 반복하면 정렬이 완성될 수 있다.
