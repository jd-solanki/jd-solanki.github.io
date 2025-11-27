<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => {
  const query = queryCollection('blog')
  if (!import.meta.env.DEV) {
    query.where('private', '<>', true)
  }
  return query.all()
})

const links = computed(() => {
  return posts.value?.map(post => ({
    label: post.title,
    to: post.path,
  }))
})

// SEO
const title = 'Blog'
const description = 'My thoughts & learning'
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
