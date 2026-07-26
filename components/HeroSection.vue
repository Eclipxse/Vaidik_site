<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'
import ParticlesBg from '~/components/ui/inspira/ParticlesBg.vue'

const showWizard = ref(false)
const heroRef = ref<HTMLElement | null>(null)

function handlePointerMove(event: PointerEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  heroRef.value.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
  heroRef.value.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
}

function scrollToCollection() {
  const target = document.getElementById('featured')
  if (!target) return

  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: -106 })
    return
  }

  target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    aria-labelledby="hero-heading"
    @pointermove="handlePointerMove"
  >
    <div class="hero-ambient" aria-hidden="true">
      <span class="hero-aura hero-aura--one" />
      <span class="hero-aura hero-aura--two" />
      <span class="hero-grid" />
      <span class="hero-orbit hero-orbit--one" />
      <span class="hero-orbit hero-orbit--two" />
      <span class="hero-orbit hero-orbit--three" />
      <span class="hero-pointer" />
      <ParticlesBg :quantity="48" color="#ff4a46" :staticity="55" :ease="80" />
    </div>

    <Motion
      as="aside"
      class="hero-float hero-float--left"
      :initial="{ opacity: 0, x: -22, rotate: -8 }"
      :animate="{ opacity: 1, x: 0, rotate: -5 }"
      :transition="{ delay: 0.55, type: 'spring', stiffness: 120, damping: 18 }"
    >
      <NuxtLink to="/products/pc-external-panel">
        <img src="/products/PC_EXTERNAL PANEL/External.png" alt="" />
        <span>
          <small>PC / Featured</small>
          External Panel
        </span>
        <i aria-hidden="true">↗</i>
      </NuxtLink>
    </Motion>

    <Motion
      as="aside"
      class="hero-float hero-float--right"
      :initial="{ opacity: 0, x: 22, rotate: 8 }"
      :animate="{ opacity: 1, x: 0, rotate: 5 }"
      :transition="{ delay: 0.64, type: 'spring', stiffness: 120, damping: 18 }"
    >
      <NuxtLink to="/cheats/ios">
        <img src="/products/IOS_PANEL/IOSPANEL.png" alt="" />
        <span>
          <small>Apple / Mobile</small>
          iOS Panel
        </span>
        <i aria-hidden="true">↗</i>
      </NuxtLink>
    </Motion>

    <div class="hero-shell">
      <BlurReveal :delay="0.04" :duration="0.62">
        <div class="hero-brand">
          <span class="hero-brand__logo">
            <img src="/brand/aslil-logo.png" alt="" />
          </span>
          <span>Aslil Gang / Panel Store</span>
          <i aria-hidden="true" />
          <small>Online now</small>
        </div>
      </BlurReveal>

      <h1 id="hero-heading">
        <BlurReveal :delay="0.1" :duration="0.82" blur="14px" :y-offset="32">
          <span class="hero-title hero-title--light">ASLIL GANG</span>
        </BlurReveal>
        <BlurReveal :delay="0.16" :duration="0.86" blur="16px" :y-offset="38">
          <span class="hero-title hero-title--red">PANEL</span>
        </BlurReveal>
      </h1>

      <BlurReveal :delay="0.24" :duration="0.62">
        <p class="hero-description">
          Premium PC, Android and iOS panels presented clearly, backed by
          direct compatibility checks and one-to-one setup support.
        </p>
      </BlurReveal>

      <BlurReveal :delay="0.3" :duration="0.58">
        <div class="hero-actions">
          <button class="btn-red hero-primary" type="button" @click="scrollToCollection">
            Explore the collection
            <span aria-hidden="true">↓</span>
          </button>
          <button class="btn-outline" type="button" @click="showWizard = true">
            Find my setup
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </BlurReveal>

      <BlurReveal :delay="0.36" :duration="0.56">
        <div class="hero-proof">
          <span><i /> Catalog online</span>
          <span>PC / Android / iOS</span>
          <span>Direct WhatsApp guidance</span>
        </div>
      </BlurReveal>
    </div>

    <div class="hero-edge hero-edge--left" aria-hidden="true">
      <span>AG / 2026</span>
    </div>
    <div class="hero-edge hero-edge--right" aria-hidden="true">
      <span>Scroll to explore</span>
    </div>

    <button class="scroll-cue" type="button" aria-label="Scroll to featured products" @click="scrollToCollection">
      <span />
      Explore
    </button>

    <div class="hero-frame" aria-hidden="true">
      <BorderBeam :duration="18" :size="220" color-from="#ff2d2d" color-to="#f6f1e8" :border-width="1" />
    </div>

    <CompatibilityWizard v-if="showWizard" @close="showWizard = false" />
  </section>
</template>

