<template>
  <article class="product-card" :class="`product-card--${stockStatus}`">

    <!-- Thumbnail -->
    <div class="card-thumb">
      <img
        v-if="thumbnail"
        :src="thumbnail"
        :alt="name"
        loading="lazy"
      />
      <div v-else class="thumb-placeholder">
        <span>{{ name.slice(0, 2).toUpperCase() }}</span>
      </div>
      <!-- Stock badge -->
      <span class="stock-badge" :class="`stock-badge--${stockStatus}`">
        {{ stockStatus === 'active' ? 'Available' : stockStatus === 'limited' ? 'Limited' : 'Sold Out' }}
      </span>
      <!-- Discount badge -->
      <span v-if="originalPrice && originalPrice > price" class="discount-badge">
        -{{ Math.round(((originalPrice - price) / originalPrice) * 100) }}%
      </span>
    </div>

    <!-- Body -->
    <div class="card-body">
      <span class="card-cat">{{ category }}</span>
      <h3 class="card-name">{{ name }}</h3>
      <p v-if="description" class="card-desc">{{ description }}</p>

      <div class="card-footer">
        <div class="price-wrap">
          <span class="price">₹{{ price }}</span>
          <span v-if="originalPrice && originalPrice > price" class="price-old">₹{{ originalPrice }}</span>
          <span v-if="duration" class="price-dur">/ {{ duration }}</span>
        </div>
        <NuxtLink :to="`/product/${productId}`" class="card-btn">
          <span v-if="stockStatus === 'out'">Sold Out</span>
          <span v-else>View →</span>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  productId:      string
  name:           string
  description?:   string
  category:       string
  features?:      string[]
  price:          number
  originalPrice?: number
  duration?:      string
  thumbnail?:     string
  stockStatus:    'active' | 'out' | 'limited'
}>(), {
  stockStatus: 'active',
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  border-color: rgba(230, 30, 38, 0.35);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(230, 30, 38, 0.08);
}

/* ── Thumbnail ── */
.card-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .card-thumb img {
  transform: scale(1.06);
}

.thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(230,30,38,0.08), rgba(0,0,0,0.5));
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(230,30,38,0.4);
}

.stock-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stock-badge--active  { background: rgba(34,197,94,0.15);  color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
.stock-badge--limited { background: rgba(234,179,8,0.15);  color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
.stock-badge--out     { background: rgba(239,68,68,0.12);  color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }

.discount-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

/* ── Body ── */
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
  gap: 0.5rem;
}

.card-cat {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--red);
}

.card-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.2;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--gray);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.price-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.price {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 900;
  color: #fff;
}

.price-old {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--gray);
  text-decoration: line-through;
}

.price-dur {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--gray);
}

.card-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: background 0.25s ease, transform 0.25s ease;
  white-space: nowrap;
}

.card-btn:hover {
  background: var(--red-bright, #ff2a35);
  transform: translateX(2px);
}

/* Sold out */
.product-card--out {
  opacity: 0.55;
}

.product-card--out .card-btn {
  background: rgba(255,255,255,0.08);
  color: var(--gray);
  cursor: default;
  pointer-events: none;
}
</style>
