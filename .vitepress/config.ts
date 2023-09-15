import { defineConfig } from 'vitepress'

export const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  title: 'JD Solanki',
  description: 'JD\' Personal Website',
  srcDir: 'src',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' }],
  ],
  themeConfig: {
    logo: {
      light: 'https://api.iconify.design/line-md:account.svg?color=%233c3c43',
      dark: 'https://api.iconify.design/line-md:account.svg?color=%23fffff5',
    },
    nav: [
      { text: 'Blog', link: '/blog/' },
      {
        text: 'Tips',
        items: [
          { text: 'Programming', link: '/tips/programming' },
          { text: 'Python', link: '/tips/python' },
          { text: 'Git', link: '/tips/git' },
          { text: 'Mac', link: '/tips/mac' },
          { text: 'Node', link: '/tips/node' },
          { text: 'SQLAlchemy', link: '/tips/sqlalchemy' },
        ],
      },
      {
        text: 'Snippets',
        items: [
          { text: 'Python', link: '/snippets/python' },
        ],
      },
      {
        text: 'Cheatsheet',
        items: [
          { text: 'Python', link: '/cheatsheet/python' },
          { text: 'SQLModel', link: '/cheatsheet/sqlmodel' },
          { text: 'SQLAlchemy', link: '/cheatsheet/sqlalchemy' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jd-solanki/' },
      { icon: 'twitter', link: 'https://twitter.com/me_jd_solanki' },
      // { icon: 'mastodon', link: 'https://m.webtoo.ls/@jd-solanki' }
    ],
  },
  markdown: {
    // ℹ️ We only enabled this in development so that we can highlight code lines by seeing line number without calculating it in our editor.
    lineNumbers: isDev,
    theme: 'dracula',
  },
  vite: {
    server: {
      port: 7777,
    },
  },
})
