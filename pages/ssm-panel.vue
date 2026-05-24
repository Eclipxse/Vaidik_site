<template>
  <div class="info-page">

    <div class="page-hero">
      <span class="page-eyebrow">Social Media & Gaming</span>
      <h1 class="page-title">SSM <span class="text-red">Panel.</span></h1>
      <p class="page-sub">
        Boost your social media presence and gaming stats instantly. Real results, non-drop, fast delivery.
      </p>
    </div>

    <div class="cards-outer">
      <div class="cards-grid">
        <div v-for="plan in plans" :key="plan.id" class="info-card">
          <div class="card-top">
            <span class="card-icon">{{ plan.icon }}</span>
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
            <button :class="['btn-buy', { 'btn-buy-green': !plan.isDb }]" @click="handleAction(plan)">
              {{ plan.isDb ? 'View Details →' : 'Buy Now →' }}
            </button>
          </div>
        </div>
      </div>

      <div class="cta-box">
        <p class="cta-text">Need a custom package? Contact us on WhatsApp for bulk orders and special pricing.</p>
        <a :href="`https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to buy an SSM Panel package.')}`"
           target="_blank" rel="noopener noreferrer" class="btn-green">
          Contact on WhatsApp →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'SSM Panel — ASLIL GANG PANEL' })

const { handleBuyNow, ownerNumber } = useWhatsApp()
const client = useSupabaseClient()
const router = useRouter()

// Fetch SSM Panel products from Supabase
const { data: dbProducts } = await useAsyncData(
  'ssm-panel-products',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'SSM Panel')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

// Static fallback plans
const staticPlans = [
  {
    id: 'starter', isDb: false,
    icon: '⚡', badge: 'Starter', name: 'Starter Pack',
    desc: 'Perfect for new creators. Get your first boost and start growing fast.',
    price: '₹199',
    features: ['1000 Followers', 'Instant Start', 'Non-Drop', '24/7 Support'],
  },
  {
    id: 'pro', isDb: false,
    icon: '🚀', badge: 'Most Popular', name: 'Pro Pack',
    desc: 'Best value for growing creators — covers all major platforms.',
    price: '₹499',
    features: ['5000 Followers', 'Likes + Views Boost', 'All Platforms', 'Non-Drop', 'Fast Delivery'],
  },
  {
    id: 'elite', isDb: false,
    icon: '👑', badge: 'Elite', name: 'Elite Pack',
    desc: 'Maximum growth. For serious influencers who want to dominate.',
    price: '₹999',
    features: ['20,000 Followers', 'Full Engagement Boost', 'All Platforms', 'Priority Queue', 'Dedicated Support'],
  },
]

const plans = computed(() => {
  if (dbProducts.value && dbProducts.value.length > 0) {
    const dbMapped = dbProducts.value.map((p: any) => ({
      id: String(p.id),
      isDb: true,
      icon: '📊',
      badge: p.is_featured ? 'Most Popular' : 'Available',
      name: p.name,
      desc: p.description || '',
      price: `₹${p.price}`,
      features: Array.isArray(p.features) ? p.features : [],
    }))
    return [...staticPlans, ...dbMapped]  // MERGE: static always visible
  }
  return staticPlans
})

function handleAction(plan: any) {
  if (plan.isDb) {
    router.push(`/product/${plan.id}`)
  } else {
    handleBuyNow(plan.name, 'SSM Panel')
  }
}
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
  font-weight: 900; line-height: 1; letter-spacing: -0.02em;
  color: #fff; margin: 0 0 1.25rem;
}

.text-red {
  background: linear-gradient(135deg, #ff4040, #cc0000);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.page-sub { font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0; }

.cards-outer { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

.cards-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
@media (min-width: 640px)  { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .cards-grid { grid-template-columns: repeat(3, 1fr); } }

.info-card {
  display: flex; flex-direction: column; gap: 1rem; padding: 2rem;
  border-radius: 20px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
}
.info-card:hover {
  border-color: rgba(230,30,38,0.35); transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
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
.card-feats li { display: flex; align-items: center; gap: 0.4rem; font-family: var(--font-body); font-size: 0.82rem; color: rgba(255,255,255,0.65); }
.feat-dot { font-size: 0.4rem; color: var(--red); }

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto;
}
.card-price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; color: #fff; }
.btn-buy {
  padding: 0.5rem 1.25rem; border-radius: 9999px; background: var(--red); color: #fff;
  font-family: var(--font-body); font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; border: none; cursor: pointer;
  transition: all 0.25s ease; box-shadow: 0 4px 16px rgba(230,30,38,0.3);
}
.btn-buy:hover { background: #ff2a35; transform: translateX(2px); }
.btn-buy-green {
  background: #25D366 !important;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4) !important;
}
.btn-buy-green:hover {
  background: #20ba56 !important;
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.6) !important;
}


.cta-box {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  padding: 3rem 2rem; border-radius: 20px; text-align: center;
  background: rgba(230,30,38,0.05); border: 1px solid rgba(230,30,38,0.12);
}
.cta-text { font-family: var(--font-body); font-size: 1rem; color: var(--gray); line-height: 1.6; margin: 0; }
</style>
