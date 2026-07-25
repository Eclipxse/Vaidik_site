<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref<'all' | 'pc' | 'mobile' | 'ios'>('all')

const reviews = [
  {
    id: 1,
    author: 'Vikram "Viper" Singh',
    handle: '@viper_ff_yt',
    platform: 'pc',
    product: 'PC Streamer Panel',
    rating: 5,
    date: '2 days ago',
    comment: 'Been streaming for 3 months with Aslil Gang Streamer Panel. Zero detection, clean OBS screen share, fast fire works flawless!',
    verified: true,
  },
  {
    id: 2,
    author: 'Aman Sharma',
    handle: '@aman_esports',
    platform: 'pc',
    product: 'PC External Panel',
    rating: 5,
    date: '3 days ago',
    comment: 'The 5-type aimbot AI targeting is insane. Setup took under 3 minutes with WhatsApp guidance.',
    verified: true,
  },
  {
    id: 3,
    author: 'Rahul Verma',
    handle: '@rahul_gamer_99',
    platform: 'mobile',
    product: 'Phone Panel (Non-Root)',
    rating: 5,
    date: '1 week ago',
    comment: 'No root required, plays smooth on my iQOO 9 Pro. Drag headshots are crisp!',
    verified: true,
  },
  {
    id: 4,
    author: 'Karan Patel',
    handle: '@karan_ios',
    platform: 'ios',
    product: 'iOS Panel',
    rating: 5,
    date: '5 days ago',
    comment: 'Worked without jailbreak on my iPhone 14 Pro Max. Hologram ESP & Aimbot head are top tier.',
    verified: true,
  },
  {
    id: 5,
    author: 'Siddharth M.',
    handle: '@sid_reseller',
    platform: 'pc',
    product: 'Reseller Access',
    rating: 5,
    date: '4 days ago',
    comment: 'Selling Aslil Gang keys in my Telegram channel. 100% customer satisfaction and instant delivery support.',
    verified: true,
  },
  {
    id: 6,
    author: 'Rohan Gupta',
    handle: '@rohan_br',
    platform: 'pc',
    product: 'PC UID Bypass',
    rating: 5,
    date: '1 week ago',
    comment: 'Removed PC logo instantly! Played phone player tournaments smoothly without hacker lobbies.',
    verified: true,
  },
]

const filteredReviews = computed(() => {
  if (activeFilter.value === 'all') return reviews
  return reviews.filter((r) => r.platform === activeFilter.value)
})
</script>

<template>
  <section class="trust-wall" aria-labelledby="trust-title">
    <div class="section-shell">
      <div class="trust-head">
        <div>
          <span class="section-label">VERIFIED PROOF &amp; REVIEWS</span>
          <h2 id="trust-title">Trusted by Thousands of Gamers</h2>
        </div>
        <p>
          Real feedback from players, streamers, and resellers using Aslil Gang Panels across India.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="trust-filters">
        <button
          class="filter-pill"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          All Reviews
        </button>
        <button
          class="filter-pill"
          :class="{ active: activeFilter === 'pc' }"
          @click="activeFilter = 'pc'"
        >
          PC Panels
        </button>
        <button
          class="filter-pill"
          :class="{ active: activeFilter === 'mobile' }"
          @click="activeFilter = 'mobile'"
        >
          Android Mobile
        </button>
        <button
          class="filter-pill"
          :class="{ active: activeFilter === 'ios' }"
          @click="activeFilter = 'ios'"
        >
          iOS (iPhone/iPad)
        </button>
      </div>

      <!-- Reviews Grid -->
      <div class="reviews-grid">
        <article v-for="review in filteredReviews" :key="review.id" class="review-card">
          <div class="card-top">
            <div class="user-meta">
              <strong>{{ review.author }}</strong>
              <small>{{ review.handle }}</small>
            </div>
            <span v-if="review.verified" class="verified-tag">
              ✓ Verified Buyer
            </span>
          </div>

          <div class="stars">
            <span v-for="n in review.rating" :key="n">★</span>
          </div>

          <p class="comment">"{{ review.comment }}"</p>

          <div class="card-foot">
            <span class="prod-tag">{{ review.product }}</span>
            <small class="date">{{ review.date }}</small>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-wall {
  padding: clamp(5rem, 8vw, 8rem) 0;
  border-top: 1px solid var(--line);
  background: #09090b;
}

.trust-head {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 400px);
  align-items: end;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.trust-head h2 {
  margin: 0.8rem 0 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.trust-head p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.9rem;
  line-height: 1.7;
}

.trust-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
}

.filter-pill {
  padding: 0.5rem 1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--gray-lt);
  background: #111113;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 180ms ease;
}

.filter-pill:hover {
  border-color: var(--line-strong);
  color: var(--white);
}

.filter-pill.active {
  border-color: var(--red);
  color: #fff;
  background: var(--red);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.2rem;
}

.review-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #111114;
  transition: all 200ms ease;
}

.review-card:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
}

.user-meta strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1rem;
}

.user-meta small {
  color: var(--gray);
  font-size: 0.7rem;
}

.verified-tag {
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  color: #8ff0ae;
  background: rgba(143, 240, 174, 0.1);
  font-size: 0.54rem;
  font-weight: 700;
}

.stars {
  margin: 0.8rem 0;
  color: #f4d476;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

.comment {
  margin: 0 0 1.2rem;
  color: var(--paper);
  font-size: 0.82rem;
  line-height: 1.65;
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.8rem;
  border-top: 1px solid var(--line);
}

.prod-tag {
  color: var(--red-bright);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.date {
  color: var(--gray);
  font-size: 0.65rem;
}

@media (max-width: 800px) {
  .trust-head {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
