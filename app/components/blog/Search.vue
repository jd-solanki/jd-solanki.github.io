<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('blog'))
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('blog'))

const searchTerm = ref('')
</script>

<template>
  <div>
    <UContentSearchButton />
    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </div>
</template>
