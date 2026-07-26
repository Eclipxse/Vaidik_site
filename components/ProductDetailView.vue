<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'

export interface DetailDuration {
  label: string
  price: string | number
  stock?: number
}

export interface DetailProduct {
  id: string
  name: string
  category: string
  tagline: string
  badge?: string
  images: string[]
  durations: DetailDuration[]
  features: string[]
  support: string[]
}

const props = defineProps<{
  product: DetailProduct
}>()

const activeImage = ref(0)
const selectedDuration = ref(0)
const { ownerNumber } = useWhatsApp()

const currentDuration = computed(() => props.product.durations[selectedDuration.value] || props.product.durations[0])
const formattedPrice = computed(() => {
  const price = currentDuration.value?.price
  if (typeof price === 'number') return `₹${price.toLocaleString('en-IN')}`
  return price || 'Contact'
})
const orderMessage = computed(() => encodeURIComponent(
  `Hi! I want to ask about ${props.product.name}${currentDuration.value?.label ? ` — ${currentDuration.value.label}` : ''}. Please confirm compatibility and current availability.`
))
</script>

<template>
  <article class="detail-page">
    <header class="detail-top">
      <div class="detail-breadcrumb">
        <NuxtLink to="/">Store</NuxtLink>
        <span>/</span>
        <span>{{ product.category }}</span>
        <span>/</span>
        <strong>{{ product.name }}</strong>
      </div>
      <span class="detail-code">AG—PRODUCT / {{ product.id }}</span>
    </header>

    <main class="detail-hero">
      <section class="gallery" aria-label="Product gallery">
        <div class="gallery-main">
          <BorderBeam :duration="17" :size="220" color-from="#ff2d2d" color-to="#f6f1e8" />
          <AnimatePresence mode="wait" :initial="false">
            <Motion
              :key="product.images[activeImage] || product.images[0]"
              as="img"
              :src="product.images[activeImage] || product.images[0]"
              :alt="product.name"
              :initial="{ opacity: 0, filter: 'blur(9px)', scale: 1.025 }"
              :animate="{ opacity: 1, filter: 'blur(0px)', scale: 1 }"
              :exit="{ opacity: 0, filter: 'blur(7px)', scale: 0.99 }"
              :transition="{ type: 'spring', stiffness: 190, damping: 27 }"
            />
          </AnimatePresence>
          <span class="gallery-index">
            {{ String(activeImage + 1).padStart(2, '0') }} /
            {{ String(Math.max(product.images.length, 1)).padStart(2, '0') }}
          </span>
        </div>

        <div v-if="product.images.length > 1" class="gallery-thumbs">
          <button
            v-for="(image, index) in product.images"
            :key="image"
            type="button"
            :class="{ active: activeImage === index }"
            :aria-label="`View product image ${index + 1}`"
            @click="activeImage = index"
          >
            <img :src="image" alt="" />
          </button>
        </div>
      </section>

      <section class="purchase-panel">
        <div class="purchase-head">
          <span>{{ product.badge || product.category }}</span>
          <i aria-hidden="true" />
          <small>Available to enquire</small>
        </div>

        <h1>{{ product.name }}</h1>
        <p>{{ product.tagline }}</p>

        <div v-if="product.durations.length" class="duration-picker">
          <span class="picker-label">Choose an option</span>
          <div>
            <button
              v-for="(duration, index) in product.durations"
              :key="`${duration.label}-${index}`"
              type="button"
              :class="{ active: selectedDuration === index }"
              @click="selectedDuration = index"
            >
              <Motion
                v-if="selectedDuration === index"
                layout-id="active-duration"
                as="i"
                class="duration-active"
                aria-hidden="true"
                :transition="{ type: 'spring', stiffness: 340, damping: 31 }"
              />
              <span>{{ duration.label || `Option ${index + 1}` }}</span>
              <strong>
                {{ typeof duration.price === 'number' ? `₹${duration.price.toLocaleString('en-IN')}` : duration.price }}
              </strong>
            </button>
          </div>
        </div>

        <div class="purchase-action">
          <div>
            <small>Selected price</small>
            <strong>{{ formattedPrice }}</strong>
          </div>
          <a
            :href="`https://wa.me/${ownerNumber}?text=${orderMessage}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Confirm and order
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p class="purchase-note">
          Confirm your device, operating system, current availability and final
          price with the team before payment.
        </p>
      </section>
    </main>

    <section class="detail-ledger">
      <header>
        <span>Product specification</span>
        <small>Review before ordering</small>
      </header>

      <div class="ledger-grid">
        <div class="ledger-block">
          <span class="ledger-label">Features / {{ String(product.features.length).padStart(2, '0') }}</span>
          <ul>
            <li v-for="(feature, index) in product.features" :key="feature">
              <small>{{ String(index + 1).padStart(2, '0') }}</small>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div class="ledger-block ledger-block--support">
          <span class="ledger-label">Compatibility + support</span>
          <ul>
            <li v-for="(item, index) in product.support" :key="item">
              <small>{{ String(index + 1).padStart(2, '0') }}</small>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p v-if="!product.support.length">
            Contact support to confirm compatibility for your exact setup.
          </p>
        </div>
      </div>
    </section>

    <section class="detail-footer">
      <div>
        <span>Need a second opinion?</span>
        <h2>Send your setup first.</h2>
      </div>
      <a
        :href="`https://wa.me/${ownerNumber}?text=${orderMessage}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ask on WhatsApp
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  </article>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  padding: 9rem 1.5rem 0;
  background:
    radial-gradient(circle at 80% 12%, rgba(164, 7, 21, 0.11), transparent 28rem),
    var(--black);
}

