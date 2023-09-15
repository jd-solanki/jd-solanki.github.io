# Python

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
