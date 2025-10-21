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
      <template #right>
        <UNavigationMenu
          variant="link"
          :items="items"
        />

        <UColorModeButton />

        <UButton
          color="neutral"
          variant="ghost"
          :to="appConfig.app.social.github"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
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
      </template>
    </UFooter>
  </UApp>
</template>
