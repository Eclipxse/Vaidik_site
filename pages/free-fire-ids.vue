<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Free Fire Player IDs — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Browse the currently listed Free Fire player ID inventory.',
  }],
})

const client = useSupabaseClient()

const { data: databaseProducts, pending } = await useAsyncData(
  'free-fire-ids-list',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF IDs')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const products = computed<CollectionProduct[]>(() =>
  (databaseProducts.value ?? []).map((product: any) => ({
    id: String(product.id),
    to: `/product/${product.id}`,
    name: String(product.name),
    description: String(product.description || ''),
    category: 'Player ID',
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || '/products/uploads/1779623174189_content.png'),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))
)
</script>

<template>
  <StoreCollection
    eyebrow="Live inventory / Player accounts"
    title="Player IDs"
    subtitle="A changing inventory of Free Fire accounts. Open a listing for its details, then confirm current ownership and availability directly."
    code="AG—INVENTORY"
    :products="products"
    :pending="pending"
  />
</template>
