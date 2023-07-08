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
