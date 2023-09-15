# Python

## Functions

### Execute function immediately in python

```python
from typing import Callable, Any

execute: Callable[[Callable[..., Any]], None] = lambda f: f()

@execute
def say():
    print(f"hello!")
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
