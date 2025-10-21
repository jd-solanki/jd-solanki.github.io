---
title: Pandas - My Findings
description: Learn useful tips and best practices in Pandas data manipulation library.
date: 2024-08-06
---

## 📚 Cheatsheet

```py
import pandas as pd

# Create a DataFrame
# df = pd.DataFrame([[1,2,3], [4,5,6], [7,8,9]], columns=['A', 'B', 'C'])
df = pd.DataFrame({
    'A': [1, 4, 7],
    'B': [2, 5, 8],
    'C': [3, 6, 9],
})

df.head() # Get the first 5 rows
df.head(2) # Get the first 2 rows

df.tail() # Get the last 5 rows
df.tail(2) # Get the last 2 rows

df['A'].head() # Get the first 5 rows of a column
df['A'].tail() # Get the last 5 rows of a column

df[['A', 'B']].head() # Get the first 5 rows of multiple columns
df[['A', 'B']].tail() # Get the last 5 rows of multiple columns

df.sample() # Get a random row
df.sample(10) # Get 10 random rows

df["A"] # Get a column
df.A # Get a column
df[["A", "B"]] # Get multiple columns

# df.loc[row_index, column_name]
# df.iloc[row_index, column_index]
df.loc[0] # Get the first row
df.loc[0:2] # Get the first 3 rows
df.loc[[0, 1, 2]] # You can also pass a list of indexes
df.loc[0:2, 'A'] # Get the first 3 rows of a column
df.loc[0:2, ['A', 'B']] # Get the first 3 rows of multiple columns
df.loc[[0, 2], ['A', 'B']] # Get the first and third rows of multiple columns
df.iloc[:, [0, 1]] # Get all rows of the first 2 columns

df.loc[0, 'A'] = 10 # Set the "A" col value of the first row to 10
df.loc[0, ['A', 'B']] = [10, 20] # Set the "A" and "B" col values of the first row to 10 and 20
df.loc[0:2, 'A'] = 10 # Set the "A" col values of the first 3 rows to 10

# * at and iat are faster than loc and iloc but they only work with a single value
df.at[0, 'A'] # Get the value of the first row of the "A" column
df.iat[0, 0] # Get the value of the first row of the first column
df.at[0, 'A'] = 10 # Set the value of the first row of the "A" column to 10
df.iat[0, 0] = 10 # Set the value of the first row of the first column to 10
df.at[0:3, 'A'] # 🚨 ERROR

df.shape   # Get the shape of the DataFrame
df.columns # Get the columns of the DataFrame
df.index   # Get the index of the DataFrame
df.values  # Get the values of the DataFrame
df.dtypes  # Get the data types of the DataFrame
df.info()  # Get the info of the DataFrame
df.describe() # Get the statistics of the DataFrame

# Load files
pd.read_csv('path/to/file.csv')
pd.read_csv('remote_url.csv')
pd.read_json('path/to/file.json')

# Dump data in file
df.to_csv("file_name.csv")
df.to_json("file_name.json")
```

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->
