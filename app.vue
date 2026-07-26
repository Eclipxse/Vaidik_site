<script setup lang="ts">
const requestUrl = useRequestURL()
const socialImage = `${requestUrl.origin}/og-v2.png`

useSeoMeta({
  ogTitle: 'Aslil Gang — Panels, Player IDs and Setup Support',
  ogDescription: 'Explore PC, Android and iOS products, player IDs and reseller access with direct WhatsApp support.',
  ogImage: socialImage,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Aslil Gang — Panels, Player IDs and Setup Support',
  twitterDescription: 'A focused storefront with direct setup guidance.',
  twitterImage: socialImage,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
