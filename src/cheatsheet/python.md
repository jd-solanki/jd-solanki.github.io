# Python

## [`Pathlib`](https://docs.python.org/3/library/pathlib.html)

### Get current file direction

```py
import pathlib

# Get current file directory
pathlib.Path(__file__).parent.resolve()

# Get current working directory
pathlib.Path().resolve()

# Join paths using `/`
curr_dir = pathlib.Path(__file__).parent.resolve()
emoji_file_path = curr_dir / 'emoji-test.txt'

# Read file content
emoji_data = emoji_file_path.read_text()
```
