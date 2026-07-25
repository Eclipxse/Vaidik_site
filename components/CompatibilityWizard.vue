<script setup lang="ts">
import { ref, computed } from 'vue'
import { ALL_PRODUCTS, type Product } from '~/composables/useProducts'

const emit = defineEmits(['close', 'select-product'])

const step = ref(1)
const selectedPlatform = ref<'PC' | 'Mobile' | 'iOS' | ''>('')
const selectedStyle = ref<string>('')

const platforms = [
  { id: 'PC', label: 'PC / Windows', desc: 'Windows 10 / 11 64-bit' },
  { id: 'Mobile', label: 'Android Mobile', desc: 'Phone or Tablet (Root / Non-Root)' },
  { id: 'iOS', label: 'iPhone / iPad', desc: 'iOS 14+ (No Jailbreak Required)' },
]

const stylesByPlatform: Record<string, { id: string; label: string; desc: string }[]> = {
  PC: [
    { id: 'streamer', label: 'Streamer & OBS Safe', desc: 'Hidden on screen share / recording, 5-type aimbot' },
    { id: 'legit', label: 'External Legit', desc: 'External AI targeting, maximum anti-ban safety' },
    { id: 'rage', label: 'Rage / Aimkill', desc: 'Fastest aimkill, fly hack, tele-kill, joystick control' },
    { id: 'bypass', label: 'UID Tournament Bypass', desc: 'Remove PC logo, play in phone tournaments, 50 BR players' },
  ],
  Mobile: [
    { id: 'nonroot', label: 'Non-Root VIP Panel', desc: 'Drag headshot, chams location, 0% lag, 100% safe' },
  ],
  iOS: [
    { id: 'ios-all', label: 'Full Season iOS Panel', desc: 'No jailbreak, neck/head aimbot, hologram ESP' },
  ],
}

const recommendedProduct = computed<Product | null>(() => {
  if (!selectedPlatform.value) return null

  if (selectedPlatform.value === 'PC') {
    if (selectedStyle.value === 'streamer') return ALL_PRODUCTS.find((p) => p.slug === 'pc-streamer-panel') || null
    if (selectedStyle.value === 'bypass') return ALL_PRODUCTS.find((p) => p.slug === 'pc-uid-bypass') || null
    if (selectedStyle.value === 'rage') return ALL_PRODUCTS.find((p) => p.slug === 'pc-aimkill') || null
    return ALL_PRODUCTS.find((p) => p.slug === 'pc-external-panel') || null
  }

  if (selectedPlatform.value === 'Mobile') {
    return ALL_PRODUCTS.find((p) => p.slug === 'phone-panel') || null
  }

  if (selectedPlatform.value === 'iOS') {
    return ALL_PRODUCTS.find((p) => p.slug === 'ios-panel') || null
  }

  return null
})

function selectPlatform(p: 'PC' | 'Mobile' | 'iOS') {
  selectedPlatform.value = p
  selectedStyle.value = ''
  step.value = 2
}

function selectStyle(s: string) {
  selectedStyle.value = s
  step.value = 3
}

