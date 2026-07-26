<script setup lang="ts">
import type { DetailProduct } from '~/components/ProductDetailView.vue'

definePageMeta({ layout: 'default' })

const route = useRoute()
const client = useSupabaseClient()
const productId = computed(() => String(route.params.id))

const { data: databaseProduct, error } = await useAsyncData(
  `product-${productId.value}`,
  async () => {
    const { data, error: queryError } = await client
      .from('products')
      .select('*')
      .eq('id', productId.value)
      .eq('is_published', true)
      .single()

    if (queryError) throw queryError
    return data
  },
  { watch: [productId] }
)

if (error.value || !databaseProduct.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const product = computed<DetailProduct>(() => {
  const source: any = databaseProduct.value
  const sourceDurations = Array.isArray(source.durations) && source.durations.length
    ? source.durations
    : [{ label: source.duration || 'Standard', price: source.price }]
  const sourceImages = [
    source.thumbnail_url,
    ...(Array.isArray(source.images) ? source.images : []),
  ].filter(Boolean)

  return {
    id: String(source.id),
    name: String(source.name),
    category: String(source.sub_category || source.category || 'Product'),
    tagline: String(source.description || ''),
    badge: String(source.badge || (source.is_featured ? 'Featured' : 'Available')),
    youtubeUrl: source.youtube_url ? String(source.youtube_url) : undefined,
    images: sourceImages.length ? sourceImages : ['/products/uploads/1779623174189_content.png'],
    durations: sourceDurations.map((duration: any) => ({
      label: String(duration.label || source.duration || 'Standard'),
      price: Number(duration.price ?? source.price ?? 0),
      stock: Number(duration.stock ?? 0),
    })),
    features: Array.isArray(source.features) ? source.features : [],
    support: Array.isArray(source.support) ? source.support : [],
  }
})

useHead(() => ({
  title: `${product.value.name} — Aslil Gang`,
  meta: [{
    name: 'description',
    content: product.value.tagline || 'Review product details and compatibility.',
  }],
}))
</script>

<template>
  <ProductDetailView :product="product" />
</template>
