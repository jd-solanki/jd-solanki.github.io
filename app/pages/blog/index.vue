<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').where('private', '<>', true).all())

const links = computed(() => {
  return posts.value?.map(post => ({
    label: post.title,
    to: post.path,
  }))
})
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader title="Blog" />
      <UPageBody>
        <UPageLinks
          :links="links"
          :ui="{ link: 'text-xl font-semibold opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-300', list: 'gap-4' }"
        />
      </UPageBody>
    </UContainer>
  </UPage>
</template>
