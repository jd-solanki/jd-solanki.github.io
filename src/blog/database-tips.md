---
title: Database Tips & Conventions
wip: true
---

# {{ $frontmatter.title }}

## Table Definition

- Use plural names for table name (e.g. `users`, `posts`)
- User underscore to separate words for table & column names (e.g. `user_id`, `first_name`)
- Email column should be of length `254`
- Use `timestamp` for created_at and updated_at
