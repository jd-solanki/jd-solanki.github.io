---
title: How to create Nuxt Studio like environment for VitePress
date: 2023-12-19
tags: vue, vscode, nuxt
---


# {{ $frontmatter.title }}

<br>

<video controls style="border-radius: 6px; margin: 1.5rem auto;">
  <source src="/nuxt-studio-like-env-for-vitepress.mov" type="video/mp4">
</video>

## Why? 🤔

I'm a big fan of [Nuxt.js](https://nuxt.com/) and I love the [Nuxt Studio](https://nuxt.studio/) where you can just write the content and it shows you the preview of the content in real time. Apart from this it also provides you bunch of other features like collaboration, version control, etc but I'm going to focus on the preview part in this article. For features like version control, VSCode already provides you the git integration.

Anyways, I tried [Alpine Theme](https://nuxt.studio/themes/alpine) by Nuxt team for my personal site (the site your are viewing at the movement). But as a developer I wanted to have more control over the theme and wanted more transparency on what's going on behind the scene. Alpine theme had lots of abstraction and I was not able to understand what's going on behind the scene and while I was using Alpine theme, [Nuxt Elements](https://elements.nuxt.space/) was down for some reason so I was unable to read docs for what components I have access to and how to use them.

Apart from abstraction and above mentions, I really loved the UI of VitePress. I customized VitePress further for my needs and I really liked how it turned out. But still, I was missing the preview feature of Nuxt Studio 🥲. So I decided to create a similar environment for VitePress.

## How? 🤯

As always credit goes to the legend [@antfu](https://github.com/antfu). 🫡

1. First of all, Create fresh VitePress project by following the [official docs](https://vitepress.dev/guide/getting-started.html).

2. Now, you'll need VSCode and few extensions to create Nuxt Studio like environment for VitePress.

    Below is list of essential extensions you'll need:

    - [Browse Lite](https://marketplace.visualstudio.com/items?itemName=antfu.browse-lite)
    - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)

    _You can add more as per your needs_

3. Add below settings in `.vscode/settings.json`. (_You can also refer to my repo's VSCode settings_)

    ```json
    {
      // Save file on change to trigger HMR & preview the changes
      "files.autoSave": "afterDelay",

      // Set auto save delay to 500ms (Adjust as per your needs)
      "files.autoSaveDelay": 500,

      // Set port for Browse Lite (It can be different for you because I changed the default port for Vite server)
      "vite.port": 7777,

      // Like Nuxt Studio, Page of currently open file will be opened in Browse Lite
      "vite.vitepressAutoRouting": true,

      // (You might not need this) Set base path for VitePress. I have all content inside `src` folder.
      "vite.vitepressBase": "src"
    }
    ```

## Result 🎉

<video controls style="border-radius: 6px; margin: 1.5rem auto;">
  <source src="/nuxt-studio-like-env-for-vitepress.mov" type="video/mp4">
</video>

Isn't this cool? 😎
