---
title: SQL - My Findings
tag: sql, my-findings
date: 2024-03-30
---

# {{ $frontmatter.title }}

:::warning
This guide uses mysql syntax. Please refer to the documentation of the database you are using for any differences.
:::

## 📚 Cheatsheet

### Common SQL Commands

- `SELECT` - extracts data from a database
- `UPDATE` - updates data in a database
- `DELETE` - deletes data from a database
- `INSERT INTO` - inserts new data into a database
- `CREATE DATABASE` - creates a new database
- `ALTER DATABASE` - modifies a database
- `CREATE TABLE` - creates a new table
- `ALTER TABLE` - modifies a table
- `DROP TABLE` - deletes a table
- `CREATE INDEX` - creates an index (search key)
- `DROP INDEX` - deletes an index

### Common Data Types

- `INT` - integer
- `DECIMAL(M, N)` - Decimal number with `M` total digits and `N` digits after the decimal point
- `VARCHAR(N)` - String of text with a maximum length of `N` characters
- `BLOB` - Binary Large Object for storing binary data
- `DATE` - Date format (YYYY-MM-DD)
- `TIMESTAMP` - Date and time format (YYYY-MM-DD HH:MM:SS)

### Table Related Commands

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    major VARCHAR(20) UNIQUE,
    city VARCHAR(20) DEFAULT 'Ahmedabad'
    -- PRIMARY KEY (id) - Another way to define primary key (🚨 You've to add comma in above line if you uncomment this)
);

DESCRIBE students; -- To see the structure of the table

ALTER TABLE students ADD gpa DECIMAL(3, 2); -- To add a new column

ALTER TABLE students DROP COLUMN gpa; -- To delete a column

ALTER TABLE students MODIFY COLUMN name VARCHAR(30); -- To modify a column

DROP TABLE students; -- To delete the table
```

### `SELECT`

```sql
-- Syntax: SELECT column1, column2, ... FROM table_name;

-- Select all columns from a table "customers"
SELECT * FROM customers;

-- Select only the "city" column from the "customers" table
SELECT city FROM customers;

-- Select only the "city" and "country" columns from the "customers" table
SELECT city, country FROM customers;

-- Select distinct values from the "city" column in the "customers" table
-- This is useful when you want to list all unique values in a column (without duplicates)
SELECT DISTINCT city FROM customers;
```

### `WHERE`

```sql
-- Syntax: SELECT column1, column2, ... FROM table_name WHERE condition;

-- Select all customers from the country "India"
SELECT * FROM customers WHERE country='India';

-- Select all customers where country id is 1
SELECT * FROM customers WHERE country_id=1;

-- Select all customers where country id is not 1
SELECT * FROM customers WHERE country_id != 1;

-- Select all customers where country id is not 1
SELECT * FROM customers WHERE NOT country_id=1;

-- Select all customers where country id is less than 10
SELECT * FROM customers WHERE counter_id < 10;

-- Select all customers where country id is between 5 and 10
SELECT * FROM customers WHERE counter_id BETWEEN 5 AND 10;

-- Select all customers where country id is not between 11 and 14
SELECT * FROM customers WHERE counter_id NOT BETWEEN 11 AND 14;

-- Select all customers where customer_name is between "John" and "Peter"
SELECT * FROM customers WHERE customer_name BETWEEN "John" AND "Peter" ORDER BY customer_name;

-- Select all customers who have created their account in 2019
SELECT * FROM customers WHERE create_date BETWEEN '2019-01-01' AND '2019-12-31';

-- Select all customers where country name starts with "In". Percent (%) is used to match any number of characters including zero.
SELECT * FROM customers WHERE country LIKE 'In%';

-- Select all customers where country name has 5 characters and first two are "In" and forth is "i". Underscore (_) is used to match a single character
SELECT * FROM customers WHERE country LIKE 'In_i_';

-- Select all customers where country name ends with "ia"
SELECT * FROM customers WHERE country LIKE '%ia';

-- Select all customers where country name contains "nd"
SELECT * FROM customers WHERE country LIKE '%nd%';

-- Select all customers where country name does not start with "In"
SELECT * FROM customers WHERE country NOT LIKE 'In%';

-- Select all customers where country name is either "India" or "USA"
SELECT * FROM customers WHERE country IN ('India', 'USA');

