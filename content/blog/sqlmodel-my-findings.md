---
title: SQLModel - My Findings
description: Learn useful tips and best practices in SQLModel database library.
---

[SQLModel](https://sqlmodel.tiangolo.com/) is a library for interacting with databases using Python type hints on top of [Pydantic](https://pydantic-docs.helpmanual.io/) & [SQLAlchemy](https://sqlalchemy.org/).

## 🏗️ CRUD

### 🌱 Create

```py
hero = Hero(name="Deadpond", secret_name="Dive Wilson")
session.add(hero)
session.commit()
session.refresh(hero)

# add related table connection
hero_spider_boy.team_id = team_preventers.id
session.add(hero_spider_boy)
session.commit()
session.refresh(hero_spider_boy)
```

### 🫳 Read

#### Select all

```py
# Get all
session.exec(select(Hero))

# Get all as list
session.exec(select(Hero)).all()

# related using where
results = session.exec(select(Hero, Team).where(Hero.team_id == Team.id))
for hero, team in results:
 print("Hero:", hero, "Team:", team)

# related using join
results = session.exec(select(Hero, Team).join(Team))
for hero, team in results:
 print("Hero:", hero, "Team:", team)

# related using left outer join
results = session.exec(select(Hero, Team).join(Team, isouter=True))
for hero, team in results:
 print("Hero:", hero, "Team:", team)

# related to only get result of single table/class
heros = session.exec(select(Hero).join(Team).where(Team.name == "Preventers"))
```

#### Query using `where`

```py
# Where hero name is "Deadpond"
session.exec(select(Hero).where(Hero.name == "Deadpond"))

# Where hero name is not "Deadpond"
session.exec(select(Hero).where(Hero.name != "Deadpond"))

# Where hero age is greater than 35
session.exec(select(Hero).where(Hero.age > 35))

# Multiple Where (AND)
session.exec(select(Hero).where(Hero.age >= 35).where(Hero.age < 40))

# Where with Multiple Expression (AND)
session.exec(select(Hero).where(Hero.age >= 35, Hero.age < 40))

# Where with Multiple Expression (OR)
session.exec(select(Hero).where(or_(Hero.age <= 35, Hero.age > 90)))
```

#### Reading one row

```py
# Get the first item from the result. May return `None` if the result is empty
results.first()

# Returns exactly one item from the result. Raises an exception if the result doesn’t have exactly one result. The empty result also raises an exception.
resolts.one()

# Returns item by id. Returns `None` if not item found with queries id.
session.get(Hero, 1)
```

#### Paginating Data

```py
# first three results. [1,2,3]
select(Hero).limit(3)

# skips the first three and returns next three. [4,5,6]
select(Hero).offset(3).limit(3)

# Next batch/page: select(Hero).offset(6).limit(3) => [7,8,9]
```

### ⚙️ Update

```py
spiderboy = session.exec(select(Hero).where(Hero.name == "Spider-Boy")).one()
spiderboy.age = 16
session.add(spiderboy)
session.commit()
session.refresh(spiderboy)

# add related table connection
hero_spider_boy.team_id = team_preventers.id
session.add(hero_spider_boy)
session.commit()
session.refresh(hero_spider_boy)

# remove related table connection
hero_spider_boy.team_id = None
session.add(hero_spider_boy)
session.commit()
session.refresh(hero_spider_boy)
```

### 🏌️‍♂️ Delete

```py
hero = session.exec(select(Hero).where(Hero.name == "Spider-Youngster"))
session.delete(hero)
session.commit()
# session.refresh(hero) => raises exception
```

## 🧬 Model

### Indexing

```py
class Hero(SQLModel, table=True):
    # ...
    name: str = Field(index=True)
```

## ❤️‍🔥 Relationships

### One to Many

#### Adding foreign key

```py
class Team(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    headquarters: str

class Hero(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    secret_name: str
    age: Optional[int] = Field(default=None, index=True)

    team_id: Optional[int] = Field(default=None, foreign_key="team.id") // [!code hl]
```

#### Creating connected rows

```py
team_preventers = Team(name="Preventers", headquarters="Sharp Tower")
session.add(team_preventers)
session.commit()

'''
HEADS UP:
We aren't refreshing the `team_preventers` because later when we will access
team_preventers.id` it will get automatically refreshed.
'''

hero_deadpond = Hero(
 name="Deadpond",
 secret_name="Dive Wilson",
 team_id=team_preventers.id // [!code hl]
)
```

## 🔮 Type Annotations and Errors

### Err: `<col>` is potentially None, and you cannot compare `None` with

```py
# You will get "Hero.age is potentially None, and you cannot compare None with >/color"
session.exec(select(Hero).where(Hero.age >= 35)) // [!code error]

# Wrap the column with `col`
session.exec(select(Hero).where(col(Hero.age) >= 35))
```
