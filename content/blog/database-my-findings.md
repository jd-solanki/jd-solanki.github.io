---
title: Database - My Findings
description: Learn useful tips and best practices for database design and management.
---

## ✨ Tips

### General

- Store datetime in UTC timezone & ISO format and let the client/frontend handle the conversion to the user's timezone.
- Instead of using `is_deleted` or `is_active` boolean columns, use `deleted_at` or `deactivated_at` timestamp columns to indicate soft deletion or deactivation. This allows for better tracking of when the record was deleted or deactivated.

### SQL Query Optimization

#### 1. Query Rewrite

Check if your current query can be rewritten to be more efficient. For example, you can use `JOIN` instead of subqueries, or use `EXISTS` instead of `IN`.

#### 2. Indexing

Make sure you have proper indexes on the columns used in the `WHERE` clause. Indexes can significantly speed up the query performance.

#### 3. Avoid `SELECT *`

Avoid using `SELECT *` in your queries. Instead, explicitly list the columns you need. This can reduce the amount of data that needs to be fetched from the database.

#### 4. Limit the Result Set

If you only need a subset of the data, use the `LIMIT` clause to restrict the number of rows returned by the query.

#### 5. Query Caching

Enable query caching in your database server to cache the results of frequently executed queries. This can reduce the query execution time for subsequent requests.

### Use `SELECT 1 + LIMIT N` over `COUNT(*)` for checking existence

When we only want to check if a record exists and don't want to get the count of records, using `SELECT 1 + LIMIT N` is more efficient than `COUNT(*)`.

Thi is because `COUNT(*)` has to count all the records, while `SELECT 1 + LIMIT N` will stop as soon as it finds the first record.

### Database Design

- Prefer using `deactivated_at` or `deleted_at` timestamp columns instead of `is_deleted` or `is_active` for soft deletion. With this you'll be able to track when the record was deleted or deactivated. Only downside is when user wants to restore the record, you have to update the timestamp column to null which seems erasing the history of when it was deleted or deactivated.
- Add `deactivated_at` and `banned_at` timestamp columns to user table instead of account table. This will restrict directly on user where adding to account table won't mak much sense.

## Table Definition

- Use singular names for table name (e.g. `user`, `post`)
- Use underscore to separate words for table & column names (e.g. `user_id`, `first_name`)
- Email column should be of length `254`
- Use `timestamp` for `created_at` and `updated_at` columns

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
