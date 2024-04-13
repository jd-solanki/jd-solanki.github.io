---
title: Quick FastAPI Tips
wip: true
---

# {{ $frontmatter.title }}

:::info Resources

- [REST API Naming Conventions and Best Practices](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5)
:::

### Instead of responding using integer status code, use `fastapi.status`

```py
from fastapi import status // [!code ++]

@app.get("/")
async def root():
    raise HTTPException(
        status_code=404, // [!code --]
        status_code=status.HTTP_404_NOT_FOUND, // [!code ++]
        detail="Item doesn't exist"
    )
```

### Writing prefix while including router

- Prefer no prefix for including router in the main app.

```py
router =  APIRouter()

# Prefer this
router.include_router(products_router, prefix="/")
```

Above will gives you more clarity when you read the product router

```py
router = APIRouter()

@router.get("/products")
async def get_products(): ...

@router.get("/products/{id}")
async def get_product(id: int): ...
```

:::details What if you use define prefix while including router?

```py
router =  APIRouter()

# Avoid this
router.include_router(products_router, prefix="/products")
```

Now, When going through the product router, you might get confused about the endpoint you wish to interact with

```py
router = APIRouter()

@router.get("/")
async def get_products(): ...

@router.get("/{id}")
async def get_product(id: int): ...
```
