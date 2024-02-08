# SQLAlchemy

## Useful Links

- [ORM migration usage](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html#migration-orm-usage)
- [ORM Querying Guide](https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html#orm-querying-guide)
- [Using Enum in SQLAlchemy](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#using-python-enum-or-pep-586-literal-types-in-the-type-map)
- [`mapped_column()` API](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column)
- [SQL Datatype Objects](https://docs.sqlalchemy.org/en/20/core/types.html)
- [What's new in SQLAlchemy 2](https://blog.miguelgrinberg.com/post/what-s-new-in-sqlalchemy-2-0)

## ORM

### Define Models

[Type annotation map](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#mapped-column-derives-the-datatype-and-nullability-from-the-mapped-annotation)

```py
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String

class Base(DeclarativeBase):
    pass

class User(Base):
    # Define table name
    __tablename__ = "users"

    # Define primary key. `index=True` is optional when using `primary_key=True`
    id: Mapped[int] = mapped_column(primary_key=True)

    # Define column with length
    name: Mapped[str] = mapped_column(String(30))

    # Auto infer col type from python type
    # `str | None` => `NULL` is allowed
    fullname: Mapped[str | None]

    # `str` => `NOT NULL`
    required_fullname: Mapped[str]
```

### Query data

```py
from sqlalchemy import or_

# Get user by id
const id = 73
user = db.query(User).get(id)

# Filter user by email
user = db.query(User).filter(User.email === data.email).first() # instead of `first` you can also use `one_or_none`

# Filter with multiple conditions (AND)
user = db.query(User).filter(User.email === data.email, User.username === data.username).first()

# Filter with multiple conditions (OR)
user = db.query(User).filter(or_(User.email === data.email, User.username === data.username)).first()
```
