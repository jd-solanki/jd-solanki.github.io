<script lang="ts" setup>
import { data as posts } from './blog.data.js'
import BlogList from '../../.vitepress/components/BlogList.vue'

console.log(posts)
</script>

# Blog

<BlogList :posts="posts"></BlogList>
