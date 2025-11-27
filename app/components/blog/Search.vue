<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  const query = queryCollectionNavigation('blog')
  if (!import.meta.env.DEV) {
    query.where('private', '<>', true)
  }
  return query
})
const { data: files } = await useAsyncData('search', () => {
  const query = queryCollectionSearchSections('blog')
  if (!import.meta.env.DEV) {
    query.where('private', '<>', true)
  }
  return query
})

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
