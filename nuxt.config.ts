// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'assets/styles/main.scss',
    '@unocss/reset/tailwind.css',
  ],
  alias: {
    "micromark/lib/preprocess.js": "micromark",
    "micromark/lib/postprocess.js": "micromark",
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
  ],
  content: {
    highlight: {
      theme: 'dracula',
    }
  },
  devServer: {
    port: 7777,
  }
})
