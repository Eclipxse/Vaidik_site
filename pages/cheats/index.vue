<template>
  <div class="products-page">

    <!-- Page Hero -->
    <div class="page-hero">
      <span class="page-eyebrow">Premium Collection</span>
      <h1 class="page-title">
        Our <span class="text-red">Products</span>
      </h1>
      <p class="page-sub">
        Handpicked, undetected panels for every platform. Instant delivery guaranteed.
      </p>
    </div>

    <!-- Filter Tabs -->
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

    <!-- Products Grid -->
    <div class="grid-wrapper">
      <TransitionGroup name="fade-grid" tag="div" class="grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
          @click="openProduct(product)"
        >
          <!-- Image gallery strip -->
          <div class="card-gallery">
            <img
              :src="product.images[activeImageIndex[product.id] ?? 0]"
              :alt="product.name"
              class="card-img"
              loading="lazy"
            />
            <!-- Dot nav -->
            <div class="card-dots" v-if="product.images.length > 1">
              <button
                v-for="(_, i) in product.images"
                :key="i"
                class="dot"
                :class="{ 'dot--active': (activeImageIndex[product.id] ?? 0) === i }"
                @click.stop="setImage(product.id, i)"
              />
            </div>
            <!-- Category badge -->
            <span class="card-badge">{{ product.category }}</span>
          </div>

          <!-- Info -->
          <div class="card-info">
            <h2 class="card-name">{{ product.name }}</h2>
            <p class="card-desc">{{ product.description }}</p>

            <!-- Features -->
            <ul class="card-features">
              <li v-for="f in product.features" :key="f">
                <span class="feat-dot">●</span> {{ f }}
              </li>
            </ul>

            <!-- Pricing row -->
            <div class="card-footer">
              <div class="price-block">
                <span class="price">{{ product.price }}</span>
                <span class="price-note">/ day onwards</span>
              </div>
              <button class="btn-buy" @click.stop="handleBuyNow(product.name, product.category)">
                Buy Now →
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

  </div>
</template>

<script setup lang="ts">
const { handleBuyNow } = useWhatsApp()

useHead({
  title: 'Products — ASLIL GANG PANEL',
  meta: [{ name: 'description', content: 'Browse all Aslil Gang Panel products — PC, Phone, Silent Aim, UID Bypass and more.' }],
})

// ── Product definitions from folder names ──────────────────────────────────
const allProducts = [
  {
    id: 'pc-external-panel',
    name: 'PC External Panel',
    category: 'PC',
    description: 'Trusted, secure & professional external cheat panel. Instant setup with easy access for Free Fire PC.',
    price: '₹99',
    features: ['Aimbot', 'ESP / Wallhack', 'Auto Headshot', 'No Recoil', 'Fast Run', 'Secure Login'],
    images: [
      '/products/PC_EXTERNAL PANEL/1.png',
      '/products/PC_EXTERNAL PANEL/2.webp',
      '/products/PC_EXTERNAL PANEL/3.webp',
      '/products/PC_EXTERNAL PANEL/4.webp',
      '/products/PC_EXTERNAL PANEL/5.webp',
      '/products/PC_EXTERNAL PANEL/6.webp',
      '/products/PC_EXTERNAL PANEL/7.webp',
    ],
  },
  {
    id: 'pc-panel-aimkill',
    name: 'PC Aimkill Panel',
    category: 'PC',
    description: 'Precision aimkill panel for PC — lock onto enemies and eliminate instantly with zero miss rate.',
    price: '₹149',
    features: ['Aimkill', 'Auto Lock', 'Headshot Lock', 'Rage Mode', 'Anti-Ban'],
    images: [
      '/products/PC_PANEL_AIMKILL/image.png',
      '/products/PC_PANEL_AIMKILL/image.webp',
      '/products/PC_PANEL_AIMKILL/image2.png',
      '/products/PC_PANEL_AIMKILL/image3.png',
      '/products/PC_PANEL_AIMKILL/image4.png',
    ],
  },
  {
    id: 'pc-silent-aim',
    name: 'PC Silent Aim',
    category: 'PC',
    description: 'The most undetected silent aim panel for PC. Shoot anywhere — bullets auto-adjust to hit the target.',
    price: '₹199',
    features: ['Silent Aimbot', 'Bullet Bend', 'No Recoil', 'Triggerbot', 'Invisible to spectators'],
    images: [
      '/products/PC_SILENT_AIM/1.webp',
      '/products/PC_SILENT_AIM/2.webp',
      '/products/PC_SILENT_AIM/3.webp',
      '/products/PC_SILENT_AIM/4.webp',
      '/products/PC_SILENT_AIM/5.webp',
    ],
  },
  {
    id: 'pc-streamer-panel',
    name: 'PC Streamer Panel',
    category: 'PC',
    description: 'Stream safely while using the panel. Fully OBS & screen-capture proof. Play fair on stream, dominate in private.',
    price: '₹249',
    features: ['Stream Proof', 'OBS Hide', 'Soft Aimbot', 'ESP', 'Radar Hack'],
    images: [
      '/products/PC_STREAMER_PANEL/2.webp',
      '/products/PC_STREAMER_PANEL/3.webp',
      '/products/PC_STREAMER_PANEL/4.webp',
      '/products/PC_STREAMER_PANEL/5.webp',
      '/products/PC_STREAMER_PANEL/6.webp',
      '/products/PC_STREAMER_PANEL/7.webp',
    ],
  },
  {
    id: 'pc-uid-bypass',
    name: 'PC UID Bypass',
    category: 'PC',
    description: 'Advanced UID spoofer and bypass system. Protect your account from permanent bans with full HWID reset.',
    price: '₹299',
    features: ['UID Spoof', 'HWID Reset', 'Anti-Perma-Ban', 'Device Bypass', 'Safe Mode'],
    images: [
      '/products/PC_UID_BYPASS/1.webp',
      '/products/PC_UID_BYPASS/2.webp',
      '/products/PC_UID_BYPASS/3.webp',
    ],
  },
  {
    id: 'pc-visible-aimbot-internal',
    name: 'PC Visible + Aimbot Internal',
    category: 'PC',
    description: 'Full internal panel combining visible hack, precision aimbot and more. The complete PC cheat suite.',
    price: '₹349',
    features: ['Internal Panel', 'Visible Hack', 'Aimbot', 'ESP + Wallhack', 'Speed Hack', 'Fast Loot', 'Anti-Ban'],
    images: [
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/1.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/2.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/3.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/4.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/5.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/6.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/7.webp',
      '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/8.webp',
    ],
  },
  {
    id: 'phone-panel',
    name: 'Phone Panel',
    category: 'Mobile',
    description: 'Premium Free Fire cheat panel for Android & iOS. Plug and play — works on any phone without root.',
    price: '₹99',
    features: ['Auto Headshot', 'ESP', 'Fly Hack', 'Speed Hack', 'No Root Required', 'iOS & Android'],
    images: [
      '/products/PHONE_PANEL/1.webp',
      '/products/PHONE_PANEL/2.webp',
      '/products/PHONE_PANEL/3.webp',
    ],
  },
]

