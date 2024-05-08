---
title: Python Interview Code Challenges
tag: python, interview
date: 2024-05-08
---

# {{ $frontmatter.title }}

## Prime Numbers

Prime numbers are numbers that are divisible by only 1 and themselves. For example, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, etc. are prime numbers.

```py
def is_prime(n: int):
    if n < 2:
        return False

    for i in range(2, n):
        if n % i == 0:
            return False

    return True

def get_nth_prime_number(n: int):
    i = 2
    count = 0

    while count < n:
        if is_prime(i):
            count += 1
        i += 1

    return i - 1

def get_n_prime_numbers(n: int):
    primes = []
    i = 2

    while len(primes) < n:
        if is_prime(i):
            primes.append(i)
        i += 1

    return primes
```

## Fibonacci Numbers

Fibonacci numbers are numbers in the sequence 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, etc. where each number is the sum of the two preceding ones.

```py
def get_nth_fibonacci_numbers(n: int):
    prev, next = 0, 1

    if n == 0:
        return prev
    elif n == 1:
        return next

    for _ in range(3, n + 1):
        prev, next = next, prev + next

    return next

def get_nth_fibonacci_numbers_using_recursion(n: int):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

def get_fibonacci_numbers_up_to_n(n: int):
    prev, next = 0, 1
    fibonacci_numbers = [prev, next]

    while next < n:
        prev, next = next, prev + next
        fibonacci_numbers.append(next)

    return fibonacci_numbers

def get_n_fibonacci_numbers(n: int):
    nums = [0, 1]

    for i in range(3, n + 1):
        nums.append(nums[-1] + nums[-2])

    return nums
```

## Mean, Median, and Mode

- **Mean**: The mean is the average of a set of numbers. It is calculated by summing all the numbers in the set and dividing by the total count of numbers.

  ```python
    def mean(data: list[int]):
        return sum(data) / len(data)
  ```

- **Median**: The median is the middle value of a set of numbers when they are ordered. If the set has an odd number of elements, the median is the middle value. If the set has an even number of elements, the median is the average of the two middle values.

  ```python
    def median(data: list[int]):
        sorted_data = sorted(data)
        length = len(sorted_data)
        middle_index = length // 2

        if length % 2 == 0:
            return (sorted_data[middle_index - 1] + sorted_data[middle_index]) / 2
        else:
            return sorted_data[middle_index]
  ```

- **Mode**: The mode is the value that appears most frequently in a set of numbers.

  ```python
    from collections import defaultdict

    def mode(data: list[int]):
        freq = defaultdict(int)
        for i in data:
            freq[i] += 1

        max_freq = max(freq.values())
        
        for i in data:
            if freq[i] == 2:
                return i
  ```

Python's `statistics` module also provides functions for calculating the mean, median, and mode:

```python
import statistics

data = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9]

mean = statistics.mean(data)
median = statistics.median(data)
mode = statistics.mode(data)
```

## Pagination

```py
from typing import Any

def paginate(data: list[Any], page: int = 1, items_per_page: int = 10):
    start = (page - 1) * items_per_page
    end = page * items_per_page
    
    return data[start:end]
```
