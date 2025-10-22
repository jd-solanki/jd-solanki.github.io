// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    name: 'JD Solanki',
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
    build: {
      markdown: {
        highlight: {
          theme: 'dracula',
          langs: [
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'shell',
            'mdc',
            'md',
            'yaml',
            'python',
            'py',
            'docker',
            'dockerfile',
            'cypher',
            'sql',
          ],
        },
      },
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    'nuxt-llms',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  llms: {
    domain: 'https://jd-solanki.github.io',
    title: 'JD Solanki\'s Personal Website',
    description: 'My personal website where I share my learning journey and thoughts on various topics including technology, programming, and more.',
    full: {
      title: 'JD Solanki - Personal Website',
      description: 'My personal website where I share my learning journey and thoughts on various topics including technology, programming, and more.',
    },
  },
})
