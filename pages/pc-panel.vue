<template>
  <div class="products-page">

    <!-- Hero -->
    <div class="page-hero">
      <span class="page-eyebrow">Free Fire — PC</span>
      <h1 class="page-title">
        PC <span class="text-red">Panels.</span>
      </h1>
      <p class="page-sub">
        Elite Free Fire cheats for PC — external, internal, silent aim, streamer proof &amp; more.
        All panels are tested, undetected &amp; ready for instant use.
      </p>
    </div>

    <!-- Filter tabs -->
    <div class="filters">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="filter-tab"
        :class="{ 'filter-tab--active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Grid -->
    <div class="grid-outer">
      <TransitionGroup name="card-list" tag="div" class="grid">
        <div
          v-for="product in filteredProducts"
          :key="product.slug"
          class="product-card"
          @click="openDetail(product)"
        >
          <!-- Image -->
          <div class="card-gallery">
            <!-- Cover image (index 0 = the named PNG) -->
            <img
              :src="product.images[0]"
              :alt="product.name"
              class="card-img"
              loading="lazy"
            />
            <!-- Badge -->
            <span class="card-badge">{{ product.badge }}</span>
            <!-- Image count pill -->
            <span v-if="product.images.length > 1" class="card-img-count">
              📸 {{ product.images.length }} shots
            </span>
            <!-- Red glow overlay on hover -->
            <div class="card-img-glow" aria-hidden="true" />
          </div>

          <!-- Body -->
          <div class="card-body">
            <!-- Category chip -->
            <span class="card-cat">{{ product.category }} Panel</span>
            <h2 class="card-name">{{ product.name }}</h2>
            <p class="card-desc">{{ product.tagline }}</p>

            <!-- Feature pills — top 4 only -->
            <ul class="card-feats">
              <li v-for="f in product.features.slice(0, 4)" :key="f">
                <span class="feat-dot" aria-hidden="true" />{{ f }}
              </li>
            </ul>

            <!-- Price + CTA -->
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price">{{ product.durations[0].price }}</span>
                <span v-if="product.durations[0].label" class="price-note">
                  / {{ product.durations[0].label }}
                </span>
              </div>
              <span class="btn-buy">
                View Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'PC Panel — ASLIL GANG PANEL',
  meta: [{ name: 'description', content: 'Premium undetected Free Fire PC panels — External, Aimkill, Silent Aim, Streamer, UID Bypass & more.' }],
})

const router = useRouter()
const client = useSupabaseClient()

