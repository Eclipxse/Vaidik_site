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
  youtubeUrl?: string
  telegramUrl?: string
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
const defaultTelegramUrl = 'https://t.me/+fp8yl-Roaek5YmU1'

const currentDuration = computed(() => props.product.durations[selectedDuration.value] || props.product.durations[0])
const telegramUrl = computed(() => props.product.telegramUrl || defaultTelegramUrl)
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
        <BorderBeam :duration="14" :size="180" color-from="#ff2d2d" color-to="#28d875" />

        <div class="purchase-head">
          <span>Premium asset</span>
          <div>
            <i aria-hidden="true" />
            <small>{{ product.badge || product.category }}</small>
          </div>
        </div>

        <h1>{{ product.name }}</h1>
        <p>{{ product.tagline }}</p>

        <div class="selected-price" aria-live="polite">
          <strong>{{ formattedPrice }}</strong>
          <span v-if="currentDuration?.label">/ {{ currentDuration.label }}</span>
        </div>

        <div v-if="product.durations.length" class="duration-picker">
          <span class="picker-label">Select duration</span>
          <div :class="{ 'single-option': product.durations.length === 1 }">
            <button
              v-for="(duration, index) in product.durations"
              :key="`${duration.label}-${index}`"
              type="button"
              :class="{ active: selectedDuration === index }"
              :aria-pressed="selectedDuration === index"
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
              <span class="duration-name">{{ duration.label || `Option ${index + 1}` }}</span>
              <small v-if="duration.stock !== undefined">
                <i aria-hidden="true" />
                {{ duration.stock }} stock
              </small>
              <strong>
                {{ typeof duration.price === 'number' ? `₹${duration.price.toLocaleString('en-IN')}` : duration.price }}
              </strong>
            </button>
          </div>
        </div>

        <div class="purchase-links" :class="{ 'single-action': !product.youtubeUrl }">
          <a
            v-if="product.youtubeUrl"
            :href="product.youtubeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="purchase-link purchase-link--youtube"
          >
            <span class="channel-icon channel-icon--youtube" aria-hidden="true">▶</span>
            Watch demo
          </a>
          <a
            :href="telegramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="purchase-link purchase-link--telegram"
          >
            <span class="channel-icon channel-icon--telegram" aria-hidden="true">↗</span>
            Telegram
          </a>
        </div>

        <a
          :href="`https://wa.me/${ownerNumber}?text=${orderMessage}`"
          target="_blank"
          rel="noopener noreferrer"
          class="buy-now"
        >
          <span class="channel-icon channel-icon--whatsapp" aria-hidden="true">W</span>
          Buy now
          <span class="buy-now__arrow" aria-hidden="true">↗</span>
        </a>

        <div class="purchase-trust" aria-label="Purchase support">
          <span><i aria-hidden="true">◇</i> Secure purchase</span>
          <span><i aria-hidden="true">◷</i> Instant delivery</span>
          <span><i aria-hidden="true">⌕</i> 24/7 support</span>
        </div>

        <p class="purchase-note">
          Confirm compatibility and current availability with the team before payment.
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
  position: relative;
  isolation: isolate;
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  padding: clamp(2rem, 3.6vw, 3.4rem);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  background:
    radial-gradient(circle at 12% 0%, rgba(191, 6, 19, 0.32), transparent 39%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.045), transparent 32%),
    #0a0a0c;
  box-shadow:
    0 32px 90px rgba(0, 0, 0, 0.38),
    inset 0 1px rgba(255, 255, 255, 0.04);
}

.purchase-panel::before {
  position: absolute;
  z-index: -1;
  top: -11rem;
  left: -9rem;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  background: rgba(161, 0, 12, 0.18);
  filter: blur(68px);
  content: '';
  pointer-events: none;
}

.purchase-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.purchase-head > span {
  color: #aaa8ad;
}

.purchase-head > div {
  display: flex;
  align-items: center;
  gap: 0.48rem;
}

.purchase-head i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #48d984;
  box-shadow: 0 0 12px rgba(72, 217, 132, 0.72);
}

.purchase-head small {
  color: #8c898f;
  font: inherit;
}

.purchase-panel h1 {
  max-width: 12ch;
  margin: 1.7rem 0 0;
  font-size: clamp(3rem, 4.4vw, 5rem);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.055em;
  text-transform: uppercase;
}

.purchase-panel > p {
  max-width: 46rem;
  margin: 1.05rem 0 0;
  color: #97949a;
  font-size: 0.9rem;
  line-height: 1.65;
}

.selected-price {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: 1.15rem;
}

.selected-price strong {
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.4vw, 4rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.055em;
}

