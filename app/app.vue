<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const appConfig = useAppConfig()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Blog',
    to: '/blog',
    // active: route.path.startsWith('/blog')
  },
])
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UHeader
      title="JD Solanki"
      to="/"
    >
      <template #title>
        <NuxtImg
          src="https://avatars.githubusercontent.com/u/47495003?v=4"
          class="size-8 rounded-full outline-(--ui-text) outline-2 outline-offset-2 me-2"
        />
        <h1>
          JD Solanki
        </h1>
      </template>
      <template #right>
        <UNavigationMenu
          variant="link"
          :items="items"
        />

        <BlogSearch />

        <UColorModeButton />

        <UButton
          color="neutral"
          variant="ghost"
          :to="appConfig.app.social.github"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />

        <UButton
          color="neutral"
          variant="ghost"
          :to="appConfig.app.social.x"
          target="_blank"
          icon="i-simple-icons-x"
          aria-label="X (Twitter)"
        />
      </template>
    </UHeader>
    <UMain class="min-h-[calc(100vh-var(--ui-header-height)-64px)]">
      <NuxtPage />
    </UMain>
    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          :to="appConfig.app.social.github"
          target="_blank"
          aria-label="GitHub"
        />
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          :to="appConfig.app.social.x"
          target="_blank"
          aria-label="X (Twitter)"
        />
      </template>
    </UFooter>
  </UApp>
</template>
