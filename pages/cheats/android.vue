<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Phone Panels — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Browse Android phone panels and confirm device compatibility directly before ordering.',
  }],
})

const client = useSupabaseClient()
const { getProductsByCategory } = useProducts()

const { data: databaseProducts, pending } = await useAsyncData(
  'mobile-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF Cheats')
      .in('sub_category', ['Android Panel', 'Mobile Panel', 'Mobile'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const products = computed<CollectionProduct[]>(() => {
  const staticProducts = getProductsByCategory('Mobile').map(product => ({
    id: product.slug,
    to: `/products/${product.slug}`,
    name: product.name,
    description: product.tagline,
    category: 'Android',
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
    category: String(product.sub_category || 'Android'),
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || '/products/PHONE_PANEL/Phonepanel.png'),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))

  return [...staticProducts, ...dynamicProducts]
})
</script>

<template>
  <StoreCollection
    eyebrow="Mobile collection / Android"
    title="Phone Panels"
    subtitle="A focused selection for Android phones and tablets. Review the essentials, then confirm your exact device before ordering."
    code="AG—MOBILE"
    :products="products"
    :pending="pending"
  />
</template>
