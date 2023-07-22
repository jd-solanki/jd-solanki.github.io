<script lang="ts" setup>
import { data as posts } from './blog.data.js'

console.log(posts)
</script>

# Blog

<ul>
  <li v-for="post of posts">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
