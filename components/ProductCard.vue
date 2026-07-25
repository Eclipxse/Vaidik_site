<template>
  <article class="product-card" :class="`product-card--${stockStatus}`">
    <NuxtLink :to="`/product/${productId}`" class="card-thumb" :aria-label="`View ${name}`">
      <img v-if="thumbnail" :src="thumbnail" :alt="name" loading="lazy" />
      <div v-else class="thumb-placeholder" aria-hidden="true">
        <span>{{ name.slice(0, 2).toUpperCase() }}</span>
      </div>
      <div class="thumb-shade" aria-hidden="true" />
      <span class="stock-badge" :class="`stock-badge--${stockStatus}`">
        {{ stockStatus === 'active' ? 'Available' : stockStatus === 'limited' ? 'Limited' : 'Sold out' }}
      </span>
      <span v-if="originalPrice && originalPrice > price" class="discount-badge">
        Save {{ Math.round(((originalPrice - price) / originalPrice) * 100) }}%
      </span>
    </NuxtLink>

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
          {{ stockStatus === 'out' ? 'Sold out' : 'View details' }}
          <span v-if="stockStatus !== 'out'" aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  productId: string
  name: string
  description?: string
  category: string
  features?: string[]
  price: number
  originalPrice?: number
  duration?: string
  thumbnail?: string
  stockStatus: 'active' | 'out' | 'limited'
}>(), {
  stockStatus: 'active',
})
</script>

<style scoped>
.product-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  color: inherit;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 52, 65, 0.34);
  box-shadow: 0 28px 78px rgba(0, 0, 0, 0.34);
}

.card-thumb {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  color: #fff;
  background: #101011;
  text-decoration: none;
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88);
  transition: transform 600ms cubic-bezier(0.2, 0.75, 0.2, 1), filter 300ms ease;
}

.product-card:hover .card-thumb img {
  filter: saturate(1);
  transform: scale(1.035);
}

.thumb-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(5, 5, 6, 0.42), transparent 44%);
  pointer-events: none;
}

.thumb-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background:
    radial-gradient(circle at 50% 45%, rgba(255, 52, 65, 0.2), transparent 34%),
    linear-gradient(145deg, #19191b, #080809);
}

.thumb-placeholder::before,
.thumb-placeholder::after {
  position: absolute;
  border: 1px solid rgba(255, 52, 65, 0.2);
  border-radius: 50%;
  content: '';
}

.thumb-placeholder::before {
  width: 44%;
  aspect-ratio: 1;
}

.thumb-placeholder::after {
  width: 65%;
  aspect-ratio: 1;
}

.thumb-placeholder span {
  position: relative;
  z-index: 1;
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.08em;
}

.stock-badge,
.discount-badge {
  position: absolute;
  top: 0.8rem;
  z-index: 2;
  padding: 0.36rem 0.58rem;
  border-radius: 7px;
  font-family: var(--font-display);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.stock-badge {
  left: 0.8rem;
}

.discount-badge {
  right: 0.8rem;
  color: #fff;
  background: var(--red);
}

.stock-badge--active {
  color: #8df0b1;
  border: 1px solid rgba(84, 231, 137, 0.28);
  background: rgba(8, 24, 14, 0.78);
}

.stock-badge--limited {
  color: #f1ce72;
  border: 1px solid rgba(241, 206, 114, 0.28);
  background: rgba(31, 24, 7, 0.78);
}

.stock-badge--out {
  color: #ff8b92;
  border: 1px solid rgba(255, 52, 65, 0.28);
  background: rgba(35, 7, 10, 0.8);
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1.25rem;
}

.card-cat {
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.card-name {
  margin: 0;
  color: #fff;
  font-size: 1.15rem;
  line-height: 1.15;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.card-desc {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--gray);
  font-size: 0.8rem;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid var(--line);
}

.price-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
}

.price {
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.price-old {
  color: var(--gray);
  font-size: 0.72rem;
  text-decoration: line-through;
}

.price-dur {
  color: var(--gray);
  font-size: 0.66rem;
}

.card-btn {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  gap: 0.45rem;
  padding: 0.62rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  background: rgba(255, 255, 255, 0.055);
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.card-btn:hover {
  border-color: rgba(255, 52, 65, 0.3);
  background: rgba(255, 52, 65, 0.11);
}

.product-card--out {
  opacity: 0.58;
}

.product-card--out .card-btn {
  color: var(--gray);
  pointer-events: none;
}

@media (max-width: 520px) {
  .product-card {
    border-radius: 17px;
  }

  .product-card:hover,
  .product-card:hover .card-thumb img {
    transform: none;
  }

  .card-thumb {
    aspect-ratio: 16 / 10;
  }

  .card-body {
    padding: 1rem;
  }

  .card-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .card-btn {
    justify-content: center;
  }
}
</style>
