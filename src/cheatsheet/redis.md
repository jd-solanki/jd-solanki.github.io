# Redis

## Top Use Cases

- Caching
- Session Store
- Distributed Locks
- Rate Limiter
- Leaderboard

## Basics

```shell
# Start redis server
redis-server

# Start redis client
redis-cli

# Start redis client with password
redis-cli -a <password>
```

## Client

```shell

# --- Basics ---

# Set key value
SET name John # OK
SET name John EX 10 # Set expire time to 10 seconds

# Get key value
GET name # John

# Delete key
DEL name # 1

# Check if key exists
EXISTS name # 0

# View all keys
KEYS * # 1) "name"

# Remove all keys
FLUSHALL # OK

# --- String ---

# integer/number are stored as string
SET age 10 # OK
GET age # 10 (string)

# --- Existence ---

# Set key value if key does not exist
SETNX name John # 1

# Set key value if key exists
SETXX name John # 1

# --- List ---

# Add element to list
LPUSH friends John # 1 [LPUSH is left push]
LPUSH friends Jane # 2

# Get list
LRANGE friends 0 -1 # 1) "Jane" 2) "John" [Here -1 means last element]

# Get list length
LLEN friends # 2

# Add element to list from right
RPUSH friends Maya # 3 [RPUSH is right push]
LLEN friends # 3
LRANGE friends 0 -1 # 1) "Jane" 2) "John" 3) "Maya" [Notice the order]

# Remove element from list
LPOP friends # "Jane"
LRANGE friends 0 -1 # 1) "John" 2) "Maya"
RPOP friends # "Maya"
LRANGE friends 0 -1 # 1) "John"

# --- Set --- [Unique elements]

# Add element to set
SADD friends John # 1
SADD friends Jane # 1

# Get set
SMEMBERS friends # 1) "John" 2) "Jane"

# Add existing element to set [No effect]
SADD friends John # 0
SMEMBERS friends # 1) "John" 2) "Jane"

# Remove element from set
SREM friends John # 1
SMEMBERS friends # 1) "Jane"

# --- Hash --- [Python's dictionary or JavaScript's object]

# Add element to hash
HSET user name John # 1

# Get hash [Returns value]
HGET user name # "John"

# Get all hash [Returns list of key value pair]
HGETALL user # 1) "name" 2) "John"
HSET user age 10 # 1
HGETALL user # 1) "name" 2) "John" 3) "age" 4) "10"

# Get all keys of hash
HKEYS user # 1) "name" 2) "age"

# Get all values of hash
HVALS user # 1) "John" 2) "10"

# Get length of hash
HLEN user # 2

# Delete element from hash
HDEL user age # 1
HKEYS user # 1) "name"

# Check if element exists in hash
HEXISTS user name # 1
HEXISTS user age # 0

#  --- Expiration ---

SET name John

# Check expiration time
TTL name # -1 (no expiration)

# Set expiration time
EXPIRE name 10 # 1 (set expiration time to 10 seconds)

# Set key value with expiration time
SETEX name 10 John # OK

# --- Operations ---

# Increment
SET age 10 # OK
INCR age # 11

# Decrement
DECR age # 10

# Increment by
INCRBY age 10 # 20

# Decrement by
DECRBY age 10 # 10

# Increment by float
SET age 10 # OK
INCRBYFLOAT age 10.5 # 20.5

# Append
SET name John # OK
APPEND name Doe # 7 (length of string)

# Get substring
GETRANGE name 0 3 # "John"
GETRANGE name 0 -1 # "John Doe"

# Get length
STRLEN name # 8

```
