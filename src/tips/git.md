# Git

<br>

## 👩🏻‍💻 Commit

### Squash all git commits into one?

```bash
git reset $(git commit-tree HEAD^{tree} -m "Initial commit")
```

## 🔖 Tags

### Remove tag

```bash
# Remove local tag
git tag --delete tagname

# Remove remote tag
git push --delete origin <tag-name>
```

### Create & Push tag to remote

```bash
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

## 🧮 Misc

### Temporarily ignore folder/file in git

You can use the `git update-index` command with the `--skip-worktree` option to temporarily ignore changes to a specific folder or file in a Git repository.

```bash
git update-index --skip-worktree /temp
```

To stop ignoring changes to the folder/file (undo above), use `--no-skip-worktree` option.

```bash
git update-index --no-skip-worktree /temp
```