.detail-top,
.detail-hero,
.detail-ledger,
.detail-footer {
  width: min(var(--shell), 100%);
  margin-right: auto;
  margin-left: auto;
}

.detail-top {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.detail-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.detail-breadcrumb a {
  color: var(--white);
  text-decoration: none;
}

.detail-breadcrumb strong {
  overflow: hidden;
  color: var(--gray-lt);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-code {
  flex: 0 0 auto;
  color: var(--red-bright);
}

.detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.75fr);
  gap: 1rem;
  min-height: 680px;
  padding-top: 1rem;
}

.gallery {
  min-width: 0;
  padding: 0;
}

.gallery-main {
  position: relative;
  height: 100%;
  min-height: 560px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #080809;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
}

.gallery-main::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8, 8, 9, 0.52), transparent 42%);
  content: '';
  pointer-events: none;
}

.gallery-main > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-index {
  position: absolute;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  color: rgba(245, 244, 239, 0.68);
  font-size: 0.54rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.gallery-thumbs {
  display: flex;
  gap: 0.55rem;
  margin-top: 0.75rem;
  overflow-x: auto;
}

.gallery-thumbs button {
  width: 72px;
  height: 58px;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #0f0f10;
  opacity: 0.55;
  cursor: pointer;
}

.gallery-thumbs button.active {
  border-color: var(--red);
  opacity: 1;
}

.gallery-thumbs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.purchase-panel {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: clamp(2rem, 4vw, 4rem);
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.035), transparent 32%),
    rgba(14, 14, 17, 0.88);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
}

.purchase-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.purchase-head > span {
  color: var(--red-bright);
}

.purchase-head i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #76e899;
}

.purchase-panel h1 {
  margin: 1.4rem 0 0;
  font-size: clamp(4rem, 6.4vw, 6.7rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.purchase-panel > p {
  margin: 1.4rem 0 0;
  color: var(--gray-lt);
  font-size: 0.88rem;
  line-height: 1.72;
}

.duration-picker {
  margin-top: 2.2rem;
}

.picker-label,
.ledger-label {
  display: block;
  margin-bottom: 0.7rem;
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.47rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.duration-picker > div {
  display: grid;
  gap: 0.5rem;
}

.duration-picker button {
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--gray-lt);
  background: #101012;
  font-size: 0.7rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease;
}

.duration-picker button.active {
  border-color: rgba(255, 69, 64, 0.56);
  color: var(--white);
}

.duration-picker button > span,
.duration-picker button > strong {
  position: relative;
  z-index: 2;
}

.duration-active {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent),
    rgba(255, 45, 45, 0.09);
}

.duration-picker button strong {
  color: var(--white);
}

.purchase-action {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2.5rem;
}

.purchase-action > div {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
}

.purchase-action small {
  color: var(--gray);
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.purchase-action strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: -0.04em;
}

.purchase-action a {
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  border-radius: 999px;
  color: #fff;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent 50%),
    var(--red);
  box-shadow: 0 14px 38px rgba(255, 45, 45, 0.18);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.purchase-note {
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--gray) !important;
  font-size: 0.68rem !important;
}

.detail-ledger {
  padding: clamp(6rem, 10vw, 10rem) 0;
}

.detail-ledger > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.detail-ledger > header span {
  color: var(--red-bright);
}

.ledger-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(3rem, 8vw, 8rem);
  padding-top: 3rem;
}

.ledger-block ul {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.ledger-block li {
  display: grid;
  grid-template-columns: 2.2rem 1fr;
  gap: 0.8rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--gray-lt);
  font-size: 0.78rem;
}

.ledger-block li small {
  color: var(--red-bright);
  font-size: 0.5rem;
  font-weight: 800;
}

.ledger-block > p {
  color: var(--gray);
  font-size: 0.8rem;
  line-height: 1.65;
}

.detail-footer {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
  padding: clamp(4rem, 8vw, 7rem);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 28px 28px 0 0;
  color: var(--white);
  background:
    radial-gradient(circle at 80% 50%, rgba(255, 80, 70, 0.18), transparent 30%),
    linear-gradient(120deg, #550710, #a00b18);
}

.detail-footer > div > span {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.detail-footer h2 {
  margin: 0.8rem 0 0;
  font-size: clamp(3.5rem, 6vw, 6.2rem);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.detail-footer a {
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  color: #171312;
  background: var(--white);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .detail-hero {
    grid-template-columns: 1fr;
  }

  .gallery {
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .purchase-panel {
    min-height: 600px;
  }
}

@media (max-width: 680px) {
  .detail-page {
    padding: 8rem 1rem 0;
  }

  .detail-code,
  .detail-breadcrumb span:nth-of-type(2),
  .detail-breadcrumb strong {
    display: none;
  }

  .gallery-main {
    min-height: 390px;
  }

  .purchase-panel {
    min-height: 560px;
    padding: 2rem 0;
  }

  .purchase-action,
  .ledger-grid,
  .detail-footer {
    grid-template-columns: 1fr;
  }

  .detail-footer {
    padding: 3rem 1.3rem;
  }
}
</style>
