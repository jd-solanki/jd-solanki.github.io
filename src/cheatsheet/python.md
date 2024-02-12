# Python

> _There's also nice cheatsheet available [here](https://www.pythoncheatsheet.org/)_.

## [`Pathlib`](https://docs.python.org/3/library/pathlib.html)

### Get current file direction

```py
import pathlib

# Get current file directory
curr_dir = pathlib.Path(__file__).parent.resolve()

# Get current working directory
cwd = pathlib.Path().resolve()

# Join paths using `/`
emoji_file_path = curr_dir / 'emoji-test.txt'

# Read file content
emoji_data = emoji_file_path.read_text()
```

## List

### Get index while iterating over list

```py
names = ["Tony", "Steve", "Thor", "Bruce"]

for index, name in enumerate(names):
    print(f"{index}: {name}")
```

## Dict

### Various ways to iterate over dict

```py
names = {"Tony": "Stark", "Steve": "Rogers", "Thor": "Odinson", "Bruce": "Banner"}

# Iterate over keys
for key in names:
    print(key)

# Iterate over values
for value in names.values():
    print(value)

# Iterate over keys and values
for key, value in names.items():
    print(f"{key}: {value}")
```

## Set

### Basics

```py
s = {'a', 'b', 'c', 'd', 'e'}

s = {} # 🚨 This will create an empty dict, not a set
s = set() # This will create an empty set

s.add('a') # {'a'}

s.update(['a', 'b', 'c']) # {'a', 'b', 'c'}
another_set = {'f', 'g'}
s.update(['d', 'e'], another_set) # {'a', 'b', 'c', 'd', 'e', 'f', 'g'}

s.remove('c') # {'a', 'b', 'd', 'e', 'f', 'g'}
s.remove('h') # 🚨 KeyError: 'h'
s.discard('h') # No error, Set value: {'a', 'b', 'd', 'e', 'f', 'g'}

s1 = {"a", "b", "c"}
s2 = {"b", "c", "d"}
s3 = {"c", "d", "e"}
s1.intersection(s2) # {'b', 'c'}
s1.intersection(s2, s3) # {'c'}
s1.difference(s2) # {'a'}
s2.difference(s1) # {'d'}
s1.symmetric_difference(s2) # {'a', 'd'}
s2.symmetric_difference(s1) # {'a', 'd'}
s2.difference(s1, s3) # set()
s3.difference(s2, s1) # {'e'}
```

### Difference between two sets

> _Credits: [Tweet](https://twitter.com/driscollis/status/1701883431540687021/photo/1)_

```py
names = {"Mike", "Pinky", "Brain", "Dot"}
other_names = {"Brain", "Yakko", "Wacko", "Rita"}
print(names - other_names) # {'Pinky', 'Dot', 'Mike'}
```

## Enum

#### String Enum

```py
from enum import StrEnum # since python3.11

class Fruits(StrEnum):
    APPLE = 'Apple'
    BANANA = 'Banana'
```

#### Numbered/Integer Enum

```py
from enum import IntEnum

class Fruits(IntEnum):
    VALID = 1
    INVALID = 0
```

#### Base Enum

```py
from enum import Enum

class Fruits(Enum):
    APPLE = 'Apple'
    BANANA = 'Banana'
    VALID = 1
    INVALID = 0
```

## Packing & Unpacking

### Packing Variable

> _Credits: [Tweet](https://twitter.com/TeachMePy/status/1694687499090575564)_

```py
a, *b, c = [1, 2, 3, 4, 5]
print(b) # [2, 3, 4]
```

## Decorators

```py
from collections.abc import Callable
from functools import wraps

def log[T, **P](func: Callable[P, T]) -> Callable[P, T]:
    @wraps(func)
    def inner(*args: P.args, **kwargs: P.kwargs):
        print("before")
        func(*args, **kwargs)
        print("after")

    return inner

@log
def greet():
    print("Hello")


greet()
'''
before
Hello
after
'''
```

```py
import random
from contextlib import suppress
from functools import wraps
from collections.abc import Callable
from functools import wraps

def retry(max_retries: int):
    def wrapper[T, **P](func: Callable[P, T]) -> Callable[P, T]:
        @wraps(func)
        def inner(*args: P.args, **kwargs: P.kwargs):
            for _ in range(max_retries):
                with suppress(Exception):
                    return func(*args, **kwargs)
            else:
                raise Exception("Max retries limit reached!")
        return inner
    return wrapper


@retry(3)
def only_roll_highs():
    number = random.randint(1,6)
    if number < 5:
        raise ValueError(number)
    return number

print(only_roll_highs()) # 5/6/Exception
```

## Testing

## Patching env variables

Source code:

```py
def greet():
    username = os.environ['USER']
    return f"Hello, {username}"
```

#### 1. Using `unittest`'s `mock` <Badge type="tip" text="Recommended" />

:::info
You can use this method even in pytest tests.
:::

```py
from unittest import mock

def test_greet(capsys):
    with mock.patch.dict(os.environ, {"USER": "Tony"}):
        greet()

    out, = capsys.readouterr()
    assert out == "Hello, Tony"
```

#### 2. Using `pytest`'s `monkeypatch`

```py
def test_greet(capsys, monkeypatch):
    monkeypatch.setenv("USER", "Tony")

    greet()

    out, = capsys.readouterr()
    assert out == "Hello, Tony"
```

## Networking

### Validate IP Address

> _Credits: Python Papers Newsletter by Mike Driscoll_

```py
import ipaddress

def is_valid_ip(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False

print(is_valid_ip("192.168.5.1")) # False
```

## Weird Python

```py
# Booleans are subclass of integers in Python. True => 1, False => 0
0 == False # True
1 == True # True
["hello", "world"][False] # "hello" (Explanation => ["hello", "world"][0])
["hello", "world"][True] # "world" (Explanation => ["hello", "world"][1])
isinstace(True, int) # True
```
