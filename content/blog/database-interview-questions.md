---
title: Database Interview Questions
description: A curated list of common database interview questions and answers.
---

## Q: What is stored procedure?

A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again. So if you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it.

## Q: What is a trigger?

A trigger is executed automatically when an event associated with a table occurs.

For example, a trigger can be invoked when a row is inserted into a specified table or when certain table columns are being updated. Real life example: You can create default categories in the category table when a new user is added to the user table.

## Q: What is a view?

A view is a virtual table based on the result-set of an SQL statement. A view contains rows and columns, just like a real table. Database views are not physically stored in the database, but are generated dynamically based on underlying data tables.

They are widely used in query optimization, data access control, and data abstraction.

## Q: Types of keys in a relational database?

- **Primary Key**: A primary key is a column or a group of columns used to identify a row uniquely in a table. A primary key enforces the entity integrity of the table.

- **Foreign Key**: A foreign key is a column or a group of columns in a relational database table that provides a link between data in two tables. It acts as a cross-reference between tables because it references the primary key of another table.

- **Unique Key**: A unique key is a set of one or more than one fields/columns of a table that uniquely identify a record in a database table. A unique key is similar to the primary key, and it has the same constraints, but it can have null values.

- **Composite Key**: A composite key is a combination of two or more columns in a table that can be used to uniquely identify each row in the table when the columns are combined uniqueness is guaranteed.

## Q: What is normalization?

Normalization is a database design technique that reduces data redundancy and eliminates undesirable characteristics like Insertion, Update and Deletion Anomalies. Normalization rules divide larger tables into smaller tables and define relationships between them.

## Q: What is CTE?

CTE is Common Table Expression which is used to create a temporary result set that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement. This is now deprecated. You can use the WITH clause to define a CTE.

## Q: How to optimize a SQL query?

Check the blog post on [Sql Query Optimization](/blog/database-my-findings#sql-query-optimization)
