<template>
  <section class="hero" aria-labelledby="hero-heading">
    <div class="hero-grid" aria-hidden="true" />
    <div class="hero-glow" aria-hidden="true" />

    <div class="hero-inner">
      <div class="hero-copy">
        <div class="hero-eyebrow hero-animate">
          <span class="eyebrow-dot" aria-hidden="true" />
          Built for serious Free Fire players
        </div>

        <h1 id="hero-heading" class="hero-title">
          <span class="hero-animate">Play sharp.</span>
          <span class="hero-animate title-accent">Stay ahead.</span>
        </h1>

        <p class="hero-description hero-animate">
          Premium panels, player IDs and reseller access—curated in one
          high-performance storefront with direct support when you need it.
        </p>

        <div class="hero-actions hero-animate">
          <button class="btn-red" @click="scrollToCollection">
            Explore the collection
            <span aria-hidden="true">↓</span>
          </button>
          <NuxtLink to="/reseller" class="btn-outline">
            Become a reseller
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </div>

        <dl class="hero-proof hero-animate" aria-label="Store highlights">
          <div v-for="item in proof" :key="item.label">
            <dt>{{ item.value }}</dt>
            <dd>{{ item.label }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero-visual hero-animate">
        <div class="visual-meta">
          <span>Featured drop</span>
          <span>01 / 04</span>
        </div>

        <NuxtLink to="/pc-panel" class="visual-frame" aria-label="Explore PC panels">
          <img
            src="/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/VISIBLE_AIMBOT_INTERNAL.png"
            alt="Aslil Gang Visible Aimbot Internal panel package"
          />
          <div class="visual-shade" aria-hidden="true" />
          <div class="visual-caption">
            <span class="visual-kicker">PC collection</span>
            <strong>Precision, packaged.</strong>
            <span class="visual-link">View panels ↗</span>
          </div>
        </NuxtLink>

        <div class="visual-note visual-note--top">
          <span class="note-icon">✓</span>
          <span>
            <strong>Direct support</strong>
            <small>Before and after purchase</small>
          </span>
        </div>

        <div class="visual-note visual-note--bottom">
          <span class="note-pulse" aria-hidden="true" />
          <span>
            <strong>Fast checkout</strong>
            <small>Order through WhatsApp</small>
          </span>
        </div>
      </div>
    </div>

    <div class="hero-bottom" aria-hidden="true">
      <span>Aslil Gang / India</span>
      <span class="hero-bottom__line" />
      <span>Scroll to explore</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const proof = [
  { value: '2K+', label: 'Customers served' },
  { value: '24/7', label: 'Human support' },
  { value: '8+', label: 'Curated panels' },
]

function scrollToCollection() {
  const collection = document.getElementById('collection')
  if (!collection) return

  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) {
    lenis.scrollTo(collection, { offset: -80 })
    return
  }

  collection.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    $gsap.set('.hero-animate', { opacity: 1, y: 0 })
    return
  }

  $gsap.fromTo(
    '.hero-animate',
    { opacity: 0, y: 26 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.09,
      delay: 0.12,
      ease: 'power3.out',
    },
  )
})
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: center;
  overflow: hidden;
  padding: 8.75rem 1.5rem 5.5rem;
  isolation: isolate;
}

.hero::before {
  position: absolute;
  z-index: -2;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.6) 46%, transparent 78%),
    radial-gradient(circle at 72% 38%, rgba(255, 52, 65, 0.18), transparent 30%);
  content: '';
}

.hero-grid {
  position: absolute;
  z-index: -3;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 20%, transparent 92%);
}

.hero-glow {
  position: absolute;
  z-index: -1;
  top: 7%;
  right: -14%;
  width: min(60vw, 900px);
  aspect-ratio: 1;
  border: 1px solid rgba(255, 52, 65, 0.11);
  border-radius: 50%;
  box-shadow:
    0 0 0 90px rgba(255, 52, 65, 0.025),
    0 0 0 180px rgba(255, 52, 65, 0.015);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(420px, 0.82fr);
  align-items: center;
  gap: clamp(3rem, 7vw, 7.5rem);
  width: min(1320px, 100%);
  margin: 0 auto;
}

