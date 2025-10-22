---
title: Clever way to show two banners at the same time
description: Learn how to display announcement & temporary information banner simultaneously on your website
---

::note
You'll see some Vue code but this can be used with any Javascript framework or plain HTML/CSS/JS
::

## Requirement

In production app, We can have announcement/promotional banners like 50% off.

![promotional-banner-image-screenshot](/images/blog/clever-way-to-show-two-banners/promotional-banner.png)

Apart from this we may want to show temporary information banner like admin is impersonating a user.

![app-banner-image-screenshot](/images/blog/clever-way-to-show-two-banners/app-banner.png){.border}

Issue arise when we already have announcement/promotion banner & we want to show high priority app related banner. It won't be ideal to show both banner one after another as it can take up too many space and doesn't look good either.

First think that come to your mind is preserving previous banner's state in browser's cookie or localStorage and perform some magic calculation to render content accordingly. But this can get complex quickly.

Instead, I come up with simple solution, Render both but stack banners and show banner with higher priority on top.

This is how I did in my Nuxt Boilerplate:

```vue
<script lang="ts" setup>
// Hold state if admin is impersonating user
const userStore = useUserStore()

// Announcement/Promotional global banner store
const bannerStore = useBannerStore()
</script>

<template>
  <!--
      Clever way to show existing banner and impersonating banner without adding complexity
      Instead of adding complexity create two separate banner and make impersonating banner overlap existing one

      This will hide main banner behind impersonating when admin is impersonating user.
      When admin stop impersonating underlying banner will appear without managing any dynamic state & storing main banner state it in cookie.

      Also as we added v-if for userSession to impersonating banner, it automatically gets removed when admin sign out while impersonating.
    -->
  <UserImpersonatingBanner
    v-if="userStore.userSession?.impersonatedBy"
    class="sticky top-0"
  />
  <UBanner
    v-else-if="bannerStore.props.title"
    v-bind="bannerStore.props"
    class="sticky top-0"
  />
</template>
```

In a post snippet, if you notice, both are stacked on top of each other. Due to order of elements impersonating banner will be on top of existing banner when admin is impersonating user. When admin stop impersonating, underlying banner will appear automatically.

Excellence is, It'll auto handle the case where if admin sign out while impersonating user, impersonating banner will be removed from DOM automatically due to `v-if` condition and underlying banner will appear without any additional logic.

Here's demo of how it looks in action:
<video width="100%" height="auto" controls>
  <source src="/videos/blog/clever-way-to-show-two-banners/banner-demo.mp4" type="video/mp4">
</video>
