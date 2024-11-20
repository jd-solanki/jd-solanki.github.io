---
title: FastAPI Best Practices
tag: FastAPI
date: 2024-11-20
---

# {{ $frontmatter.title }}

## Naming Conventions

### Prefer Singular Over Plural When Possible

Instead of ending up like "categories" or "items", prefer singular names like "category" or "item". Not all aware of plural form of words, so it's better to stick with singular.

```py
# API Router
user_router = APIRouter()

# CRUD
user_crud = UserCRUD[...]()

# Schema
class User(BaseModel):
    name: str
    email: EmailStr

# Database Model
class User(Base):
    __tablename__ = "user"

# This is fine as plural is best practice for endpoints
@app.get("/items")
async def get_items(): ...
```

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

@app.patch(
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
    return await item_crud.patch(db, db_item, patched_item)
```

### Naming DB records in FastAPI Operations

Use `db_` prefix for retrieved record from DB

```py
@app.patch(
    "/items/{item_id}",
    response_model=schemas.ItemDetails,
)
async def patch_item(
    item_id: PositiveInt,
    patched_item: schemas.ItemPatch,
    db: AsyncSession = Depends(get_db),
):
    db_item = await item_crud.get_or_404(db, item_id) // [!code hl]
    return await item_crud.patch(db, db_item, patched_item)
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

@item_router.post("/items")                # Create
async def create_item(): ...

@item_router.get("/items")                 # Read All
async def get_items(): ...

@item_router.get("/items/{item_id}")       # Read One
async def get_item(): ...

@item_router.put("/items/{item_id}")       # Update
async def update_item(): ...

@item_router.patch("/items/{item_id}")     # Partial Update
async def patch_item(): ...

@item_router.delete("/items/{item_id}")    # Delete
async def delete_item(): ...
```

<br>

```py
# File: schemas.py

class ItemCreate(BaseModel): ...                # Create
class ItemCreateDB(ItemCreate): ...              # Create DB

class ItemListItem(BaseModel): ...             # Read All
ItemList = RootModel[Sequence[ItemListItem]]   # Read All (RootModel)

class ItemDetails(BaseModel): ...              # Read One

class ItemUpdate(BaseModel): ...              # Update
class ItemUpdateDB(ItemUpdate): ...            # Update DB

class ItemPatch(BaseModel): ...               # Partial Update
class ItemPatchDB(ItemPatch): ...             # Partial Update DB
```

If you've other Non-CRUD operations besides regular resource CRUD, Following existing order of HTTP methods is recommended.

For example, if you want to add POST operation to trigger a workflow, you can add it after POST operation for creating a workflow.

This will help you with two things:

- Your CRUD operations will be in order according to "CRUD"
- Your non-CRUD operations will be in order according to HTTP methods

```py
# File: router.py

@app.post( "/workflows")                          # Create
async def create_workflow(): ...

@app.post("/workflows/{workflow_id}/trigger")    # Create workflow Review
async def trigger_workflow(): ...

@app.get("/workflows")                          # Read All
async def get_workflows(): ...

@app.get("/workflows/{workflow_id}")           # Read One
async def get_workflow(): ...

@app.put("/workflows/{workflow_id}")           # Update
async def update_workflow(): ...

@app.patch("/workflows/{workflow_id}")        # Partial Update
async def patch_workflow(): ...

@app.delete("/workflows/{workflow_id}")       # Delete
async def delete_workflow(): ...
```
