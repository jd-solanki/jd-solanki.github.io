# Mac

<br>

### Ignore `.DS_store` in git projects automatically

Please run below two commands to globally git ignore `.DS_Store`

```bash
# Add .DS_Store to global gitignore
echo .DS_Store >> ~/.gitignore

# Set global gitignore file
git config --global core.excludesfile ~/.gitignore
```

### How to capture/copy text from screen

Check out [this](https://www.youtube.com/watch?v=BZVlifUpr_c) video

### Mac, Zip Files, `__MACOSX` and `.DS_Store`

Mac bundles some unwanted files while zipping a folder. To avoid this, use below command to zip a folder.

```bash
zip -r data.zip . -x ".*" -x "__MACOSX"
```

Remove `__MACOSX` and `.DS_Store` from existing zip file

```bash
zip -d data.zip "__MACOSX/*"
zip -d data.zip "*/.DS_Store"
````
