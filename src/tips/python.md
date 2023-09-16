# Python

## Performance

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

## Typing

### Use `Protocol` instead of `Callable` for function type

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

## List

### List Comprehension vs `filter` vs `for` loop

- **List Comprehension (fastest)**: When you need a list
- **Filter**: When you need an iterator
- **For loop**: for complex conditions

## Error Handling

### Exceptions

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

## Classes

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
