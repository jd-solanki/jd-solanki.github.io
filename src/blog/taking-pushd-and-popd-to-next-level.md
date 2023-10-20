---
title: Taking `pushd` & `popd` to next level
tags: linux, bash, scripting
meta:
    - youtubeVideoLink: https://www.youtube.com/watch?v=_cYaToOFml8
---

# {{ $frontmatter.title }}

## Problem

I assume you are already aware of the `pushd` and `popd`.

Sometimes, When you `pushd`, you might need directory you navigated from. For example:

```bash
pwd # ~/foo
zip -r foo.zip foo
pushd ~/bar
unzip ~/foo/foo.zip // [!code hl]
```

In last line, You need previous directory name.

## Solution

Add below two alias to your alias file (`~/.zsh_aliases` or `~/.bash_aliases`):

```text
alias pushd='PREV_DIR=$(pwd) && pushd'
alias popd='PREV_DIR=$(pwd) && popd'
```

After this you can get previous directory name using `$PREV_DIR` variable.

```bash
pwd # ~/foo
zip -r foo.zip foo
pushd ~/bar
unzip $PREV_DIR/foo.zip // [!code hl]
```

## Bonus

Completely following DRY principal:

```bash
pwd # ~/foo
ZIP_NAME=foo.zip zip -r $ZIP_NAME foo // [!code hl]
pushd ~/bar
unzip $PREV_DIR/$ZIP_NAME // [!code hl]
```

We added `ZIP_NAME` variable to avoid repeating `foo.zip` in both commands.
