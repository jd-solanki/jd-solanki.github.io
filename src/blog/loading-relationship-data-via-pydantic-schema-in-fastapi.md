---
title: Loading Relationship Data via Pydantic Schema in FastAPI
tag: fastapi, python
date: 2024-10-14
---

# {{ $frontmatter.title }}

:::details TL;DR
Instead of `select(...).options()` or `db.refresh(item, attribute_names=[])` explicitly everywhere, Instead:

- One-to-One / Many-to-One => use `lazy="joined"` in `relationship` col
- Many-to-One / Many-to-Many => use `write_only` in `relationship` col and later fetch data by pagination or filter

```py
# When list if used in relationship => lazy="write_only"
some_col: Mapped[list["SomeModel"]] = relationship(init=False, back_populates="some_col", lazy="write_only")

# When single item is used in relationship => lazy="joined"
some_col: Mapped["SomeModel"] = relationship(init=False, back_populates="some_col", lazy="joined")
```

:::

When you have a relationship between two tables, you might want to send the additional data related to another table.

For example, let's say we've two tables `user` and `address` and user has one-to-one relationship with address. And we want to send address data along with user data when user is fetched.

```shell
{
    "id": 1,
    "name": "John",
    "address": {
        "id": 1,
        "city": "New York"
    }
}
```

Let's go over best practices to fetching related data in FastAPI using Pydantic schema.

## Fetching Related Data Explicitly

Assume, we have one-to-one relationship on user and address table and have `address` relationship col like below on user table and schema like below:

```py
class User(Base):
    # ...

    address: Mapped["Address"] = relationship(init=False, back_populates="user")

class UserRead(BaseModel):
    id: int
    name: str
    address: AddressRead
```

In this case, to get the desired result as shown in first snippet we've to write endpoint like this:

```py
@app.get("/users/{user_id}", response_model=UserRead)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db),):
    # When using select => select(User).where(User.id == user_id).options(joinedload(User.address))
    return await db.get(User, user_id, options=[joinedload(User.address)])
```

This works fine but it can be verbose and you might forget to add `options` in some cases. Also, We also reuse `UserRead` schema in multiple places like user list endpoint (`response_model=list[UserRead]`) or user create endpoint. Hence, you've to write `options` multiple times and for cases like create endpoint, it gets more tricky.

```py
@app.post("/users", response_model=UserRead)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db),):
    user = User(**user.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user # 🚨 Serialization error
```

When we create user and return with `response_model=UserRead` we get serialization error because `address_id` we passed in `UserCreate` schema will not magically convert to `AddressRead` in `UserRead` schema. In above case, we've to load address explicitly like below:

```py
db.refresh(user) // [!code --]
db.refresh(user, attribute_names=["address"]) // [!code ++]
```

Now, we'll get address data along with user data even when we create user.

To summarize, we've to be careful with relationships & pydantic schemas. However, there's a better approach to handle this based on relationship type.

## One-to-One & Many-to-One Relationship

Let's take a same example of user and address table with one-to-one relationship.

In this case, instead of doing all the hassle of `options` with select statement and magically handling while creating user, we can use `lazy="joined"` in relationship col like below:

```py
class User(Base):
    # ...

    address: Mapped["Address"] = relationship(init=False, back_populates="user", lazy="joined")
```

This will tell SQLAlchemy to load address data along with user data whenever user is fetched. And, you can use `UserRead` schema as it is without any changes.

```py
@app.get("/users/{user_id}", response_model=UserRead)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db),):
    return await db.get(User, user_id)
```

### Why not use it with other relationships?

When you use `lazy="joined"`, SQLAlchemy will fetch data in single query. Now, assume there's social media app where user has many posts via `One-to-Many`. If you use `lazy="joined"` with posts relationship, it will fetch all posts of user in single query which can be huge data and slow down the response time. E.g. When you fetch user details it'll fetch thousands of posts along with it. You can think of related example yourself for `Many-to-Many` relationship.

Hence, **never use `lazy="joined"` with `One-to-Many` or `Many-to-Many` relationship.**

At simplest, avoid using `lazy="joined"` with `Mapped[list[...]]`

## Many-to-One & Many-to-Many Relationship

### It's _WIP_ 🚧

When you've `Many-to-One` or `Many-to-Many` relationship, you can use `lazy="write_only"` in relationship col like below:

```py
class User(Base):
    # ...

    # Notice here we used "write_only" because it's list
    posts: Mapped[list["Post"]] = relationship(init=False, back_populates="user", lazy="write_only")
    # posts: WriteOnlyMapped[list["Post"]] = relationship(init=False, back_populates="user")

class Post(Base):
    # ...

    # Notice here we used "joined" because it's single item
    user: Mapped[User] = relationship(init=False, back_populates="addresses", lazy="joined")

class UserRead(BaseModel):
    id: int
    name: str
    posts: list[PostRead]
```

This will tell SQLAlchemy to not load address data along with user data whenever user is fetched. Instead, we'll manually fetch posts data by pagination or filter.

```py
user_db = db.get(User, user_id)
user_posts = user_db.posts.limit(10).offset(0).all()
```
