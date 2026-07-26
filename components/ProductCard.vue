<script setup lang="ts">
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'
import SpotlightCard from '~/components/ui/inspira/SpotlightCard.vue'

const props = withDefaults(defineProps<{
  productId?: string
  to?: string
  name: string
  description?: string
  category: string
  features?: string[] | string
  price: number | string
  originalPrice?: number
  duration?: string
  thumbnail?: string
  stockStatus?: 'active' | 'out' | 'limited' | 'in-stock'
  featured?: boolean
}>(), {
  productId: '',
  to: '',
  description: '',
  features: () => [],
  duration: '',
  thumbnail: '',
  stockStatus: 'active',
  featured: false,
})

const detailUrl = computed(() => props.to || (props.productId ? `/product/${props.productId}` : '#'))
const status = computed(() => props.stockStatus === 'in-stock' ? 'active' : props.stockStatus)
const formattedPrice = computed(() => {
  if (typeof props.price === 'number') return `₹${props.price.toLocaleString('en-IN')}`
  return String(props.price)
    .replace('Ã¢â€šÂ¹', '₹')
    .replace('â‚¹', '₹')
})
const featureList = computed(() => {
  if (Array.isArray(props.features)) return props.features.slice(0, 3)
  return props.features ? String(props.features).split(',').map(item => item.trim()).slice(0, 3) : []
})
</script>

<template>
  <SpotlightCard
    class-name="catalog-spotlight"
    spotlight-color="rgba(255, 45, 45, 0.13)"
    border-color="rgba(255, 70, 65, 0.44)"
  >
    <article
      class="product-card"
      :class="[
        `product-card--${status}`,
        { 'product-card--featured': featured },
      ]"
    >
      <BorderBeam
        v-if="featured"
        :duration="14"
        :size="180"
        color-from="#ff2d2d"
        color-to="#f6f1e8"
      />

      <NuxtLink :to="detailUrl" class="card-media" :aria-label="`View ${name}`">
        <img v-if="thumbnail" :src="thumbnail" :alt="name" loading="lazy" />
        <div v-else class="card-placeholder" aria-hidden="true">
          <span>{{ name.slice(0, 2).toUpperCase() }}</span>
        </div>

        <span class="card-shade" aria-hidden="true" />

        <div class="card-topline">
          <span class="card-status">
            <i aria-hidden="true" />
            {{ status === 'active' ? 'Available' : status === 'limited' ? 'Limited' : 'Sold out' }}
          </span>
          <span class="card-code">AG / {{ category }}</span>
        </div>

        <span v-if="originalPrice && typeof price === 'number' && originalPrice > price" class="card-discount">
          −{{ Math.round(((originalPrice - price) / originalPrice) * 100) }}%
        </span>

        <span class="card-view">View details ↗</span>
      </NuxtLink>

      <div class="card-body">
        <div class="card-heading">
          <span>{{ category }} collection</span>
          <small v-if="featured">Featured</small>
        </div>

        <h3>{{ name }}</h3>
        <p v-if="description">{{ description }}</p>

        <ul v-if="featureList.length" class="card-features">
          <li v-for="(feature, index) in featureList" :key="feature">
            <small>{{ String(index + 1).padStart(2, '0') }}</small>
            <span>{{ feature }}</span>
          </li>
        </ul>

        <div class="card-footer">
          <div class="price">
            <small>From</small>
            <strong>{{ formattedPrice }}</strong>
            <span v-if="duration">{{ duration }}</span>
          </div>
          <NuxtLink :to="detailUrl" :aria-label="`View details for ${name}`">
            <span>Explore</span>
            <i aria-hidden="true">↗</i>
          </NuxtLink>
        </div>
      </div>
    </article>
  </SpotlightCard>
</template>

<style scoped>
:deep(.catalog-spotlight) {
  height: 100%;
  overflow: hidden;
  border-color: rgba(246, 241, 232, 0.1);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.035), transparent 34%),
    #0e0e11;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
}

.product-card {
  position: relative;
  display: flex;
  height: 100%;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border-radius: 24px;
  isolation: isolate;
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-6px);
}

