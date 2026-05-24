<template>
  <div v-if="product" class="detail-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/" class="bc-link">Home</NuxtLink>
      <span class="bc-sep">/</span>
      <NuxtLink :to="categoryRoute" class="bc-link">{{ product.category }} Panel</NuxtLink>
      <span class="bc-sep">/</span>
      <span class="bc-current">{{ product.name }}</span>
    </div>

    <div class="detail-grid">

      <!-- ── LEFT: Image Gallery ────────────────────────── -->
      <div class="gallery-col">
        <!-- Main display image (cover or selected gallery shot) -->
        <div class="main-image-wrap">
          <Transition name="img-fade" mode="out-in">
            <img
              :key="activeImg"
              :src="activeImg === -1 ? product.images[0] : product.images[activeImg + 1]"
              :alt="product.name"
              class="main-image"
            />
          </Transition>
          <!-- Badge -->
          <span class="img-badge">{{ product.badge }}</span>
          <!-- Image counter -->
          <span class="img-counter">
            {{ activeImg === -1 ? 1 : activeImg + 2 }} / {{ product.images.length }}
          </span>
          <!-- Bottom vignette -->
          <div class="img-vignette" aria-hidden="true" />
        </div>

        <!-- Thumbnail strip: cover btn + gallery thumbs -->
        <div class="cover-row">
          <button
            class="cover-btn"
            :class="{ 'cover-btn--active': activeImg === -1 }"
            @click="activeImg = -1"
            title="Cover image"
          >
            <img :src="product.images[0]" :alt="product.name + ' cover'" class="cover-img" />
            <span class="cover-label">Main</span>
          </button>

          <!-- Gallery thumbnails (images[1] onwards) -->
          <div v-if="galleryImages.length > 0" class="thumbs">
            <button
              v-for="(img, i) in galleryImages"
              :key="i"
              class="thumb-btn"
              :class="{ 'thumb-btn--active': activeImg === i }"
              @click="activeImg = i"
            >
              <img :src="img" :alt="`Screenshot ${i + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>
      </div>

      <!-- ── RIGHT: Product Info ────────────────────────── -->
      <div class="info-col">

        <!-- Label + Name -->
        <span class="premium-label">Premium Asset</span>
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-tagline">{{ product.tagline }}</p>

        <!-- Price display -->
        <div class="price-display">
          <span class="price-main">{{ selectedDuration.price }}</span>
          <span class="price-note">/ {{ selectedDuration.label }}</span>
        </div>

        <!-- Duration selector -->
        <div class="dur-section">
          <p class="dur-label">SELECT DURATION</p>
          <div class="dur-buttons">
            <button
              v-for="dur in product.durations"
              :key="dur.days"
              class="dur-btn"
              :class="{ 'dur-btn--active': selectedDuration.days === dur.days }"
              @click="selectedDuration = dur"
            >
              <span class="dur-name">{{ dur.label }}</span>
              <span class="dur-stock">🟢 {{ dur.stock }} STOCK</span>
              <span class="dur-price">{{ dur.price }}</span>
            </button>
          </div>
        </div>

        <!-- Actions Section (Watch Demo & Telegram row, Buy Now below) -->
        <div class="actions-section">
          <div class="actions-row">
            <!-- YouTube watch button -->
            <a
              :href="product.youtube_url || 'https://www.youtube.com/@aslilgangliveff'"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-yt-watch"
              id="product-yt-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Watch Demo</span>
            </a>

            <!-- Telegram Channel button -->
            <a
              :href="product.telegram_url || 'https://t.me/+fp8yl-Roaek5YmU1'"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-telegram-slug"
              id="product-telegram-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <span>Telegram</span>
            </a>
          </div>

          <!-- Buy Button -->
          <div class="buy-wrap">
            <div class="pulse-ring-green" aria-hidden="true" />
            <button class="btn-buy-main" @click="doBuy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        <!-- Trust row -->
        <div class="trust-row">
          <span class="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secure Purchase
          </span>
          <span class="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Instant Delivery
          </span>
          <span class="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.01z"/></svg>
            24/7 Support
          </span>
        </div>

        <!-- Features Card -->
        <div class="features-card">
          <h3 class="features-title">PRODUCT FEATURES</h3>
          <ul class="features-list">
            <li v-for="f in product.features" :key="f" class="feature-item">
              <span class="feat-icon">◆</span>
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>

        <!-- Support/Extra Card -->
        <div class="support-card">
          <h3 class="support-title">EXTRA SUPPORT MODE</h3>
          <ul class="support-list">
            <li v-for="s in product.support" :key="s" class="support-item">
              <span class="support-check">✓</span>
              <span>{{ s }}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>

  <!-- 404 state -->
  <div v-else class="not-found">
    <h1>Product Not Found</h1>
    <NuxtLink to="/" class="btn-red">← Back to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ALL_PRODUCTS } from '~/composables/useProducts'

