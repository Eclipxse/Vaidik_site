<template>
  <div class="product-page">
    <div class="product-container">
      
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center h-[50vh]">
        <div class="animate-pulse flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
          <p class="text-brand-gray font-display tracking-widest uppercase">Loading Asset...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !product" class="flex flex-col items-center justify-center h-[50vh] text-center gap-6">
        <h1 class="font-display text-4xl text-brand-light">ASSET NOT FOUND</h1>
        <p class="text-brand-gray">The requested product could not be located in our database.</p>
        <NuxtLink to="/" class="btn-premium">Return Home</NuxtLink>
      </div>

      <!-- Product Details -->
      <div v-else class="product-layout">
        
        <!-- Left: Image Showcase -->
        <div class="product-showcase">
          <div class="showcase-glow"></div>
          <div class="showcase-inner">
            <div class="discount-badge" v-if="hasDiscount">-50% OFF</div>
            
            <!-- Main showcase image -->
            <img 
              :src="displayImage" 
              :alt="product.name"
              class="product-image"
            />

            <!-- Gallery strip -->
            <div class="showcase-gallery">
              <button 
                class="gallery-btn"
                :class="{ active: activeImg === -1 }"
                @click="activeImg = -1"
              >
                <img :src="product.thumbnail_url || '/products/PC_EXTERNAL PANEL/External.png'" alt="Main Thumbnail" />
              </button>
              
              <button 
                v-for="(img, idx) in galleryImages"
                :key="idx"
                class="gallery-btn"
                :class="{ active: activeImg === idx }"
                @click="activeImg = idx"
              >
                <img :src="img" :alt="`Screenshot ${idx + 1}`" />
              </button>

              <button v-if="product.youtube_url" class="gallery-btn play-btn" @click="openYoutube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Details & Purchasing -->
        <div class="product-info">
          
          <header class="info-header">
            <span class="category-label">{{ product.category }}</span>
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-tagline" v-if="product.description">{{ product.description }}</p>
            
            <div class="price-block">
              <span class="current-price">₹{{ selectedDurationPrice }}</span>
              <span class="old-price" v-if="product.original_price">₹{{ product.original_price }}</span>
              <span class="offer-tag">ACTIVE STOCK</span>
            </div>
          </header>

          <!-- Duration Selection -->
          <section class="duration-section" v-if="product.category !== 'FF IDs'">
            <h3 class="section-label">Select Duration</h3>
            <div class="duration-grid">
              <button 
                v-for="dur in durations" 
                :key="dur.id"
                class="duration-card"
                :class="{ 'duration-card--active': selectedDuration === dur.id }"
                @click="selectedDuration = dur.id"
              >
                <span class="dur-title">{{ dur.label }}</span>
                <span class="dur-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
                  Legit
                </span>
                <span class="dur-price">₹{{ dur.price }}</span>
              </button>
            </div>
          </section>

          <!-- Features -->
          <section class="features-section" v-if="product.features && product.features.length">
            <div class="features-header">
              <h3 class="section-label text-brand-accent">Product Features</h3>
            </div>
            <div class="features-body">
              <ul class="features-list">
                <li v-for="f in product.features" :key="f" class="feature-item">
                  <span class="feat-bullet">◆</span>
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Support -->
          <section class="features-section" v-if="product.support && product.support.length">
            <div class="features-header">
              <h3 class="section-label text-brand-accent">Compatibility & Support</h3>
            </div>
            <div class="features-body">
              <ul class="features-list">
                <li v-for="s in product.support" :key="s" class="feature-item">
                  <span class="support-bullet">✓</span>
                  <span>{{ s }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Actions -->
          <footer class="action-footer">
            <div class="actions-row-custom">
              <!-- Watch Demo Button (YouTube style) -->
              <a
                :href="product.youtube_url || 'https://www.youtube.com/@aslilgangliveff'"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-yt-watch-custom"
                id="product-yt-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch Demo</span>
              </a>

              <!-- Telegram Watch Demo button -->
              <a
                v-if="product.telegram_url"
                :href="product.telegram_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-telegram-custom"
                id="product-telegram-demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <span>Telegram</span>
              </a>
              <!-- Fallback Telegram button if no url set -->
              <a
                v-else
                href="https://t.me/+fp8yl-Roaek5YmU1"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-telegram-custom"
                id="product-telegram-demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <span>Telegram</span>
              </a>
            </div>

            <!-- Buy Now on WhatsApp below both -->
            <div class="buy-wrap-custom">
              <div class="pulse-ring-green-custom" aria-hidden="true" />
              <button class="btn-activate-custom" @click="onActivate" id="product-buy-now">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Buy Now</span>
              </button>
            </div>
          </footer>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const client = useSupabaseClient()
const { handleBuyNow } = useWhatsApp()

const productId = route.params.id

// Fetch product data
const { data: product, pending, error } = await useAsyncData(
  `product-${productId}`,
  async () => {
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
    
    if (error) throw error
    return data
  }
)

const activeImg = ref(-1) // -1 = thumbnail_url, 0+ = galleryImages index

const galleryImages = computed(() => {
  if (Array.isArray(product.value?.images)) {
    return product.value.images.filter(Boolean)
  }
  return []
})

const displayImage = computed(() => {
  if (activeImg.value === -1) {
    return product.value?.thumbnail_url || '/products/PC_EXTERNAL PANEL/External.png'
  }
  return galleryImages.value[activeImg.value] || product.value?.thumbnail_url
})

// Mock durations since original DB might only have a single price/duration
const durations = computed(() => {
  const basePrice = product.value?.price || 50
  return [
    { id: '1d', label: '1 Day', price: basePrice },
    { id: '10d', label: '10 Days', price: Math.round(basePrice * 5.5) },
    { id: '30d', label: '30 Days', price: Math.round(basePrice * 11) },
    { id: 'lt', label: 'Lifetime', price: Math.round(basePrice * 35) },
  ]
})

const selectedDuration = ref('1d')

const selectedDurationPrice = computed(() => {
  if (product.value?.category === 'FF IDs') {
    return product.value.price || 0
  }
  return durations.value.find(d => d.id === selectedDuration.value)?.price || 0
})

const hasDiscount = computed(() => Boolean(product.value?.original_price))

function openYoutube() {
  if (product.value?.youtube_url) {
    window.open(product.value.youtube_url, '_blank')
  }
}

function onActivate() {
  if (!product.value) return
  if (product.value.category === 'FF IDs') {
    handleBuyNow(`${product.value.name}`, 'Free Fire ID')
  } else {
    const durationLabel = durations.value.find(d => d.id === selectedDuration.value)?.label
    handleBuyNow(`${product.value.name} (${durationLabel})`, product.value.category)
  }
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return
  
  // Wait a tick for DOM
  setTimeout(() => {
    $gsap.fromTo('.product-showcase', 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }
    )
    
    $gsap.fromTo('.product-info > *', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    )
  }, 100)
})
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  padding: 12rem 4vw 6rem;
  background: transparent;
  position: relative;
  overflow: hidden;
}

