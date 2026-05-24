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
      <button class="btn-red btn-glow" @click="handleBuyNow('Premium Services', 'Hero')">
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

const canvasEl    = ref<HTMLCanvasElement | null>(null)
const badgeEl     = ref<HTMLElement | null>(null)
const headlineEl  = ref<HTMLElement | null>(null)
const subEl       = ref<HTMLElement | null>(null)
const typeEl      = ref<HTMLElement | null>(null)
const descEl      = ref<HTMLElement | null>(null)
const actionsEl   = ref<HTMLElement | null>(null)
const statsEl     = ref<HTMLElement | null>(null)
const scrollHintEl = ref<HTMLElement | null>(null)
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
  if (canvasEl.value) initParticles(canvasEl.value)
  if (typeEl.value)   setTimeout(() => startTypewriter(typeEl.value!), 1800)

  const { $gsap } = useNuxtApp()
  if (!$gsap) return

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
  $gsap.to('.orb-1', { y: -30, x: 15,  duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  $gsap.to('.orb-2', { y: 25,  x: -20, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 })
  $gsap.to('.orb-3', { y: -20, x: 10,  duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })

  // ── Btn glow pulse ───────────────────────────────────
  $gsap.to('.btn-glow', {
    boxShadow: '0 0 50px rgba(230,30,38,0.7), 0 4px 24px rgba(230,30,38,0.5)',
    duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1
  })
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
  font-size: clamp(3.5rem, 12vw, 9rem);
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
</style>
