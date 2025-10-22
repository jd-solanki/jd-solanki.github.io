---
title: SQLAlchemy - My Findings
description: Discover useful tips, best practices, and code snippets for working with SQLAlchemy in Python.
date: 2024-04-25
---

::accordion

::accordion-item{label=Resources icon="i-lucide-book"}

- SQLAlchemy Docs:
  - [Using Enum in SQLAlchemy](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#using-python-enum-or-pep-586-literal-types-in-the-type-map)
  - [ORM migration usage](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html#migration-orm-usage)
  - [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)
  - [Default type mapping for `Mapped`](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation)
  - [`mapped_column()` API](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column)
  - [ORM Querying Guide](https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html#orm-querying-guide)
  - [Using Dataclass via `MappedAsDataclass`](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html)
  - [Select API reference](https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select)
  - [Session API reference](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session)
  - [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)

- Other:

  - [Mastering Soft Delete: Advanced SQLAlchemy Techniques](https://theshubhendra.medium.com/mastering-soft-delete-advanced-sqlalchemy-techniques-4678f4738947)
  - [What's new in SQLAlchemy 2](https://blog.miguelgrinberg.com/post/what-s-new-in-sqlalchemy-2-0)
  - [Dataclass Known Issues](https://github.com/sqlalchemy/sqlalchemy/issues/9410)
  - [YouTube - Relationship loading techniques](https://www.youtube.com/watch?v=KNxVG4OcboY)
  - [Filtering Soft Deletes Globally](https://theshubhendra.medium.com/mastering-soft-delete-advanced-sqlalchemy-techniques-4678f4738947)
::
::

## 📚 Cheatsheet

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

    addresses: Mapped[list["Address"]] = relationship(init=False, back_populates="user")

class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    email_address: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    user: Mapped["User"] = relationship(init=False, back_populates="addresses")
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

# Exist Query
statement = select(exists().where(User.email = "admin@mail.com"))
has_admin_email: bool | None = await db.scalar(statement)
```

## ✨ Tips

### Using `default` vs `init` for `MappedAsDataclass`

Beware when using `init=False` on column that means you'll be never able to set that column value while creating the record. So, use `default` instead of `init=False` for columns for flexibility.

In below example, We have `id` column which is primary key and we don't want to set it while creating the record. So, we use `init=False` for `id` column. This is fine for regular usage however, while testing or debugging, you might need to set `id` manually. In this case, you can't set `id` because it's not allowed in `__init__`.

```py
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
)

class Base(DeclarativeBase, MappedAsDataclass):
    pass

class MyModel(Base):
    __tablename__ = "awesome"

    id: Mapped[int] = mapped_column(primary_key=True, kw_only=True, init=False)

MyModel(id=2) # 🚨 Error: `id` is not allowed in __init__
```

To fix this, you can use `default` instead of `init=False`:

```py
id: Mapped[int] = mapped_column(primary_key=True, kw_only=True, init=False) // [!code --]
id: Mapped[int] = mapped_column(primary_key=True, kw_only=True, default=None) // [!code ++]
```

### FastAPI, Pydantic Schemas & Relationship

Check this blog [post](/blog/loading-relationship-data-via-pydantic-schema-in-fastapi.md).

### `default` & `server_default`

It's good idea to define both `default` & `server_default`. `default` is for python side and `server_default` is for database side

Setting both ensures that the default value is used when creating a new record regardless of whether the value is set via model (ORM or python) or directly in the database (using SQL).

```py{4,5}
attachments: Mapped[JSONType] = mapped_column(
    JSONB,
    nullable=False,
    default=list,
    server_default=text("'[]'::jsonb"),
)
```

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

Please refer to [this](/blog/database-my-findings#sql-query-optimization) blog post

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

### Self referencing table

```py
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

class WorkflowNode(Base):
    __tablename__ = "workflow_node"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    parent_node_id: Mapped[int | None] = mapped_column(ForeignKey("workflow_node.id"))

    # Parent relationship (many-to-one)
    parent_node: Mapped["WorkflowNode | None"] = relationship(
        remote_side=[id],  # Specify which side is "remote" (the one column)
        back_populates="children"
    )

    # Children relationship (one-to-many)
    children: Mapped[list["WorkflowNode"]] = relationship(back_populates="parent_node")
```

## 📝 Snippets

### type annotations for JSONB Column

```py
from typing import Any
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import text
from sqlalchemy.types import JSON
from sqlalchemy.dialects.postgresql import JSONB

type JSONType = str | int | float | bool | None | dict[str, "JSONType"] | list["JSONType"]

# Use `MappedAsDataclass` to make models dataclasses and get autocompletion
class Base(DeclarativeBase, MappedAsDataclass):
    type_annotation_map = {JSONType: JSON}

class MyModel(Base):
    settings: Mapped[JSONType] = mapped_column(JSONB, default=dict, server_default=text("'{}'::jsonb"))
```

### Helper columns

```py
from datetime import datetime
from typing import ClassVar

from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import false

class MixinId:
    id: Mapped[int] = mapped_column(primary_key=True, kw_only=True, default=None)

class MixinCreatedAt:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.timezone("UTC", func.now()),
        default=None,
        kw_only=True,
    )

class MixinUpdatedAt:
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.timezone("UTC", func.now()),
        onupdate=func.timezone("UTC", func.now()),
        default=None,
        kw_only=True,
    )

class MixinIsDeleted:
    is_deleted: Mapped[bool] = mapped_column(default=False, server_default=false(), kw_only=True)

class MixinFactory:
    """Factory mixin to create instances of the model.

    Examples:
        >>> MixinStartedAt = MixinFactory.get_renamed("created_at", "started_at")
        <class '__main__.MixinRenamed'> # This is dummy class having "started_at" database column
        >>> MixinModifiedAt = MixinFactory.get_renamed("updated_at", "modified_at")
        <class '__main__.MixinRenamed'> # This is dummy class having "modified_at" database column
        >>> class NewTable(Base, MixinStartedAt): ...

    """

    _mixin_map: ClassVar[dict[Mixin, object]] = {
        "created_at": MixinCreatedAt,
        "updated_at": MixinUpdatedAt,
        "is_deleted": MixinIsDeleted,
    }

    @staticmethod
    def get_renamed(mixin_name: Mixin, renamed_col: str):
        """Get the mixin with the renamed column.

        Args:
            mixin_name: Original mixin name to use as template
            renamed_col: New column name to use

        Returns:
            A new mixin class with the renamed column

        Raises:
            ValueError: If mixin_name is not valid

        """
        source_mixin = MixinFactory._mixin_map[mixin_name]
        original_col = next(iter(source_mixin.__annotations__))
        column_def = getattr(source_mixin, original_col)
        type_annotation = source_mixin.__annotations__[original_col]

        # Create new mixin class with proper type annotation
        return type(
            "_RenamedMixin",
            (),
            {
                renamed_col: column_def,
                "__annotations__": {renamed_col: type_annotation},
            },
        )
```
