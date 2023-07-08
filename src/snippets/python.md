# Python

### Prepending text to file

```python
def prepend_text(filename: Union[str, Path], text: str):
    with fileinput.input(filename, inplace=True) as file:
        for line in file:
            if file.isfirstline():
                print(text)
            print(line, end="")
```

### Execute function immediately in python

```python
from typing import Callable, Any

execute: Callable[[Callable[..., Any]], None] = lambda f: f()

@execute
def say():
    print(f"hello!")
```

## Use `capsys` fixture with types in pytest

```python
from pytest import CaptureFixture // [!code hl]
from src.main import app
from typer.testing import CliRunner

runner = CliRunner()

def test_app(capsys: CaptureFixture[str]): // [!code hl]
    result = runner.invoke(app, ['master', 'fill-code-snippets'])
    assert result.exit_code == 0
    with capsys.disabled():
        print(f"result.stdout: {result.stdout}")
```

## Walk directory recursively

```python
from pathlib import Path

path = Path("docs")
for p in path.rglob("*"):
     print(p.name)
```
