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
          class="plan-card"
          :class="{ 'plan-card--featured': plan.is_featured }"
          @click="openDetail(plan)"
        >
          <div v-if="plan.is_featured" class="featured-label">Most Popular</div>

          <!-- Thumbnail if available -->
          <div v-if="plan.thumbnail_url" class="plan-thumb-wrap">
            <img :src="plan.thumbnail_url" :alt="plan.name" class="plan-thumb" loading="lazy" />
          </div>

          <h2 class="plan-name">{{ plan.name }}</h2>
          <p class="plan-desc">{{ plan.description }}</p>

          <div class="plan-price">
            <span class="price-main">₹{{ plan.price }}</span>
            <span class="price-period" v-if="plan.duration">/{{ plan.duration }}</span>
          </div>

          <ul v-if="plan.features && plan.features.length" class="plan-feats">
            <li v-for="f in plan.features" :key="f">
              <span class="check">✓</span> {{ f }}
            </li>
          </ul>

          <div class="plan-stock" :class="`stock--${plan.stock_status}`">
            <span class="stock-dot" />
            {{ plan.stock_status === 'active' ? 'Available' : plan.stock_status === 'limited' ? 'Limited Stock' : 'Out of Stock' }}
          </div>

          <!-- Side-by-side actions (View Details & Get Started) -->
          <div class="plan-actions">
            <NuxtLink
              :to="`/product/${plan.id}`"
              class="btn-details"
              @click.stop
            >
              View Details
            </NuxtLink>
            <button
              class="btn-buy"
              :disabled="plan.stock_status === 'out'"
              @click.stop="handleBuyNow(plan.name, 'Reseller')"
            >
              {{ plan.stock_status === 'out' ? 'Out of Stock' : 'Get Started →' }}
            </button>
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
           target="_blank" rel="noopener noreferrer" class="btn-red">
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

/* Plan card */
.plan-card {
  position: relative; display: flex; flex-direction: column; gap: 1.25rem;
  padding: 2.5rem 2rem; border-radius: 20px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
}
.plan-card:hover {
  border-color: rgba(230,30,38,0.35); transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.plan-card--featured {
  border-color: rgba(230,30,38,0.3);
  background: rgba(230,30,38,0.06);
  box-shadow: 0 0 0 1px rgba(230,30,38,0.1);
}

.featured-label {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  padding: 0.2rem 1rem; border-radius: 9999px;
  background: var(--red); color: #fff;
  font-family: var(--font-body); font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap;
}

.plan-thumb-wrap {
  width: 100%;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0,0,0,0.3);
}

.plan-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.plan-card:hover .plan-thumb { transform: scale(1.04); }

.plan-name {
  font-family: var(--font-display); font-size: 1.4rem; font-weight: 900;
  color: #fff; margin: 0; text-transform: uppercase;
}

.plan-desc { font-family: var(--font-body); font-size: 0.85rem; color: var(--gray); line-height: 1.5; margin: 0; }

.plan-price {
  display: flex; align-items: baseline; gap: 0.3rem;
  padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.06);
}
.price-main { font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: #fff; }
.price-period { font-family: var(--font-body); font-size: 0.8rem; color: var(--gray); }

.plan-feats { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.plan-feats li { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-body); font-size: 0.85rem; color: rgba(255,255,255,0.7); }
.check { color: var(--red); font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }

/* Stock badge */
.plan-stock {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  width: fit-content;
}

.stock-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stock--active  { background: rgba(34,197,94,0.08); color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
.stock--active .stock-dot  { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.8); }
.stock--limited { background: rgba(245,158,11,0.08); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
.stock--limited .stock-dot { background: #f59e0b; }
.stock--out     { background: rgba(239,68,68,0.08); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }
.stock--out .stock-dot     { background: #ef4444; }

/* Plan Actions layout */
.plan-actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: auto;
}

.btn-details {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.25s ease;
  text-align: center;
  box-sizing: border-box;
}

.btn-details:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-buy {
  flex: 1.25;
  padding: 0.85rem;
  border-radius: 9999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(230, 30, 38, 0.3);
  box-sizing: border-box;
}

.btn-buy:hover:not(:disabled) {
  background: #ff2a35;
  box-shadow: 0 6px 24px rgba(230, 30, 38, 0.5);
}

.btn-buy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
