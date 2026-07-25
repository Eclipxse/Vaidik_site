<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWhatsApp } from '~/composables/useWhatsApp'

const keysCount = ref(50)
const retailPricePerKey = ref(999)

const wholesalePricePerKey = computed(() => {
  if (keysCount.value >= 200) return 350
  if (keysCount.value >= 100) return 400
  if (keysCount.value >= 50) return 450
  return 550
})

const totalCost = computed(() => keysCount.value * wholesalePricePerKey.value)
const totalRevenue = computed(() => keysCount.value * retailPricePerKey.value)
const netProfit = computed(() => totalRevenue.value - totalCost.value)
const profitMarginPercent = computed(() => {
  if (totalCost.value === 0) return 0
  return Math.round((netProfit.value / totalCost.value) * 100)
})

const { ownerNumber } = useWhatsApp()

const whatsappMessage = computed(() => {
  return encodeURIComponent(
    `Hi Aslil Gang Team! I want to join the Reseller Program.\n\nProjected Monthly Volume: ${keysCount.value} Keys\nEstimated Wholesale Tier: ₹${wholesalePricePerKey.value}/key\nExpected Monthly Profit: ₹${netProfit.value.toLocaleString('en-IN')}\n\nPlease share panel access rates and dashboard credits!`
  )
})

const whatsappUrl = computed(() => `https://wa.me/${ownerNumber}?text=${whatsappMessage.value}`)
</script>

<template>
  <div class="reseller-calculator" aria-label="Reseller earnings calculator">
    <div class="calc-header">
      <span class="calc-badge">PROFIT ESTIMATOR</span>
      <h3>Reseller Earnings Calculator</h3>
      <p>Estimate your monthly revenue and profit margins based on your volume.</p>
    </div>

    <!-- Sliders -->
    <div class="calc-controls">
      <div class="control-group">
        <div class="control-label">
          <span>Monthly Keys Sold</span>
          <strong>{{ keysCount }} Keys</strong>
        </div>
        <input
          v-model.number="keysCount"
          type="range"
          min="10"
          max="300"
          step="5"
          class="range-slider"
        />
        <div class="slider-ticks">
          <span>10 Keys (Starter)</span>
          <span>50 Keys (Pro)</span>
          <span>200+ Keys (VIP Tier)</span>
        </div>
      </div>

      <div class="control-group">
        <div class="control-label">
          <span>Your Retail Selling Price (per Key)</span>
          <strong>₹{{ retailPricePerKey.toLocaleString('en-IN') }}</strong>
        </div>
        <input
          v-model.number="retailPricePerKey"
          type="range"
          min="600"
          max="1500"
          step="50"
          class="range-slider"
        />
      </div>
    </div>

    <!-- Output Display -->
    <div class="calc-results">
      <div class="result-box">
        <small>Wholesale Cost / Key</small>
        <strong>₹{{ wholesalePricePerKey }}</strong>
      </div>
      <div class="result-box">
        <small>Total Investment</small>
        <strong>₹{{ totalCost.toLocaleString('en-IN') }}</strong>
      </div>
      <div class="result-box highlight-box">
        <small>Net Monthly Profit</small>
        <strong class="text-profit">₹{{ netProfit.toLocaleString('en-IN') }}</strong>
        <span class="margin-badge">+{{ profitMarginPercent }}% Return</span>
      </div>
    </div>

    <div class="calc-action">
      <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-green w-full">
        Claim Reseller Panel Access on WhatsApp ↗
      </a>
    </div>
  </div>
</template>

<style scoped>
.reseller-calculator {
  padding: 2rem;
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  color: var(--white);
  background: #111114;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.calc-badge {
  color: var(--red);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.calc-header h3 {
  margin: 0.3rem 0 0;
  font-size: 1.8rem;
  letter-spacing: -0.04em;
}

.calc-header p {
  margin: 0.4rem 0 1.8rem;
  color: var(--gray-lt);
  font-size: 0.82rem;
}

.calc-controls {
  display: grid;
  gap: 1.6rem;
  margin-bottom: 2rem;
}

.control-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.control-label span {
  color: var(--gray-lt);
  font-size: 0.75rem;
  font-weight: 600;
}

.control-label strong {
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.range-slider {
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: var(--line-strong);
  accent-color: var(--red);
  cursor: pointer;
}

.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  color: var(--gray);
  font-size: 0.6rem;
}

.calc-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.result-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #16161a;
}

.result-box small {
  color: var(--gray);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
}

.result-box strong {
  font-family: var(--font-display);
  font-size: 1.3rem;
}

.highlight-box {
  border-color: rgba(143, 240, 174, 0.3);
  background: rgba(143, 240, 174, 0.05);
}

.text-profit {
  color: #8ff0ae;
}

.margin-badge {
  display: inline-block;
  align-self: flex-start;
  margin-top: 0.2rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: #0a0a0b;
  background: #8ff0ae;
  font-size: 0.55rem;
  font-weight: 800;
}

.w-full {
  width: 100%;
}

@media (max-width: 700px) {
  .calc-results {
    grid-template-columns: 1fr;
  }
}
</style>
