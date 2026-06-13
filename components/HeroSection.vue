<template>
  <section class="hero" aria-label="Hero section">

    <!-- Animated particle canvas -->
    <canvas ref="canvasEl" class="hero-canvas" aria-hidden="true" />

    <!-- Floating orbs background -->
    <div class="orb orb-1" aria-hidden="true" />
    <div class="orb orb-2" aria-hidden="true" />
    <div class="orb orb-3" aria-hidden="true" />

    <!-- Grid overlay -->
    <div class="hero-grid" aria-hidden="true" />

    <!-- Futuristic Left-Side Patriotic Shield -->
    <div class="patriotic-side-shield" ref="prideBadgeEl">
      <!-- Flag Container -->
      <div class="shield-flag-wrap">
        <img src="/indian_flag_waving.png" alt="Patriotic Pride Flag" class="shield-flag" />
        <div class="glow-overlay"></div>
      </div>
      
      <!-- Written Content -->
      <div class="shield-content">
        <div class="shield-tag">🇮🇳 OFFICIAL PRIDE</div>
        <h2 class="shield-main-title">ASLIL GANG</h2>
        <p class="shield-sub-title">THE BEST IN INDIA</p>
        
        <div class="shield-divider"></div>
        
        <ul class="shield-points">
          <li>
            <span class="bullet saffron-dot"></span>
            <strong>TOP 1 PANEL SELLER</strong>
          </li>
          <li>
            <span class="bullet white-dot"></span>
            <strong>BEST OF THE BEST</strong>
          </li>
          <li>
            <span class="bullet green-dot"></span>
            <strong>100% LEGIT &amp; UNDETECTED</strong>
          </li>
          <li style="gap: 8px;">
            <svg class="bullet-tick-svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px #22c55e); flex-shrink: 0; margin-left: -2px; margin-right: 2px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <strong>ALL SERVER SAFE &amp; 100% TRUSTED SELLER</strong>
          </li>
        </ul>
      </div>
    </div>

    <!-- Badge -->
    <div class="hero-badge" ref="badgeEl">
      <span class="badge-pulse" />
      <span>India's No.1 Panel</span>
      <span class="badge-sep">·</span>
      <span>Undetected</span>
      <span class="badge-sep">·</span>
      <span>Instant Delivery</span>
    </div>

    <!-- Giant headline with char-by-char reveal -->
    <h1 class="hero-headline" ref="headlineEl">
      <span class="headline-line">
        <span
          v-for="(ch, i) in 'ASLIL GANG'.split('')"
          :key="'r-'+i"
          class="hero-char hero-char--red"
          :style="{ '--i': i }"
        >{{ ch === ' ' ? '\u00a0' : ch }}</span>
      </span>
      <span class="headline-line">
        <span
          v-for="(ch, i) in 'PANEL.'.split('')"
          :key="'w-'+i"
          class="hero-char hero-char--white"
          :style="{ '--i': i }"
        >{{ ch }}</span>
      </span>
    </h1>

    <!-- Typewriter subtitle -->
    <p class="hero-sub" ref="subEl">
      <span class="typewriter" ref="typeEl" />
      <span class="cursor-blink">_</span>
    </p>

    <!-- Description -->
    <p class="hero-desc" ref="descEl">
      Premium Free Fire cheats, accounts &amp; subscriptions.
      <strong>Instant delivery.</strong> Secure &amp; undetected.
    </p>

    <!-- CTA Buttons -->
    <div class="hero-actions" ref="actionsEl">
      <button class="btn-red btn-glow" @click="handleBrowseCollection">
        <span>Browse Collection</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
      <NuxtLink to="/reseller" class="btn-outline">
        Reseller Plan
      </NuxtLink>
    </div>

    <!-- Animated stats bar -->
    <div class="stats-bar" ref="statsEl">
      <div v-for="stat in stats" :key="stat.label" class="stat-item">
        <span class="stat-num">
          {{ stat.label === 'Uptime' ? stat.current.toFixed(1) : Math.round(stat.current) }}{{ stat.suffix }}
        </span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-hint" ref="scrollHintEl" aria-hidden="true">
      <span>SCROLL</span>
      <div class="scroll-line">
        <div class="scroll-dot" />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const { handleBuyNow } = useWhatsApp()
const mobileOpen = useState('mobileOpen', () => false)

