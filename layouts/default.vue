<script lang="ts" setup>

</script>

<template>
    <nav class="border-b border-lightgray">
        <div class="min-h-60px container mx-auto flex items-center justify-between px-8">
            <NuxtLink to="/" class="text-xl font-medium">Brand</NuxtLink>
            <div class="flex gap-6 items-center">
                <NuxtLink to="/blog">Blog</NuxtLink>
                <NuxtLink class="flex" external target="_blank" to="https://github.com/jd-solanki">
                    <i class="i-logos-github-icon"></i>
                </NuxtLink>
            </div>
        </div>
    </nav>
    <main class="container mx-auto p-8">
        <slot></slot>
    </main>
</template>