/* Background grid */
.product-page::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  z-index: 0;
  pointer-events: none;
}

.product-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .product-layout {
    grid-template-columns: 1.1fr 1fr;
    align-items: start;
  }
}

/* ── Left Showcase ── */
.product-showcase {
  position: relative;
}

.showcase-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(230,30,38,0.15) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
}

.showcase-inner {
  position: relative;
  z-index: 1;
  background: rgba(13, 12, 22, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
}

.discount-badge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #e61e26;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(230, 30, 38, 0.35);
}

.product-image {
  width: 100%;
  max-height: 380px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
  margin-bottom: 2.5rem;
  transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
  border-radius: 12px;
}

.product-image:hover {
  transform: scale(1.03) translateY(-4px);
}

.showcase-gallery {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-btn {
  width: 68px;
  height: 68px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 14, 26, 0.6);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.gallery-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-btn:hover {
  border-color: rgba(230, 30, 38, 0.5);
  background: rgba(230, 30, 38, 0.05);
}
.gallery-btn.active {
  border-color: #e61e26;
  box-shadow: 0 0 12px rgba(230, 30, 38, 0.25);
}

.play-btn {
  color: #cbd5e1;
}
.play-btn:hover {
  color: #fff;
  border-color: #ef4444;
}

/* ── Right Info ── */
.info-header {
  margin-bottom: 2.5rem;
}

.category-label {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff425f;
  background: rgba(230, 30, 38, 0.06);
  border: 1px solid rgba(230, 30, 38, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  margin-bottom: 1.25rem;
}

.product-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}

.product-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.price-block {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.current-price {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.old-price {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  color: #64748b;
  text-decoration: line-through;
  margin-bottom: 0.35rem;
}

.offer-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
  background: rgba(34, 197, 94, 0.05);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  margin-bottom: 0.4rem;
}

/* ── Duration Section ── */
.duration-section {
  margin-bottom: 2.5rem;
}

.section-label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  margin-bottom: 1rem;
}

.duration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}

