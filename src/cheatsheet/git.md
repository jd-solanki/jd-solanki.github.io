# Git

<br>

## 👩🏻‍💻 Commit

### Squash all git commits into one?

```bash
git reset $(git commit-tree HEAD^{tree} -m "Initial commit")
```

### Change commit message of already pushed commit

```shell
# prompt you to enter new commit message (of latest commit only)
git commit --amend -m "an updated commit message"

# force push
git push -f
```

### Add more changes to the already pushed commit

```shell
# 1. Perform the changes (I know you pushed the commit)

git add .                        # 2. Stag changes

git commit --amend --no-edit     # 3. Amend the commit

git push -f                      # 4. Force push
```

## 🎋 Branches

### Orphan Branche

There's might be case where you want to start from scratch without any files and commit history. In this case, You can create orphan branch in the repo:

```bash
git checkout --orphan <newbranch>
git rm -rf .
```

### Move uncommited changes to new branch

Sometimes we accidentally make changes in the `main` branch and we want to move those changes to a new branch. In this case, we can create a new branch and move the changes to the new branch.

```bash
git checkout -b <new-branch>
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

## 🎯 Remotes

### Push to multiple repositories with single codebase

This can be useful when you want to push the same codebase to multiple repositories. For example, you have a main repo and you want to push the same codebase to another repo in different organization.

You can also sync Github & GitLab repositories using this method 🤯

```shell
# 1. Clone main repo
git clone https://github.com/firstorg/myrepo.git

# 2. Add another remote
git remote set-url --add https://github.com/secondorg/myrepo.git

# 3. Verify the remotes
git remote -v # Output should have two push urls

# 4. Push to both remotes
git push --all # I guess regular git push might work as well
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

### View git ignored & untracked files

```bash
# Shows all gitignored files that exist in your working directory
git ls-files --others --ignored --exclude-standard

# Shows only top-level gitignored items
git ls-files --others --ignored --exclude-standard | cut -d'/' -f1 | sort -u

# Shows only top-level files (excludes directories)
git ls-files --others --ignored --exclude-standard | grep -v '/'
```
