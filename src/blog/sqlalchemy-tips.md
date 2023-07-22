---
title: SQLAlchemy Tips
---

# {{ $frontmatter.title }}

#### Use `dataclass` for base class

Making your model's base class a `dataclass` using `MappedAsDataclass` will provide autocompletion & type hints while creating record and help you find errors:

```py
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass

class Base(MappedAsDataclass, DeclarativeBase):
    pass
```
