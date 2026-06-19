---
title: How to Use Work & Personal GitHub Accounts on Ubuntu (SSH + gh CLI)
description: A complete, ordered guide to running multiple GitHub accounts on a fresh Ubuntu machine — SSH keys, per-directory git identity, and automatic gh CLI account switching.
---

## Prerequisites

You'll need these on your Ubuntu machine before starting:

- **Git** — `sudo apt install -y git`
- **OpenSSH client** — `sudo apt install -y openssh-client`
- **GitHub CLI (`gh`)** — Install via the official guide: [GitHub CLI → Installation](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)

## Step 1 — Create one SSH key per account

Generate a separate key for each account. Keeping them separate is what lets SSH pick the right identity per host.

```bash
# Work key
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/id_work

# Personal key
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_personal
```

When prompted you can set a passphrase (recommended) or press Enter to skip. This creates four files:

- `~/.ssh/id_work` + `~/.ssh/id_work.pub` (work)
- `~/.ssh/id_personal` + `~/.ssh/id_personal.pub` (personal)

## Step 2 — Add the public keys to GitHub

Copy each **public** key and add it to the matching account at **GitHub → Settings → SSH and GPG keys → New SSH key**.

```bash
# Work — paste this into the work-username account
cat ~/.ssh/id_work.pub

# Personal — paste this into the personal-username account
cat ~/.ssh/id_personal.pub
```

::callout{icon="i-lucide-external-link" color="neutral" to="https://github.com/settings/keys"}
The SSH keys page is at **github.com/settings/keys** — make sure you're logged into the correct account before adding each key.
::

## Step 3 — The `~/.ssh/config` (the heart of it)

This is the file that gives you the `github-work` and `github-personal` experience. Create `~/.ssh/config`:

```bash
nano ~/.ssh/config
```

Paste:

```ssh-config
Host github-personal
   HostName github.com
   IdentityFile ~/.ssh/id_personal
   IdentitiesOnly yes

Host github-work
   HostName github.com
   IdentityFile ~/.ssh/id_work
   IdentitiesOnly yes
```

Lock down the permissions (SSH is picky about this):

```bash
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_work ~/.ssh/id_personal
chmod 644 ~/.ssh/id_work.pub ~/.ssh/id_personal.pub
```

**How it works:** both hosts really connect to `github.com`, but each presents a *different* key. `IdentitiesOnly yes` forces SSH to use only the listed key (otherwise it may offer the wrong one and get rejected). You now address the two accounts by **alias** instead of `github.com`:

- `git@github-work:ORG/REPO.git` → authenticates as **work**
- `git@github-personal:USER/REPO.git` → authenticates as **personal**

Test both:

```bash
ssh -T git@github-work       # Hi work-username! You've successfully authenticated...
ssh -T git@github-personal   # Hi personal-username! You've successfully authenticated...
```

::note
The first connection asks you to trust GitHub's host key — type `yes`. Seeing the right username in each greeting confirms the key→account mapping is correct.
::

### Using the aliases when cloning

Always clone with the alias that matches the account that owns the repo:

```bash
# Work repo
git clone git@github-work:your-org/work-repo.git

# Personal repo
git clone git@github-personal:personal-username/personal-repo.git
```

For an existing repo, point its remote at the right alias:

```bash
git remote set-url origin git@github-work:your-org/work-repo.git
```

## Step 4 — Per-directory git identity

SSH now picks the right *key*, but your commits still need the right *name/email*. Instead of setting this per repo by hand, let the **directory** decide using Git's `includeIf`.

The idea: pick a folder layout where personal and work projects live in different trees, e.g.:

```text
~/Projects/
├── work/
└── personal/
```

Set your **default (work)** identity in `~/.gitconfig`:

```ini
[user]
    name = work-username
    email = work@example.com

[init]
    defaultBranch = main
```

Now add a conditional include at the **bottom** of `~/.gitconfig` that overrides the identity for anything under your personal folder:

