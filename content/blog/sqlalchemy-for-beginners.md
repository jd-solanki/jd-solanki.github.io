---
title: SQLAlchemy for Beginners
description: An introductory guide to SQLAlchemy, covering the basics of Core and ORM for database interactions in Python.
date: 2024-04-25
---

## Basics & Terminology

- SQLAlchemy is divided in two parts:
    1. **Core:** is a low-level SQL toolkit that provides a set of classes for interacting with databases.
    2. **ORM:** is a high-level object-relational mapping library that provides a way to interact with databases using Python objects.
- Check out the full glossary [here](https://docs.sqlalchemy.org/en/20/glossary.html).

## Core

### Engine

Engine provides a source of connectivity to a database. It provides [Connection](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Connection) object which should be closed as soon as it's no longer needed. Best way to use this connection is using `with` statement.

```py
from sqlalchemy import create_engine

# Create an in-memory SQLite database engine
engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)

# Connect to the database using the engine
with engine.connect() as conn:
    # Perform operations

# Connection is closed automatically
```

When connection is closed, ROLLBACK is called automatically. If you want to commit the transaction, you can call `conn.commit()` before closing the connection.

```py
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("INSERT INTO users (name) VALUES ('Alice')"))
    conn.commit() # If we don't call this, the transaction will be rolled back
```

There is also a `begin()` method which auto commits the transaction when the block is exited. It'll ROLLBACK the transaction if an exception is raised.

```py
with engine.begin() as conn:
    conn.execute(text("INSERT INTO users (name) VALUES ('Alice')"))

# Above transaction is committed automatically
```

In above code example, `conn.execute(text(...))` will return [`Result`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Result) object.

`Result` represents an iterable object of result rows. Simply, `Result` is list of [`Row`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Row) object. `Row` object is [named tuple](https://docs.python.org/3/library/collections.html#collections.namedtuple) like object.

```py
result = conn.execute(text("select x, y from some_table"))

# Tuple Assignment
for x, y in result:
    ...

# Integer Index
for row in result:
    x = row[0]

# Attribute Name
for row in result:
    y = row.y

    # illustrate use with Python f-strings
    print(f"Row: {row.x} {y}")

# Mapping Access (Dict)
# `result.mappings()` provides `RowMapping` objects instead of `Row` objects
for dict_row in result.mappings():
    x = dict_row["x"]
    y = dict_row["y"]
```

#### Sending Parameters

Use `:y` format to send parameters to the query. `text` accepts second argument as dictionary of parameters.

```py
with engine.connect() as conn:
    result = conn.execute(text("SELECT x, y FROM some_table WHERE y > :y"), {"y": 2})
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
```

You can also pass multiple parameters in a list.

```py
with engine.connect() as conn:
    conn.execute(
        text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
        [{"x": 11, "y": 12}, {"x": 13, "y": 14}],
    )
    conn.commit()
```

### Metadata

Metadata is python objects that represent database concepts like tables and columns.

```py
from sqlalchemy import MetaData, Table, Column, Integer, String

metadata_obj = MetaData()

user_table = Table(
    "user_account",
    metadata_obj, # 🚨 Notice we're passing `metadata_obj` here
    Column("id", Integer, primary_key=True),
    Column("name", String(30)),
    Column("fullname", String),
)

metadata_obj.create_all(engine) # Create tables in the database
metadata_obj.drop_all(engine) # Drop tables from the database
```

### ORM

In ORM, table metadata is creating using `Base` class.

```py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

# Base.metadata => metadata object
```

Read more about configuration [here](https://docs.sqlalchemy.org/en/20/orm/mapper_config.html).

```py
from sqlalchemy.orm import Mapped, mapped_column, relationship

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[str | None]
    addresses: Mapped[list["Address"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id}, name={self.name}, fullname={self.fullname})"

class Address(Base):
    __tablename__ = "address"

    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("users.id"))
    user: Mapped[User] = relationship(back_populates="addresses")

    def __repr__(self) -> str:
        return f"Address(id={self.id}, email_address={self.email_address})"
```

- Above style of defining the table is called "Declarative with Imperative Table".
- Above two classes refers to table in the database. `__tablename__` will be the name of the table in the database.
- For columns with simple data types and no other options, we can indicate a Mapped type annotation alone. E.g. `email_address: Mapped[str]`
- Using data type in `Mapped[<type>]` represents the column type in the database. For example, `Mapped[int]` refers to Integer and `Mapped[str]` refers to String. You can read more about it [here](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#orm-declarative-mapped-column) and [here](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#orm-declarative-mapped-column-type-map).
- If type of column is nullable, you can use, `Mapped[str | None]`. You can also explicitly specify `nullable=True` in `mapped_column` function (this is optional).
- You can also defined the column without the mapped annotations. In this case, you've to provide the type of the column explicitly along with the `nullable` option. E.g. `email_address = Column(String, nullable=False)`.
- Two additional attributes, `User.addresses` and `Address.user`, define a different kind of attribute called [`relationship()`](https://docs.sqlalchemy.org/en/20/orm/relationship_api.html#sqlalchemy.orm.relationship). The `relationship()` construct is discussed more fully at [Working with ORM Related Objects](https://docs.sqlalchemy.org/en/20/tutorial/orm_related_objects.html#tutorial-orm-related-objects).
- The classes are automatically given an `__init__()` method if we don’t declare one of our own. The default form of this method accepts all attribute names as optional keyword arguments:

    ```py
    sandy = User(name="sandy", fullname="Sandy Cheeks")
    ```

    To automatically generate a full-featured `__init__()` method which provides for positional arguments as well as arguments with default keyword values, the dataclasses feature introduced at [Declarative Dataclass Mapping](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html#orm-declarative-native-dataclasses) may be used.

    :::tip
    It's a good idea to use dataclass Mapping for autocompletion.
    :::

:::note
Resources to Learn More

- [ORM Mapping Styles](https://docs.sqlalchemy.org/en/20/orm/mapping_styles.html#orm-mapping-styles) - full background on different ORM configurational styles.

- [Declarative Mapping](https://docs.sqlalchemy.org/en/20/orm/mapping_styles.html#orm-declarative-mapping) - overview of Declarative class mapping

- [Declarative Table with `mapped_column()`](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#orm-declarative-table) - detail on how to use `mapped_column()` and `Mapped` to define the columns within a table to be mapped when using Declarative.

:::