.card-media {
  position: relative;
  display: block;
  aspect-ratio: 1.2 / 1;
  overflow: hidden;
  color: var(--white);
  background: #070708;
  text-decoration: none;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) contrast(1.04);
  transition: filter 360ms ease, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.product-card:hover .card-media img {
  filter: saturate(1.06) contrast(1.05);
  transform: scale(1.04);
}

.card-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(7, 7, 8, 0.78), transparent 48%),
    linear-gradient(145deg, rgba(7, 7, 8, 0.16), transparent 40%);
  pointer-events: none;
}

.card-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background:
    radial-gradient(circle, rgba(255, 45, 45, 0.2), transparent 42%),
    linear-gradient(rgba(246, 241, 232, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(246, 241, 232, 0.035) 1px, transparent 1px),
    #0b0b0d;
  background-size: auto, 34px 34px, 34px 34px, auto;
}

.card-placeholder span {
  color: var(--red);
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 900;
}

.card-topline {
  position: absolute;
  z-index: 2;
  top: 0.85rem;
  right: 0.85rem;
  left: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.card-status,
.card-code,
.card-discount,
.card-view {
  font-family: var(--font-mono);
  font-size: 0.46rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.card-status {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.38rem 0.54rem;
  border: 1px solid rgba(246, 241, 232, 0.14);
  border-radius: 999px;
  color: rgba(246, 241, 232, 0.78);
  background: rgba(7, 7, 8, 0.6);
  backdrop-filter: blur(12px);
}

.card-status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px rgba(84, 230, 139, 0.68);
}

.product-card--limited .card-status {
  color: #f5cf68;
}

.product-card--limited .card-status i {
  background: #f5cf68;
}

.product-card--out {
  opacity: 0.65;
}

.product-card--out .card-status i {
  background: var(--gray);
  box-shadow: none;
}

.card-code {
  color: rgba(246, 241, 232, 0.5);
}

.card-discount {
  position: absolute;
  z-index: 2;
  top: 3.6rem;
  right: 0.85rem;
  padding: 0.38rem 0.55rem;
  border-radius: 999px;
  color: #fff;
  background: var(--red);
}

.card-view {
  position: absolute;
  z-index: 2;
  right: 0.9rem;
  bottom: 0.85rem;
  padding: 0.4rem 0.58rem;
  border: 1px solid rgba(246, 241, 232, 0.14);
  border-radius: 999px;
  color: rgba(246, 241, 232, 0.76);
  background: rgba(7, 7, 8, 0.56);
  opacity: 0;
  backdrop-filter: blur(12px);
  transform: translateY(5px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.product-card:hover .card-view {
  opacity: 1;
  transform: translateY(0);
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.35rem;
}

.card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.49rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.card-heading small {
  color: var(--gray);
  font: inherit;
}

.card-body h3 {
  margin: 0.72rem 0 0;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.card-body > p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0.85rem 0 0;
  color: var(--gray-lt);
  font-size: 0.74rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-features {
  display: grid;
  margin: 1.15rem 0 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.card-features li {
  display: grid;
  grid-template-columns: 1.6rem 1fr;
  align-items: center;
  gap: 0.5rem;
  min-height: 38px;
  border-bottom: 1px solid var(--line);
  color: rgba(246, 241, 232, 0.62);
  font-size: 0.58rem;
}

.card-features small {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.42rem;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.3rem;
}

.price {
  display: grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  gap: 0 0.45rem;
}

.price small {
  grid-column: 1 / -1;
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.43rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.price strong {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.price span {
  color: var(--gray);
  font-size: 0.54rem;
}

.card-footer > a {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border: 1px solid rgba(246, 241, 232, 0.13);
  border-radius: 999px;
  color: var(--white);
  font-size: 0.53rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.card-footer > a i {
  color: var(--red-bright);
  font-size: 0.8rem;
  font-style: normal;
}

.product-card:hover .card-footer > a {
  border-color: var(--red);
  background: rgba(255, 45, 45, 0.08);
}

@media (pointer: coarse) {
  .product-card:hover {
    transform: none;
  }

  .card-view {
    opacity: 1;
    transform: none;
  }
}
</style>
