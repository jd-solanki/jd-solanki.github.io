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

We'll focus on VS Code, Cursor, Claude Code & OpenCode as they are the most popular AI-assisted coding editors.

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
  mkdir -p .cursor && ln -s ../.ai/skills .cursor/skills
  mkdir -p .opencode && ln -s ../.ai/skills .opencode/skills
  ```

## MCPs

Syncing MCP across different tooling requires some manual work.

1. Create various MCPs under `.ai/mcp/mcp.<tool>.json`

    ```json
    // .ai/mcp/mcp.vscode.json
    {
      "servers": {
        "context7": {
          "type": "http",
          "url": "https://mcp.context7.com/mcp",
          "headers": {
            "CONTEXT7_API_KEY": "YOUR_API_KEY"
          }
        }
      }
    }
    ```

    ```json
    // .ai/mcp/mcp.cc.json
    {
      "mcpServers": {
        "context7": {
          "type": "http",
          "url": "https://mcp.context7.com/mcp",
          "headers": {
            "CONTEXT7_API_KEY": "YOUR_API_KEY"
          }
        }
      }
    }
    ```

2. Sync MCPs via symlink

```shell
# VS Code
mkdir -p .vscode && ln -s ../.ai/mcp/mcp.vscode.json .vscode/mcp.json

# Claude Code
ln -s ./.ai/mcp/mcp.cc.json .mcp.json

# Cursor
mkdir -p .cursor && ln -s ../.ai/mcp/mcp.cc.json .cursor/mcp.json
```

1. We can't sync OpenCode MCPs via symlink as it requires editing their settings file. Maintain following:

```json
// .opencode.json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      },
      "enabled": true
    }
  }
}
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
