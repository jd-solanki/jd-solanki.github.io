<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).where('private', '<>', true).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path).where('private', '<>', true)
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <UContainer>
    <UPage v-if="post">
      <UPageHeader
        :title="post.title"
        :description="post.description"
      />
      <UPageBody>
        <ContentRenderer :value="post" />
      </UPageBody>

      <UContentSurround :surround="surround" />
      <template #right>
        <UContentToc
          v-if="post.body.toc"
          :links="post.body.toc.links"
          highlight
          color="neutral"
        />
      </template>
    </UPage>
    <UPage v-else>
      <UPageHeader title="Page Not Found" />
    </UPage>
  </UContainer>
</template>
