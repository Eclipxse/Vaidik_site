<script setup lang="ts">
import type { CollectionProduct } from '~/components/StoreCollection.vue'

definePageMeta({ layout: 'default' })

const route = useRoute()
const client = useSupabaseClient()
const slug = computed(() => String(route.params.category))

const categoryMap: Record<string, { title: string; subtitle: string; database: string }> = {
  pc: {
    title: 'PC Panels',
    subtitle: 'Panels currently listed for supported Windows systems.',
    database: 'PC Panel',
  },
  android: {
    title: 'Phone Panels',
    subtitle: 'Panels currently listed for supported Android devices.',
    database: 'Android Panel',
  },
  ios: {
    title: 'iOS Panels',
    subtitle: 'Panels currently listed for supported iPhone and iPad versions.',
    database: 'iOS Panel',
  },
}

const meta = computed(() => categoryMap[slug.value] || {
  title: 'Panel Collection',
  subtitle: 'Review the currently listed products in this collection.',
  database: slug.value,
})

const { data: databaseProducts, pending } = await useAsyncData(
  `catalog-category-${slug.value}`,
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('sub_category', meta.value.database)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  },
  { watch: [slug] }
)

const products = computed<CollectionProduct[]>(() =>
  (databaseProducts.value ?? []).map((product: any) => ({
    id: String(product.id),
    to: `/product/${product.id}`,
    name: String(product.name),
    description: String(product.description || ''),
    category: String(product.sub_category || product.category),
    features: Array.isArray(product.features) ? product.features : [],
    price: Number(product.price || 0),
    duration: String(product.duration || ''),
    thumbnail: String(product.thumbnail_url || product.images?.[0] || ''),
    stockStatus: (product.stock_status || 'active') as CollectionProduct['stockStatus'],
  }))
)

useHead(() => ({
  title: `${meta.value.title} — Aslil Gang`,
  meta: [{ name: 'description', content: meta.value.subtitle }],
}))
</script>

<template>
  <StoreCollection
    eyebrow="Dynamic collection / Live catalog"
    :title="meta.title"
    :subtitle="meta.subtitle"
    :code="`AG—${slug.toUpperCase()}`"
    :products="products"
    :pending="pending"
  />
</template>
