---
title: REST API design tips
tags: api, tips
---

# {{ $frontmatter.title }}

<br />

#### Your API endpoint should be resource not action

```
https://api.example.com/tasks // [!code ++]

https://api.example.com/get-tasks // [!code --]
```

#### Don't go deeper than 3 levels: `collection/resource/collection`

```
https://api.example.com/tasks/1/comments // [!code ++]
https://api.example.com/tasks/1/comments/1/replies // [!code --]
```

#### Filter, Sorting & Pagination

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

#### Instead of returning list return object with name for making your response future proof

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
