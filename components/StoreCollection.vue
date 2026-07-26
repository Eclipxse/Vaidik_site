<script setup lang="ts">
export interface CollectionProduct {
  id: string
  to: string
  name: string
  description?: string
  category: string
  features?: string[]
  price: number | string
  duration?: string
  thumbnail?: string
  stockStatus?: 'active' | 'out' | 'limited' | 'in-stock'
}

const props = withDefaults(defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  code: string
  products: CollectionProduct[]
  pending?: boolean
}>(), {
  pending: false,
})

const { ownerNumber } = useWhatsApp()
const supportText = computed(() => encodeURIComponent(`Hi! I need help choosing from the ${props.title} collection.`))
</script>

<template>
  <div class="collection-page">
    <PageHeader :eyebrow="eyebrow" :title="title" :subtitle="subtitle" />

    <main class="collection-main">
      <div class="collection-rail">
        <span>{{ code }}</span>
        <p>{{ products.length }} {{ products.length === 1 ? 'option' : 'options' }} currently listed</p>
        <a
          :href="`https://wa.me/${ownerNumber}?text=${supportText}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Confirm compatibility
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div v-if="pending" class="collection-grid" aria-busy="true">
        <div v-for="index in 4" :key="index" class="catalog-skeleton">
          <span />
          <i />
          <i />
        </div>
      </div>

      <div v-else-if="products.length" class="collection-grid" role="list">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          role="listitem"
          :to="product.to"
          :name="product.name"
          :description="product.description"
          :category="product.category"
          :features="product.features"
          :price="product.price"
          :duration="product.duration"
          :thumbnail="product.thumbnail"
          :stock-status="product.stockStatus || 'active'"
          :featured="index === 0"
        />
      </div>

      <div v-else class="collection-empty">
        <span>{{ code }}</span>
        <h2>No products listed right now.</h2>
        <p>Message the team to check the latest availability for this collection.</p>
      </div>

      <aside class="service-ledger" aria-label="Ordering support">
        <div>
          <small>01 / Match</small>
          <strong>Choose by platform</strong>
          <p>Start with the device you actually use.</p>
        </div>
        <div>
          <small>02 / Verify</small>
          <strong>Confirm the fit</strong>
          <p>Share your model and operating system.</p>
        </div>
        <div>
          <small>03 / Setup</small>
          <strong>Follow guided steps</strong>
          <p>Receive instructions for the selected product.</p>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.collection-page {
  min-height: 100vh;
  background: var(--black);
}

.collection-main {
  width: min(var(--shell), calc(100% - 3rem));
  margin: 0 auto;
  padding: clamp(4rem, 7vw, 7rem) 0 clamp(6rem, 10vw, 10rem);
}

.collection-rail {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 0 0 1.1rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.52rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.collection-rail > span {
  color: var(--red-bright);
}

.collection-rail p {
  margin: 0;
}

.collection-rail a {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--white);
  text-decoration: none;
  transition: color 180ms ease;
}

.collection-rail a:hover {
  color: var(--red-bright);
}

.collection-rail a span {
  color: var(--red-bright);
  font-size: 0.9rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.15rem;
}

.collection-grid > :first-child {
  grid-column: span 2;
}

.collection-grid > :only-child {
  grid-column: 1 / -1;
  width: min(680px, 100%);
}

.catalog-skeleton {
  min-height: 500px;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #101012;
}

.catalog-skeleton span,
.catalog-skeleton i {
  display: block;
  background: rgba(245, 244, 239, 0.05);
  animation: skeleton 1.5s ease-in-out infinite alternate;
}

.catalog-skeleton span {
  height: 280px;
  border-radius: 9px;
}

.catalog-skeleton i {
  width: 70%;
  height: 12px;
  margin-top: 1rem;
}

.catalog-skeleton i:last-child {
  width: 46%;
}

.collection-empty {
  padding: clamp(3rem, 7vw, 6rem);
  border: 1px solid var(--line);
  background: #101012;
  text-align: center;
}

.collection-empty > span {
  color: var(--red-bright);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.collection-empty h2 {
  margin: 0.9rem 0 0;
  font-size: clamp(2rem, 4vw, 4rem);
  letter-spacing: -0.055em;
}

.collection-empty p {
  margin: 0.9rem 0 0;
  color: var(--gray-lt);
}

.service-ledger {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: clamp(4rem, 8vw, 7rem);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    linear-gradient(120deg, rgba(255, 45, 45, 0.035), transparent 45%),
    #0d0d10;
}

.service-ledger > div {
  min-height: 210px;
  padding: 1.5rem;
}

.service-ledger > div + div {
  border-left: 1px solid var(--line);
}

.service-ledger small {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.49rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.service-ledger strong {
  display: block;
  margin-top: 3rem;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.service-ledger p {
  margin: 0.55rem 0 0;
  color: var(--gray);
  font-size: 0.78rem;
  line-height: 1.6;
}

@keyframes skeleton {
  from { opacity: 0.55; }
  to { opacity: 1; }
}

@media (max-width: 980px) {
  .collection-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .collection-main {
    width: min(100% - 2rem, 1280px);
  }

  .collection-rail {
    grid-template-columns: 1fr auto;
  }

  .collection-rail p {
    display: none;
  }

  .collection-grid,
  .service-ledger {
    grid-template-columns: 1fr;
  }

  .collection-grid > :first-child,
  .collection-grid > :only-child {
    grid-column: 1;
    width: 100%;
  }

  .service-ledger > div {
    min-height: 150px;
  }

  .service-ledger > div + div {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .service-ledger strong {
    margin-top: 2rem;
  }
}
</style>
