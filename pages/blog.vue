<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => queryContent('/blog').find())
</script>

<template>
    <ul>
        <li v-for="post in posts" :key="post._id">
            <NuxtLink :to="post._path">
            {{ post.title }}
            </NuxtLink>
        </li>
    </ul>
</template>