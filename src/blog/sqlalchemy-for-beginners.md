---
title: SQLAlchemy for Beginners
tag: python, database
date: 2024-04-25
---

# {{ $frontmatter.title }}

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
