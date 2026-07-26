<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'PC Panels — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Compare the Aslil Gang PC panel collection for Windows setups.',
  }],
})

const client = useSupabaseClient()
const { getProductsByCategory } = useProducts()

const { data: databaseProducts, pending } = await useAsyncData(
  'pc-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF Cheats')
      .in('sub_category', ['PC Panel', 'PC', 'PC Panels'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const products = computed<CollectionProduct[]>(() => {
  const staticProducts = getProductsByCategory('PC').map(product => ({
    id: product.slug,
    to: `/products/${product.slug}`,
    name: product.name,
    description: product.tagline,
    category: 'PC',
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
    category: String(product.sub_category || 'PC'),
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || '/products/PC_EXTERNAL PANEL/External.png'),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))

  return [...staticProducts, ...dynamicProducts]
})
</script>

<template>
  <StoreCollection
    eyebrow="Desktop collection / Windows"
    title="PC Panels"
    subtitle="The widest collection in the store—from external panels to streamer-oriented setups for supported Windows systems."
    code="AG—DESKTOP"
    :products="products"
    :pending="pending"
  />
</template>
