<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const routePath = withoutTrailingSlash(route.path)

const [{ data: post }, { data: surround }] = await Promise.all([
  useAsyncData(routePath, () => {
    const query = queryCollection('blog').path(routePath)
    if (!import.meta.env.DEV) {
      query.where('private', '<>', true)
    }
    return query.first()
  }),
  useAsyncData(`${routePath}-surround`, () => {
    const query = queryCollectionItemSurroundings('blog', routePath, {
      fields: ['description'],
    })
    if (!import.meta.env.DEV) {
      query.where('private', '<>', true)
    }
    return query
  }),
])

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

// SEO
const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'article',
})
defineOgImageComponent('NuxtSeo')
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
