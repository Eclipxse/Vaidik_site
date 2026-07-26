<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Panel Catalog — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Browse the complete PC, Android and iOS panel catalog.',
  }],
})

const { allProducts } = useProducts()

const products: CollectionProduct[] = allProducts.map(product => ({
  id: product.slug,
  to: `/products/${product.slug}`,
  name: product.name,
  description: product.tagline,
  category: product.category,
  features: product.features,
  price: product.durations[0]?.price || 'Contact',
  duration: product.durations[0]?.label,
  thumbnail: product.images[0],
  stockStatus: 'active',
}))
</script>

<template>
  <StoreCollection
    eyebrow="Complete range / All platforms"
    title="Panel Catalog"
    subtitle="Browse the full collection across PC, Android and iOS, then confirm the current fit for your device."
    code="AG—ALL"
    :products="products"
  />
</template>
