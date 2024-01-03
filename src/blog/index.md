<script lang="ts" setup>
import { data as posts } from './blog.data.js'
import BlogList from '../../.vitepress/components/BlogList.vue'
</script>

# Blog

<BlogList :posts="posts"></BlogList>
