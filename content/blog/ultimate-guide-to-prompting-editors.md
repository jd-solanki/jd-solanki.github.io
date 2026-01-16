---
title: Final guide to create an AI-Optimized Editor Setup
description: A comprehensive guide on setting up and using prompts effectively in various AI-assisted coding editors.
date: 2025-01-25
---

::accordion

::accordion-item{label=Resources icon="i-lucide-book"}

- [VSCode Prompting](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
::
::

## `AGENTS.md`

1. Create `AGENTS.md` in root of your project.
2. Symlink `AGENTS.md` to `CLAUDE.md` for claude code support

  ```shell
  ln -s AGENTS.md CLAUDE.md
  ```

This will now support most of the editors and Claude Code also.

## Slash Commands & Custom Agents

1. Create slash commands or custom agents under `.ai/agents/<name>.md`. This will be your slash command or custom agent for VS Code.

2. Use symlink to add support for all editors & Claude Code.

  ```shell
  mkdir -p .github && ln -s ../.ai/commands .github/agents
  mkdir -p .cursor && ln -s ../.ai/commands .cursor/commands
  mkdir -p .claude && ln -s ../.ai/commands .claude/commands
  ```

## Skills

1. Store rules under `.ai/skills/<skill>/SKILL.md`

2. Create symlink to for Copilot, Cursor & Claude Code support

  ```shell
  mkdir -p .claude && ln -s ../.ai/skills .claude/skills
  mkdir -p .github && ln -s ../.ai/skills .github/skills
  ```

## Rules

1. Store rules under `.ai/rules/<name>.instructions.md`

2. Cursor support via symlink

  ```shell
  ln -s ../.ai/rules .cursor/rules
  ```

1. Copilot support by adding this setting in `.vscode/settings.json`

  ```json
  {
    "chat.instructionsFilesLocations": {
      ".ai/rules": true
    }
  }
  ```

  :::note
  Copilot calls it instructions and requires files to have `.instructions.md` suffix
  :::

:::note
Claude Code doesn't support rules
:::

::callout{icon="i-lucide-book" color="neutral" to="/blog/ai-engineering-my-findings"}
You might also want to have a look at prompts.
::
