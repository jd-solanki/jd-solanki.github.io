---
title: REST API design tips
tags: api, tips
---

# {{ $frontmatter.title }}

<br />

:::details Resource

- [Deep Dive into REST API Design and Implementation Best Practices](https://www.youtube.com/watch?v=7nm1pYuKAhY)
:::

## Tips

- Always have separate delete endpoint to delete a resource even for soft delete where you just set is_deleted flag to true.
- Never allow PATCH to delete resource.
- Send 204 to already deleted resource without raising exception of resource already deleted ( Idempotency principles). Hence, avoid hyphens in query keys.

## Naming Conventions

- Use **kebab-case** for URL paths and **snake_case** or **camelCase** for query parameters.
- When using hyphens in query params, it can clash with minus‑sign semantics in some contexts. most libraries won't parse them as identifiers.

  ```shell
  POST /sign-in
  POST /sign-in?redirectUrl=https://example.com/dashboard # camelCase query params when JS frameworks
  POST /sign_in?redirect_url=https://example.com/dashboard # snake_case query params when Python, Ruby, etc.
  ```

---

## 2. **Query** Parameters

You have two main, equally valid options—pick one and be consistent:

### A. **snake\_case**

- Lowercase + underscores
- Common in many REST APIs and frameworks
- Example:

  ```
  GET /products?category=electronics&price_min=100&sort_by=popularity
  ```

### B. **camelCase**

- Lowercase first word, then capital letters for subsequent words
- Aligns with many JavaScript front‑end conventions
- Example:

  ```
  GET /products?category=electronics&priceMin=100&sortBy=popularity
  ```

#### A Note on Hyphens in Query Strings

- Hyphens can clash with minus‑sign semantics in some contexts; most libraries won't parse them as identifiers.
- For that reason, **avoid** hyphens in query keys.

---

## 3. General Tips

1. **Keep names semantic**

   - Use real words: `sortBy`, `filter`, `pageSize`, `lang`
2. **Document your choice** in your API style guide so every team follows the same format.
3. **Versioning**: if you version in the URL, do it as its own segment:

   ```
   /v1/products
   ```

### API endpoint should be resource not action

```
https://api.example.com/tasks // [!code ++]

https://api.example.com/get-tasks // [!code --]
```

### Collection name should be plural

```
https://api.example.com/tasks // [!code ++]
https://api.example.com/tasks/{task_id} // [!code ++]

https://api.example.com/task // [!code --]
https://api.example.com/task/{task_id} // [!code --]
```

### Group auth related endpoints under `/auth` prefix

```shell
POST /auth/register
POST /auth/login
POST /auth/verification-emails
GET /auth/verification-emails/{token}
POST /auth/forgot-password
POST /auth/reset-password
```

### Entity CRUD endpoints conventions

```shell
GET    /tasks           # Get all tasks
POST   /tasks           # Create new task
GET    /tasks/{task_id} # Get task by id
PUT    /tasks/{task_id} # Update task by id (Replace)
PATCH  /tasks/{task_id} # Partial update task by id
DELETE /tasks/{task_id} # Delete task by id

POST   /tasks/batch     # Create multiple tasks

GET    /tasks/{task_id}/comments  # Get all comments for task
POST   /tasks/{task_id}/comments  # Create new comment for task
GET    /comments/{comment_id}     # Get comment by id for task
PUT    /comments/{comment_id}     # Update comment by id for task
PATCH  /comments/{comment_id}     # Partial update comment by id for task
DELETE /comments/{comment_id}     # Delete comment by id for task
```

## Don't go deeper than 3 levels: `collection/resource/collection`

```
https://api.example.com/tasks/1/comments // [!code ++]
https://api.example.com/tasks/1/comments/1/replies // [!code --]
```

## Filter, Sorting & Pagination

```md
<!-- Filter: Use key-value pair -->
https://api.example.com/tasks?completed=true
https://api.example.com/users?last_name=john&age=36

<!-- Filter: Provide filtering on specific property/column/field with global search -->
https://api.example.com/users?q=john
https://api.example.com/tasks?q=john&fields=username,email

<!--
    Pagination: Prefer using limit-offset instead of page-size

    ?page=1&size=10 => fine for simple pagination
    🤔 => How to get 10 items starting from 4th item with page-size?
-->
https://api.example.com/tasks?limit=10&offset=0
https://api.example.com/tasks?limit=10&offset=3 <- You can get 10 items starting from 4th item with limit-offset
```

## Instead of returning list return object with name for making your response future proof

```py
# --- Before
[
    { "id": 1, "title": "Buy Tomato", "is_completed": False },
    { "id": 2, "title": "Learn Sanskrit", "is_completed": False },
]

# --- After
{
    "tasks": [
        { "id": 1, "title": "Buy Tomato", "is_completed": False },
        { "id": 2, "title": "Learn Sanskrit", "is_completed": False },
    ],
    "total": 2,
}
```

## Don't return map structure in response, instead return list of objects

```py
# --- Before
{
    "john": [
        { "id": 1, "title": "Buy Tomato", "is_completed": False },
        { "id": 2, "title": "Learn Sanskrit", "is_completed": False },
    ],
    "jane": [
        { "id": 3, "title": "Buy Apple", "is_completed": False },
        { "id": 4, "title": "Finish reading book", "is_completed": False },
    ]
}

# --- After
{
    "tasks": [
        { "id": 1, "title": "Buy Tomato", "is_completed": False, "user": "john" },
        { "id": 2, "title": "Learn Sanskrit", "is_completed": False, "user": "john" },
        { "id": 3, "title": "Buy Apple", "is_completed": False, "user": "jane" },
        { "id": 4, "title": "Finish reading book", "is_completed": False, "user": "jane" },
    ],
    "total": 4
}

```

## Async/Longer Operations

- For longer processes (`POST` `{ processId: 99 }` => `/long-process/create`) Send `202` status code to indicate that request has been accepted for processing
  - Add status endpoint URL in response header `Location` to check the status of the operation
- Expose `GET` (`/long-process/status/99`) endpoint to check the status of the operation
  - Return **`200` status** code if operation isn't completed with any of the below response:
    - Provide status of the operation

        ```
        { status: "In Progress" }
        ```

    - Provide estimated time to complete

        ```
        { "time_to_complete_in_minutes": "15" }
        ```

    - You can also provide link to cancel/stop the operation

        ```
        {
            "rel": "cancel",
            "method": "delete",
            "href": "/long-process/cancel/99"
        }
        ````

  - Return 303 status code with `Location` header with URL to created resource once operation is completed

    ```
    { "status": "completed" }
    ```

### API response should be generic and agnostic

- Even if you are building API for a specific client, make sure your API response is generic and agnostic
- Don't return client specific data in response. Doing so will make your API tightly coupled with the client and requires changing both client and server code whenever requirement changes.
- E.g. For chat page, instead of single endpoint for chat details, chat messages, meta data, etc. create separate endpoints for each of them.

## SEO

- Hyphens improve keyword recognition in URL (excluding query parameters). E.g. `/product-details`