const route  = useRoute()
const slug   = computed(() => route.params.slug as string)

const product = computed(() => ALL_PRODUCTS.find(p => p.slug === slug.value))

// Redirect to 404 if product not found
if (!product.value) {
  throw createError({ statusCode: 404, message: 'Product not found' })
}

const activeImg       = ref(-1)   // -1 = show cover (images[0]); 0+ = gallery index into images[1+]
const selectedDuration = ref(product.value!.durations[0])

// Gallery images = everything after the cover (index 0)
const galleryImages = computed(() => product.value?.images.slice(1) ?? [])

// Reset when product changes
watch(slug, () => {
  activeImg.value       = -1
  selectedDuration.value = product.value!.durations[0]
})

// SEO
useHead({
  title: `${product.value!.name} — ASLIL GANG PANEL`,
  meta: [
    { name: 'description', content: product.value!.tagline },
  ],
})

const categoryRoute = computed(() => {
  if (!product.value) return '/'
  if (product.value.category === 'PC')     return '/pc-panel'
  if (product.value.category === 'iOS')    return '/cheats/ios'
  return '/cheats/android'
})

const { handleBuyNow, ownerNumber } = useWhatsApp()

function doBuy() {
  const msg = `Hi! I want to buy:\n\n📦 *${product.value!.name}*\n⏱️ Duration: *${selectedDuration.value.label}*\n💰 Price: *${selectedDuration.value.price}*\n\nPlease confirm availability. Thank you!`
  const link = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`
  window.open(link, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* ── Page shell ── */
.detail-page {
  min-height: 100vh;
  padding-top: 7rem;
  padding-bottom: 6rem;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

/* ── Breadcrumb ── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
}

.bc-link {
  color: var(--gray);
  text-decoration: none;
  transition: color 0.2s;
}
.bc-link:hover { color: #fff; }
.bc-sep { color: rgba(255,255,255,0.2); }
.bc-current { color: var(--red); font-weight: 600; }

/* ── Two-column layout ── */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* ── Gallery ── */
.gallery-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 7rem;
}

.main-image-wrap {
  position: relative;
  width: 100%;
  min-height: 260px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(180deg, #0d0d0d 0%, #050505 100%);
  border: 1px solid rgba(230,30,38,0.2);
  box-shadow: 0 0 0 1px rgba(230,30,38,0.08), 0 32px 80px rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  display: block;
  transition: opacity 0.3s ease;
}

.img-badge {
  position: absolute;
  top: 1rem; left: 1rem;
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ── Image fade transition ── */
.img-fade-enter-active { transition: opacity 0.25s ease; }
.img-fade-leave-active { transition: opacity 0.15s ease; }
.img-fade-enter-from, .img-fade-leave-to { opacity: 0; }

/* ── Image counter badge ── */
.img-counter {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  padding: 0.28rem 0.75rem;
  border-radius: 9999px;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75);
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* ── Bottom vignette depth ── */
.img-vignette {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(0,0,0,0.45), transparent);
  pointer-events: none;
}

/* ── Cover row: main thumb + gallery strip ── */
.cover-row {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

/* Cover thumbnail button */
.cover-btn {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 72px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0 0 0.3rem;
  background: #111;
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.55;
}

.cover-btn--active,
.cover-btn:hover {
  border-color: #fff;
  opacity: 1;
}

.cover-img {
  width: 100%;
  height: 56px;
  object-fit: contain;
  display: block;
  background: #0a0a0a;
}

.cover-label {
  font-family: var(--font-body);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

/* Gallery thumbnails */
.thumbs {
  flex: 1;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
}
.thumbs::-webkit-scrollbar { display: none; }

.thumb-btn {
  flex-shrink: 0;
  width: 72px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  background: #000;
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.55;
}

.thumb-btn--active,
.thumb-btn:hover {
  border-color: var(--red);
  opacity: 1;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #0a0a0a;
}

/* ── Info column ── */
.info-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.premium-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gray);
}

.product-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.product-tagline {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
}

/* Price */
.price-display {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.price-main {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.price-note {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
}

/* Duration selector */
.dur-section {}
.dur-label {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gray);
  margin: 0 0 0.75rem;
}

.dur-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dur-btn {
  flex: 1;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 0.25s ease;
}

.dur-btn:hover {
  border-color: rgba(230,30,38,0.4);
  background: rgba(230,30,38,0.06);
}

.dur-btn--active {
  border-color: var(--red);
  background: rgba(230,30,38,0.12);
  box-shadow: 0 0 0 1px rgba(230,30,38,0.2), 0 8px 24px rgba(230,30,38,0.2);
}

.dur-name {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dur-stock {
  font-family: var(--font-body);
  font-size: 0.62rem;
  color: rgba(255,255,255,0.45);
}

.dur-price {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  color: #fff;
}

.dur-btn--active .dur-price { color: var(--red); }

/* Actions Row side-by-side flex layout */
.actions-row {
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
}

.actions-row > * {
  flex: 1;
  width: 100%;
}

/* Buy button - solid WhatsApp Green */
.btn-buy-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 14px;
  background: #25D366; /* WhatsApp Green */
  color: #fff;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 30px rgba(37, 211, 102, 0.4);
}

.btn-buy-main:hover {
  background: #20ba5a;
  transform: translateY(-2px);
  box-shadow: 0 12px 44px rgba(37, 211, 102, 0.6);
}

/* Buy wrap + pulse ring */
.buy-wrap {
  position: relative;
}

.pulse-ring-green {
  position: absolute;
  inset: -4px;
  border-radius: 18px;
  border: 2px solid rgba(37, 211, 102, 0.5);
  animation: pulse-expand-green 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse-expand-green {
  0%   { transform: scale(1);    opacity: 0.8; }
  70%  { transform: scale(1.04); opacity: 0;   }
  100% { transform: scale(1.04); opacity: 0;   }
}

/* Trust row */
.trust-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.trust-item svg {
  color: rgba(255,255,255,0.3);
  flex-shrink: 0;
}

/* Features Card */
.features-card,
.support-card {
  padding: 1.75rem;
  border-radius: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
}

.features-title,
.support-title {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--red);
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(230,30,38,0.15);
}

.features-list,
.support-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.feature-item,
.support-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.4;
}

.feat-icon {
  color: var(--red);
  font-size: 0.5rem;
  flex-shrink: 0;
  margin-top: 0.35em;
}

.support-check {
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 0.1em;
}

/* Not found */
.not-found {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.not-found h1 {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
}

/* ── YouTube watch button ── */
.btn-yt-watch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 1rem 1.5rem; /* Matched padding to buy button */
  border-radius: 14px;
  background: rgba(255, 0, 0, 0.06);
  border: 1px solid rgba(255, 0, 0, 0.22);
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.28s ease;
  margin-top: 0; /* Removed margin-top for flexbox align */
}

.btn-yt-watch svg {
  color: #ff0000;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.btn-yt-watch:hover {
  background: rgba(255, 0, 0, 0.12);
  border-color: rgba(255, 0, 0, 0.5);
  color: #fff;
  box-shadow: 0 6px 28px rgba(255, 0, 0, 0.2);
  transform: translateY(-2px);
}

.btn-yt-watch:hover svg {
  transform: scale(1.15);
}

/* ── Telegram Slug Button & Action Section ── */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.btn-telegram-slug {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 14px;
  background: rgba(38, 165, 212, 0.06);
  border: 1px solid rgba(38, 165, 212, 0.22);
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.28s ease;
}

.btn-telegram-slug svg {
  color: #26a5d4;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.btn-telegram-slug:hover {
  background: rgba(38, 165, 212, 0.12);
  border-color: rgba(38, 165, 212, 0.5);
  color: #fff;
  box-shadow: 0 6px 28px rgba(38, 165, 212, 0.20);
  transform: translateY(-2px);
}

.btn-telegram-slug:hover svg {
  transform: scale(1.15);
}
</style>