.selected-price span {
  overflow: hidden;
  color: #a7a4aa;
  font-size: 0.76rem;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.duration-picker {
  margin-top: 1.85rem;
}

.picker-label,
.ledger-label {
  display: block;
  margin-bottom: 0.85rem;
  color: #98959c;
  font-family: var(--font-mono);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.duration-picker > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.duration-picker > div.single-option {
  grid-template-columns: 1fr;
}

.duration-picker button {
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: 112px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.34rem;
  padding: 1rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  color: #d9d6da;
  background: rgba(13, 13, 15, 0.78);
  text-align: center;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease,
    background-color 180ms ease;
}

.duration-picker button.active {
  border-color: #ff2929;
  color: #fff;
  background: rgba(62, 6, 10, 0.62);
  box-shadow: inset 0 0 0 1px rgba(255, 45, 45, 0.05);
}

.duration-picker button:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.duration-picker button > .duration-name,
.duration-picker button > small,
.duration-picker button > strong {
  position: relative;
  z-index: 2;
}

.duration-name {
  max-width: 100%;
  overflow: hidden;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.025em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.duration-picker button small {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #8e8b91;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.duration-picker button small i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #389c66;
}

.duration-active {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 55%),
    radial-gradient(circle at 50% 120%, rgba(255, 27, 34, 0.2), transparent 60%);
}

.duration-picker button strong {
  margin-top: 0.15rem;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 800;
}

.duration-picker button.active strong {
  color: var(--red-bright);
}

.purchase-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 1.25rem;
}

.purchase-links.single-action {
  grid-template-columns: 1fr;
}

.purchase-link {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  color: #d5d2d7;
  background: rgba(7, 7, 9, 0.72);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    transform 180ms ease,
    background-color 180ms ease;
}

.purchase-link:hover {
  color: #fff;
  transform: translateY(-2px);
}

.purchase-link--youtube {
  border-color: rgba(255, 0, 0, 0.28);
}

.purchase-link--youtube:hover {
  border-color: rgba(255, 0, 0, 0.72);
  background: rgba(255, 0, 0, 0.08);
}

.purchase-link--telegram {
  border-color: rgba(34, 158, 217, 0.28);
}

.purchase-link--telegram:hover {
  border-color: rgba(34, 158, 217, 0.72);
  background: rgba(34, 158, 217, 0.08);
}

.channel-icon {
  display: flex;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  font-size: 0.52rem;
  font-weight: 900;
}

.channel-icon--youtube {
  border-radius: 6px;
  color: #fff;
  background: #ff0000;
}

.channel-icon--telegram {
  border-radius: 50%;
  color: #061018;
  background: #229ed9;
}

.channel-icon--whatsapp {
  border: 1.5px solid currentColor;
  border-radius: 50%;
  font-size: 0.56rem;
}

.buy-now {
  position: relative;
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  gap: 0.72rem;
  margin-top: 0.85rem;
  border: 1px solid #5ef49a;
  border-radius: 16px;
  color: #06130c;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent 55%),
    #28d875;
  box-shadow:
    0 0 0 4px rgba(40, 216, 117, 0.12),
    0 18px 42px rgba(40, 216, 117, 0.22);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.buy-now:hover {
  background: #55e991;
  box-shadow:
    0 0 0 4px rgba(40, 216, 117, 0.16),
    0 22px 50px rgba(40, 216, 117, 0.3);
  transform: translateY(-2px);
}

.buy-now__arrow {
  position: absolute;
  right: clamp(2.4rem, 4vw, 3.8rem);
  font-size: 0.88rem;
}

.purchase-trust {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1.65rem;
  padding-top: 1.05rem;
  border-top: 1px solid var(--line);
}

.purchase-trust span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.38rem;
  color: #737077;
  font-size: 0.52rem;
  font-weight: 700;
  white-space: nowrap;
}

.purchase-trust i {
  color: #8f8c93;
  font-style: normal;
}

.purchase-note {
  margin-top: 0.9rem !important;
  color: #68656b !important;
  font-size: 0.58rem !important;
  line-height: 1.5 !important;
  text-align: center;
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
    padding: 1.6rem 1.2rem;
  }

  .ledger-grid,
  .detail-footer {
    grid-template-columns: 1fr;
  }

  .purchase-head > div {
    display: none;
  }

  .purchase-panel h1 {
    font-size: clamp(2.7rem, 13vw, 4rem);
  }

  .selected-price {
    align-items: flex-end;
  }

  .selected-price span {
    padding-bottom: 0.24rem;
    font-size: 0.68rem;
  }

  .duration-picker > div {
    gap: 0.55rem;
  }

  .duration-picker button {
    min-height: 106px;
    padding-inline: 0.55rem;
  }

  .duration-name {
    font-size: 0.6rem;
  }

  .purchase-link {
    min-height: 52px;
    font-size: 0.6rem;
  }

  .buy-now {
    min-height: 60px;
  }

  .buy-now__arrow {
    right: 1.25rem;
  }

  .purchase-trust {
    gap: 0.25rem;
  }

  .purchase-trust span {
    gap: 0.24rem;
    font-size: 0.44rem;
  }

  .detail-footer {
    padding: 3rem 1.3rem;
  }
}
</style>
