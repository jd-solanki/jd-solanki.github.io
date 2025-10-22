<script lang="ts" setup>
const title = 'JD Solanki'
const description = 'Welcome to JD Solanki\'s personal website.'
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
})
defineOgImageComponent('NuxtSeo')

const appConfig = useAppConfig()
</script>

<template>
  <UPage>
    <UContainer>
      <UPageBody>
        <div class="grid md:grid-cols-12 gap-8">
          <UCard class="md:col-span-4 xl:col-span-3">
            <NuxtImg
              :src="appConfig.app.author.avatar"
              class="w-full h-auto rounded"
            />
            <div class="my-6 space-y-1">
              <h3 class="text-highlighted font-semibold">
                I'm JD Solanki 👋🏻
              </h3>
              <p class="text-pretty">
                Senior software developer into AI, JavaScript/TypeScript & Python. I love shipping SaaS products.
              </p>
            </div>
            <div class="flex gap-3">
              <UButton
                :to="appConfig.app.author.social.github"
                target="_blank"
                icon="i-simple-icons-github"
                color="neutral"
                variant="soft"
                size="lg"
                square
                aria-label="GitHub"
              />
              <UButton
                :to="appConfig.app.author.social.youtube"
                target="_blank"
                icon="i-simple-icons-youtube"
                color="neutral"
                variant="soft"
                size="lg"
                square
                aria-label="YouTube"
              />
              <UButton
                :to="appConfig.app.author.social.linkedin"
                target="_blank"
                icon="i-simple-icons-linkedin"
                color="neutral"
                variant="soft"
                size="lg"
                square
                aria-label="LinkedIn"
              />
              <UButton
                :to="appConfig.app.author.social.x"
                target="_blank"
                icon="i-simple-icons-x"
                color="neutral"
                variant="soft"
                size="lg"
                square
                aria-label="X (Twitter)"
              />
            </div>
          </UCard>
          <UCard class="md:col-span-6 xl:col-span-4">
            <template #header>
              <h4 class="text-lg font-medium">
                What I'm Shipping
              </h4>
            </template>
            <div class="space-y-6">
              <UPageFeature
                title="LaunchDayOne"
                description="Production ready Nuxt boilerplate"
                to="https://launchdayone.com"
                target="_blank"
              >
                <template #leading>
                  <UColorModeImage
                    light="https://launchdayone.netlify.app/logo.png"
                    dark="https://launchdayone.netlify.app/logo-light.png"
                    class="size-6 shrink-0 grow-0"
                  />
                </template>
              </UPageFeature>
              <UPageFeature
                title="WrapWithAI (Coming Soon)"
                description="RAG, Agents, Workflows & More"
                icon="i-lucide-bot"
                :ui="{ leadingIcon: 'text-(--ui-text-heading)' }"
              />
            </div>
          </UCard>
        </div>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
