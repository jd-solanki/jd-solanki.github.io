<script lang="ts" setup>
const props = defineProps<{
    posts: any[];
}>();
</script>

<template>
    <ul class="blog-list">
        <li class="post" v-for="post of posts">
            <a :href="post.url">
            <h3>{{ post.title }}</h3>
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.blog-list {
    list-style: none;
    padding-left: 0;
    margin-top: 3rem;

    .post {
        a {
            &:hover {
                text-decoration: none;
            }
        }

        h3 {
            color: hsla(var(--a-base-c), var(--a-text-emphasis-light-opacity));
            transition: color 0.35s ease-in;
            margin-top: 1.5rem;
            font-weight: 500;
        }

        &:hover {
            h3 {
                color: hsla(var(--a-base-c), var(--a-text-emphasis-high-opacity));
            }
        }
    }
}
</style>