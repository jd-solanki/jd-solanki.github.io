---
title: Why Python Type System Sucks
tag: python
date: 2024-11-27
---

# {{ $frontmatter.title }}

## Unpredictable Type Inference

- Even with all possible type hints, Python type system don't allow passing `TypedDict` value to param.

```py
from collections.abc import Mapping, MutableMapping
from typing import TypedDict

def my_func(v: Mapping[str, str] | dict[str, str] | MutableMapping[str, str]):  ...


class MyTypedDict(TypedDict): ...


val: MyTypedDict = {}
my_func(val) # 🚨 ERROR: "MyTypedDict" is not assignable 
```

## Nested Types are hard

- Python type system is not good at handling nested types. We've to define a new type for each nested type.

```py
from typing import Any, TypedDict

class ContextNode(TypedDict):
    output: Any


class Context(TypedDict):
    nodes: ContextNode
```

In typescript this is as simple as:

```ts
interface Context {
  nodes: {
    output: any
  }
}
```

## Beware with `Sequence`

```py
from collections.abc import Sequence


def my_func(errors: Sequence[str]): ...

my_func(["Some Error"])
my_func("Some Error") # Valid, Because strings are sequence as well
```
