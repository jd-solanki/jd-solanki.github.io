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