```ini
[includeIf "gitdir:~/Projects/personal/"]
    path = ~/.gitconfig-personal
```

And create `~/.gitconfig-personal`:

```ini
[user]
    name = personal-username
    email = personal@example.com
```

::note
The trailing slash in `gitdir:~/Projects/personal/` matters — it means "any repo inside this directory". Git evaluates this per repository, so every repo under `~/Projects/personal/` automatically uses your personal name/email, and everything else falls back to work.
::

Verify from inside each tree:

```bash
cd ~/Projects/work/work-repo         && git config user.name   # work-username
cd ~/Projects/personal/personal-repo && git config user.name   # personal-username
```

This `user.name` value is the linchpin of the next step — we'll make the `gh` CLI follow it.

## Step 5 — Authenticate `gh` for *both* accounts

Log in to each account once. `gh` stores them side by side and lets you switch between them.

```bash
gh auth login   # run this once per account
```

Choose: **GitHub.com** → your preferred protocol → **Login with a web browser**, and complete it for your **work** account. Then run `gh auth login` **again** and complete it for your **personal** account.

Confirm both are present:

```bash
gh auth status
```

```text
github.com
  ✓ Logged in to github.com account personal-username (keyring)
  - Active account: true
  ✓ Logged in to github.com account work-username (keyring)
  - Active account: false
```

You can switch manually with `gh auth switch -u <username>` — but doing that by hand every time you change projects is exactly what we want to avoid. Onward.

## Step 6 — Make `gh` auto-select the right account per repo

