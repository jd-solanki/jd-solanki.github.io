# Programming

<br>

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
