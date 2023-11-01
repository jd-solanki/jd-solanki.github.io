# Git

<br>

## 👩🏻‍💻 Commit

### Squash all git commits into one?

```bash
git reset $(git commit-tree HEAD^{tree} -m "Initial commit")
```

## 🎋 Branches

### Orphan Branche

There's might be case where you want to start from scratch without any files and commit history. In this case, You can create orphan branch in the repo:

```bash
git checkout --orphan <newbranch>
git rm -rf .
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

### Change tag commit

:::details Why?
Checkout this [stackoverflow question](https://stackoverflow.com/q/25849019).
:::

```bash
# Reassign the same tag to different commit
git tag --force v1.0 <commit-sha>

# Force push the tag
git push --force --tags
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

### Login & Store git credentials

When you setup a new system you might need to enter your git credentials again and again. To avoid this, you can store your git credentials in the system's credential store.

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

git config --global credential.helper store
```

From next whenever you enter your credentials, it will be stored in the system's credential store.

### Remove git credentials

```bash
git config --global --unset credential.helper
```

### Rename git tracked files

Never rename files using `mv` command or manually. Instead use `git mv` command to let git know about the rename.

```bash
git mv Readme.md README.md
```
