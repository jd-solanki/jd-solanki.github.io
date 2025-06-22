---
title: Database Tips & Conventions
wip: true
---

# {{ $frontmatter.title }}

## General

- Store datetime in UTC timezone & ISO format and let the client/frontend handle the conversion to the user's timezone.
- Instead of using `is_deleted` or `is_active` boolean columns, use `deleted_at` or `deactivated_at` timestamp columns to indicate soft deletion or deactivation. This allows for better tracking of when the record was deleted or deactivated.

## Table Definition

- Use singular names for table name (e.g. `user`, `post`)
- Use underscore to separate words for table & column names (e.g. `user_id`, `first_name`)
- Email column should be of length `254`
- Use `timestamp` for created_at and updated_at

## Recommended type & length of columns

| Column Name     | Type   | Length |
|-----------------|--------|--------|
| `username`      | string | 50     |
| `email`         | string | 254    |
| `password`      | string | 128    |
| `name`          | string | 50     |
| `first_name`    | string | 50     |
| `last_name`     | string | 50     |
| `contact_number`| string | 15     |
| `address`       | string | 255    |
| `zip_code`      | string | 10     |
| `title`         | string | 255    |
| `url`           | string |        |
| `url`           | text   | -      |

## TIP: Use `SELECT 1 + LIMIT N` over `COUNT(*)` for checking existence

When we only want to check if a record exists and don't want to get the count of records, using `SELECT 1 + LIMIT N` is more efficient than `COUNT(*)`.

Thi is because `COUNT(*)` has to count all the records, while `SELECT 1 + LIMIT N` will stop as soon as it finds the first record.
