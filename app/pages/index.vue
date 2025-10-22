<script lang="ts" setup>
const title = 'JD Solanki'
const description = 'Welcome to JD Solanki\'s personal website.'
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
})
defineOgImageComponent('NuxtSeo')
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader title="Hi 👋🏻" />
      <UPageBody>
        <p>I'm JD Solanki, Senior software developer.</p>
        <ULink
          to="/blog"
          class="underline"
        >
          Go to blog
        </ULink>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
