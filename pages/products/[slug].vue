<script setup lang="ts">
import type { DetailProduct } from '~/components/ProductDetailView.vue'

definePageMeta({ layout: 'default' })

const route = useRoute()
const { getProduct } = useProducts()
const sourceProduct = computed(() => getProduct(String(route.params.slug)))

if (!sourceProduct.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const product = computed<DetailProduct>(() => ({
  id: sourceProduct.value!.slug,
  name: sourceProduct.value!.name,
  category: sourceProduct.value!.category,
  tagline: sourceProduct.value!.tagline,
  badge: sourceProduct.value!.badge,
  images: sourceProduct.value!.images,
  durations: sourceProduct.value!.durations.map(duration => ({
    label: duration.label,
    price: duration.price,
    stock: duration.stock,
  })),
  features: sourceProduct.value!.features,
  support: sourceProduct.value!.support,
}))

useHead(() => ({
  title: `${sourceProduct.value?.name || 'Product'} — Aslil Gang`,
  meta: [{
    name: 'description',
    content: sourceProduct.value?.tagline || 'Review product details and compatibility.',
  }],
}))
</script>

<template>
  <ProductDetailView :product="product" />
</template>
