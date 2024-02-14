# Python

## Functions

### Execute function immediately in python (IIFE)

```py
@lambda f:f()
def say():
    print(f"hello!")
```

### Throttle function

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

## OS & I/O

### Prepending text to file

```python
def prepend_text(filename: Union[str, Path], text: str):
    with fileinput.input(filename, inplace=True) as file:
        for line in file:
            if file.isfirstline():
                print(text)
            print(line, end="")
```

## Date, Time & Timezones

### How to make naive datetime, timezone aware

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

### Walk directory recursively

```python
from pathlib import Path

path = Path("docs")
for p in path.rglob("*"):
     print(p.name)
```

## Testing

### Use `capsys` fixture with types in pytest

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

## Exceptions

### Retry decorator

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

### Exception Logging Decorator

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

## Libraries

## Design Patterns

### Singleton

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

# Adjust the paths according to your project structure
curr_dir = pathlib.Path(__file__).parent.resolve()
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
