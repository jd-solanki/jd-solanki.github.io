---
title: Python - My Findings
tag: my-findings, python
---

# {{ $frontmatter.title }}

:::info Resources

- [Python Cheatsheet](https://www.pythoncheatsheet.org/)
- [Effective Python Async like a PRO](https://guicommits.com/effective-python-async-like-a-pro/)
:::

## 📚 Cheatsheet

### [`Pathlib`](https://docs.python.org/3/library/pathlib.html)

#### Get current file direction

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

### List

#### Get index while iterating over list

```py
names = ["Tony", "Steve", "Thor", "Bruce"]

for index, name in enumerate(names):
    print(f"{index}: {name}")
```

### Dict

#### Various ways to iterate over dict

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

### Set

#### Basics

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

#### Difference between two sets

> _Credits: [Tweet](https://twitter.com/driscollis/status/1701883431540687021/photo/1)_

```py
names = {"Mike", "Pinky", "Brain", "Dot"}
other_names = {"Brain", "Yakko", "Wacko", "Rita"}
print(names - other_names) # {'Pinky', 'Dot', 'Mike'}
```

### Enum

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

### Packing & Unpacking

#### Packing Variable

> _Credits: [Tweet](https://twitter.com/TeachMePy/status/1694687499090575564)_

```py
a, *b, c = [1, 2, 3, 4, 5]
print(b) # [2, 3, 4]
```

### Decorators

#### Simple Decorator

```py
from collections.abc import Callable
from functools import wraps

def log[T, **P](func: Callable[P, T]) -> Callable[P, T]:
    @wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs):
        print("before")
        func(*args, **kwargs)
        print("after")

    return wrapper

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

#### Decorator with Parameters

```py
import random
from contextlib import suppress
from functools import wraps
from collections.abc import Callable
from functools import wraps

def retry(max_retries: int):
    def decorator[T, **P](func: Callable[P, T]) -> Callable[P, T]:
        @wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs):
            for _ in range(max_retries):
                with suppress(Exception):
                    return func(*args, **kwargs)
            else:
                raise Exception("Max retries limit reached!")
        return wrapper
    return decorator


@retry(3)
def only_roll_highs():
    number = random.randint(1,6)
    if number < 5:
        raise ValueError(number)
    return number

print(only_roll_highs()) # 5/6/Exception
```

### Testing

#### Patching env variables

Source code:

```py
def greet():
    username = os.environ['USER']
    return f"Hello, {username}"
```

##### 1. Using `unittest`'s `mock` <Badge type="tip" text="Recommended" />

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

##### 2. Using `pytest`'s `monkeypatch`

```py
def test_greet(capsys, monkeypatch):
    monkeypatch.setenv("USER", "Tony")

    greet()

    out, = capsys.readouterr()
    assert out == "Hello, Tony"
```

### Networking

#### Validate IP Address

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

### Weird Python

```py
# Booleans are subclass of integers in Python. True => 1, False => 0
0 == False # True
1 == True # True
["hello", "world"][False] # "hello" (Explanation => ["hello", "world"][0])
["hello", "world"][True] # "world" (Explanation => ["hello", "world"][1])
isinstace(True, int) # True
```


## 📝 Snippets

### Functions

#### Execute function immediately in python (IIFE)

```py
@lambda f:f()
def say():
    print(f"hello!")
```

#### Throttle function

```py
import time
import functools

def basic_throttle(calls_per_second):
    def decorator(func):

        last_called = 0.0
        count = 0

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal last_called, count
            current_time = time.time()

            # Reset counter if new second
            if current_time - last_called >= 1:
                last_called = current_time
                count = 0

            # Enforce the limit
            if count < calls_per_second:
                count += 1
                return func(*args, **kwargs)

            return None

        return wrapper
    return decorator

@basic_throttle(5)
def send_alert():
    print(f"Alert !")

for i in range(10):
    send_alert()
    time.sleep(0.1)

'''
Alert !
Alert !
Alert !
Alert !
Alert !
'''
```

### OS & I/O

#### Prepending text to file

```python
def prepend_text(filename: Union[str, Path], text: str):
    with fileinput.input(filename, inplace=True) as file:
        for line in file:
            if file.isfirstline():
                print(text)
            print(line, end="")
```

### Date, Time & Timezones

#### How to make naive datetime, timezone aware

```py
import datetime
import pytz

# local time without timezone info
dt_india = datetime.datetime.now()

# If you try to convert this naive datetime in different timezone using `astimezone` it will give error

# 1. Create timezone
tz_india = pytz.timezone('Asia/Kolkata')

# 2. Make naive datetime timezone aware using `localize`
dt_india = tz_india.localize(dt_india)
print(dt_india) # 2023-09-20 14:31:03.941181+05:30

# as `dt_india` is now timezone aware, you can convert it to any other timezone using `astimezone`
```

#### Walk directory recursively

```python
from pathlib import Path

path = Path("docs")
for p in path.rglob("*"):
     print(p.name)
```

### Testing

#### Use `capsys` fixture with types in pytest

```python
from pytest import CaptureFixture // [!code hl]
from src.main import app
from typer.testing import CliRunner

runner = CliRunner()

def test_app(capsys: CaptureFixture[str]): // [!code hl]
    result = runner.invoke(app, ['master', 'fill-code-snippets'])
    assert result.exit_code == 0
    with capsys.disabled():
        print(f"result.stdout: {result.stdout}")
```

### Exceptions

#### Retry decorator

> _Credits: [ArjanCodes Repo](https://github.com/ArjanCodes/betterpython/blob/main/7%20-%20dealing%20with%20errors/advanced/retry-decorator.py)_

```py
import time
import math
from functools import wraps

def retry(ExceptionToCheck, tries=4, delay=3, backoff=2, logger=None):
    """Retry calling the decorated function using an exponential backoff.

    http://www.saltycrane.com/blog/2009/11/trying-out-retry-decorator-python/
    original from: http://wiki.python.org/moin/PythonDecoratorLibrary#Retry

    :param ExceptionToCheck: the exception to check. may be a tuple of
        exceptions to check
    :type ExceptionToCheck: Exception or tuple
    :param tries: number of times to try (not retry) before giving up
    :type tries: int
    :param delay: initial delay between retries in seconds
    :type delay: int
    :param backoff: backoff multiplier e.g. value of 2 will double the delay
        each retry
    :type backoff: int
    :param logger: logger to use. If None, print
    :type logger: logging.Logger instance
    """
    def deco_retry(f):

        @wraps(f)
        def f_retry(*args, **kwargs):
            mtries, mdelay = tries, delay
            while mtries > 1:
                try:
                    return f(*args, **kwargs)
                except ExceptionToCheck as e:
                    msg = "%s, Retrying in %d seconds..." % (str(e), mdelay)
                    if logger:
                        logger.warning(msg)
                    else:
                        print(msg)
                    time.sleep(mdelay)
                    mtries -= 1
                    mdelay *= backoff
            return f(*args, **kwargs)

        return f_retry  # true decorator

    return deco_retry

@retry(Exception, tries=4)
def test_fail(text):
    raise Exception("Fail")

test_fail("it works!")
```

#### Exception Logging Decorator

> _Credits: [ArjanCodes Repo](https://github.com/ArjanCodes/betterpython/blob/main/7%20-%20dealing%20with%20errors/advanced/retry-decorator.py)_

```py
import logging 
from functools import wraps

# Example from: https://www.geeksforgeeks.org/create-an-exception-logging-decorator-in-python/

def create_logger(): 
 
 # create a logger object 
 logger = logging.getLogger('exc_logger') 
 logger.setLevel(logging.INFO) 
 
 # create a file to store all the 
 # logged exceptions 
 logfile = logging.FileHandler('exc_logger.log') 
 
 fmt = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
 formatter = logging.Formatter(fmt) 
 
 logfile.setFormatter(formatter) 
 logger.addHandler(logfile) 
 
 return logger 

logger = create_logger() 

# you will find a log file 
# created in a given path 
print(logger) 

def exception(logger):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except:
                issue = "exception in "+func.__name__+"\n"
                issue = issue+"=============\n"
                logger.exception(issue)
                raise
        return wrapper
    return decorator 


@exception(logger) 
def divideByZero(): 
 return 12/0

# Driver Code 
if __name__ == '__main__': 
 divideByZero() 
```

### Design Patterns

#### Singleton

```py
class Singleton(type):
    def __init__(cls, *args, **kwargs):
        cls.__instance = None
        super().__init__(*args, **kwargs)

    def __call__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = super().__call__(*args, **kwargs)
            return cls.__instance
        else:
            return cls.__instance

class Logger(metaclass=Singleton):
    def __init__(self):
        print("Creating global Logger instance")
```

### Alembic

#### Auto import models in `env.py` file for auto generation of migrations

```py
# File: repo_root/pkg_name/utils/imports.py

import os
from importlib import import_module
from pathlib import Path

# 🚨 Adjust the paths according to your project structure
curr_dir = Path(__file__).parent.resolve()
pkg_dir = curr_dir.parent / "pkg_name"
root_dir = pkg_dir.parent


def import_models_for_alembic():
    # Consider modules.py & all files in models directory as models
    models_file_glob = pkg_dir.glob("**/models.py")
    models_dir_glob = pkg_dir.glob("**/models/*.py")

    # Combine the two generators
    models_file_glob = [*models_file_glob, *models_dir_glob]

    for file in models_file_glob:
        # Skip __init__.py
        if file.name == "__init__.py":
            continue

        relative_path = file.relative_to(root_dir)
        module = str(relative_path).replace(os.sep, ".").replace(".py", "")
        import_module(module)
```

## 🪄 Tips

### General

:::tip
I'm exploring using [rye](https://github.com/astral-sh/rye) now.
:::

#### Always install packages in virtual environment forcefully

```shell
# ~/.zshrc 
export PIP_REQUIRE_VIRTUALENV=true
```

Now if you try to install packages without activating virtual environment, it'll throw error.

```shell
pip install requests
# ERROR: Could not find an activated virtualenv (required).
```

### Performance

#### Caching with `@lru_cache` decorator

- Use [`func_tools.lru_cache`](https://docs.python.org/3/library/functools.html#functools.lru_cache) to cache the result of a expensive function call.

```py
from functools import lru_cache
from time import sleep

@lru_cache // [!code hl]
def slow_func():
    sleep(3)
    print('Done!')
```

:::tip
You can also pass `maxsize` param. It specifies the maximum number of calls that can be cached.
:::

:::warning
Beware of using `@lru_cache` on class methods as it can cause memory leaks. Refer to [this](https://www.youtube.com/watch?v=sVjtp6tGo0g) video for more details.
:::

:::tip Get uncached version of function
You can use `slow_func.__wrapped__()` to get uncached version of function. This is useful when writing test cases where you don't want to test cached output.
:::

### Typing

#### Use `Protocol` instead of `Callable` for function type

Instead of creating function type based on callable use `Protocol`. `Protocol` will allow you to write param names.

```py
from typing import Callable

EmailSender = Callable[[str, str, str], None]
```

Use below 👇

```py
from typing import Protocol

class EmailSender(Protocol):
    def __call__(self, to: str, subject: str, body: str) -> None: ...
```

### List

#### List Comprehension vs `filter` vs `for` loop

- **List Comprehension (fastest)**: When you need a list
- **Filter**: When you need an iterator
- **For loop**: for complex conditions

### Error Handling

#### Exceptions

- Write as minimum code as possible in `try` block to avoid catching unrelated exceptions
- Only catch exceptions that you are expecting. Avoid catching `Exception` or `BaseException`
- You can execute custom code when an exception is raised by first catching the exception and then re-raising it like below:

    ```py
    try:
        print(3/0)
    except ZeroDivisionError:
        print("Oops! You can't divide by zero.") # Your custom code
        raise # re-raise the same exception
    ```

### Classes

> _Excellent [video](https://www.youtube.com/watch?v=lX9UQp2NwTk) on guide to writing classes_

- Use module instead of class if you are not creating multiple instances of class.
- Keep your classes small. Mostly probably, You can split large classes into multiple smaller classes. You can split them based on either "Data Focused" or "Behavior Focused". Refer to mentioned video for more details.
- Instead of lots of instance properties and related methods, use a [dataclasses](https://docs.python.org/3/library/dataclasses.html).
- Try to make your classes as flexible & dependency as possible. For example, If you want to send mail in method use `Protocol` or accept a function in method param instead of hardcoding low level `SMTP` or other third-party package in your class.
- If methods looks like a property, use `@property` decorator. It'll make your code more readable.

<br>

---

<br>

**Credits:**

- [ArjanCodes](https://www.youtube.com/@ArjanCodes) YouTube channel
- [anthonywritescode](https://www.youtube.com/@anthonywritescode) YouTube channel

### Date, Time & Timezones

- To pass date, time, etc around your application or save them, use iso format.

```py
import datetime
import pytz

# local time without timezone info
dt_india = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata'))
print(dt_india.isoformat()) # 2023-09-20T14:43:49.865596+05:30
```
