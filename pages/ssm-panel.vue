<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Social Media Services — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Browse currently listed social media service packages and request a custom quote.',
  }],
})

const client = useSupabaseClient()
const { ownerNumber } = useWhatsApp()
const orderLink = computed(() => `https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to ask about an SSM package.')}`)

const { data: databaseProducts, pending } = await useAsyncData(
  'ssm-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'SSM Panel')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const products = computed<CollectionProduct[]>(() => {
  const staticProducts: CollectionProduct[] = [
    {
      id: 'starter',
      to: orderLink.value,
      name: 'Starter Pack',
      description: 'A compact entry package for new creator accounts.',
      category: 'Social services',
      features: ['Entry-level package', 'Direct order support'],
      price: '₹199',
      stockStatus: 'active',
    },
    {
      id: 'pro',
      to: orderLink.value,
      name: 'Pro Pack',
      description: 'A broader package covering the major social platforms.',
      category: 'Social services',
      features: ['Multi-platform', 'Custom confirmation'],
      price: '₹499',
      stockStatus: 'active',
    },
    {
      id: 'elite',
      to: orderLink.value,
      name: 'Elite Pack',
      description: 'A higher-volume option for established creator accounts.',
      category: 'Social services',
      features: ['Higher-volume package', 'Priority conversation'],
      price: '₹999',
      stockStatus: 'limited',
    },
  ]

  const dynamicProducts = (databaseProducts.value ?? []).map((product: any) => ({
    id: String(product.id),
    to: `/product/${product.id}`,
    name: String(product.name),
    description: String(product.description || ''),
    category: 'Social services',
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || ''),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))

  return [...staticProducts, ...dynamicProducts]
})
</script>

<template>
  <StoreCollection
    eyebrow="Creator services / Social"
    title="Social Services"
    subtitle="Straightforward packages for creator accounts. Ask for the exact platform, quantity, delivery expectation and current price before ordering."
    code="AG—SOCIAL"
    :products="products"
    :pending="pending"
  />
</template>
