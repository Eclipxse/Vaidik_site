<script setup lang="ts">
import { ref } from 'vue'
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'
import NumberTicker from '~/components/ui/inspira/NumberTicker.vue'
import ParticlesBg from '~/components/ui/inspira/ParticlesBg.vue'
import SpotlightCard from '~/components/ui/inspira/SpotlightCard.vue'

const showWizard = ref(false)
const showCompare = ref(false)

function scrollToCollection() {
  const target = document.getElementById('featured')
  if (!target) return

  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: -96 })
    return
  }

  target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero" aria-labelledby="hero-heading">
    <!-- Interactive Background Particles -->
    <ParticlesBg :quantity="60" color="#ff4136" :staticity="35" />

    <div class="hero-shell">
      <div class="hero-copy">
        <BlurReveal :delay="0.06" :duration="0.65">
          <div class="hero-kicker">
            <span class="live-dot" aria-hidden="true" />
            <span>INSTANT DELIVERY • 100% ANTI-BAN ACTIVE</span>
          </div>
        </BlurReveal>

        <BlurReveal :delay="0.14" :duration="0.72" blur="16px">
          <h1 id="hero-heading">
            Build your
            <span class="text-glow">advantage.</span>
          </h1>
        </BlurReveal>

        <BlurReveal :delay="0.22" :duration="0.68">
          <p class="hero-description">
            A state-of-the-art cyberpunk marketplace for PC, Android, and iOS cheat panels—backed by 1:1 setup guidance and stream-safe protection.
          </p>
        </BlurReveal>

        <BlurReveal :delay="0.3" :duration="0.64">
          <div class="hero-actions">
            <button class="btn-red" @click="scrollToCollection">
              Explore catalog
              <span aria-hidden="true">↓</span>
            </button>
            <button class="btn-outline" @click="showWizard = true">
              ⚡ Find My Panel (10s)
            </button>
            <button class="btn-outline" @click="showCompare = true">
              📊 Compare Specs
            </button>
          </div>
        </BlurReveal>

        <BlurReveal :delay="0.38" :duration="0.62">
          <dl class="hero-facts">
            <div>
              <dt><NumberTicker :value="8" suffix="+" /></dt>
              <dd>Panels &amp; Cheats</dd>
            </div>
            <div>
              <dt><NumberTicker :value="3" /></dt>
              <dd>Supported Platforms</dd>
            </div>
            <div>
              <dt>1:1</dt>
              <dd>WhatsApp Support</dd>
            </div>
          </dl>
        </BlurReveal>
      </div>

      <BlurReveal class="hero-visual-reveal" :delay="0.18" :duration="0.82" :y-offset="28">
        <SpotlightCard spotlight-color="rgba(255, 65, 54, 0.22)" border-color="rgba(255, 65, 54, 0.5)">
          <div class="hero-visual">
            <BorderBeam :duration="12" :size="190" color-from="#ff4136" color-to="#8ff0ae" />
            <div class="visual-topline">
              <span class="live-pill">FEATURED / PC STREAMER</span>
              <span class="visual-tag">AG—01</span>
            </div>

            <NuxtLink to="/products/pc-streamer-panel" class="visual-media">
              <img
                src="/products/PC_STREAMER_PANEL/streamer_panel.png"
                alt="Aslil Gang Streamer Panel product"
              />
            </NuxtLink>

            <div class="visual-footer">
              <div>
                <small>OBS &amp; Screen Share Safe</small>
                <strong>PC Streamer Panel</strong>
              </div>
              <NuxtLink to="/products/pc-streamer-panel" aria-label="View PC Streamer Panel">
                ↗
              </NuxtLink>
            </div>
          </div>
        </SpotlightCard>
      </BlurReveal>
    </div>

    <div class="hero-foot">
      <span>Aslil Gang / India</span>
      <span class="hero-foot__rule" aria-hidden="true" />
      <button @click="scrollToCollection">
        Scroll to discover
        <span aria-hidden="true">↓</span>
      </button>
    </div>

    <!-- Modals -->
    <CompatibilityWizard v-if="showWizard" @close="showWizard = false" />
    <ProductComparisonModal v-if="showCompare" @close="showCompare = false" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 9rem 1.5rem 3rem;
  background:
    linear-gradient(rgba(245, 244, 239, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 244, 239, 0.025) 1px, transparent 1px),
    #0a0a0b;
  background-size: 72px 72px;
}

.hero::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 32%;
  background: linear-gradient(to top, #0a0a0b, transparent);
  content: '';
  pointer-events: none;
}

.hero-shell {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(420px, 0.78fr);
  align-items: center;
  gap: clamp(3rem, 7vw, 8rem);
  width: min(1320px, 100%);
  margin: 0 auto;
}

.hero-copy {
  min-width: 0;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 99px;
  color: var(--gray-lt);
  background: rgba(17, 17, 19, 0.7);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  backdrop-filter: blur(10px);
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8ff0ae;
  box-shadow: 0 0 10px #8ff0ae;
  animation: pulse 2s infinite ease-in-out;
}

.hero h1 {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0 0;
  font-size: clamp(4.5rem, 8.5vw, 9rem);
  line-height: 0.8;
  letter-spacing: -0.08em;
}

.text-glow {
  color: var(--red);
  text-shadow: 0 0 35px rgba(255, 65, 54, 0.35);
}

.hero-description {
  max-width: 590px;
  margin: 1.8rem 0 0;
  color: var(--gray-lt);
  font-size: clamp(0.96rem, 1.3vw, 1.1rem);
  line-height: 1.72;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: min(610px, 100%);
  margin: 3rem 0 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.hero-facts div {
  padding: 1.1rem 1.1rem 0 0;
}

.hero-facts div + div {
  padding-left: 1.1rem;
  border-left: 1px solid var(--line);
}

.hero-facts dt {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  letter-spacing: -0.045em;
}

.hero-facts dd {
  margin: 0.3rem 0 0;
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-visual-reveal {
  min-width: 0;
}

.hero-visual {
  position: relative;
  padding: 0.7rem;
}

.visual-topline,
.visual-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.visual-topline {
  min-height: 42px;
  padding: 0 0.55rem;
  color: var(--gray);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.live-pill {
  color: var(--red-bright);
}

.visual-media {
  display: block;
  height: clamp(380px, 52vh, 620px);
  overflow: hidden;
  border-radius: 12px;
  background: #080809;
}

.visual-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) contrast(1.02);
  transition: transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 300ms ease;
}

.visual-media:hover img {
  filter: saturate(1);
  transform: scale(1.025);
}

.visual-footer {
  min-height: 64px;
  padding: 0.65rem 0.55rem 0.1rem;
}

.visual-footer > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.visual-footer small {
  color: var(--gray);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.visual-footer strong {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.visual-footer > a {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--white);
  text-decoration: none;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.visual-footer > a:hover {
  border-color: var(--red);
  background: var(--red);
}

.hero-foot {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: min(1320px, 100%);
  margin: 2.8rem auto 0;
  color: var(--gray);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-foot__rule {
  height: 1px;
  flex: 1;
  background: var(--line);
}

.hero-foot button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-transform: inherit;
  cursor: pointer;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 1050px) {
  .hero {
    padding-top: 8.5rem;
  }
  .hero-shell {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .hero-copy {
    max-width: 850px;
  }
  .hero-visual-reveal {
    width: min(100%, 760px);
    margin-left: auto;
  }
  .visual-media {
    height: clamp(430px, 68vw, 670px);
  }
}
</style>
