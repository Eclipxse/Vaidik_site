<template>
  <div class="products-page">
    <div class="page-hero">
      <span class="page-eyebrow">Free Fire — iPhone &amp; iPad</span>
      <h1 class="page-title">iOS <span class="text-red">Panel.</span></h1>
      <p class="page-sub">
        Premium Free Fire panel for iPhone &amp; iPad. No jailbreak required, 10-minute setup, all servers safe.
      </p>
    </div>

    <div class="grid-outer">
      <div class="grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="router.push(product.isDb ? `/product/${product.id}` : `/products/${product.slug}`)"
        >
          <div class="card-gallery">
            <img :src="product.images[0]" :alt="product.name" class="card-img" loading="lazy" />
            <span class="card-badge">{{ product.badge }}</span>
          </div>
          <div class="card-body">
            <h2 class="card-name">{{ product.name }}</h2>
            <p class="card-desc">{{ product.tagline }}</p>
            <ul class="card-feats">
              <li v-for="f in product.features" :key="f">
                <span class="feat-bullet">●</span> {{ f }}
              </li>
            </ul>
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price">{{ product.durations[0].price }}</span>
                <span class="price-note">/ day</span>
              </div>
              <span class="btn-buy">View Details →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'iOS Panel — ASLIL GANG PANEL' })

const router = useRouter()
const client = useSupabaseClient()
const { getProductsByCategory } = useProducts()

// Fetch iOS products from Supabase
const { data: dbProducts } = await useAsyncData(
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

const staticProducts = getProductsByCategory('iOS')

// ALWAYS merge static + DB. Static products always visible.
const products = computed(() => {
  const staticMapped = staticProducts.map(p => ({ ...p, isDb: false }))
  if (dbProducts.value && dbProducts.value.length > 0) {
    const dbMapped = dbProducts.value.map((p: any) => ({
      id: String(p.id),
      slug: String(p.id),
      name: p.name,
      category: 'iOS' as const,
      tagline: p.description || '',
      badge: p.is_featured ? 'Featured' : 'No Jailbreak',
      images: [
        p.thumbnail_url || '/products/IOS_PANEL/IOSPANEL.png',
        ...(Array.isArray(p.images) ? p.images : []),
      ].filter(Boolean),
      durations: [{ label: p.duration || 'day', days: 1, price: `₹${p.price}`, stock: 40 }],
      features: Array.isArray(p.features) ? p.features : [],
      support: Array.isArray(p.support) ? p.support : [],
      isDb: true,
    }))
    return [...staticMapped, ...dbMapped]  // MERGE: static first, DB appended
  }
  return staticMapped
})
</script>

<style scoped>
.products-page { min-height: 100vh; padding-top: 8rem; padding-bottom: 6rem; }
.page-hero { text-align: center; padding: 2rem 2rem 4rem; max-width: 650px; margin: 0 auto; }
.page-eyebrow { display: inline-block; font-family: var(--font-body); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red); margin-bottom: 1rem; }
.page-title { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em; color: #fff; margin: 0 0 1.25rem; }
.text-red { background: linear-gradient(135deg, #ff4040, #cc0000); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.page-sub { font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0; }

.grid-outer { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
.grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }

.product-card { display: flex; flex-direction: column; border-radius: 20px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); cursor: pointer; transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease; }
.product-card:hover { border-color: rgba(230,30,38,0.4); transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
.card-gallery { position: relative; width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #000; }
.card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.product-card:hover .card-img { transform: scale(1.04); }
.card-badge { position: absolute; top: 0.75rem; left: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(230,30,38,0.9); color: #fff; font-family: var(--font-body); font-size: 0.63rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.card-body { display: flex; flex-direction: column; gap: 0.75rem; padding: 1.5rem; flex: 1; }
.card-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0; text-transform: uppercase; }
.card-desc { font-family: var(--font-body); font-size: 0.85rem; color: var(--gray); line-height: 1.55; margin: 0; }
.card-feats { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.card-feats li { display: flex; align-items: center; gap: 0.3rem; padding: 0.22rem 0.65rem; border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); font-family: var(--font-body); font-size: 0.67rem; color: rgba(255,255,255,0.65); }
.feat-bullet { font-size: 0.4rem; color: var(--red); }
.card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto; }
.price-wrap { display: flex; align-items: baseline; gap: 0.35rem; }
.price { font-family: var(--font-display); font-size: 1.6rem; font-weight: 900; color: #fff; }
.price-note { font-family: var(--font-body); font-size: 0.72rem; color: var(--gray); }
.btn-buy { padding: 0.55rem 1.25rem; border-radius: 9999px; background: var(--red); color: #fff; font-family: var(--font-body); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; }
</style>
