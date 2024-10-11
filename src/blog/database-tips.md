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

## Recommended type & length of columns

| Column Name   | Type   | Length |
|---------------|--------|--------|
| `username`    | string | 50     |
| `email`       | string | 254    |
| `password`    | string | 128    |
| `name`        | string | 50     |
| `first_name`  | string | 50     |
| `last_name`   | string | 50     |
| `phone_number`| string | 15     |
| `address`     | string | 255    |
| `zip_code`    | string | 10     |
| `title`       | string | 255    |
| `url`         | string |        |
| `url`         | text   | -      |
