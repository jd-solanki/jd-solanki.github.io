---
title: FastAPI Best Practices
tag: FastAPI
date: 2024-11-20
---

# {{ $frontmatter.title }}

## Naming Conventions

### Resource Name in FastAPI Operations

Use below prefixes to resource name schema for different operations.

- `new_` for `post` operations
- `updated_` for `put` operations
- `patched_` for `patch` operations

Don't use suffixes like `_in` or `_out`.

```py
@app.post(
    "/items",
    response_model=schemas.ItemDetails,
)
async def create_item(
    item_in: schemas.ItemCreate, // [!code --]
    new_item: schemas.ItemCreate, // [!code ++]
    db: AsyncSession = Depends(get_db),
):
    return await item_crud.create(db, new_item)

@app.put(
    "/items/{item_id}",
    response_model=schemas.ItemDetails,
)
async def patch_item(
    item_id: PositiveInt,
    item_in: schemas.ItemPatch, // [!code --]
    patched_item: schemas.ItemPatch, // [!code ++]
    db: AsyncSession = Depends(get_db),
):
    db_item = await item_crud.get_or_404(db, item_id)
    return await item_crud.update(db, db_item, patched_item)
```

### Naming DB records in FastAPI Operations

Use `db_` prefix for retrieved record from DB

```py
@app.patch(
    "/items/{item_id}",
    response_model=schemas.ItemDetails,
)
async def update_item(
    item_id: PositiveInt,
    patched_item: schemas.ItemPatch,
    db: AsyncSession = Depends(get_db),
):
    db_item = await item_crud.get_or_404(db, item_id) // [!code hl]
    return await item_crud.update(db, db_item, patched_item)
```

### Provide valid types for `id` parameters

Use `PositiveInt` for integer based `id` parameters instead of `int`

```py
@app.get(
    "/items/{item_id}",
    response_model=schemas.ItemDetails,
)
async def get_item(
    item_id: int, // [!code --]
    item_id: PositiveInt, // [!code ++]
    db: AsyncSession = Depends(get_db),
):
    return await item_crud.get_or_404(db, item_id)
```

### Pydantic schema naming conventions for FastAPI operations

Checkout existing guide on "[Pydantic schema naming conventions for FastAPI operations](/blog/the-ultimate-guide-to-naming-conventions-for-pydantic-schemas-in-fastapi.md)"

## Order of Operations & Schemas

Prefer using "**CRUD**" as order for writing your operations and schemas.

```py
# File: router.py

@app.post( "/items")                # Create
async def create_item(): ...

@app.get( "/items")                 # Read All
async def get_items(): ...

@app.get( "/items/{item_id}")       # Read One
async def get_item(): ...

@app.put( "/items/{item_id}")       # Update
async def update_item(): ...

@app.patch( "/items/{item_id}")     # Partial Update
async def patch_item(): ...

@app.delete( "/items/{item_id}")    # Delete
async def delete_item(): ...
```

```py
# File: schemas.py

class ItemCreate(BaseModel): ...                # Create
class ItemCreateDB(BaseModel): ...              # Create DB

class ItemListItem(BaseModel): ...             # Read All
ItemList = RootModel[Sequence[ItemListItem]]   # Read All (RootModel)

class ItemDetails(BaseModel): ...              # Read One

class ItemUpdate(BaseModel): ...              # Update
class ItemUpdateDB(BaseModel): ...            # Update DB

class ItemPatch(BaseModel): ...               # Partial Update
class ItemPatchDB(BaseModel): ...             # Partial Update DB
```
