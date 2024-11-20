---
title: FastAPI Best Practices
tag: FastAPI
date: 2024-11-20
---

# {{ $frontmatter.title }}

## Naming Conventions

- Don't prefix `_in` or `_out` to Pydantic schemas in path operations

```py
@app.post(
    "/items",
    response_model=schemas.ItemDetails,
)
async def create_item(
    item_in: schemas.ItemCreate, // [!code --]
    item: schemas.ItemCreate, // [!code ++]
    db: AsyncSession = Depends(get_db),
):
    return await item_crud.create(db, item)
```

- Use `_db` prefix for retrieved record from DB to separate it from received data

```py
@app.patch(
    "/items/{id}",
    response_model=schemas.ItemDetails,
)
async def update_item(
    id: int,
    item: schemas.ItemPatch,
    db: AsyncSession = Depends(get_db),
):
    item_db = await item_crud.get_or_404(db, id) // [!code hl]
    return await item_crud.update(db, item_db, item)
```

- [Pydantic schema naming conventions for FastAPI operations](/blog/the-ultimate-guide-to-naming-conventions-for-pydantic-schemas-in-fastapi.md)
