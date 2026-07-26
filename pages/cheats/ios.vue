<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'iOS Panels — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Browse iPhone and iPad panel options with direct compatibility guidance.',
  }],
})

const client = useSupabaseClient()
const { getProductsByCategory } = useProducts()

const { data: databaseProducts, pending } = await useAsyncData(
  'ios-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF Cheats')
      .in('sub_category', ['iOS Panel', 'iOS', 'IOS Panel', 'IOS'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const products = computed<CollectionProduct[]>(() => {
  const staticProducts = getProductsByCategory('iOS').map(product => ({
    id: product.slug,
    to: `/products/${product.slug}`,
    name: product.name,
    description: product.tagline,
    category: 'iOS',
    features: product.features,
    price: product.durations[0]?.price || 'Contact',
    duration: product.durations[0]?.label,
    thumbnail: product.images[0],
    stockStatus: 'active' as const,
  }))

  const dynamicProducts = (databaseProducts.value ?? []).map((product: any) => ({
    id: String(product.id),
    to: `/product/${product.id}`,
    name: String(product.name),
    description: String(product.description || ''),
    category: String(product.sub_category || 'iOS'),
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || '/products/IOS_PANEL/IOSPANEL.png'),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))

  return [...staticProducts, ...dynamicProducts]
})
</script>

<template>
  <StoreCollection
    eyebrow="Apple collection / iPhone + iPad"
    title="iOS Panels"
    subtitle="A considered selection for iPhone and iPad. Check the current version requirements with support before you order."
    code="AG—IOS"
    :products="products"
    :pending="pending"
  />
</template>