function handleBrowseCollection() {
  if (window.innerWidth >= 992) {
    const el = document.getElementById('arsenal')
    if (el) {
      const lenis = (useNuxtApp() as any).$lenis
      if (lenis) {
        lenis.scrollTo(el)
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  } else {
    mobileOpen.value = true
  }
}

const canvasEl    = ref<HTMLCanvasElement | null>(null)
const badgeEl     = ref<HTMLElement | null>(null)
const headlineEl  = ref<HTMLElement | null>(null)
const subEl       = ref<HTMLElement | null>(null)
const typeEl      = ref<HTMLElement | null>(null)
const descEl      = ref<HTMLElement | null>(null)
const actionsEl   = ref<HTMLElement | null>(null)
const statsEl     = ref<HTMLElement | null>(null)
const scrollHintEl = ref<HTMLElement | null>(null)
const prideBadgeEl = ref<HTMLElement | null>(null)
const stats = ref([
  { display: '2K+',   label: 'Happy Customers',  end: 2,    current: 0, suffix: 'K+' },
  { display: '99.9%', label: 'Uptime',           end: 99.9, current: 0, suffix: '%' },
  { display: '8+',    label: 'Cheat Panels',     end: 8,    current: 0, suffix: '+' },
  { display: '24/7',  label: 'Support',          end: 24,   current: 0, suffix: '/7' },
])

const typewriterTexts = [
  'Best Than Any Other Panel Out There.',
  'Undetected. Always Updated.',
  'Instant Delivery. Premium Quality.',
]

// ── Particle canvas ──────────────────────────────────────
function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let W = canvas.width = window.innerWidth
  let H = canvas.height = window.innerHeight

  const resize = () => {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize, { passive: true })

  interface Particle {
    x: number; y: number
    vx: number; vy: number
    size: number; alpha: number
    color: string
  }

  const count = Math.min(80, Math.floor(W * H / 14000))
  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.7 ? '#E61E26' : '#ffffff',
  }))

  let raf: number
  function draw() {
    ctx!.clearRect(0, 0, W, H)
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx!.fillStyle = p.color
      ctx!.globalAlpha = p.alpha
      ctx!.fill()
    }
    // Draw connecting lines between close particles
    ctx!.globalAlpha = 1
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx!.beginPath()
          ctx!.moveTo(particles[i].x, particles[i].y)
          ctx!.lineTo(particles[j].x, particles[j].y)
          ctx!.strokeStyle = `rgba(230,30,38,${0.07 * (1 - dist / 120)})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }
    raf = requestAnimationFrame(draw)
  }
  draw()
  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  })
}

// ── Typewriter ───────────────────────────────────────────
function startTypewriter(el: HTMLElement) {
  let textIdx = 0, charIdx = 0, deleting = false
  const speed = { type: 55, delete: 30, pause: 2200 }

  function tick() {
    const text = typewriterTexts[textIdx]
    if (!deleting) {
      el.textContent = text.slice(0, ++charIdx)
      if (charIdx === text.length) {
        deleting = true
        setTimeout(tick, speed.pause)
        return
      }
    } else {
      el.textContent = text.slice(0, --charIdx)
      if (charIdx === 0) {
        deleting = false
        textIdx = (textIdx + 1) % typewriterTexts.length
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type)
  }
  tick()
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
  const useLightEffects = prefersReducedMotion || isMobile

  if (canvasEl.value && !useLightEffects) initParticles(canvasEl.value)
  if (typeEl.value) {
    if (useLightEffects) typeEl.value.textContent = typewriterTexts[0]
    else setTimeout(() => startTypewriter(typeEl.value!), 1800)
  }

  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  if (prefersReducedMotion) {
    $gsap.set([
      badgeEl.value, subEl.value, descEl.value, actionsEl.value,
      prideBadgeEl.value, statsEl.value, scrollHintEl.value,
      '.hero-char--red', '.hero-char--white',
    ], { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0 })
    stats.value.forEach(stat => { stat.current = stat.end })
    return
  }

  // ── Master intro timeline ────────────────────────────
  const tl = $gsap.timeline({ defaults: { ease: 'power4.out' } })

  // Badge slides in from top
  tl.fromTo(badgeEl.value,
    { opacity: 0, y: -30, scale: 0.9 },
    { opacity: 1,  y: 0,  scale: 1, duration: 0.9 }
  )

  // Chars animate in one by one
  .fromTo('.hero-char--red',
    { opacity: 0, y: 80, rotationX: -40 },
    { opacity: 1, y: 0,  rotationX: 0,
      duration: 0.7, stagger: 0.04, ease: 'back.out(1.5)' },
    '-=0.3'
  )
  .fromTo('.hero-char--white',
    { opacity: 0, y: 80, rotationX: -40 },
    { opacity: 1, y: 0,  rotationX: 0,
      duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' },
    '-=0.5'
  )

  // Sub + desc
  .fromTo([subEl.value, descEl.value],
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.18 },
    '-=0.3'
  )

  // Buttons with slight elastic bounce
  .fromTo(actionsEl.value,
    { opacity: 0, y: 24, scale: 0.94 },
    { opacity: 1, y: 0,  scale: 1, duration: 0.8, ease: 'back.out(1.6)' },
    '-=0.4'
  )

  // Pride Badge floating slide-in from left
  .fromTo(prideBadgeEl.value,
    { opacity: 0, x: -60, scale: 0.95 },
    { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.4)' },
    '-=0.7'
  )

  // Stats bar slides up
  .fromTo(statsEl.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.4'
  )

  // Trigger reactive count up when stats bar starts animating
  tl.call(() => {
    stats.value.forEach((stat) => {
      $gsap.to(stat, {
        current: stat.end,
        duration: 1.5,
        ease: 'power2.out',
        snap: { current: stat.label === 'Uptime' ? 0.1 : 1 }
      })
    })
  }, [], '-=0.4')

  // Scroll hint
  .fromTo(scrollHintEl.value,
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    '-=0.2'
  )

  // ── Orb float animations ─────────────────────────────
  if (!useLightEffects) {
    $gsap.to('.orb-1', { y: -30, x: 15,  duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    $gsap.to('.orb-2', { y: 25,  x: -20, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 })
    $gsap.to('.orb-3', { y: -20, x: 10,  duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })
  }

  // ── Btn glow pulse ───────────────────────────────────
  if (!useLightEffects) {
    $gsap.to('.btn-glow', {
      boxShadow: '0 0 50px rgba(230,30,38,0.7), 0 4px 24px rgba(230,30,38,0.5)',
      duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1
    })
  }
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10rem 2rem 8rem;
  position: relative;
  overflow: hidden;
}

/* ── Canvas ── */
.hero-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

/* ── Floating orbs ── */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  z-index: 0;
}

.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(230,30,38,0.25) 0%, transparent 70%);
  top: -120px; left: -100px;
}

.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(230,30,38,0.15) 0%, transparent 70%);
  bottom: -50px; right: -80px;
}

.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(180,0,0,0.2) 0%, transparent 70%);
  top: 40%; left: 60%;
  filter: blur(100px);
}

/* ── Grid overlay ── */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* All content above canvas */
.hero > *:not(.hero-canvas):not(.orb):not(.hero-grid) {
  position: relative;
  z-index: 1;
}

/* ── Badge ── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 1.4rem;
  border-radius: 9999px;
  border: 1px solid rgba(230,30,38,0.35);
  background: rgba(230,30,38,0.08);
  backdrop-filter: blur(10px);
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2.5rem;
  opacity: 0;
}

.badge-pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34,197,94,0.9);
  animation: pulse-green 1.6s ease infinite;
  flex-shrink: 0;
}
@keyframes pulse-green {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.9); }
  50%       { opacity: 0.5; box-shadow: 0 0 16px rgba(34,197,94,0.4); }
}

.badge-sep { color: rgba(255,255,255,0.25); }

/* ── Headline ── */
.hero-headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-display);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin: 0 0 1.8rem;
  perspective: 800px;
}

.headline-line {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-char {
  display: inline-block;
  opacity: 0;
  font-size: clamp(2rem, 10vw, 9rem);
  transition: filter 0.3s ease;
}

.hero-char--red {
  background: linear-gradient(160deg, #ff5555 0%, #E61E26 45%, #8b0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 30px rgba(230,30,38,0.5));
}

.hero-char--white { color: #fff; }

/* ── Sub ── */
.hero-sub {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.6rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  opacity: 0;
  min-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1em;
}

.typewriter { color: rgba(255,255,255,0.85); }

.cursor-blink {
  color: var(--red);
  animation: blink 1s step-end infinite;
  font-weight: 300;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ── Desc ── */
.hero-desc {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: var(--gray);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 3rem;
  opacity: 0;
}
.hero-desc strong { color: #fff; }

/* ── Actions ── */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  margin-bottom: 4rem;
}

.btn-glow {
  box-shadow: 0 4px 24px rgba(230,30,38,0.4);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* ── Stats bar ── */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 1.25rem 2.5rem;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  margin-bottom: 3rem;
  opacity: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 2rem;
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: rgba(255,255,255,0.1);
}

.stat-num {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
}

/* ── Scroll hint ── */
.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  opacity: 0;
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
}

.scroll-dot {
  width: 100%;
  height: 12px;
  background: var(--red);
  border-radius: 99px;
  animation: scroll-drop 1.8s ease-in-out infinite;
}

@keyframes scroll-drop {
  0%   { transform: translateY(-100%); opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(400%);  opacity: 0; }
}

/* Futuristic Left-Side Patriotic Shield */
.patriotic-side-shield {
  position: absolute !important;
  left: 4vw !important;
  top: 22% !important;
  width: 290px !important;
  background: linear-gradient(135deg, rgba(20, 10, 30, 0.75) 0%, rgba(10, 5, 15, 0.9) 100%) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(230, 30, 38, 0.15) !important;
  border-radius: 24px;
  padding: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.8),
              0 0 40px rgba(230, 30, 38, 0.15),
              inset 0 0 20px rgba(255, 255, 255, 0.02);
  overflow: hidden;
  box-sizing: border-box;
  opacity: 0;
  animation: float-badge 6s ease-in-out infinite;
}

@keyframes float-badge {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.shield-flag-wrap {
  width: 100%;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  background: #000;
  display: flex;
}

.shield-flag {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.patriotic-side-shield:hover .shield-flag {
  transform: scale(1.1);
}

.glow-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
  pointer-events: none;
}

.shield-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.shield-tag {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 900;
  color: #ff425f;
  letter-spacing: 0.15em;
  margin-bottom: 6px;
}

.shield-main-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #FF9933, #FFFFFF, #138808);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 4px 0;
  text-shadow: 0 0 20px rgba(255, 153, 51, 0.4), 0 2px 4px rgba(0,0,0,0.5);
}

.shield-sub-title {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.05em;
  margin: 0;
  text-shadow: 0 0 10px rgba(255,255,255,0.2);
}

.shield-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(230, 30, 38, 0.4) 0%, transparent 100%);
  margin: 16px 0;
}

.shield-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.shield-points li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 11px;
  color: #cbd5e1;
  line-height: 1.4;
}

.shield-points li strong {
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.02em;
}

.bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.saffron-dot {
  background: #FF9933;
  box-shadow: 0 0 8px #FF9933;
}
.white-dot {
  background: #FFFFFF;
  box-shadow: 0 0 8px #FFFFFF;
}
.green-dot {
  background: #138808;
  box-shadow: 0 0 8px #138808;
}

/* Waving ripple shine effect overlay */
.shield-flag-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: wave-ripple 3.5s linear infinite;
  pointer-events: none;
}

@keyframes wave-ripple {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Make it responsive - staying aligned on the left on desktop, centered & reordered on mobile! */
@media (max-width: 1200px) {
  .patriotic-side-shield {
    left: 2vw !important;
    width: 250px !important;
    top: 22% !important;
    padding: 16px;
    gap: 14px;
  }
  .shield-flag-wrap {
    height: 110px;
  }
  .shield-main-title {
    font-size: 20px;
  }
}

@media (max-width: 992px) {
  /* Dynamic Flex Reordering to preserve premium fold layout on mobile */
  .hero-badge { order: 1 !important; }
  .hero-headline { order: 2 !important; }
  .hero-sub { order: 3 !important; }
  .hero-desc { order: 4 !important; }
  .hero-actions { order: 5 !important; }
  .patriotic-side-shield { order: 6 !important; }
  .stats-bar { order: 7 !important; }
  .scroll-hint { order: 8 !important; }

  .hero {
    min-height: auto;
    padding: 8rem 1.5rem 4rem !important;
  }

  .hero-canvas,
  .orb,
  .scroll-hint {
    display: none;
  }

  .hero-grid {
    opacity: 0.45;
    mask-image: none;
  }

  .hero-badge,
  .stats-bar,
  .patriotic-side-shield {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .patriotic-side-shield {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    margin: 2.5rem auto 1.5rem !important; /* Centered with vertical breathing room */
    width: 100% !important;
    max-width: 320px !important;
    align-self: center !important; /* Center horizontally in vertical stack */
    opacity: 1 !important;
    animation: none !important;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 6rem 1rem 4rem !important;
  }
  .hero-actions {
    flex-direction: column !important;
    width: 100% !important;
    gap: 0.8rem !important;
  }
  .hero-actions > * {
    width: 100% !important;
    justify-content: center !important;
  }
  .hero-badge {
    gap: 0.4rem;
    padding: 0.45rem 0.8rem;
    margin-bottom: 1.5rem;
    font-size: 0.58rem;
    letter-spacing: 0.06em;
  }
  .hero-headline {
    line-height: 0.95;
    margin-bottom: 1.25rem;
  }
  .hero-char {
    font-size: clamp(2rem, 14vw, 4.25rem);
  }
  .hero-sub {
    min-height: 2.8em;
    font-size: 0.95rem;
  }
  .hero-desc {
    margin-bottom: 2rem;
    font-size: 0.85rem;
  }
  .patriotic-side-shield {
    padding: 16px !important;
    max-width: 290px !important;
    margin: 2rem auto 1rem !important;
  }
  .shield-flag-wrap {
    height: 100px !important;
  }
  .shield-main-title {
    font-size: 20px !important;
  }
  .shield-points li {
    font-size: 10.5px !important;
  }
  .stats-bar {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    padding: 1rem !important;
    border-radius: 16px !important;
  }
  .stat-item {
    padding: 0.5rem 1rem !important;
  }
  .stat-item:nth-child(2)::after {
    display: none;
  }
  .stat-item:nth-child(-n+2) {
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
}
</style>
