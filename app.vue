<script setup lang="ts">
const requestUrl = useRequestURL()
const socialImage = `${requestUrl.origin}/og.png`

useSeoMeta({
  ogTitle: 'Aslil Gang Panel — Premium Free Fire Store',
  ogDescription: 'Premium Free Fire panels, player IDs and reseller access with direct WhatsApp support.',
  ogImage: socialImage,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Aslil Gang Panel — Premium Free Fire Store',
  twitterDescription: 'Play sharp. Stay ahead.',
  twitterImage: socialImage,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
