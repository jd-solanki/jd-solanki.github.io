---
title: How To Setup Alembic With SQLAlchemy
---

# {{ $frontmatter.title }}

## Introduction

Alembic is a lightweight database migration tool for SQLAlchemy. It is used to generate migrations for a database schema, and apply migrations to a database.

## Setup

First install Alembic in your virtual environment.

```bash
pip install alembic
```

Initialize Alembic via the `init` command.

```bash
alembic init alembic
```

It will crate a `alembic.ini` file and a `alembic` directory in your project.

Now let's set our database URL. For our case we want to get it from environment variable and don't want to hardcode it in the `alembic.ini` file.

Hence, we will comment line similar to below in `alembic.ini` file.

```ini
sqlalchemy.url = driver://user:pass@localhost/dbname // [!code --]
# sqlalchemy.url = driver://user:pass@localhost/dbname // [!code ++]
```

Now, to setup the database URL we will update a `alembic/env.py` file. Before that we need to ensure that we have installed `python-dotenv` package so that we can read environment variables from `.env` file.

```bash
pip install python-dotenv
```

Now, let's first create `alembic/test.py` to check if we are loading env file correctly.

```py
# File: alembic/test.py

import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

# NOTE: Don't forget to change env var name to your own.
print(os.getenv("DB_NAME"))
```

Now, let's run the file.

```bash
python alembic/test.py
```

You should see the value of `DB_NAME` printed in the console. If you don't see it, then check if you have `.env` file in the root of your project and it has the `DB_NAME` variable defined. Additionally, to avoid path related issues you can also provide path to `.env` file in `load_dotenv` function.

```py
import pathlib // [!code ++]

load_dotenv() // [!code --]

curr_dir = pathlib.Path(__file__).parent.resolve() // [!code ++]
load_dotenv(dotenv_path=curr_dir.parent / ".env") # Assuming .env file is placed besides alembic // [!code ++]
```

After this hopefully your env variables should be loaded correctly. Once you have verified this, feel free to remove the `alembic/test.py` file.

Next, let's update the `alembic/env.py` file by loading the environment variables.

```py
import os // [!code ++]
import pathlib // [!code ++]
 // [!code ++]
from dotenv import load_dotenv // [!code ++]
 // [!code ++]
curr_dir = pathlib.Path(__file__).parent.resolve() // [!code ++]
load_dotenv(dotenv_path=curr_dir.parent / ".env") // [!code ++]

# rest of the code is below
```

After that create a `get_db_url` function and use it in `run_migrations_offline` and `run_migrations_online` functions.

```py
from sqlalchemy import create_engine // [!code ++]

def get_url(): // [!code ++]
    driver_name = os.getenv("DB_DRIVER_NAME") // [!code ++]
    user = os.getenv("DB_USER") // [!code ++]
    password = os.getenv("DB_PASSWORD") // [!code ++]
    host = os.getenv("DB_HOST") // [!code ++]
    db = os.getenv("DB_NAME") // [!code ++]
    return f"{driver_name}://{user}:{password}@{host}/{db}" // [!code ++]

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url") // [!code --]
    url = get_url() // [!code ++]
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config( // [!code --]
        config.get_section(config.config_ini_section, {}), // [!code --]
        prefix="sqlalchemy.", // [!code --]
        poolclass=pool.NullPool, // [!code --]
    ) // [!code --]

    connectable = create_engine(get_url()) // [!code ++]

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()
```

With this, we have successfully update the database URL however there's still important piece is missing.

We need to update the `target_metadata` variable. It is used to generate migrations for a database schema. We will update it in `alembic/env.py` file.

In addition to this, **We also have to import all the models that we want to include in the migration so alembic can generate schema automatically**.

```py
from app.db.base import Base # Update import path according to your `Base` // [!code ++]

from app.models.user import * # Allow auto generating schema // [!code ++]
# import other models if you have any  // [!code ++]

target_metadata = None // [!code --]
target_metadata = Base.metadata // [!code ++]
```

:::details Auto import models instead of manually importing them
I also created utility function that auto imports all the models from the project. You can find it [here](/snippets/python.html#auto-import-models-in-env-py-file-for-auto-generation-of-migrations).

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

<br>

It's done my friend 🥂
