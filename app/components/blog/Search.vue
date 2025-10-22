<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('blog').where('private', '<>', true))
const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('blog').where('private', '<>', true))

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