.duration-card {
  background: rgba(13, 12, 22, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.duration-card:hover {
  border-color: rgba(230, 30, 38, 0.3);
  background: rgba(230, 30, 38, 0.02);
}

.duration-card--active {
  background: rgba(230, 30, 38, 0.05);
  border-color: #e61e26;
  box-shadow: 0 0 20px rgba(230, 30, 38, 0.15);
}

.dur-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  text-align: center;
}

.dur-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  background: rgba(255, 255, 255, 0.03);
  color: #94a3b8;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.dur-price {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  margin-top: 0.25rem;
}

/* ── Features & Support ── */
.features-section {
  background: rgba(13, 12, 22, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.75rem;
}

.features-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.5;
}

.feat-bullet {
  color: #ff425f;
  font-size: 0.75rem;
  margin-top: 2px;
}

.support-bullet {
  color: #22c55e;
  font-size: 0.9rem;
  font-weight: bold;
}

/* ── Actions ── */
.action-footer {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions-row-custom {
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
}

.actions-row-custom > * {
  flex: 1;
  width: 100%;
}

.buy-wrap-custom {
  position: relative;
  width: 100%;
}

/* Red YouTube Watch Demo Button */
.btn-yt-watch-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 99px; /* Rounded pill style */
  background: rgba(255, 0, 0, 0.06);
  border: 1.5px solid rgba(255, 0, 0, 0.22);
  color: rgba(255, 255, 255, 0.75);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-yt-watch-custom svg {
  color: #ff0000;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.btn-yt-watch-custom:hover {
  background: rgba(255, 0, 0, 0.12);
  border-color: rgba(255, 0, 0, 0.5);
  color: #fff;
  box-shadow: 0 6px 28px rgba(255, 0, 0, 0.2);
  transform: translateY(-2px);
}

.btn-yt-watch-custom:hover svg {
  transform: scale(1.15);
}

/* Blue Telegram Watch Demo Button */
.btn-telegram-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 99px; /* Rounded pill style */
  background: rgba(38, 165, 212, 0.06);
  border: 1.5px solid rgba(38, 165, 212, 0.22);
  color: rgba(255, 255, 255, 0.75);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-telegram-custom svg {
  color: #26a5d4;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.btn-telegram-custom:hover {
  background: rgba(38, 165, 212, 0.12);
  border-color: rgba(38, 165, 212, 0.5);
  color: #fff;
  box-shadow: 0 6px 28px rgba(38, 165, 212, 0.20);
  transform: translateY(-2px);
}

.btn-telegram-custom:hover svg {
  transform: scale(1.15);
}

/* Solid WhatsApp Green Buy Now Button */
.btn-activate-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: 99px; /* Rounded pill style */
  background: #25D366; /* WhatsApp Green */
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35);
}

.btn-activate-custom:hover {
  background: #20ba5a;
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(37, 211, 102, 0.55);
}

/* Pulse Expansion Animation for WhatsApp Green */
.pulse-ring-green-custom {
  position: absolute;
  inset: -4px;
  border-radius: 99px;
  border: 2px solid rgba(37, 211, 102, 0.5);
  animation: pulse-expand-green-custom 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse-expand-green-custom {
  0%   { transform: scale(1);    opacity: 0.8; }
  70%  { transform: scale(1.04); opacity: 0;   }
  100% { transform: scale(1.04); opacity: 0;   }
}

.btn-premium {
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-premium:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>