`gh` has no built-in "use account X in directory Y" feature ([cli/cli#326](https://github.com/cli/cli/issues/326)). The clean workaround is a tiny **wrapper script** placed ahead of the real `gh` on your `PATH`. Before every `gh` call it reads the repo's `git config user.name` and, if needed, switches the active `gh` account to the one whose login matches — then hands off to the real `gh`.

Because it's a script on `PATH` (not a shell function), it works **everywhere**: interactive shells, scripts, and CI alike.

Create `~/.local/bin/gh`:

```bash
mkdir -p ~/.local/bin
nano ~/.local/bin/gh
```

Paste:

```bash
#!/usr/bin/env bash
# gh wrapper: auto-switch the active gh account to match the current repo's
# `git config user.name` before delegating to the real gh.
#
# Sits ahead of /usr/bin/gh on PATH so it applies to interactive shells,
# scripts, and CI alike. The real binary is always called by absolute path
# so this wrapper can never recurse into itself.
#
# See https://github.com/cli/cli/issues/326 (idea from @uncenter).

REAL_GH="/usr/bin/gh"

# Robustness: if the hard-coded path ever moves, fall back to the next gh on
# PATH that isn't this very script.
if [ ! -x "$REAL_GH" ]; then
    self="$(readlink -f "$0" 2>/dev/null || echo "$0")"
    REAL_GH=""
    while IFS= read -r cand; do
        [ -x "$cand" ] || continue
        [ "$(readlink -f "$cand" 2>/dev/null || echo "$cand")" = "$self" ] && continue
        REAL_GH="$cand"
        break
    done < <(type -aP gh 2>/dev/null)
    if [ -z "$REAL_GH" ]; then
        echo "gh-wrapper: could not locate the real gh binary" >&2
        exit 127
    fi
fi

want="$(git config user.name 2>/dev/null)"
if [ -n "$want" ]; then
    active="$("$REAL_GH" auth status --json hosts \
        --jq '.hosts["github.com"][] | select(.active).login' 2>/dev/null)"
    if [ -n "$active" ] && [ "$want" != "$active" ]; then
        if "$REAL_GH" auth status --json hosts \
            --jq '.hosts["github.com"][].login' 2>/dev/null | grep -Fqx "$want"; then
            "$REAL_GH" auth switch -u "$want" >/dev/null 2>&1
        fi
    fi
fi

exec "$REAL_GH" "$@"
```

Make it executable:

```bash
chmod +x ~/.local/bin/gh
```

### Make sure the wrapper wins on `PATH`

The wrapper only works if `~/.local/bin` comes **before** `/usr/bin` on your `PATH`. On Ubuntu, `~/.local/bin` is usually added automatically, but make it explicit in `~/.bashrc`:

```bash
# ~/.bashrc
export PATH="$HOME/.local/bin:$PATH"
```

Reload and confirm `gh` now resolves to the wrapper:

```bash
source ~/.bashrc
hash -r                 # clear any cached path to the old gh
command -v gh           # -> /home/<you>/.local/bin/gh
```

### How the wrapper works

- It reads `git config user.name` for the current repo (set automatically by your `includeIf` rules).
- It asks the **real** `gh` which account is currently active.
- If they differ *and* a matching account exists, it runs `gh auth switch` — otherwise it does nothing (so the common case is a single cheap status check).
- `exec "$REAL_GH" "$@"` replaces the process, so the exit code, stdin/stdout/stderr, and signals all pass through transparently.
- The real binary is always invoked by its **absolute path**, so the wrapper can never accidentally call itself in a loop.

## Step 7 — Verify the whole thing

```bash
# Work repo -> should report the work account
cd ~/Projects/work/work-repo
gh api user --jq '.login'        # work-username

# Personal repo -> should report the personal account
cd ~/Projects/personal/personal-repo
gh api user --jq '.login'        # personal-username
```

If both lines print the expected username **without you switching anything**, you're done. SSH, commit identity, and `gh` now all follow the directory automatically. 🎉

## Troubleshooting

::accordion

::accordion-item{label="ssh -T git@github-work says Permission denied" icon="i-lucide-key-round"}

- Confirm the public key (`~/.ssh/id_work.pub`) is added to the **correct** GitHub account.
- Check `~/.ssh/config` has `IdentitiesOnly yes` so SSH doesn't offer the wrong key.
- Run `ssh -vT git@github-work` and look at the `Offering public key:` line to see which key is being tried.
::

::accordion-item{label="gh still uses the wrong account" icon="i-lucide-user-x"}

- `command -v gh` must print `~/.local/bin/gh`. If it prints `/usr/bin/gh`, your `PATH` order is wrong or your shell cached the old path — run `hash -r` and open a new terminal.
- Make sure the repo's `git config user.name` **exactly** matches a `gh` login (case-sensitive). `gh auth status` lists the valid logins.
::

::accordion-item{label="Commits show the wrong name/email" icon="i-lucide-git-commit"}

- `git config user.email` inside the repo tells you what's active.
- Remember `includeIf` matches on the trailing-slash directory — `gitdir:~/Projects/personal/` (with the slash) covers everything inside it.
- Already committed with the wrong identity? Fix the config, then `git commit --amend --reset-author` for the latest commit.
::

::accordion-item{label="A script/CI calls gh but doesn't auto-switch" icon="i-lucide-terminal"}
This is exactly why we used a PATH wrapper instead of a shell function — as long as `~/.local/bin` is on the `PATH` that the script inherits, the wrapper applies. If a cron/CI shell has a minimal `PATH`, add `~/.local/bin` to it explicitly.
::

::

## Wrapping up

The whole setup comes down to letting **the directory** decide who you are:

- **`~/.ssh/config`** maps `github-work`/`github-personal` aliases to separate keys.
- **`includeIf`** swaps your commit identity based on where the repo lives.
- A small **`gh` wrapper** makes the GitHub CLI follow that same identity.

Set it up once on each new machine and you can forget it exists — which is exactly what you want from account juggling.

::accordion

::accordion-item{label="Resources" icon="i-lucide-book"}

- [cli/cli#326 — Allow multiple account credentials](https://github.com/cli/cli/issues/326)
- [GitHub Docs — Connecting with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Git Docs — Conditional includes (`includeIf`)](https://git-scm.com/docs/git-config#_conditional_includes)
- [GitHub CLI — Manual](https://cli.github.com/manual/)

::

::