const tabs = ['All', 'PC', 'Mobile']
const activeTab = ref('All')

const router = useRouter()
const client = useSupabaseClient()

// Fetch dynamic products from Supabase
const { data: dbAll } = await useAsyncData(
  'cheats-all-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .in('category', ['FF Cheats', 'FF IDs', 'SSM Panel'])
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const allProductsFromDb = computed(() => {
  if (!dbAll.value || dbAll.value.length === 0) return []
  return dbAll.value.map((p: any) => ({
    id: p.id,
    dbId: p.id,
    name: p.name,
    category: p.category === 'FF Cheats' ? 'PC' : p.category === 'FF IDs' ? 'IDs' : 'SSM',
    description: p.description || '',
    price: `₹${p.price}`,
    features: Array.isArray(p.features) ? p.features.slice(0, 6) : [],
    images: [
      p.thumbnail_url || '/products/PC_EXTERNAL PANEL/1.png',
      ...(Array.isArray(p.images) ? p.images : []),
    ].filter(Boolean),
    isDb: true,
  }))
})

// ALWAYS merge static + DB. Static products always show.
const displayProducts = computed(() => [...allProducts, ...allProductsFromDb.value])

const filteredProducts = computed(() =>
  activeTab.value === 'All'
    ? displayProducts.value
    : displayProducts.value.filter(p => p.category === activeTab.value)
)

// Per-card active image index
const activeImageIndex = ref<Record<string, number>>({})

function setImage(id: string, index: number) {
  activeImageIndex.value[id] = index
}

function openProduct(product: typeof allProducts[0] & { isDb?: boolean; dbId?: string }) {
  if (product.isDb && product.dbId) {
    router.push(`/product/${product.dbId}`)
  } else {
    handleBuyNow(product.name, product.category)
  }
}

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap) return

  // Hero animation
  $gsap.fromTo(['.page-eyebrow', '.page-title', '.page-sub'],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
  )

  // Cards
  $gsap.utils.toArray('.product-card').forEach((el: any, i: number) => {
    $gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      }
    )
  })
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

/* ── Filters ── */
.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 2rem 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.55rem 1.4rem;
  border-radius: 9999px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.55);
  font-family: var(--font-body);
  font-size: 0.82rem;
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
.grid-wrapper {
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

/* ── Product Card ── */
.product-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}

.product-card:hover {
  border-color: rgba(230,30,38,0.4);
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,30,38,0.1);
}

/* ── Gallery ── */
.card-gallery {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #000;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .card-img {
  transform: scale(1.04);
}

.card-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(230,30,38,0.9);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

/* Dot nav for multi-image */
.card-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.dot {
  width: 6px;
  height: 6px;
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

/* ── Info ── */
.card-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.1;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Features list */
.card-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.card-features li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  font-family: var(--font-body);
  font-size: 0.68rem;
  color: rgba(255,255,255,0.65);
  font-weight: 500;
}

.feat-dot {
  font-size: 0.4rem;
  color: var(--red);
}

/* Footer row */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: auto;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

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
  padding: 0.5rem 1.25rem;
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
  white-space: nowrap;
}

.btn-buy:hover {
  background: #ff2a35;
  transform: translateX(2px);
  box-shadow: 0 6px 24px rgba(230,30,38,0.5);
}

/* ── TransitionGroup animations ── */
.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-grid-enter-from,
.fade-grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
