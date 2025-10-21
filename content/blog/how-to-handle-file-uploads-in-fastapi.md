---
title: How to handle file uploads in FastAPI
description: A guide on handling file uploads in FastAPI with validation and saving to disk.
---

First of all, Start with utility function to save file to disk.

```py
import os
from secrets import token_hex
from pathlib import Path
from fastapi import UploadFile

async def save_file_to_disk(file: UploadFile, path: str | Path) -> Path:
    # convert received `path` to `Path` object
    _path = Path(path)

    # create directory if not exists
    os.makedirs(_path, exist_ok=True)

    # generate unique file name
    new_file_name = token_hex(16) + Path(file.filename).suffix

    # Create file path for new file
    file_path = _path / new_file_name

    # Save file in chunks asynchronously
    with open(file_path, "wb") as buffer:
        async for chunk in file:
            buffer.write(chunk)
    return file_path
```

Next, Let's create a dependency that validates the file type. This dependency will be accept a list of allowed file types and raise an exception if the file type is not in the list.

```py
from fastapi import HTTPException, UploadFile, Depends

class FileValidator:
    def __init__(self, allowed_types: list[str]):
        self.allowed_types = allowed_types

    async def __call__(self, file: UploadFile = File(...)):
        if file.content_type not in self.allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type")
        return file

# Dependency instances for different file types
img_validator = FileValidator(["image/jpeg", "image/png"])
pdf_validator = FileValidator(["application/pdf"])
```

Finally, Let's use this validator in our path operation:

```py
from fastapi import FastAPI, UploadFile, Depends
from .deps import img_validator
from .utils import save_file_to_disk

app = FastAPI()

@app.post("/upload/images/")
async def upload_images(files: list[UploadFile] = Depends(img_validator)):
    # Create a list of tasks to save files to disk asynchronously
    upload_tasks = [save_file_to_disk(f) for f in files]

    # Wait for all tasks to complete
    file_paths = await asyncio.gather(*upload_tasks)

    # Return file paths
    return {"file_paths": file_paths}
```

In addition to this you can also add file size validation, file name validation, etc as per your requirements using dependencies.