<style scoped>
.hero {
  --pointer-x: 50%;
  --pointer-y: 45%;
  position: relative;
  display: grid;
  min-height: max(760px, 100svh);
  place-items: center;
  overflow: hidden;
  padding: 10rem 2rem 5rem;
  background: #070708;
  isolation: isolate;
}

.hero::after {
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 22%;
  background: linear-gradient(to top, #070708 8%, transparent);
  content: '';
  pointer-events: none;
}

.hero-ambient,
.hero-ambient > span {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-ambient {
  z-index: -2;
  overflow: hidden;
}

.hero-aura {
  border-radius: 50%;
  filter: blur(58px);
  opacity: 0.6;
}

.hero-aura--one {
  inset: 8% 22% 18%;
  background: radial-gradient(circle, rgba(255, 30, 36, 0.3), rgba(96, 0, 12, 0.08) 48%, transparent 72%);
  animation: aura-breathe 11s ease-in-out infinite;
}

.hero-aura--two {
  top: 18%;
  right: -12%;
  bottom: 4%;
  left: 65%;
  background: radial-gradient(circle, rgba(201, 8, 24, 0.18), transparent 64%);
  animation: aura-drift 16s ease-in-out infinite alternate;
}

.hero-grid {
  top: 42%;
  right: -16%;
  bottom: -38%;
  left: -16%;
  background:
    linear-gradient(rgba(255, 61, 61, 0.11) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 61, 61, 0.11) 1px, transparent 1px);
  background-size: 62px 62px;
  mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 28%, #000 62%, transparent 100%);
  transform: perspective(420px) rotateX(64deg) scale(1.2);
  transform-origin: center bottom;
  animation: grid-travel 14s linear infinite;
}

.hero-orbit {
  top: 18%;
  right: 8%;
  bottom: 8%;
  left: 8%;
  border: 1px solid rgba(255, 69, 69, 0.14);
  border-radius: 50%;
  transform: rotate(-10deg);
}

.hero-orbit::before {
  position: absolute;
  top: 48%;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 16px rgba(255, 45, 45, 0.9);
  content: '';
}

.hero-orbit--one {
  animation: orbit-rotate 28s linear infinite;
}

.hero-orbit--two {
  inset: 28% 20% 16%;
  border-color: rgba(246, 241, 232, 0.08);
  transform: rotate(14deg);
  animation: orbit-rotate-reverse 34s linear infinite;
}

.hero-orbit--three {
  inset: 12% 28% 26%;
  border-color: rgba(255, 45, 45, 0.09);
  transform: rotate(78deg);
  animation: orbit-rotate 42s linear infinite;
}

.hero-pointer {
  background: radial-gradient(360px circle at var(--pointer-x) var(--pointer-y), rgba(255, 63, 63, 0.09), transparent 72%);
  transition: background-position 120ms linear;
}

.hero-shell {
  position: relative;
  z-index: 4;
  display: flex;
  width: min(1120px, 100%);
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.hero-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.62rem;
  padding: 0.38rem 0.72rem 0.38rem 0.4rem;
  border: 1px solid rgba(246, 241, 232, 0.13);
  border-radius: 999px;
  color: rgba(246, 241, 232, 0.72);
  background: rgba(10, 10, 12, 0.58);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(16px);
}

.hero-brand__logo {
  width: 28px;
  height: 28px;
  overflow: hidden;
  border: 1px solid rgba(246, 241, 232, 0.2);
  border-radius: 50%;
}

.hero-brand img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-brand i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(84, 230, 139, 0.72);
}

.hero-brand small {
  color: var(--green);
  font: inherit;
}

.hero h1 {
  width: 100%;
  margin: 1.4rem 0 0;
  line-height: 0.72;
}

.hero h1 > :deep(*) {
  display: block;
}

.hero-title {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(6.4rem, 14vw, 13.6rem);
  font-weight: 800;
  letter-spacing: -0.075em;
  text-transform: uppercase;
  white-space: nowrap;
}

.hero-title--light {
  color: var(--white);
  text-shadow: 0 12px 70px rgba(0, 0, 0, 0.52);
}

