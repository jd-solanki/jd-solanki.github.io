---
title: Bash - My Findings
description: Lean useful tips and best practices for writing effective Bash scripts.
---

## 📚 Cheatsheet

### Scripting

#### Variables & User Input

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

#### Conditional Statements

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

#### Loops

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

#### Functions

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

# Function with default value & naming parameters
function greet() {
    local name=$1 # Assign the first parameter to `name`
    local greeting=${2:-"Hello"} # Assign the second parameter to `greeting` with default value "Hello"
    echo "$greeting $name"
}

greet john # Hello john
greet john Hi # Hi john
```

#### Positional Parameters

```bash
#!/bin/bash

# $0 - Script Name
echo "Script Name: $0"

# $1, $2, $3, ... - Positional Parameters
echo "First Argument: $1"
echo "Second Argument: $2"
```

#### Piping & Redirection

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

#### String Manipulation

```bash
#!/bin/bash

str="Hello, World"

# Length of the string
echo ${#str} # 12

# Convert first character to lowercase
echo ${string,} # hello, World

# Convert all to lowercase
echo ${string,,} # hello, world

# Update str variable for further examples
str="hello, World"

# Convert first character to uppercase
echo ${str^} # Hello, World

# Convert all to uppercase
echo ${str^^} # HELLO, WORLD

str="Hello, World"

# Indexing

# Get substring from index 1 to end
echo ${str:1} # ello, World

# Get substring from index 1 to 3 characters
echo ${str:7:3} # Wor

# Get substring from end
echo ${str:-1} # Hello, World

# Get substring from end of length 1
echo ${str: -1} # d

# Get substring from end of length 5
echo ${str: -5} # World

# From start, Replace shortest match
echo ${str#*l} # lo, World

# From start, Replace longest match
echo ${str##*l} # d

# From end, Replace shortest match
echo ${str%l*} # Hello, Wor

# From end, Replace longest match
echo ${str%%l*} # He

# Find and Replace
echo ${str/World/John} # Hello, John
echo ${str/l/L} # HeLlo, World

# Multiple Find and Replace
echo ${str//l/L} # HeLLo, WorLd

# Remove match single
echo ${str/l} # Helo, World

# Remove match all
echo ${str//l} # Heo, Word
```

#### Testing File Conditions

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

<!-- ## ✨ Tips -->

## 📝 Snippets

### Utility Functions

```bash
function start_spinner() {
    # Create a spinner graphic
    SPINNER="-\|/"

    i=0
    while : ; do
        printf "\b%s" "${SPINNER:i++%${#SPINNER}:1}"
        sleep 0.1
    done &

    # Save spinner process ID to kill it later
    SPINNER_PID=$!

    trap 'stop_spinner; exit;' SIGINT # ℹ️ Stop the spinner when the script is interrupted
}

function stop_spinner() {
    # Kill the spinner
    kill $SPINNER_PID
    
    # Clear the spinner characters
    printf "\b \n"
}

# Usage: redirect_output_to_file "path/to/log/file.log"
function redirect_output_to_file() {
    local LOG_FILE_PATH=$1

    exec 3>&1 4>&2 # Save the original file descriptors
    exec > "$LOG_FILE_PATH" 2>&1 # Redirect stdout and stderr to the log file
}

function reset_output_redirection() {
    exec 1>&3 2>&4
}

function blank_lines() {
    local COUNT=$1
    for ((i=0; i<COUNT; i++)); do
        echo ""
    done
}

function with_blank_lines() {
    local VARIANT=$1
    local MSG=$2
    local BLANK_LINES_COUNT=${3:-1} # Default to 1 blank line

    [ "$VARIANT" == "t" ] && blank_lines $BLANK_LINES_COUNT && echo $MSG
    [ "$VARIANT" == "b" ] && echo $MSG && blank_lines $BLANK_LINES_COUNT
    [ "$VARIANT" == "tb" ] && blank_lines $BLANK_LINES_COUNT && echo $MSG && blank_lines $BLANK_LINES_COUNT
}

function banner() {
    local LABEL=$1
    local LEVEL=$2

    if [ "$LEVEL" -eq 1 ]; then
        msg="# $LABEL #"
        edge=$(echo "$msg" | sed 's/./#/g')

        blank_lines 2
        echo "####################################"
        echo "# --- $LABEL"
        echo "####################################"
        echo ""
    elif [ "$LEVEL" -eq 2 ]; then
        echo ""
        echo "#"
        echo "# --- $LABEL"
        echo "#"
        echo ""
    elif [ "$LEVEL" -eq 3 ]; then
        echo ""
        echo "# --- $LABEL"
        echo ""
    else
        echo "🚨 ERROR: Invalid level"
        exit 1
    fi
}
```

### Redirect output to file and resetting back with spinner

```bash
#!/bin/bash

# 🚨 We'll be using utility function from the snippets section

LOG_FILE_PATH=$(pwd)/exec-$(date +%H_%M_%S).log

start_spinner

redirect_output_to_file $LOG_FILE_PATH

echo "Going for sleep" # This will be written to the log file
sleep 2
echo "Done sleeping" # This will be written to the log file

# ❗ Order of the following two commands is important
reset_output_redirection # From now on, all output will be printed to the terminal

# Once we reset the stdout and stderr, allow stop_spinner to remove the spinner graphic from the terminal
stop_spinner

echo "This'll be printed to the terminal"
```
