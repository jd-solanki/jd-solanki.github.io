---
title: Database connection in Python
tag: database, python
date: 2024-03-24
---

# {{ $frontmatter.title }}

## Simple connection

```py
import sqlite3

# Connect to database
conn = sqlite3.connect("example.db")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
cursor.execute("INSERT INTO users (name) VALUES ('Alice')")
cursor.execute("SELECT * FROM users")
print(cursor.fetchall())

conn.commit()
conn.close()
```

## Using context manager

```py
import sqlite3
from contextlib import contextmanager

# `open_db` context manager
@contextmanager
def open_db(db_name: str):
    conn = sqlite3.connect(db_name)
    try:
        cursor = conn.cursor()
        yield cursor
    finally:
        conn.commit()
        conn.close()

# # Class based context manager
# class OpenDB:
#     def __init__(self, file_name: str):
#         self.file_name = file_name
#         self.conn = sqlite3.connect(self.file_name)

#     def __enter__(self):
#         return self.conn.cursor()

#     def __exit__(self, exc_type, exc_val, exc_tb):
#         self.conn.commit()
#         self.conn.close()

# Connect to database
with open_db("example.db") as cursor:
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
    cursor.execute("INSERT INTO users (name) VALUES ('Alice')")
    cursor.execute("SELECT * FROM users")
    print(cursor.fetchall())
```

## SQLAlchemy & Context Manager

```py
from sqlalchemy import create_engine, String
from sqlalchemy.orm import sessionmaker, MappedAsDataclass, DeclarativeBase, Mapped, mapped_column

class Base(MappedAsDataclass, DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str] = mapped_column(String(30))

# Connect to database
engine = create_engine("sqlite:///example.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Execute queries using context manager
with Session() as session:
    session.add(User(name="Alice"))
    session.commit()
    users = session.query(User).all()
    print(users)
```
