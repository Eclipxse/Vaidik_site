<script setup lang="ts">
import { ALL_PRODUCTS, type Product } from '~/composables/useProducts'

const emit = defineEmits(['close'])

const selectedSlugs = ref<string[]>([
  'pc-external-panel',
  'pc-streamer-panel',
  'phone-panel',
])

const comparisonProducts = computed(() => {
  return selectedSlugs.value
    .map((slug) => ALL_PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[]
})

function toggleProduct(slug: string) {
  if (selectedSlugs.value.includes(slug)) {
    if (selectedSlugs.value.length > 1) {
      selectedSlugs.value = selectedSlugs.value.filter((s) => s !== slug)
    }
  } else {
    if (selectedSlugs.value.length < 3) {
      selectedSlugs.value.push(slug)
    }
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="compare-modal">
      <div class="compare-header">
        <div>
          <span class="compare-badge">SIDE-BY-SIDE MATRIX</span>
          <h2>Product Comparison</h2>
        </div>
        <button class="compare-close" @click="emit('close')" aria-label="Close comparison modal">✕</button>
      </div>

      <!-- Selector pills -->
      <div class="selector-pills">
        <span class="selector-label">Select up to 3 products to compare:</span>
        <div class="pills-grid">
          <button
            v-for="p in ALL_PRODUCTS"
            :key="p.slug"
            class="pill-btn"
            :class="{ active: selectedSlugs.includes(p.slug) }"
            @click="toggleProduct(p.slug)"
          >
            {{ p.name }}
          </button>
        </div>
      </div>

      <!-- Matrix Table -->
      <div class="matrix-wrapper">
        <table class="matrix-table">
          <thead>
            <tr>
              <th class="col-feature">Feature / Spec</th>
              <th v-for="p in comparisonProducts" :key="p.slug" class="col-product">
                <div class="product-head-card">
                  <span class="prod-badge">{{ p.badge }}</span>
                  <h4>{{ p.name }}</h4>
                  <small>{{ p.category }} Platform</small>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-label">Starting Price</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value highlight">
                {{ p.durations[0]?.price }}
              </td>
            </tr>
            <tr>
              <td class="row-label">Anti-Ban Status</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value text-green">
                ✓ 100% Undetected
              </td>
            </tr>
            <tr>
              <td class="row-label">Streamer Mode (OBS Safe)</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value">
                <span v-if="p.slug === 'pc-streamer-panel' || p.slug === 'pc-external-panel' || p.slug === 'pc-visible-aimbot-internal'" class="text-green">
                  ✓ OBS Hidden
                </span>
                <span v-else class="text-gray">— Standard</span>
              </td>
            </tr>
            <tr>
              <td class="row-label">Setup Duration</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value">
                Under 5 Mins
              </td>
            </tr>
            <tr>
              <td class="row-label">OS Compatibility</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value">
                {{ p.support[0] }}
              </td>
            </tr>
            <tr>
              <td class="row-label">Key Features</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value features-cell">
                <ul>
                  <li v-for="f in p.features.slice(0, 5)" :key="f">• {{ f }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="row-label">Action</td>
              <td v-for="p in comparisonProducts" :key="p.slug" class="row-value action-cell">
                <NuxtLink
                  :to="`/products/${p.slug}`"
                  class="btn-red btn-sm"
                  @click="emit('close')"
                >
                  Order Now ↗
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare-modal {
  width: min(960px, calc(100vw - 2rem));
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  color: var(--white);
  background: #0e0e10;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.85);
}

.compare-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.compare-badge {
  color: var(--red);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.compare-header h2 {
  margin: 0.25rem 0 0;
  font-size: 1.8rem;
}

.compare-close {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--gray);
  background: transparent;
  cursor: pointer;
}

.compare-close:hover {
  color: var(--white);
  border-color: var(--red);
  background: var(--red);
}

.selector-pills {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #141417;
}

.selector-label {
  display: block;
  margin-bottom: 0.6rem;
  color: var(--gray-lt);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--gray-lt);
  background: #0d0d0f;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 180ms ease;
}

.pill-btn:hover {
  border-color: var(--line-strong);
  color: var(--white);
}

.pill-btn.active {
  border-color: var(--red);
  color: #fff;
  background: var(--red-deep);
}

.matrix-wrapper {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #121215;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.matrix-table th,
.matrix-table td {
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--line);
}

.col-feature {
  width: 220px;
  color: var(--gray);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
}

.col-product {
  min-width: 200px;
}

.product-head-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.prod-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #fff;
  background: var(--red);
  font-size: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

.product-head-card h4 {
  margin: 0.2rem 0 0;
  font-size: 1.1rem;
}

.product-head-card small {
  color: var(--gray);
  font-size: 0.6rem;
}

.row-label {
  color: var(--white);
  font-size: 0.82rem;
  font-weight: 600;
}

.row-value {
  color: var(--gray-lt);
  font-size: 0.8rem;
}

.row-value.highlight {
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
}

.text-green {
  color: #8ff0ae;
  font-weight: 600;
}

.text-gray {
  color: var(--gray);
}

.features-cell ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.features-cell li {
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.btn-sm {
  min-height: 38px;
  padding: 0.5rem 0.9rem;
  font-size: 0.68rem;
}

@media (max-width: 640px) {
  .compare-modal {
    padding: 1.25rem;
  }
}
</style>
