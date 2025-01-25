---
title: Ultimate Guide To Prompting Editors
tag: ai
date: 2025-01-25
---

# {{ $frontmatter.title }}

## Prompts Setup

### Common Prompt

Create `.prompts` directory in root of your project. Inside `.prompts` directory, create a file named `common.md` and write your AI instructions in it.

Now for each editors (VSCode, Cursor, Windsurf) create symlink to this prompt:

```sh
# Working directory: <root>
ln -s .prompts/common.md .cursorrules
ln -s .prompts/common.md .windsurfrules
cd .github && ln -s ../.prompts/common.md copilot-instructions.md
```

Now whenever you'll update your common prompt, all editors will get updated automatically due to symlinks.

### Specific Prompts

You can also create prompt library in this `.prompts` directory or create prompts for specific task. E.g. you can have `db.md` for database related prompts and just mention this file when prompting the AI for database task.

This way you can have manageable prompt library right in your source code with version control.

## Use rules file with given template

:::details Credits
I've taken this template from following resources and updated according to my needs.

- [I spent 400+ hours in Cursor, here’s what I learned](https://www.youtube.com/watch?v=gYLNxUxVomY)
:::

:::tip
This file can be `.prompts/common.md` if you follow the prompt setup.
:::

```md
# Knowledge

## Project Overview
<!-- Write about the project overview here -->

## Personality
<!-- Personality we want AI to have -->

## Detailed Tech Stack
<!-- Ensure you write detailed tech stack. Including all the technical info -->

## Directory Structure <!-- Optional -->
<!-- Write about the directory structure or dump command output and explain files if confusing -->

## Process: Error Fixing <!-- Optional -->
<!-- Write about the process of error fixing -->

## Process: Building <!-- Optional -->
<!-- Write about the process of building -->

## IMPORTANT
<!-- Write most important instructions -->

## Roadmap / Future Requirements
<!-- Write what you're project will shape in future to let AI code in that direction -->
```

## Prompting Techniques

```md
The fewer lines of code, the better

Proceed like a senior developer, // 10x engineer

DO NOT STOP WORKING until ... <!-- Avoids the model's laziness -->

<!-- For moving in right direction while debugging & building -->
start by writing 3 reasoning paragraphs analysing what the error might be. DO NOT JUMP TO CONCLUSIONS

DO NOT DELETE COMMENTS

<!-- Summary of the state & persistence of the chat when switching to new chat -->
# sungmary of current state
"""
before we proceed, i need you to give me a summary of the current state of the project.

format this as 3 concise paragraphs, where you describe what we just did, what did not work, which files were updated/created, what mistakes to avoid, any key insights/lessons we've learned, what problems/errors we are facing, ... and anything else a programmer might need to work productively on this project.

write in a conversational yet informative tone, something like a README file on github that is super information dense and without any fluff or noise. DO NOT include any assumptions or theories, just the facts.

i expect to see three concise paragraphs, written as if you were giving instructions to another programmer and this was ALL you could tell him.
"""

<!-- objective 50/50 -->
"""
BEFORE YOU ANSWER, i want you to write two detailed paragraphs, one arguing for each of these solutions - do not jump to conclusions, seriously consider both approaches

then, after you finish, tell me whether one of these solutions is obviously better than the other, and why.
"""

you should start the reasoning paragraph with lots of uncertainty, and slowly gain confidence as you think about the item more.
```

## ✨ Tips

- Couple of small files > One big file. This helps AI to focus on specific task and also keeps the context clear and your code organized.
