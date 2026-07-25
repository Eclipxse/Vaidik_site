<script setup lang="ts">
const props = withDefaults(defineProps<{
  productId?: string
  name: string
  description?: string
  category: string
  features?: string[] | string
  price: number | string
  originalPrice?: number
  duration?: string
  thumbnail?: string
  stockStatus?: 'active' | 'out' | 'limited' | 'in-stock'
}>(), {
  productId: '',
  description: '',
  features: () => [],
  duration: '',
  thumbnail: '',
  stockStatus: 'active',
})

const detailUrl = computed(() => props.productId ? `/product/${props.productId}` : '#')
const status = computed(() => props.stockStatus === 'in-stock' ? 'active' : props.stockStatus)
const formattedPrice = computed(() => {
  if (typeof props.price === 'number') return `₹${props.price.toLocaleString('en-IN')}`
  return String(props.price).replace('â‚¹', '₹')
})
</script>

<template>
  <article class="product-card" :class="`product-card--${status}`">
    <NuxtLink :to="detailUrl" class="card-media" :aria-label="`View ${name}`">
      <img v-if="thumbnail" :src="thumbnail" :alt="name" loading="lazy" />
      <div v-else class="card-placeholder" aria-hidden="true">
        <span>{{ name.slice(0, 2).toUpperCase() }}</span>
      </div>
      <span class="card-status">
        {{ status === 'active' ? 'Available' : status === 'limited' ? 'Limited' : 'Sold out' }}
      </span>
      <span v-if="originalPrice && typeof price === 'number' && originalPrice > price" class="card-discount">
        −{{ Math.round(((originalPrice - price) / originalPrice) * 100) }}%
      </span>
    </NuxtLink>

    <div class="card-body">
      <span class="card-category">{{ category }}</span>
      <h3>{{ name }}</h3>
      <p v-if="description">{{ description }}</p>

      <div class="card-footer">
        <div class="price">
          <strong>{{ formattedPrice }}</strong>
          <span v-if="duration">/ {{ duration }}</span>
        </div>
        <NuxtLink :to="detailUrl" :aria-label="`View details for ${name}`">
          ↗
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #111113;
  transition: border-color 200ms ease, transform 200ms ease;
}

.product-card:hover {
  border-color: var(--line-strong);
  transform: translateY(-4px);
}

.card-media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  color: var(--white);
  background: #09090a;
  text-decoration: none;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88);
  transition: filter 300ms ease, transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.product-card:hover .card-media img {
  filter: saturate(1);
  transform: scale(1.025);
}

.card-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background:
    linear-gradient(135deg, transparent 49.5%, rgba(245, 244, 239, 0.08) 50%, transparent 50.5%),
    #121214;
}

.card-placeholder span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 650;
  letter-spacing: -0.08em;
}

.card-status,
.card-discount {
  position: absolute;
  top: 0.75rem;
  z-index: 2;
  padding: 0.35rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.84);
  background: rgba(10, 10, 11, 0.78);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.card-status {
  left: 0.75rem;
}

.card-discount {
  right: 0.75rem;
  border-color: var(--red);
  color: #fff;
  background: var(--red);
}

.product-card--limited .card-status {
  color: #f4d476;
}

.product-card--out {
  opacity: 0.68;
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.2rem;
}

.card-category {
  color: var(--red-bright);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.card-body h3 {
  margin: 0.55rem 0 0;
  font-size: 1.25rem;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.card-body > p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0.7rem 0 0;
  color: var(--gray);
  font-size: 0.76rem;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.2rem;
}

.price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
}

.price strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: -0.045em;
}

.price span {
  color: var(--gray);
  font-size: 0.6rem;
}

.card-footer > a {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--white);
  text-decoration: none;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.product-card:hover .card-footer > a {
  border-color: var(--red);
  background: var(--red);
}

@media (pointer: coarse) {
  .product-card:hover {
    transform: none;
  }
}
</style>
