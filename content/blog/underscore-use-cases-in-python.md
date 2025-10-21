---
title: Underscore Use Cases in Python
description: A comprehensive guide on the various use cases of underscores in Python, including conventions for private variables, throwaway variables, and more.
date: 2023-12-27
---

Underscores have several special meanings that can be helpful to know when working with Python.

## 1. Capturing the Last Value in Interpreter Session

```py
>>> 5 + 5
10
>>> _ + 5
15
```

## 2. Internal Methods and Variables

These are methods and variables that are not intended to be accessed from outside of the module or class. By starting them with an underscore, you're indicating to other developers that these are private elements that should not be used directly.

```py
class Validator:
    def __init__(self):
        self._data = None
        self.__secret = "🤫"

    def set_data(self, data):
        self._data = data

    def validate(self):
        if self._data is not None:
            print("Validating data...")
            # Validation logic here
        else:
            print("No data to validate.")

validator = Validator()
validator.set_data("Sample data")
validator.validate() # Validating data...

# Accessing single underscore private variable
print(validator._data) # Sample data

# Accessing double underscore private variable
print(validator.__secret) # AttributeError: 'Validator' object has no attribute '__secret'

# Accessing double underscore private variable using name mangling
print(validator._Validator__secret) # 🤫
```

:::tip
Single Underscore vs Double Underscore

<br /><br />

**Single Underscore:** It is only a convention. A way for the programmer to indicate that the variable is private. It is not enforced by the Python interpreter.

<br /><br />

**Double Underscore:**  is a way to prevent name conflicts between attributes and methods with the same name. Python mangles these names with the class name: if class Foo has an attribute named `__a`, it cannot be accessed by `Foo.__a`. (An insistent user could still gain access by calling `Foo._Foo__a`.) Generally, double underscores should be used only to avoid name conflicts with attributes in classes designed to be subclassed.
:::

## 3. Improving Readability of Large Numbers

```py
>>> one_million = 1_000_000
>>> one_million
1000000
```

## 4. Avoids naming conflicts with Python keywords and built-in names

```py
# class
class = "Python" # SyntaxError: invalid syntax

class_ = "Python"
```

## 5. Throwaway Variables

```py
# Throwaway variable
_, y = (1, 2)

# Throwaway variable in for loop
for _ in range(10):
    print("Hello World")
```
