# Regex

```py
'''
Password validation regex that validates:
- At least one lowercase alphabet i.e. [a-z]
- At least one uppercase alphabet i.e. [A-Z]
- At least one Numeric digit i.e. [0-9]
- At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
- Total length must be in the range [8-15]
'''
pwd = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$"
```