function resetWizard() {
  step.value = 1
  selectedPlatform.value = ''
  selectedStyle.value = ''
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="wizard-modal">
      <div class="wizard-header">
        <div>
          <span class="wizard-badge">10-SECOND MATCHMAKER</span>
          <h2>Find Your Perfect Panel</h2>
        </div>
        <button class="wizard-close" @click="emit('close')" aria-label="Close modal">✕</button>
      </div>

      <!-- Step Progress Bar -->
      <div class="wizard-progress">
        <div class="progress-bar" :style="{ width: `${(step / 3) * 100}%` }" />
      </div>

      <!-- STEP 1: Select Platform -->
      <div v-if="step === 1" class="wizard-step">
        <span class="step-label">Step 1 of 3 — Select Your Platform</span>
        <h3>What device are you playing on?</h3>
        <div class="option-grid">
          <button
            v-for="p in platforms"
            :key="p.id"
            class="option-card"
            @click="selectPlatform(p.id as any)"
          >
            <strong>{{ p.label }}</strong>
            <p>{{ p.desc }}</p>
            <span class="option-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- STEP 2: Select Playstyle -->
      <div v-else-if="step === 2" class="wizard-step">
        <div class="step-top">
          <button class="back-link" @click="step = 1">← Back</button>
          <span class="step-label">Step 2 of 3 — Select Playstyle</span>
        </div>
        <h3>What is your main requirement?</h3>
        <div class="option-grid">
          <button
            v-for="s in stylesByPlatform[selectedPlatform]"
            :key="s.id"
            class="option-card"
            @click="selectStyle(s.id)"
          >
            <strong>{{ s.label }}</strong>
            <p>{{ s.desc }}</p>
            <span class="option-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- STEP 3: Match Result -->
      <div v-else-if="step === 3 && recommendedProduct" class="wizard-step wizard-result">
        <div class="step-top">
          <button class="back-link" @click="step = 2">← Change Style</button>
          <span class="step-label">Step 3 of 3 — Your Perfect Match</span>
        </div>

        <div class="result-card">
          <div class="result-media">
            <img :src="recommendedProduct.images[0]" :alt="recommendedProduct.name" />
            <span class="result-badge">{{ recommendedProduct.badge }}</span>
          </div>

          <div class="result-info">
            <span class="result-category">{{ recommendedProduct.category }} PLATFORM</span>
            <h3>{{ recommendedProduct.name }}</h3>
            <p>{{ recommendedProduct.tagline }}</p>

            <div class="result-metrics">
              <div>
                <small>Anti-Ban Status</small>
                <strong>100% Undetected</strong>
              </div>
              <div>
                <small>Setup Time</small>
                <strong>Under 5 Mins</strong>
              </div>
              <div>
                <small>Starting Price</small>
                <strong class="text-red">{{ recommendedProduct.durations[0]?.price }}</strong>
              </div>
            </div>

            <div class="result-actions">
              <NuxtLink
                :to="`/products/${recommendedProduct.slug}`"
                class="btn-red w-full"
                @click="emit('close')"
              >
                View Full Details &amp; Key Options ↗
              </NuxtLink>
              <button class="btn-outline" @click="resetWizard">
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wizard-modal {
  width: min(720px, calc(100vw - 2rem));
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  color: var(--white);
  background: #0e0e10;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.8);
}

.wizard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.wizard-badge {
  color: var(--red);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.wizard-header h2 {
  margin: 0.25rem 0 0;
  font-size: 1.8rem;
  letter-spacing: -0.04em;
}

.wizard-close {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--gray);
  background: transparent;
  cursor: pointer;
  transition: all 180ms ease;
}

.wizard-close:hover {
  color: var(--white);
  border-color: var(--red);
  background: var(--red);
}

.wizard-progress {
  height: 3px;
  margin: 1.2rem 0 1.8rem;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
}

.progress-bar {
  height: 100%;
  border-radius: 99px;
  background: var(--red);
  transition: width 300ms ease;
}

.wizard-step h3 {
  margin: 0.5rem 0 1.2rem;
  font-size: 1.2rem;
}

.step-label {
  color: var(--gray-lt);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
}

.step-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-link {
  padding: 0;
  border: 0;
  color: var(--red-bright);
  background: transparent;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.option-grid {
  display: grid;
  gap: 0.85rem;
}

.option-card {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--white);
  background: #141417;
  text-align: left;
  cursor: pointer;
  transition: all 180ms ease;
}

.option-card:hover {
  border-color: var(--red);
  background: #1a1a1f;
  transform: translateY(-2px);
}

.option-card strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.05rem;
}

.option-card p {
  grid-column: 1;
  margin: 0.25rem 0 0;
  color: var(--gray);
  font-size: 0.75rem;
}

.option-arrow {
  grid-row: 1 / span 2;
  grid-column: 2;
  color: var(--red);
  font-size: 1.2rem;
}

.result-card {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  padding: 1.2rem;
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  background: #141417;
}

.result-media {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.result-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  color: #fff;
  background: var(--red);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
}

.result-category {
  color: var(--red-bright);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.result-info h3 {
  margin: 0.25rem 0 0;
  font-size: 1.4rem;
}

.result-info p {
  margin: 0.4rem 0 1rem;
  color: var(--gray-lt);
  font-size: 0.8rem;
  line-height: 1.5;
}

.result-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  padding: 0.8rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #0d0d0f;
}

.result-metrics small {
  display: block;
  color: var(--gray);
  font-size: 0.55rem;
  text-transform: uppercase;
}

.result-metrics strong {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.85rem;
}

.text-red {
  color: var(--red-bright);
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.w-full {
  width: 100%;
}

@media (max-width: 640px) {
  .wizard-modal {
    padding: 1.25rem;
  }
  .result-card {
    grid-template-columns: 1fr;
  }
  .result-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
