---
title: Alembic - My Findings
tag: python, alembic
date: 2024-08-03
---

# {{ $frontmatter.title }}

:::info
I use postgresql (most of the time async) as my database and sqlalchemy as my ORM.
:::

:::details Resources

- [How to Add a Non-Nullable Field to a Populated Table](https://medium.com/the-andela-way/alembic-how-to-add-a-non-nullable-field-to-a-populated-table-998554003134)
:::

## 📚 Cheatsheet

### 🚨 Gotchas

### Alembic can't detect String length changes

Assume you have mobile number col having `String(15)` and you decide to remove the length restriction.

```diff
- mobile_number: Mapped[str] = mapped_column(String(15))
+ mobile_number: Mapped[str] = mapped_column(String)
```

Now, if you generate the migration, alembic won't detect the change and won't generate any migration.

To fix this issue, you need to manually add the migration.

```py
def upgrade() -> None:
    op.alter_column('table_name', 'mobile_number',
        existing_type=sa.String(length=15),
        type_=sa.String(),
        existing_nullable=True
    )


def downgrade() -> None:
    op.alter_column('table_name', 'mobile_number',
        existing_type=sa.String(),
        type_=sa.String(length=15),
        existing_nullable=True
    )
```

## ✨ Tips

- If you're using postgresql & enum, install this library: [alembic-postgresql-enum](https://pypi.org/project/alembic-postgresql-enum). Check [why](https://github.com/sqlalchemy/alembic/issues/278).

#### Enable date & time in alembic revision file name

Uncomment file_template in `alembic.ini`

```ini
file_template = %%(year)d_%%(month).2d_%%(day).2d_%%(hour).2d%%(minute).2d-%%(rev)s_%%(slug)s
```

#### Enable comparing server default values in `env.py`

```py
# Enable comparing server default
context.configure(
    compare_server_default=True,  # Allow alembic to compare server default // [!code ++]
)

# I don't know exact place but I add it before `config = context.config`
```

#### Enable comparing JSONB column's server default value

```py
from alembic.migration import MigrationContext
from sqlalchemy import Column, FetchedValue
from sqlalchemy.dialects.postgresql import JSONB
from typing import Any

def custom_compare_server_default(
    context: MigrationContext,
    inspected_column: Column[Any],
    metadata_column: Column[Any],
    inspected_default: str | None,
    metadata_default: FetchedValue | None,
    rendered_metadata_default: str | None,
):
    # Check if the column type is JSONB
    if isinstance(metadata_column.type, JSONB):
        # Compare the rendered metadata default with the inspected default
        if rendered_metadata_default != inspected_default:
            return True  # Indicate that the defaults differ and should be updated
        return False  # Indicate no difference
    return None  # Default behavior for other types
```

Afterwards, use above callable in `compare_server_default` param in `context.configure`.

```py
# * Add this to either `do_run_migrations`.
context.configure(
    compare_server_default=custom_compare_server_default, // [!code ++]
)
```

#### Auto import models in `env.py` file for auto generation of migrations

```py
# File: repo_root/src/utils/imports.py

import os
from importlib import import_module
from pathlib import Path

# 🚨 Adjust the paths according to your project structure
curr_dir = Path(__file__).parent.resolve()
src_dir = curr_dir.parent


def import_models_for_alembic():
    # Consider modules.py & all files in models directory as models
    models_file_glob = src_dir.glob("**/models.py")
    models_dir_glob = src_dir.glob("**/models/*.py")

    # Combine the two generators
    models_file_glob = [*models_file_glob, *models_dir_glob]

    for file in models_file_glob:
        # Skip __init__.py
        if file.name == "__init__.py":
            continue

        relative_path = file.relative_to(src_dir)
        module = str(relative_path).replace(os.sep, ".").replace(".py", "")
        import_module(module)
```

<!-- ## 📝 Snippets -->