.hero-copy {
  position: relative;
  z-index: 2;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.6rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.eyebrow-dot {
  width: 8px;
  height: 8px;
  border: 2px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 16px rgba(255, 52, 65, 0.72);
}

.hero-title {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-size: clamp(4.2rem, 8.4vw, 8.4rem);
  line-height: 0.82;
  letter-spacing: -0.075em;
  text-transform: uppercase;
}

.hero-title > span {
  display: block;
}

.title-accent {
  color: var(--red);
  background: linear-gradient(110deg, #ff6871 0%, var(--red) 48%, #b50616 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  max-width: 620px;
  margin: 2rem 0 0;
  color: var(--gray-lt);
  font-size: clamp(0.98rem, 1.4vw, 1.12rem);
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2.1rem;
}

.hero-proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(590px, 100%);
  margin: 3.2rem 0 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.hero-proof div {
  padding: 1.25rem 1rem 0 0;
}

.hero-proof div + div {
  padding-left: 1.25rem;
  border-left: 1px solid var(--line);
}

.hero-proof dt {
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.5vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.hero-proof dd {
  margin: 0.25rem 0 0;
  color: var(--gray);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-visual {
  position: relative;
  min-width: 0;
}

.visual-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.visual-frame {
  position: relative;
  display: block;
  aspect-ratio: 0.87;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 26px;
  color: #fff;
  background: #111;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.56),
    0 0 0 8px rgba(255, 255, 255, 0.025);
  text-decoration: none;
  transform: perspective(1100px) rotateY(-4deg) rotateX(1deg);
  transition: transform 500ms cubic-bezier(0.2, 0.75, 0.2, 1), border-color 240ms ease;
}

.visual-frame:hover {
  border-color: rgba(255, 52, 65, 0.45);
  transform: perspective(1100px) rotateY(0) rotateX(0) translateY(-4px);
}

.visual-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.84) contrast(1.04);
  transition: transform 700ms cubic-bezier(0.2, 0.75, 0.2, 1), filter 500ms ease;
}

.visual-frame:hover img {
  filter: saturate(1) contrast(1.02);
  transform: scale(1.025);
}

.visual-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(4, 4, 5, 0.97) 0%, rgba(4, 4, 5, 0.15) 46%, transparent 70%),
    linear-gradient(135deg, transparent 55%, rgba(255, 52, 65, 0.14));
}

.visual-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 0.35rem 1rem;
  padding: 1.7rem;
}

.visual-kicker {
  grid-column: 1 / -1;
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.visual-caption strong {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 3vw, 2.2rem);
  letter-spacing: -0.045em;
}

.visual-link {
  color: var(--gray-lt);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.visual-note {
  position: absolute;
  z-index: 3;
  display: flex;
  min-width: 210px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 14px;
  background: rgba(10, 10, 11, 0.88);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(16px);
}

.visual-note--top {
  top: 13%;
  right: -2rem;
}

.visual-note--bottom {
  bottom: 18%;
  left: -2.75rem;
}

.visual-note > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.visual-note strong {
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.76rem;
}

.visual-note small {
  color: var(--gray);
  font-size: 0.62rem;
}

.note-icon {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  color: #0b1710;
  background: #54e789;
  font-size: 0.8rem;
  font-weight: 800;
}

.note-pulse {
  width: 10px;
  height: 10px;
  margin: 0 0.6rem;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 0 7px rgba(255, 52, 65, 0.12), 0 0 20px rgba(255, 52, 65, 0.64);
}

.hero-bottom {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: min(1320px, calc(100% - 3rem));
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.34);
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-bottom__line {
  height: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
}

.hero-animate {
  opacity: 0;
}

@media (max-width: 1080px) {
  .hero {
    min-height: auto;
    padding-top: 9rem;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 4.5rem;
  }

  .hero-copy {
    max-width: 840px;
  }

  .hero-visual {
    width: min(660px, 92%);
    margin: 0 auto;
  }

  .visual-frame {
    aspect-ratio: 1.05;
    transform: none;
  }
}

@media (max-width: 680px) {
  .hero {
    padding: 7.5rem 1rem 4.5rem;
  }

  .hero-title {
    font-size: clamp(3.2rem, 16vw, 5.2rem);
    line-height: 0.87;
  }

  .hero-description {
    margin-top: 1.5rem;
    font-size: 0.92rem;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-actions > * {
    width: 100%;
  }

  .hero-proof {
    margin-top: 2.3rem;
  }

  .hero-proof div {
    padding-right: 0.5rem;
  }

  .hero-proof div + div {
    padding-left: 0.7rem;
  }

  .hero-proof dt {
    font-size: 1.2rem;
  }

  .hero-proof dd {
    font-size: 0.54rem;
  }

  .hero-visual {
    width: 100%;
  }

  .visual-frame {
    aspect-ratio: 0.9;
    border-radius: 20px;
  }

  .visual-caption {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .visual-note {
    display: none;
  }

  .hero-bottom {
    display: none;
  }
}
</style>
