---
title: REST API design tips
tags: api, tips
---

# {{ $frontmatter.title }}

<br />

:::details Resource

- [Deep Dive into REST API Design and Implementation Best Practices](https://www.youtube.com/watch?v=7nm1pYuKAhY)
:::

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

### Don't go deeper than 3 levels: `collection/resource/collection`

```
https://api.example.com/tasks/1/comments // [!code ++]
https://api.example.com/tasks/1/comments/1/replies // [!code --]
```

### Filter, Sorting & Pagination

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

### Instead of returning list return object with name for making your response future proof

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

### Don't return map structure in response, instead return list of objects

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

### Async/Longer Operations

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