.hero-title--red {
  position: relative;
  font-size: clamp(7.5rem, 17vw, 15rem);
  letter-spacing: -0.025em;
  color: transparent;
  background:
    linear-gradient(180deg, #ff6b62 0%, #ff302f 48%, #c30c19 100%);
  background-clip: text;
  filter: drop-shadow(0 18px 32px rgba(177, 6, 20, 0.28));
}

.hero-description {
  max-width: 650px;
  margin: 2.2rem 0 0;
  color: rgba(246, 241, 232, 0.67);
  font-size: clamp(0.92rem, 1.15vw, 1.03rem);
  line-height: 1.72;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.72rem;
  margin-top: 1.8rem;
}

.hero-actions button span {
  font-size: 1rem;
}

.hero-primary {
  min-width: 218px;
}

.hero-proof {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: 2.4rem;
  border-top: 1px solid rgba(246, 241, 232, 0.11);
  border-bottom: 1px solid rgba(246, 241, 232, 0.11);
}

.hero-proof span {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.45rem;
  padding: 0 1rem;
  color: rgba(246, 241, 232, 0.5);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-proof span + span {
  border-left: 1px solid rgba(246, 241, 232, 0.11);
}

.hero-proof i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
}

.hero-float {
  position: absolute;
  z-index: 3;
  width: 190px;
}

.hero-float--left {
  top: 31%;
  left: max(2rem, calc((100vw - 1500px) / 2));
}

.hero-float--right {
  top: 48%;
  right: max(2rem, calc((100vw - 1500px) / 2));
}

.hero-float a {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  gap: 0.65rem;
  padding: 0.52rem;
  border: 1px solid rgba(246, 241, 232, 0.14);
  border-radius: 16px;
  color: var(--white);
  background: rgba(12, 12, 15, 0.68);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.36);
  text-decoration: none;
  backdrop-filter: blur(18px);
  transition: border-color 200ms ease, transform 200ms ease;
}

.hero-float a:hover {
  border-color: rgba(255, 70, 65, 0.5);
  transform: translateY(-4px);
}

.hero-float img {
  width: 50px;
  height: 58px;
  border-radius: 10px;
  object-fit: cover;
}

.hero-float span {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.18rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1;
}

.hero-float small {
  overflow: hidden;
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.43rem;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.hero-float i {
  color: rgba(246, 241, 232, 0.6);
  font-style: normal;
}

.hero-edge {
  position: absolute;
  z-index: 4;
  bottom: 2rem;
  color: rgba(246, 241, 232, 0.34);
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.hero-edge--left {
  left: 1.4rem;
  transform: rotate(180deg);
}

.hero-edge--right {
  right: 1.4rem;
}

.scroll-cue {
  position: absolute;
  z-index: 5;
  bottom: 1.35rem;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0;
  border: 0;
  color: rgba(246, 241, 232, 0.45);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transform: translateX(-50%);
  cursor: pointer;
}

.scroll-cue span {
  position: relative;
  width: 22px;
  height: 34px;
  border: 1px solid rgba(246, 241, 232, 0.2);
  border-radius: 999px;
}

.scroll-cue span::after {
  position: absolute;
  top: 7px;
  left: 9px;
  width: 2px;
  height: 7px;
  border-radius: 2px;
  background: var(--red-bright);
  animation: scroll-dot 1.8s ease-in-out infinite;
  content: '';
}

.hero-frame {
  position: absolute;
  z-index: 2;
  inset: 7.8rem 1.25rem 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(246, 241, 232, 0.07);
  border-radius: 26px;
  pointer-events: none;
}

@keyframes aura-breathe {
  0%, 100% { opacity: 0.42; transform: scale(0.92); }
  50% { opacity: 0.72; transform: scale(1.08); }
}

@keyframes aura-drift {
  to { transform: translate3d(-12%, 8%, 0) scale(1.14); }
}

@keyframes grid-travel {
  to { background-position: 0 62px, 62px 0; }
}

@keyframes orbit-rotate {
  to { transform: rotate(350deg); }
}

@keyframes orbit-rotate-reverse {
  to { transform: rotate(-346deg); }
}

@keyframes scroll-dot {
  0%, 100% { opacity: 0.25; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(10px); }
}

@media (max-width: 1220px) {
  .hero-float {
    display: none;
  }
}

@media (max-width: 760px) {
  .hero {
    min-height: 820px;
    padding: 8.7rem 1rem 5rem;
  }

  .hero-frame {
    inset: 7.2rem 0.65rem 0.65rem;
    border-radius: 20px;
  }

  .hero-brand small,
  .hero-brand > i {
    display: none;
  }

  .hero h1 {
    margin-top: 1.6rem;
    line-height: 0.79;
  }

  .hero-title {
    font-size: clamp(2.95rem, 14.8vw, 5.2rem);
    white-space: nowrap;
  }

  .hero-title--red {
    font-size: clamp(4.2rem, 22vw, 7rem);
  }

  .hero-description {
    max-width: 460px;
    margin-top: 1.7rem;
    font-size: 0.87rem;
  }

  .hero-actions {
    width: min(100%, 390px);
  }

  .hero-actions button {
    width: 100%;
  }

  .hero-proof {
    width: min(100%, 440px);
    overflow-x: auto;
  }

  .hero-proof span {
    flex: 0 0 auto;
    min-height: 40px;
    padding: 0 0.7rem;
    font-size: 0.43rem;
  }

  .hero-proof span:last-child {
    display: none;
  }

  .hero-edge {
    display: none;
  }

  .hero-orbit {
    inset: 22% -20% 16%;
  }

  .hero-grid {
    top: 50%;
  }
}
</style>
