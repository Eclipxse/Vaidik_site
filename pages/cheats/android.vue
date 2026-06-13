<template>
  <div class="products-page">

    <!-- Hero -->
    <div class="page-hero">
      <span class="page-eyebrow">Free Fire — Mobile</span>
      <h1 class="page-title">
        Phone <span class="text-red">Panel.</span>
      </h1>
      <p class="page-sub">
        Premium Free Fire cheat panel for Android & iOS. No root required, plug and play.
        Works on any phone, instant activation after purchase.
      </p>
    </div>

    <!-- Products Grid -->
    <div class="grid-outer">
      <div class="grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="router.push(product.isDb ? `/product/${product.id}` : `/products/${product.slug}`)"
          style="cursor:pointer"
        >
          <!-- Image with dot nav -->
          <div class="card-gallery">
            <img
              :src="product.images[activeImg[product.slug] ?? 0]"
              :alt="product.name"
              class="card-img"
              loading="lazy"
            />
            <span class="card-badge">{{ product.badge }}</span>
            <div v-if="product.images.length > 1" class="card-dots">
              <button
                v-for="(_, i) in product.images"
                :key="i"
                class="dot"
                :class="{ 'dot--active': (activeImg[product.slug] ?? 0) === i }"
                @click.stop="activeImg[product.slug] = i"
              />
            </div>
          </div>

          <!-- Body -->
          <div class="card-body">
            <h2 class="card-name">{{ product.name }}</h2>
            <p class="card-desc">{{ product.tagline }}</p>

            <ul class="card-feats">
              <li v-for="f in product.features.slice(0, 5)" :key="f">
                <span class="feat-bullet">●</span> {{ f }}
              </li>
            </ul>

            <div class="card-footer">
              <div class="price-wrap">
                <span class="price">{{ product.durations[0].price }}</span>
                <span v-if="product.durations[0].label" class="price-note">
                  / {{ product.durations[0].label }}
                </span>
              </div>
              <span class="btn-buy">View Details →</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info box -->
      <div class="info-box">
        <div class="info-icon">📱</div>
        <div>
          <h3>Works on Any Phone</h3>
          <p>Android & iOS supported. No root, no jailbreak needed. Contact us on WhatsApp after purchase for instant setup.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'Phone Panel — ASLIL GANG PANEL',
  meta: [{ name: 'description', content: 'Premium Free Fire mobile panel for Android & iOS. No root required. Auto headshot, ESP, speed hack and more.' }],
})

const router = useRouter()
const client = useSupabaseClient()
const { getProductsByCategory } = useProducts()

// Fetch mobile products from Supabase
const { data: dbProducts } = await useAsyncData(
  'mobile-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF Cheats')
      .in('sub_category', ['iOS Panel', 'Android Panel', 'Mobile Panel', 'Mobile'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const staticProducts = getProductsByCategory('Mobile')

const products = computed(() => {
  const staticMapped = staticProducts.map(p => ({ ...p, isDb: false }))
  if (dbProducts.value && dbProducts.value.length > 0) {
    const dbMapped = dbProducts.value.map((p: any) => ({
      id: String(p.id),
      slug: String(p.id),
      name: p.name,
      category: 'Mobile' as const,
      tagline: p.description || '',
      badge: p.is_featured ? 'Featured' : 'Mobile Panel',
      images: [
        p.thumbnail_url || '/products/PHONE_PANEL/Phonepanel.png',
        ...(Array.isArray(p.images) ? p.images : []),
      ].filter(Boolean),
      durations: Array.isArray(p.durations) && p.durations.length > 0
        ? p.durations.map((duration: any) => ({
            label: duration.label || p.duration || '',
            days: Number(duration.days || 1),
            price: `₹${duration.price ?? p.price}`,
            stock: Number(duration.stock ?? 50),
          }))
        : [{ label: p.duration || '', days: 1, price: `₹${p.price}`, stock: 50 }],
      features: Array.isArray(p.features) ? p.features : [],
      support: Array.isArray(p.support) ? p.support : [],
      isDb: true,
    }))
    return [...staticMapped, ...dbMapped]  // MERGE: static first, DB appended
  }
  return staticMapped
})

const activeImg = ref<Record<string, number>>({})

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return
  $gsap.fromTo(['.page-eyebrow', '.page-title', '.page-sub'],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
  )
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  padding-top: 8rem;
  padding-bottom: 6rem;
}

.page-hero {
  text-align: center;
  padding: 2rem 2rem 4rem;
  max-width: 700px;
  margin: 0 auto;
}

.page-eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 1rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 1.25rem;
}

.text-red {
  background: linear-gradient(135deg, #ff4040, #cc0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-sub {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}

.grid-outer {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }

/* Card */
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}

.product-card:hover {
  border-color: rgba(230,30,38,0.4);
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,30,38,0.1);
}

.card-gallery {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #000;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .card-img { transform: scale(1.04); }

.card-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(230,30,38,0.9);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0;
}

.dot--active {
  background: var(--red);
  width: 18px;
  border-radius: 99px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  flex: 1;
}

.card-name {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.1;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.55;
  margin: 0;
}

.card-feats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.card-feats li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  font-family: var(--font-body);
  font-size: 0.67rem;
  color: rgba(255,255,255,0.65);
}

.feat-bullet {
  font-size: 0.4rem;
  color: var(--red);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: auto;
}

.price-wrap { display: flex; align-items: baseline; gap: 0.35rem; }

.price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
}

.price-note {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--gray);
}

.btn-buy {
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(230,30,38,0.3);
}

.btn-buy:hover {
  background: #ff2a35;
  transform: translateX(2px);
  box-shadow: 0 6px 24px rgba(230,30,38,0.5);
}

/* Info Box */
.info-box {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(230,30,38,0.06);
  border: 1px solid rgba(230,30,38,0.15);
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-box h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.info-box p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}
</style>
