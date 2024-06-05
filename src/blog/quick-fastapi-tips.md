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
- Instead of prefix use `tags` if needed to group the endpoints.

```py
router =  APIRouter()

# Prefer this (No prefix defined)
router.include_router(products_router)
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
:::

### Use async client instead of requests library to make API call in FastAPI

_Check more details on it in [this](https://www.youtube.com/watch?v=row-SdNdHFE) video_

```py
import requests // [!code --]
from httpx import AsyncClient // [!code ++]

def get_data(): // [!code --]
    response = requests.get("https://api.example.com/data") // [!code --]
    return response.json() // [!code --]

async def get_data(): // [!code ++]
    async with AsyncClient() as client: // [!code ++]
        response = await client.get("https://api.example.com/data") // [!code ++]
        return response.json() // [!code ++]
```
