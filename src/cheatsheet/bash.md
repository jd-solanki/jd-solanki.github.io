# bash

## Scripting

### Variables & User Input

```bash
#!/bin/bash

# Variables
# Variable names are in uppercase, e.g. `NAME`, `FILE_PATH`.
# Variables don't have spaces around `=`
NAME="john"
echo "Hello, $NAME" # Hello, john

# Concatenation
SPORT="Foot"
echo "I like ${SPORT}ball"

# User Input
read -p "Enter your name: " USERNAME
echo "Your name is $USERNAME"

# Reading multiple inputs
echo "Enter your name and age:"
read NAME AGE
echo "Your name is $NAME and you are $AGE years old"
# > John 25 => Your name is John and you are 25 years old
# > John => Your name is John and you are years old
# Hence, missing input won't throw an error

# Array
NAMES=(John Jane Doe)
echo "First Name: ${NAMES[0]}"
echo "All Names: ${NAMES[@]}"
```

### Conditional Statements

```bash
#!/bin/bash

# Ensure spaces around `[` and `]`
# Ensure quotes around variable names
# You can use `==` or `=` for string comparison
NAME="john"

if [ "$NAME" == "john" ]; then
  echo "Hello, John"
fi

# One liner if statement
[ "$NAME" == "john" ] && echo "Hello, John"

# If Else
if [ "$NAME" == "john" ]; then
  echo "Hello, John"
else
  echo "Hello, Stranger"
fi

# On liner if else
[ "$NAME" == "john" ] && echo "Hello, John" || echo "Hello, Stranger"

# If Elif Else
if [ "$NAME" == "john" ]; then
  echo "Hello, John"
elif [ "$NAME" == "jane" ]; then
  echo "Hello, Jane"
else
  echo "Hello, Stranger"
fi

# On liner if elif else (🚨 Not Recommended due to readability issues)
[ "$NAME" == "john" ] && echo "Hello, John" || [ "$NAME" == "jane" ] && echo "Hello, Jane" || echo "Hello, Stranger"

# Arithmetic Comparison
AGE=25

if [ "$AGE" -gt 18 ]; then
  echo "You are an adult"
fi
# Other operators: -eq, -ne, -lt, -le, -ge
```

### Loops

```bash
#!/bin/bash

# For loop
NAMES="John Jane Doe"
for NAME in $NAMES; do
  echo "Hello, $NAME"
done

# For loop on array/list
NAMES=(John Jane Doe)
for NAME in ${NAMES[@]}; do
  echo "Hello, $NAME"
done

# For loop on array/list without variable
for NAME in John Jane Doe; do
  echo "Hello, $NAME"
done

# For Loop on Range
for INDEX in {1..5}; do
  echo "Number: $INDEX"
done
```

### Functions

```bash
#!/bin/bash

# Function Declaration
function greet() {
  echo "Hello, John"
}

# Function Call
greet

# Function with Parameters
function greet() {
  echo "Hello, $1"
}

greet John # Hello, John
# In function scope, $1, $2, ... are used to access parameters and not the positional parameters

# Function with default value
function greet() {
    local name=${1:-"World"}
    echo "Hello $name"
}

greet # Hello World
```

### Positional Parameters

```bash
#!/bin/bash

# $0 - Script Name
echo "Script Name: $0"

# $1, $2, $3, ... - Positional Parameters
echo "First Argument: $1"
echo "Second Argument: $2"
```

### Piping & Redirection

```bash
#!/bin/bash

# Piping
ls | grep ".txt"

# Redirection
# > - Overwrite
# >> - Append
echo "Hello, World" > file.txt
echo "Hello, Again" >> file.txt

# Reading from file
# `wc` - Word Count
wc -w < file.txt

# Reading from file and writing to another file
cat file.txt > file2.txt

# Reading from file and appending to another file
cat file.txt >> file2.txt

# Read input until EOF (End of File)
# You can also use any other delimiter instead of EOF
# wc -w << done
wc -w << EOF
```

### Testing File Conditions

```bash
#!/bin/bash

# Check if directory exist
if [ -d ~/Downloads ]; then
    echo "Directory exists"
else
    echo "Directory doesn't exist"
fi

# Check if file exists
if [ -f ~/Downloads/file.txt ]; then
    echo "File exists"
else
    echo "File doesn't exist"
fi
```
