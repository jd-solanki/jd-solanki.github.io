<script setup lang="ts">
const route = useRoute()

const { data } = useAsyncData(
    `content-${route.path}`,
    () => queryContent().where({ _path: route.path }).findOne()
)

definePageMeta({
    layout: 'blog',
})
</script>

<template>
    <div class="prose">
        <ContentRenderer :value="data"></ContentRenderer>
    </div>
</template>
