<template>
  <div class="info-page">

    <!-- Hero -->
    <div class="page-hero">
      <span class="page-eyebrow">Premium Live Inventory</span>
      <h1 class="page-title">Free Fire <span class="text-red">IDs.</span></h1>
      <p class="page-sub">
        High-rank Free Fire accounts loaded with exclusive skins, diamond bundles, and rare items.
        Contact us on WhatsApp for current stock.
      </p>
    </div>

    <!-- Cards -->
    <div class="cards-outer">
      
      <div v-if="pending" class="loading-state">
        <div class="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="loading-text">Loading premium accounts...</p>
      </div>

      <div v-else-if="!plans?.length" class="empty-state">
        <div class="empty-card">
          <span class="empty-icon" aria-hidden="true">📭</span>
          <h3 class="empty-title">Nothing for today</h3>
          <p class="empty-desc">We are currently out of stock or updating our accounts catalog. Come back soon!</p>
        </div>
      </div>

      <div v-else class="cards-grid">
        <div v-for="plan in plans" :key="plan.id" class="info-card">
          <!-- Thumbnail Image (if dynamic product) -->
          <div v-if="plan.thumbnail" class="card-img-wrap">
            <img :src="plan.thumbnail" :alt="plan.name" class="card-img" />
          </div>
          
          <div class="card-top">
            <span class="card-icon" v-if="plan.thumbnail === null">{{ plan.icon }}</span>
            <span class="card-badge">{{ plan.badge }}</span>
          </div>
          <h2 class="card-name">{{ plan.name }}</h2>
          <p class="card-desc">{{ plan.desc }}</p>
          <ul class="card-feats">
            <li v-for="f in plan.features" :key="f">
              <span class="feat-dot">●</span> {{ f }}
            </li>
          </ul>
          <div class="card-footer">
            <span class="card-price">{{ plan.price }}</span>
            <button class="btn-buy" @click="handleAction(plan)">
              View details →
            </button>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-box">
        <p class="cta-text">Want to see all available IDs? Contact us directly on WhatsApp for the latest stock.</p>
        <a :href="`https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to buy a Free Fire ID.')}`"
           target="_blank" rel="noopener noreferrer" class="btn-red">
          WhatsApp for Stock →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'default' })
useHead({ title: 'Free Fire IDs — ASLIL GANG PANEL' })

const { handleBuyNow, ownerNumber } = useWhatsApp()
const client = useSupabaseClient()
const router = useRouter()

// Fetch dynamic Free Fire IDs from Supabase table
const { data: dbProducts, pending } = await useAsyncData(
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

const plans = computed(() => {
  if (dbProducts.value && dbProducts.value.length > 0) {
    return dbProducts.value.map(p => {
      // Map icons based on badge
      let icon = '💎'
      if (p.badge && p.badge.toLowerCase().includes('starter')) icon = '🥉'
      else if (p.badge && p.badge.toLowerCase().includes('popular')) icon = '🥇'
      else if (p.badge && p.badge.toLowerCase().includes('bronze')) icon = '🥉'
      else if (p.badge && p.badge.toLowerCase().includes('gold')) icon = '🥇'

      return {
        id: String(p.id),
        icon,
        badge: p.badge || 'Available',
        name: p.name,
        desc: p.description || '',
        price: `₹${p.price}`,
        features: Array.isArray(p.features) ? p.features : [],
        thumbnail: p.thumbnail_url || (Array.isArray(p.images) ? p.images[0] : null),
        isDb: true,
        productId: String(p.id)
      }
    })
  }
  return [] // No dummies! Return empty array.
})

function handleAction(plan: any) {
  router.push(`/product/${plan.productId}`)
}
</script>

<style scoped>
.info-page { min-height: 100vh; padding-top: 8rem; padding-bottom: 6rem; }

.page-hero {
  text-align: center;
  padding: 2rem 2rem 4rem;
  max-width: 650px;
  margin: 0 auto;
}

.page-eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--red); margin-bottom: 1rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900; line-height: 1;
  letter-spacing: -0.02em; color: #fff; margin: 0 0 1.25rem;
}

.text-red {
  background: linear-gradient(135deg, #ff4040, #cc0000);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.page-sub {
  font-family: var(--font-body);
  font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0;
}

.cards-outer { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

.cards-grid {
  display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem;
}
@media (min-width: 640px)  { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .cards-grid { grid-template-columns: repeat(3, 1fr); } }

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: var(--gray);
}
.loading-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-card {
  display: flex; flex-direction: column; gap: 1rem;
  padding: 2rem; border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  overflow: hidden;
}
.info-card:hover {
  border-color: rgba(230,30,38,0.35);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.card-img-wrap {
  width: calc(100% + 4rem);
  margin-top: -2rem;
  margin-left: -2rem;
  height: 160px;
  overflow: hidden;
  background: #000;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.info-card:hover .card-img {
  transform: scale(1.05);
}

.card-top { display: flex; align-items: center; justify-content: space-between; }
.card-icon { font-size: 2rem; }
.card-badge {
  padding: 0.2rem 0.65rem; border-radius: 9999px;
  background: rgba(230,30,38,0.12); border: 1px solid rgba(230,30,38,0.25);
  font-family: var(--font-body); font-size: 0.65rem; font-weight: 700;
  color: var(--red); text-transform: uppercase; letter-spacing: 0.08em;
}

.card-name {
  font-family: var(--font-display); font-size: 1.3rem; font-weight: 900;
  color: #fff; margin: 0; text-transform: uppercase;
}
.card-desc {
  font-family: var(--font-body); font-size: 0.85rem; color: var(--gray); line-height: 1.5; margin: 0;
}

.card-feats { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.card-feats li {
  display: flex; align-items: center; gap: 0.4rem;
  font-family: var(--font-body); font-size: 0.82rem; color: rgba(255,255,255,0.65);
}
.feat-dot { font-size: 0.4rem; color: var(--red); }

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto;
}
.card-price {
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; color: #fff;
}
.btn-buy {
  padding: 0.5rem 1.25rem; border-radius: 9999px; background: var(--red); color: #fff;
  font-family: var(--font-body); font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; border: none; cursor: pointer;
  transition: all 0.25s ease; box-shadow: 0 4px 16px rgba(230,30,38,0.3);
}
.btn-buy:hover { background: #ff2a35; transform: translateX(2px); }

.cta-box {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  padding: 3rem 2rem; border-radius: 20px; text-align: center;
  background: rgba(230,30,38,0.05); border: 1px solid rgba(230,30,38,0.12);
}
.cta-text {
  font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0;
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
.empty-card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
}
.empty-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(230,30,38,0.2));
}
.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.empty-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}
</style>
