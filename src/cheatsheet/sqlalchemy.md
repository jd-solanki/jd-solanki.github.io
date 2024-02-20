# SQLAlchemy

## Useful Links

- [ORM migration usage](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html#migration-orm-usage)
- [ORM Querying Guide](https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html#orm-querying-guide)
- [Using Enum in SQLAlchemy](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#using-python-enum-or-pep-586-literal-types-in-the-type-map)
- [`mapped_column()` API](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column)
- [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)
- [Default type mapping for `Mapped`](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation)
- [What's new in SQLAlchemy 2](https://blog.miguelgrinberg.com/post/what-s-new-in-sqlalchemy-2-0)

## ORM

### Define Models

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

### Query data

🚧 _WIP_

```py
from sqlalchemy import or_

# Get user by id
user = db.get(User, 73)

# Get all users (Use this method instead of below three)
users = db.scalars(
  select(User)
).all()

# Get all users (Explicit)
users = db.execute(
    select(User)
).scalars().all()

# Filter user by email
user = db.scalars(
  select(User).where(User.email == "john@mail.com")
).first()
# instead of `.first()` you can also use `.one()` & `.one_or_none()`

# Filter with multiple conditions (AND)
user = db.scalars(
  select(User)
    .where(User.email == "john@mail.com")
    .where(User.username === data.username)
).first()

# Filter with multiple conditions (OR)
user = db.query(User).filter(or_(User.email === data.email, User.username === data.username)).first()

# Order by id
stmt = select(User).order_by(User.id)
```
