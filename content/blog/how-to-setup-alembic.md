---
title: How To Setup Alembic With SQLAlchemy
description: A step-by-step guide to setting up Alembic for database migrations in a Python project using SQLAlchemy.
---

## Introduction

Alembic is a lightweight database migration tool for SQLAlchemy. It is used to generate migrations for a database schema, and apply migrations to a database.

## Setup

First install Alembic in your virtual environment.

```bash
uv add alembic
```

Initialize Alembic via the `init` command.

```bash
alembic init -t async alembic
```

It will crate a `alembic.ini` file and a `alembic` directory in your project.

Now let's set our database URL. For our case we want to get it from environment variable and don't want to hardcode it in the `alembic.ini` file.

Hence, we will comment line similar to below in `alembic.ini` file.

```ini
sqlalchemy.url = driver://user:pass@localhost/dbname // [!code --]
# sqlalchemy.url = driver://user:pass@localhost/dbname // [!code ++]
```

It's convenient to create above `get_db_url` function in `Settings` class and use it in alembic.

```py
from pydantic_settings import BaseSettings
from sqlalchemy.engine.url import URL

class Settings(BaseSettings):
    # Your settings

    # Database
    DB_ECHO: bool = False
    DB_DRIVER_NAME: str
    DB_HOST: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    def get_db_url(self):
        url_object = URL.create(
            drivername=self.DB_DRIVER_NAME,
            host=self.DB_HOST,
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            database=self.DB_NAME,
        )
        return url_object.render_as_string(hide_password=False)
```

Now, instead of creating `get_url` function inside `alembic/env.py` file, you can import `Settings` class and use `get_db_url` method.

```py
from core.settings import settings

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

config.set_main_option("sqlalchemy.url", settings.get_db_url())
```

:::tip
You can use above get_db_url in sqlalchemy as well like below:

```py
from core.settings import settings
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(settings.get_db_url(), echo=settings.DB_ECHO)
```

:::

With this, we have successfully update the database URL in alembic however there's still important piece is missing.

We need to update the `target_metadata` variable. It is used to generate migrations for a database schema. We will update it in `alembic/env.py` file.

In addition to this, **We also have to import all the models that we want to include in the migration so alembic can generate schema automatically**.

```py
from app.db.base import Base # 🚨 Update import path according to your `Base` // [!code ++]

from app.models.user import * # Allow auto generating schema // [!code ++]
# import other models if you have any  // [!code ++]

target_metadata = None // [!code --]
target_metadata = Base.metadata // [!code ++]
```

:::details Auto import models instead of manually importing them
I also created utility function that auto imports all the models from the project. You can find it [here](/blog/python-my-findings.html#auto-import-models-in-env-py-file-for-auto-generation-of-migrations).

With this utility function you can update the `alembic/env.py` file as below.

```py
from app.utils.imports import import_models_for_alembic // [!code ++]

from app.models.user import * # Allow auto generating schema // [!code --]
# import other models if you have any  // [!code --]
import_models_for_alembic() # Check snippet to know what it does // [!code ++]
```

:::

Now finally, Let's create a new model to run migration.

```py
# File: app/models/user.py

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
```

Now, let's generate the migration.

```bash
alembic revision --autogenerate -m "create_user_table"
```

Hurray! We have successfully generated the migration. Now, let's apply it to the database.

```bash
alembic upgrade head
```

Also checkout my other findings on alembic [here](/blog/alembic-my-findings).