// Fetch PC products from Supabase
const { data: dbProducts, pending } = await useAsyncData(
  'pc-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'FF Cheats')
      .in('sub_category', ['PC Panel', 'PC'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

// Fall back to static products if nothing in DB yet
const { getProductsByCategory } = useProducts()
const staticPcProducts = getProductsByCategory('PC')

const pcProducts = computed(() => {
  const staticMapped = staticPcProducts.map(p => ({ ...p, isDb: false }))
  if (dbProducts.value && dbProducts.value.length > 0) {
    const dbMapped = dbProducts.value.map((p: any) => ({
      id: String(p.id),
      slug: String(p.id),
      name: p.name,
      category: 'PC' as const,
      tagline: p.description || '',
      badge: p.stock_status === 'limited' ? 'Limited' : p.is_featured ? 'Featured' : 'PC Panel',
      images: [
        p.thumbnail_url || '/products/PC_EXTERNAL PANEL/External.png',
        ...(Array.isArray(p.images) ? p.images : []),
      ].filter(Boolean),
      durations: Array.isArray(p.durations) && p.durations.length > 0
        ? p.durations.map((duration: any) => ({
            label: duration.label || p.duration || '',
            days: Number(duration.days || 1),
            price: `₹${duration.price ?? p.price}`,
            stock: Number(duration.stock ?? (p.stock_status === 'active' ? 99 : 5)),
          }))
        : [{
            label: p.duration || '',
            days: 1,
            price: `₹${p.price}`,
            stock: p.stock_status === 'active' ? 99 : 5,
          }],
      features: Array.isArray(p.features) ? p.features : [],
      support: Array.isArray(p.support) ? p.support : [],
      isDb: true,
    }))
    return [...staticMapped, ...dbMapped]  // MERGE: static first, then DB
  }
  return staticMapped
})

const tabs = ['All', 'External', 'Aimkill', 'Silent', 'Streamer', 'Bypass', 'Internal']
const activeTab = ref('All')

const filteredProducts = computed(() => {
  if (activeTab.value === 'All') return pcProducts.value
  const map: Record<string, string[]> = {
    External: ['pc-external-panel'],
    Aimkill:  ['pc-aimkill'],
    Silent:   ['pc-silent-aim'],
    Streamer: ['pc-streamer-panel'],
    Bypass:   ['pc-uid-bypass'],
    Internal: ['pc-visible-aimbot-internal'],
  }
  // When using DB products, show all (no slug filtering)
  if (dbProducts.value && dbProducts.value.length > 0) return pcProducts.value
  return pcProducts.value.filter(p => (map[activeTab.value] ?? []).includes(p.slug))
})

function openDetail(product: any) {
  if (product.isDb) {
    router.push(`/product/${product.id}`)
  } else {
    router.push(`/products/${product.slug}`)
  }
}

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

/* ── Hero ── */
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

/* ── Filter Tabs ── */
.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 2rem 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.5);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-tab:hover {
  border-color: rgba(255,255,255,0.3);
  color: #fff;
}

.filter-tab--active {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
  box-shadow: 0 4px 16px rgba(230,30,38,0.35);
}

/* ── Grid ── */
.grid-outer {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 640px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }

/* ── Card ── */
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  cursor: pointer;
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}

.product-card:hover {
  border-color: rgba(230,30,38,0.5);
  transform: translateY(-8px);
  box-shadow:
    0 28px 70px rgba(0,0,0,0.7),
    0 0 0 1px rgba(230,30,38,0.15),
    0 0 60px rgba(230,30,38,0.1);
}

/* ── Gallery ── */
.card-gallery {
  position: relative;
  width: 100%;
  background: #080808;
  overflow: hidden;
  /* No fixed aspect-ratio — image sets its own height */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  max-height: 300px;
}

.card-img {
  width: 100%;
  height: 280px;
  object-fit: contain;
  display: block;
  transition: transform 0.5s ease, filter 0.5s ease;
  background: #080808;
}

.product-card:hover .card-img {
  transform: scale(1.04);
  filter: brightness(1.08);
}

/* Red glow sweep on hover */
.card-img-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 120%, rgba(230,30,38,0.18) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.product-card:hover .card-img-glow { opacity: 1; }

.card-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.28rem 0.8rem;
  border-radius: 9999px;
  background: rgba(230,30,38,0.92);
  backdrop-filter: blur(8px);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 2px 12px rgba(230,30,38,0.5);
}

.card-img-count {
  position: absolute;
  bottom: 0.6rem;
  right: 0.75rem;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* ── Body ── */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.4rem 1.5rem 1.5rem;
  flex: 1;
}

.card-cat {
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--red);
}

.card-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.83rem;
  color: var(--gray);
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Feature pills */
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
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  font-family: var(--font-body);
  font-size: 0.67rem;
  color: rgba(255,255,255,0.7);
  font-weight: 500;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.product-card:hover .card-feats li {
  background: rgba(230,30,38,0.07);
  border-color: rgba(230,30,38,0.2);
}

.feat-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  margin-top: auto;
}

.price-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.price {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.price-note {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--gray);
}

.btn-buy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 9999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.25s ease;
  box-shadow: 0 4px 18px rgba(230,30,38,0.35);
}

.product-card:hover .btn-buy {
  background: #ff2a35;
  gap: 0.7rem;
  box-shadow: 0 6px 28px rgba(230,30,38,0.55);
}

/* ── TransitionGroup animations ── */
.card-list-enter-active { transition: all 0.4s ease; }
.card-list-leave-active { transition: all 0.3s ease; }
.card-list-enter-from   { opacity: 0; transform: translateY(20px) scale(0.97); }
.card-list-leave-to     { opacity: 0; transform: scale(0.95); }
.card-list-move         { transition: transform 0.4s ease; }
</style>
