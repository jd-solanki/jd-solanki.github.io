# Python

## [`Pathlib`](https://docs.python.org/3/library/pathlib.html)

### Get current file direction

```py
import pathlib

# Get current file directory
pathlib.Path(__file__).parent.resolve()

# Get current working directory
pathlib.Path().resolve()

# Join paths using `/`
curr_dir = pathlib.Path(__file__).parent.resolve()
emoji_file_path = curr_dir / 'emoji-test.txt'

# Read file content
emoji_data = emoji_file_path.read_text()
```

## Set

### Difference between two sets

> _Credits: [Tweet](https://twitter.com/driscollis/status/1701883431540687021/photo/1)_

```py
names = {"Mike", "Pinky", "Brain", "Dot"}
other_names = {"Brain", "Yakko", "Wacko", "Rita"}
print(names - other_names) # {'Pinky', 'Dot', 'Mike'}
```

## Packing & Unpacking

### Packing Variable

> _Credits: [Tweet](https://twitter.com/TeachMePy/status/1694687499090575564)_

```py
a, *b, c = [1, 2, 3, 4, 5]
print(b) # [2, 3, 4]
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
