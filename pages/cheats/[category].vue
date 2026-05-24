<template>
  <div class="category-page">
    <div v-if="categoryMeta" class="category-header">
      <span class="section-label">{{ categoryMeta.label }}</span>
      <h2 class="category-title">
        <span class="category-icon" aria-hidden="true">{{ categoryMeta.icon }}</span>
        {{ categoryMeta.name }}
      </h2>
      <p class="category-desc">{{ categoryMeta.desc }}</p>
    </div>

    <div v-if="pending" class="products-grid" aria-busy="true">
      <div v-for="n in 4" :key="n" class="product-skeleton">
        <div class="skeleton-header" />
        <div class="skeleton-icon" />
        <div class="skeleton-body">
          <div class="skeleton-line skeleton-line--wide" />
          <div class="skeleton-line" />
        </div>
        <div class="skeleton-footer" />
      </div>
    </div>

    <div v-else-if="!products?.length" class="empty-state">
      <span class="empty-icon" aria-hidden="true">📭</span>
      <p>No products found in this category yet.</p>
    </div>

    <div v-else class="products-grid" role="list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        role="listitem"
        class="reveal"
        v-bind="mapProduct(product)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const client = useSupabaseClient()

const categorySlug = computed(() => route.params.category as string)

const categoryMap: Record<string, { label: string; name: string; icon: string; desc: string; dbValue: string }> = {
  ios: {
    label: 'Cheat Panel',
    name: 'iOS Panel',
    icon: '📱',
    desc: 'Undetected cheats for iPhone & iPad. Aimbot, ESP, wallhack & more.',
    dbValue: 'iOS Panel',
  },
  android: {
    label: 'Cheat Panel',
    name: 'Android Panel',
    icon: '🤖',
    desc: 'Lightweight APK compatible with all Android versions. Daily updates.',
    dbValue: 'Android Panel',
  },
  pc: {
    label: 'Cheat Panel',
    name: 'PC Panel',
    icon: '💻',
    desc: 'Full-featured panel for BlueStacks and PC emulators.',
    dbValue: 'PC Panel',
  },
}

const categoryMeta = computed(() => categoryMap[categorySlug.value] ?? null)

useHead({
  title: computed(() => `${categoryMeta.value?.name ?? 'Cheats'} — VaidikStore`),
})

const { data: products, pending } = await useAsyncData(
  `cheats-${categorySlug.value}`,
  async () => {
    if (!categoryMeta.value) return []
    const { data } = await client
      .from('products')
      .select('*')
      .eq('sub_category', categoryMeta.value.dbValue)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  },
  { watch: [categorySlug] }
)

function mapProduct(p: Record<string, unknown>) {
  return {
    productId: String(p.id),
    name: String(p.name),
    description: p.description ? String(p.description) : undefined,
    category: String(p.sub_category || p.category),
    features: Array.isArray(p.features) ? p.features as string[] : [],
    price: p.price as number,
    originalPrice: p.original_price as number | undefined,
    duration: p.duration ? String(p.duration) : undefined,
    thumbnail: p.thumbnail_url ? String(p.thumbnail_url) : undefined,
    stockStatus: (p.stock_status as 'active' | 'out' | 'limited') ?? 'active',
  }
}
</script>

<style scoped>
.category-page { padding: 2rem 0 4rem; }

.category-header {
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #e8f0f8;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-icon { font-size: 2rem; }

.category-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--steel-400);
  max-width: 500px;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (min-width: 640px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(4, 1fr); } }

/* Skeleton */
.product-skeleton {
  background: rgba(10, 21, 32, 0.97);
  border: 1px solid rgba(255, 0, 60, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}
@keyframes skeletonPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
.skeleton-header { height: 44px; background: rgba(255,255,255,0.03); }
.skeleton-icon { height: 100px; background: rgba(255,255,255,0.02); }
.skeleton-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.skeleton-footer { height: 60px; background: rgba(255,255,255,0.02); }
.skeleton-line { height: 10px; background: rgba(255,255,255,0.05); width: 60%; }
.skeleton-line--wide { width: 90%; }

/* Empty */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--steel-400);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.empty-icon { font-size: 3rem; }
</style>
