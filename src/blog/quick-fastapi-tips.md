---
title: Quick FastAPI Tips
wip: true
---

# {{ $frontmatter.title }}

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