-- Select all customers where country name is not "India" or "USA"
SELECT * FROM customers WHERE country NOT IN ('India', 'USA');

-- Select all customers that have an order in the "orders" table
SELECT * FROM customers WHERE customer_id IN (SELECT customer_id FROM orders);

-- Select all customers from the country "India" and the city "Ahmedabad"
SELECT * FROM customers WHERE country='India' AND city='Ahmedabad';

-- Select all customers from the country "India" or country name starts with "In"
SELECT * FROM customers WHERE country='India' OR country LIKE 'In%';

-- Select all customers from the country "India" and customer name starts with either "G" or "R" (Parenthesis are important here)
SELECT * FROM customers WHERE country='India' AND (customer_name LIKE 'G%' OR customer_name='R%');

-- Select all the customers from the country "India" and customer name starts with "G" plus all customers that have a customer name starting with "R"
SELECT * FROM customers WHERE country='India' AND customer_name LIKE 'G%' OR customer_name='R%';
```

##### Operator Reference

| Operator   | Description                 |
|------------|-----------------------------|
| `=`        | Equal                       |
| `>`        | Greater than                |
| `<`        | Less than                   |
| `>=`       | Greater than or equal       |
| `<=`       | Less than or equal          |
| `<> or !=` | Not equal to                |
| `BETWEEN`  | Between an inclusive range  |
| `LIKE`     | Search for a pattern        |
| `IN`       | To specify multiple values  |
| `AND`      | Logical operator AND        |
| `OR`       | Logical operator OR         |

### `LIKE`

### `ORDER BY`

```sql
-- Syntax: SELECT column1, column2, ... FROM table_name ORDER BY column1, column2, ... ASC|DESC;

-- Select all products and order them by price (ASC - ascending) (Lowest to Highest in this example)
SELECT * FROM products ORDER BY price;

-- Select all products and order them by price (DESC - descending) (Highest to Lowest in this example)
SELECT * FROM products ORDER BY price DESC;

-- Select all products and order them by product name (ASC - ascending) (A to Z in this example)
SELECT * FROM products ORDER BY product_name;

-- Select all products and order them by product name (DESC - descending) (Z to A in this example)
SELECT * FROM products ORDER BY product_name DESC;

-- Select all products and order them by price (ASC - ascending) and then by product name (ASC - ascending)
SELECT * FROM product ORDER BY price, product_name;

-- Select all products and order them by price (DESC - descending) and then by product name (ASC - ascending)
SELECT * FROM product ORDER BY price DESC, product_name;

-- You can even order by column which you are not selecting.
SELECT id, name FROM products ORDER BY price;
```

### `INSERT INTO`

```sql
-- Syntax: INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);

-- Insert a new record in the "customers" table. ID column is auto incremented & does not need to be specified
INSERT INTO customers (customer_name, address, city, postal_code, country) VALUES ('Arjun', 'A-7, Satyam Complex', 'Ahmedabad', '382350', 'India');

-- Insert multiple records in the "customers" table.
INSERT INTO customers
    (customer_name, address, city, postal_code, country)
    VALUES
    ('Arjun', 'A-7, Satyam Complex', 'Ahmedabad', '382350', 'India'),
    ('Ashwatthama', 'A-13, Satyam Complex', 'Ahmedabad', '382350', 'India');
```

### `NULL` Values

A field with a `NULL` value is a field with no value.

If a field in a table is optional, it is possible to insert a new record or update a record without adding a value to this field. Then, the field will be saved with a NULL value.

:::info
Do note that, `NULL` value and empty string `''` are not the same.
:::

```sql
-- Select all customers where address is not provided or is NULL
SELECT * FROM customers WHERE address IS NULL;

-- Select all customers where address is provided
SELECT * FROM customers WHERE address IS NOT NULL;
```

### `UPDATE`

```sql
-- Syntax: UPDATE table_name SET column1=value1, column2=value2, ... WHERE condition;

-- Update the address of the customer "Arjun" to "A-3, Satyam Complex"
UPDATE customers SET address='J-3, Sanatan Complex', city='Gandhinagar' WHERE customer_name='Arjun';

