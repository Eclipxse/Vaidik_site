<template>
  <div class="info-page">

    <div class="page-hero">
      <span class="page-eyebrow">Start Your Business</span>
      <h1 class="page-title">Reseller <span class="text-red">Plan.</span></h1>
      <p class="page-sub">
        Become an official Aslil Gang reseller. Get wholesale prices, priority stock access,
        and unlimited earning potential.
      </p>
    </div>

    <div class="cards-outer">

      <!-- Loading Skeleton -->
      <div v-if="pending" class="cards-grid">
        <div v-for="i in 3" :key="i" class="plan-skeleton" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="empty-state">
        <span class="empty-icon">⚠️</span>
        <p class="empty-text">Failed to load plans. Please refresh the page.</p>
      </div>

      <!-- Products from Supabase -->
      <div v-else-if="resellerPlans && resellerPlans.length > 0" class="cards-grid">
        <div
          v-for="plan in resellerPlans"
          :key="plan.id"
          class="product-card"
          @click="openDetail(plan)"
        >
          <!-- Image -->
          <div class="card-gallery">
            <img
              :src="plan.thumbnail_url || '/products/uploads/1779623174189_content.png'"
              :alt="plan.name"
              class="card-img"
              loading="lazy"
            />
            <span class="card-badge" v-if="plan.is_featured">Most Popular</span>
            <span class="card-badge" v-else>Reseller</span>
            <div class="card-img-glow" aria-hidden="true" />
          </div>

          <!-- Body -->
          <div class="card-body">
            <span class="card-cat">Reseller Plan</span>
            <h2 class="card-name">{{ plan.name }}</h2>
            <p class="card-desc">{{ plan.description }}</p>

            <!-- Feature pills — top 4 only -->
            <ul class="card-feats" v-if="plan.features && plan.features.length">
              <li v-for="f in plan.features.slice(0, 4)" :key="f">
                <span class="feat-dot" aria-hidden="true" />{{ f }}
              </li>
            </ul>

            <!-- Price + CTA -->
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price">₹{{ plan.price }}</span>
                <span class="price-note" v-if="plan.duration">/ {{ plan.duration }}</span>
              </div>
              <span class="btn-buy-details">
                View Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State: no plans added yet -->
      <div v-else class="empty-state">
        <span class="empty-icon">📦</span>
        <h2 class="empty-title">Plans Coming Soon</h2>
        <p class="empty-text">Our reseller plans are being set up. Contact us on WhatsApp to get the latest pricing and availability.</p>
      </div>

      <!-- How it works -->
      <div class="how-section">
        <h2 class="how-title">How It <span class="text-red">Works.</span></h2>
        <div class="steps">
          <div v-for="step in steps" :key="step.num" class="step">
            <span class="step-num">{{ step.num }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <div class="cta-box">
        <p class="cta-text">Ready to start? Message us on WhatsApp and we'll get you set up within minutes.</p>
        <a :href="`https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to become a reseller.')}`"
           target="_blank" rel="noopener noreferrer" class="btn-green">
          Become a Reseller →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'Reseller Plan — ASLIL GANG PANEL' })

const router = useRouter()
const { handleBuyNow, ownerNumber } = useWhatsApp()
const client = useSupabaseClient()

// Fetch reseller products from Supabase
const { data: resellerPlans, pending, error } = await useAsyncData(
  'reseller-plans',
  async () => {
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('category', 'Reseller')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as Array<{
      id: string
      name: string
      description: string | null
      price: number
      original_price: number | null
      duration: string | null
      thumbnail_url: string | null
      features: string[]
      stock_status: 'active' | 'limited' | 'out'
      is_featured: boolean
      is_published: boolean
      sort_order: number
    }>
  }
)

function openDetail(plan: any) {
  router.push(`/product/${plan.id}`)
}

const steps = [
  { num: '01', title: 'Choose a Plan', desc: 'Pick the reseller tier that matches your goals and budget.' },
  { num: '02', title: 'Contact on WhatsApp', desc: 'Message us and we\'ll set up your account within minutes.' },
  { num: '03', title: 'Start Selling', desc: 'List products at your own price and keep the difference as profit.' },
]
</script>

<style scoped>
.info-page { min-height: 100vh; padding-top: 8rem; padding-bottom: 6rem; }

.page-hero {
  text-align: center; padding: 2rem 2rem 4rem;
  max-width: 650px; margin: 0 auto;
}

.page-eyebrow {
  display: inline-block; font-family: var(--font-body);
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--red); margin-bottom: 1rem;
}

.page-title {
  font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900; line-height: 1; letter-spacing: -0.02em; color: #fff; margin: 0 0 1.25rem;
}

.text-red {
  background: linear-gradient(135deg, #ff4040, #cc0000);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.page-sub { font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0; }

.cards-outer { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

/* Cards Grid */
.cards-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 5rem; }
@media (min-width: 640px)  { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .cards-grid { grid-template-columns: repeat(3, 1fr); } }

/* Loading Skeleton */
.plan-skeleton {
  height: 380px;
  border-radius: 20px;
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  border: 1px solid rgba(255,255,255,0.06);
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty / Error State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 4rem 3rem;
  border-radius: 24px;
  background: rgba(255,255,255,0.02);
  border: 1px dashed rgba(255,255,255,0.1);
  max-width: 520px;
  width: 100%;
  text-align: center;
  margin: 0 auto 5rem;
}

.empty-icon { font-size: 3rem; }

.empty-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
}

.empty-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}

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
  text-align: left;
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

.btn-buy-details {
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
  cursor: pointer;
  border: none;
}

.product-card:hover .btn-buy-details {
  background: #ff2a35;
  gap: 0.7rem;
  box-shadow: 0 6px 28px rgba(230,30,38,0.55);
}

/* How it works */
.how-section { margin-bottom: 4rem; }
.how-title {
  font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900; color: #fff; margin: 0 0 3rem; text-align: center;
}

.steps { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 768px) { .steps { grid-template-columns: repeat(3, 1fr); } }

.step {
  padding: 2rem; border-radius: 16px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
}

.step-num {
  display: block; font-family: var(--font-display); font-size: 2.5rem;
  font-weight: 900; color: rgba(230,30,38,0.3); line-height: 1; margin-bottom: 1rem;
}

.step-title {
  font-family: var(--font-display); font-size: 1.1rem; font-weight: 900;
  color: #fff; margin: 0 0 0.5rem; text-transform: uppercase;
}

.step-desc { font-family: var(--font-body); font-size: 0.85rem; color: var(--gray); line-height: 1.5; margin: 0; }

.cta-box {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  padding: 3rem 2rem; border-radius: 20px; text-align: center;
  background: rgba(230,30,38,0.05); border: 1px solid rgba(230,30,38,0.12);
}
.cta-text { font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0; }
</style>
