// @ts-check
import antfu from '@antfu/eslint-config'
import harlanzw from 'eslint-plugin-harlanzw'
import regexPlugin from 'eslint-plugin-regex'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Global ignores - applies to all configurations
  {
    ignores: [
      './.prompts/nuxt-ui.instructions.md',
      './server/db/migrations/**/*',
    ],
  },
  antfu({
    vue: {
      overrides: {
        'vue/max-attributes-per-line': 'error',
      },
    },
    typescript: true,
    stylistic: {},
  }),
  // Add regex plugin for custom rules
  {
    plugins: {
      regex: regexPlugin,
      harlanzw,
    },
    rules: {
      'harlanzw/link-ascii-only': 'error',
      'harlanzw/link-lowercase': 'error',
      'harlanzw/link-no-double-slashes': 'error',
      'harlanzw/link-no-whitespace': 'error',
      'harlanzw/nuxt-await-navigate-to': 'error',
      'harlanzw/nuxt-no-redundant-import-meta': 'error',
      'harlanzw/nuxt-no-side-effects-in-async-data-handler': 'error',
      'harlanzw/nuxt-no-side-effects-in-setup': 'error',
      'harlanzw/nuxt-prefer-navigate-to-over-router-push-replace': 'error',
      'harlanzw/nuxt-prefer-nuxt-link-over-router-link': 'error',
      // 'harlanzw/vue-no-faux-composables': 'error', /* This isn't working accurately due to auto-imports */
      'harlanzw/vue-no-nested-reactivity': 'error',
      'harlanzw/vue-no-passing-refs-as-props': 'error',
      'harlanzw/vue-no-reactive-destructuring': 'error',
      'harlanzw/vue-no-ref-access-in-templates': 'error',
      'harlanzw/vue-no-torefs-on-props': 'error',
      'regex/invalid': [
        // NOTE: Regex rules are quickest way to add restrictions project-wide
        // without needing to write custom rules or TS code.
        // These should be used sparingly, as they can be brittle and cause false positives.
        // INFO: We'll migrate these rules to AST based custom rules after couple of releases.
        'error',
        [
          {
            regex: 'useUserSession\\(\\)',
            message: 'Prefer `useUserStore()` instead of `useUserSession()`',
            files: { ignore: 'stores\\/user\.ts' },
          },
          {
            regex: 'router\.(push|replace)\((.*)\)',
            message: 'Prefer `navigateTo()` instead of `router.replace()` or `router.push()`',
          },
          {
            regex: 'db.transaction\\(async ',
            message: 'Prefer <entity>_crud over manual db import & initiating transaction.',
          },
          {
            regex: '</NuxtLink>',
            message: 'Prefer <ULink> instead of <NuxtLink>.',
          },
          {
            regex: 'import { .*\bdb\b.* }',
            message: 'Do not directly use `db` outside crud directory.',
            files: { ignore: '.*\\/crud\\/.*' },
          },
          {
            regex: 'z\.date()',
            message: 'Use z.coerce.date() instead of z.date() for better parsing.',
          },
        ],
      ],
    },
    ignores: ['eslint.config.mjs'],
  },
).overrideRules({
  'node/prefer-global/process': ['error', 'always'],
})
