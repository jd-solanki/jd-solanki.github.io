---
title: Programming - My Findings
description: Learn useful tips and best practices in programming.
---

### Multiprocessing vs Multithreading vs Asyncio

```py
if io_bound:
    if io_very_slow:
        print("Use Asyncio")
    else:
        print("Use Threads")
else:
    print("Multi Processing")
```

- CPU Bound => Multi Processing
- I/O Bound, Fast I/O, Limited Number of Connections => Multi Threading
- I/O Bound, Slow I/O, Many connections => Asyncio

_Source: [StackOverflow Question](https://stackoverflow.com/a/52498068)_

### Processes vs Threads

[Watch video](https://www.youtube.com/watch?v=4rLW7zg21gI)
