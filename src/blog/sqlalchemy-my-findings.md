---
title: SQLAlchemy - My Findings
tag: python, database
date: 2024-04-25
---

# {{ $frontmatter.title }}

## 📚 Cheatsheet

### Useful Links

- [ORM migration usage](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html#migration-orm-usage)
- [ORM Querying Guide](https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html#orm-querying-guide)
- [Using Enum in SQLAlchemy](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#using-python-enum-or-pep-586-literal-types-in-the-type-map)
- [`mapped_column()` API](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column)
- [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)
- [Default type mapping for `Mapped`](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation)
- [What's new in SQLAlchemy 2](https://blog.miguelgrinberg.com/post/what-s-new-in-sqlalchemy-2-0)
- [Using Dataclass via `MappedAsDataclass`](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html)
- [Dataclass Known Issues](https://github.com/sqlalchemy/sqlalchemy/issues/9410)
- [Select API reference](https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select)
- [Session API reference](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session)
- [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)

### ORM

#### Define Models

[Type annotation map](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation)

```py
from sqlalchemy.orm import MappedAsDataclass, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, ForeignKey, func
from datetime import datetime

class Base(MappedAsDataclass, DeclarativeBase):
    pass

class User(Base):
    # Define table name
    __tablename__ = "users"

    # Define primary key. `index=True` is optional when using `primary_key=True`
    # When inheriting from `MappedAsDataclass`, `init=False` is required for primary key to be ignored in `__init__` method
    id: Mapped[int] = mapped_column(primary_key=True, init=False)

    # Define column with length
    name: Mapped[str] = mapped_column(String(30))

    # Auto infer col type from python type
    # `str | None` => `NULL` is allowed
    fullname: Mapped[str | None]

    # `str` => `NOT NULL`
    required_fullname: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())

    addresses: Mapped[list["Address"]] = relationship(back_populates="user")

class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    email_address: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    user: Mapped["User"] = relationship(back_populates="addresses")
```

:::info
`mapped_column()` receives the same arguments as `dataclasses.field()`. E.g. `default`, `init`, etc.
:::

#### Query data

```py
from sqlalchemy import or_

# Get user by id
user = await db.get(User, 73)

# Get all users (Use this method instead of below three)
statement = select(User)
result = await db.scalars(statement)
users = result.all()

# Get all users (Explicit)
users = db.execute(
    select(User)
).scalars().all()


# Get all users with limit & offset
statement = select(User).offset(skip).limit(limit)
result = await db.scalars(result)
users = result.unique().all()

# Filter user by email
statement = select(User).where(User.email == "john@mail.com")
result = await db.scalars(statement)
user = result.first()
# instead of `.first()` you can also use `.one()` & `.one_or_none()`

# Filter with multiple conditions (AND)
statement = select(User).where(User.email == "john@mail.com").where(User.username == data.username)
result = await db.scalars(statement)
user = result.first()

# Filter with multiple conditions (OR)
statement = select(User).where(or_(User.email == data.email, User.username == data.username))
result = await db.scalars(statement)
user = result.first()

# Order by id
statement = select(User).order_by(User.id.desc())
result = await db.scalars(statement)
users = result.all()

# Get count
statement = select(func.count()).select_from(User)
count = await db.scalar(statement)

statement = select(func.count(User.id))
count = await db.scalar(statement)
```

## ✨ Tips

### Django like [signals](https://docs.djangoproject.com/en/4.2/topics/signals/) in SQLAlchemy

```py
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Define the function to run after insertion
def after_insert_listener(mapper, connection, target):
    # Your custom logic here
    print("New user added to the DB:", target)

# Attach the event listener to the after_insert event
listens_for(User, 'after_insert', after_insert_listener)
```

### Use `dataclass` for base class

Making your model's base class a `dataclass` using `MappedAsDataclass` will provide autocompletion & type hints while creating record and help you find errors:

```py
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass

# Use `MappedAsDataclass` to make models dataclasses and get autocompletion
class Base(MappedAsDataclass, DeclarativeBase):
    pass
```

### SQLAlchemy Query Optimization

Please refer to [this](/blog/sql-query-optimization) blog post

### Using with Pydantic

#### `.model_dump()` and `exclude_unset=None`

When you have optional fields like `name: str | None = None` and you use `MappedAsDataclass`, you might get `__init__` got unexpected param or it misses some param. In this case, best practice will be using `.model_dump()` (_without `exclude_unset=None`_) and `.model_dump(exclude_unset=True)` when you update the SQLAlchemy model.

#### Serializing `HttpUrl` for compatibility with SQLAlchemy model

When you use `HttpUrl` from `pydantic`, you can't directly use it with SQLAlchemy model. You need to convert it to `str` before saving it to the database.

```py
class MyModel(BaseModel):
    uploaded_url: HttpUrl

class MyModelDB(Base):
    uploaded_url: Mapped[str]

data = MyModel(uploaded_url="https://example.com")
db.add(MyModelDB(**data.model_dump())) # Error: SQLAlchemy don't accept Url type from pydantic

# Tell pydantic how to serialize the HttpUrl field
class MyModel(BaseModel):
    uploaded_url: Annotated[HttpUrl, PlainSerializer(str)]

db.add(MyModelDB(**data.model_dump())) # Works
```

## 📝 Snippets

### type annotations for JSONB Column

```py
from typing import Any
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import text

type JSONValue = str | int | float | bool | None | JSONDict | JSONList
type JSONDict = dict[str, JSONValue]
type JSONList = list[JSONValue]
type JSONType = JSONDict | JSONList

# Use `MappedAsDataclass` to make models dataclasses and get autocompletion
class Base(DeclarativeBase, MappedAsDataclass):
    # Thanks: https://stackoverflow.com/a/75678968
    type_annotation_map = {
        JSONType: JSONB,
        JSONDict: JSONB,
        JSONList: JSONB,
    }

class MyModel(Base):
    settings: Mapped[JSONDict] = mapped_column(server_default=text("'{}'::jsonb"))
```

### Helper columns

```py
from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column


class ColIdInt:
    id: Mapped[int] = mapped_column(primary_key=True, init=False)


class ColCreatedAt:
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())


class ColUpdatedAt:
    updated_at: Mapped[datetime | None] = mapped_column(init=False, onupdate=func.now())


class ColLastActivityAt:
    last_activity_at: Mapped[datetime | None] = mapped_column(
        init=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

# You can use them as mixins
class User(Base, ColIdInt, ColCreatedAt, ColUpdatedAt, ColLastActivityAt):
    __tablename__ = "users"

    name: Mapped[str]
```
