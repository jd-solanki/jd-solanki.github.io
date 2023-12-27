---
title: Quick FastAPI Tips
wip: true
---

# {{ $frontmatter.title }}

:::info Resources
- [REST API Naming Conventions and Best Practices](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5)
:::

### 1. Instead of responding using integer status code, use `fastapi.status`

```py
from fastapi import status // [!code hl]

@app.get("/")
async def root():
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, // [!code hl]
        detail="Item doesn't exist"
    )
```