-- Update city of all customers who lives in Sana Complex to "Gandhinagar"
UPDATE customers SET city='Gandhinagar' WHERE address LIKE '%Sanatan Complex%';

-- Update city and postal code of all customers who lives in Sana Complex to "Gandhinagar"
UPDATE customers SET city='Gandhinagar', postal_code='380011' WHERE address LIKE '%Sanatan Complex%';

-- Update all the rows. This will set the city to "Unknown" for all the customers
UPDATE customers SET city='Unknown';
```

### `DELETE`

```sql
-- Syntax: DELETE FROM table_name WHERE condition;

-- Remove all the products which have a rating less than 1
DELETE FROM products WHERE rating<1;

-- Delete all products
DELETE FROM products;

-- Delete table
DROP TABLE products;
```

### `LIMIT` & `OFFSET`

`LIMIT` is used to specify the number of records to return. `OFFSET` is used to specify the number of records to skip before starting to return the records.

```sql
-- Syntax: SELECT column1, column2, ... FROM table_name LIMIT number OFFSET offset;

-- Select the first 10 records from the "customers" table (Page 1)
SELECT * FROM customers LIMIT 10;

-- Select the next 10 records from the "customers" table (Page 2)
SELECT * FROM customers LIMIT 10 OFFSET 10;

-- Select the next 10 records from the "customers" table (Page 3)
SELECT * FROM customers LIMIT 10 OFFSET 20;

-- Select the first 5 records from the "customers" table, starting from record 3
SELECT * FROM customers LIMIT 5 OFFSET 3;

-- Select second highest salary from the "employees" table
SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;
```

### `MIN` & `MAX`

```sql
-- Syntax: SELECT MIN(column_name) FROM table_name WHERE condition;
-- Syntax: SELECT MAX(column_name) FROM table_name WHERE condition;

-- Select the lowest price from the "products" table
SELECT MIN(price) FROM products;

-- Select the highest price from the "products" table
SELECT MAX(price) FROM products;

-- Select the lowest price from the "products" table where rating is greater than 4
SELECT MIN(price) FROM products WHERE rating>4;

-- Alias for MIN and MAX. This is useful when you want to use the result of MIN or MAX in another query
SELECT MIN(price) AS lowest_price FROM products;
SELECT MAX(price) AS highest_price FROM products;
```

### `COUNT`

```sql
-- Syntax: SELECT COUNT(column_name) FROM table_name WHERE condition;

-- Count the number of records in the "customers" table
SELECT COUNT(*) FROM customers;

-- Count the number of records in the "customers" table where country is "India"
SELECT COUNT(*) FROM customers WHERE country='India';

-- Count the number of records in the "customers" table. Comparing to `*`, this will not count NULL values
SELECT COUNT(customer_name) FROM customers;

-- Count the number of distinct countries in the "customers" table
SELECT COUNT(DISTINCT country) FROM customers;
```

### `SUM` & `AVG`

```sql
-- Syntax: SELECT SUM(column_name) FROM table_name WHERE condition;
-- Syntax: SELECT AVG(column_name) FROM table_name WHERE condition;

-- Select the total price of all products
SELECT SUM(price) FROM products;

-- Select the average price of all products
SELECT AVG(price) FROM products;

-- Select the total price of all products where rating is greater than 4
SELECT SUM(price) FROM products WHERE rating>4;

-- Writing expressions in SUM and AVG. Below, we are converting USD to INR roughly and then calculating the total price of all products
SELECT SUM(price * 80) FROM products;

-- Select all products where price is greater than the average price of all products
SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);
```

### Aliases

```sql
-- Syntax: SELECT column_name AS column_alias_name FROM table_name;
-- Syntax: SELECT column_name FROM table_name AS table_alias_name;

-- Select all products and rename the column "name" to "product_name"
SELECT name AS product_name FROM products;

-- Select all products and rename the table "products" to "items"
SELECT * FROM products AS items;

-- Renaming multiple tables and referencing them in a query
SELECT o.order_id, o.order_date, c.customer_name FROM customers as c, orders as o WHERE c.customer_id=o.customer_id;
```

### Joins

🚧 _WIP_

## ✨ Tips

- You can do order by even if you're not selecting that column. For example, `SELECT id, name FROM products ORDER BY price;`

<!-- ## 📝 Snippets -->