<template>
  <div>
    <!-- ── Scroll progress bar ── -->
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" aria-hidden="true" />

    <!-- ── Announcement bar ── -->
    <Transition name="ann-bar">
      <div v-if="annVisible" class="ann-bar">
        <span class="ann-text">
          🔥 <strong>Limited Stock!</strong> Prices go up after 50 more orders.
          <NuxtLink to="/pc-panel" class="ann-link">Shop Now →</NuxtLink>
        </span>
        <button class="ann-close" @click="annVisible = false" aria-label="Dismiss">✕</button>
      </div>
    </Transition>

    <!-- ── Main header ── -->
    <header
      class="site-header"
      :class="{
        'site-header--scrolled': scrolled,
        'site-header--hidden': navHidden,
        'site-header--shifted': annVisible,
      }"
    >
      <!-- Red spotlight sweep on hover -->
      <div class="header-spotlight" ref="spotlightEl" aria-hidden="true" />

      <div class="header-inner">

        <!-- Logo -->
        <NuxtLink to="/" class="header-logo" aria-label="Aslil Gang Panel Home">
          <div class="logo-img-wrap">
            <img src="/products/favicon/logo/image.png" alt="ASLIL GANG PANEL Logo" class="logo-img" />
          </div>
          <div class="logo-words">
            <span class="logo-main">ASLIL GANG</span>
            <span class="logo-sub">PANEL</span>
          </div>
          <span class="logo-live-dot" aria-label="Online" />
        </NuxtLink>

        <!-- Desktop Nav with floating active indicator -->
        <nav class="desktop-nav" aria-label="Main navigation" ref="navEl">
          <div class="nav-pill-bg" ref="pillEl" aria-hidden="true" />
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ 'nav-link--active': isActive(link.to) }"
            :ref="el => setNavRef(link.to, el)"
            @mouseenter="movePill(link.to)"
            @mouseleave="resetPill"
          >
            <span v-if="link.hot" class="nav-hot">NEW</span>
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="header-right">

          <!-- LIVE badge -->
          <div class="live-badge">
            <span class="live-ring" aria-hidden="true" />
            <span class="live-dot" aria-hidden="true" />
            <span>LIVE</span>
          </div>

          <!-- WhatsApp CTA -->
          <a
            :href="`https://wa.me/${ownerNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="wa-btn"
            aria-label="Contact on WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span class="wa-btn-text">Contact</span>
          </a>

          <!-- Social icons (Instagram / Telegram / YouTube) — RIGHT of Contact -->
          <div class="social-icons" role="list" aria-label="Social media links">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              :aria-label="s.name"
              role="listitem"
              :style="{ color: s.color }"
              v-html="s.icon"
            />
          </div>

          <!-- Hamburger -->
          <button
            class="hamburger"
            :class="{ 'hamburger--open': mobileOpen }"
            :aria-expanded="mobileOpen"
            aria-label="Toggle menu"
            @click="mobileOpen = !mobileOpen"
          >
            <span class="hb-line" />
            <span class="hb-line" />
            <span class="hb-line" />
          </button>
        </div>
      </div>

      <!-- Mobile menu (full-screen overlay) -->
      <Transition name="mobile-overlay">
        <div v-if="mobileOpen" class="mobile-overlay" role="dialog" aria-modal="true">
          <div class="mobile-overlay-bg" aria-hidden="true" />
          <nav class="mobile-nav">
            <NuxtLink
              v-for="(link, i) in navLinks"
              :key="link.to"
              :to="link.to"
              class="mobile-link"
              :class="{ 'mobile-link--active': isActive(link.to) }"
              :style="{ '--i': i }"
              @click="mobileOpen = false"
            >
              <span class="mobile-link-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="mobile-link-label">{{ link.label }}</span>
              <span v-if="link.hot" class="mobile-hot">NEW</span>
              <span class="mobile-link-arrow">→</span>
            </NuxtLink>
          </nav>
          <a
            :href="`https://wa.me/${ownerNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-wa-btn"
            @click="mobileOpen = false"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Connect on WhatsApp
          </a>
        </div>
      </Transition>
    </header>
  </div>
</template>

<script setup lang="ts">
const route      = useRoute()
const { ownerNumber } = useWhatsApp()

// ── State ──────────────────────────────────────────
const scrolled       = ref(false)
const navHidden      = ref(false)
const mobileOpen     = useState('mobileOpen', () => false)
const annVisible     = ref(true)
const scrollProgress = ref(0)

const navEl      = ref<HTMLElement | null>(null)
const pillEl     = ref<HTMLElement | null>(null)
const spotlightEl = ref<HTMLElement | null>(null)

// Per-link element map for the sliding pill
const navRefs = new Map<string, HTMLElement>()
function setNavRef(to: string, el: any) {
  if (el?.$el) navRefs.set(to, el.$el as HTMLElement)
  else if (el)  navRefs.set(to, el as HTMLElement)
}

const navLinks = [
  { to: '/',               label: 'Home'         },
  { to: '/cheats/android', label: 'Phone Panel'  },
  { to: '/cheats/ios',     label: 'iOS Panel'    },
  { to: '/pc-panel',       label: 'PC Panel'     },
  { to: '/free-fire-ids',  label: 'FF IDs'       },
  { to: '/reseller',       label: 'Reseller Plan', hot: true },
  { to: '/ssm-panel',      label: 'Socials'      },
]

// TODO: replace # with your actual social media URLs
const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/fit_vaidik',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    color: '#e1306c',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/+fp8yl-Roaek5YmU1',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    color: '#26a5d4',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@aslilgangliveff',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    color: '#ff0000',
  },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// ── Floating pill ──────────────────────────────────
function movePill(to: string) {
  if (!pillEl.value || !navEl.value) return
  const linkEl = navRefs.get(to)
  if (!linkEl) return
  const navRect  = navEl.value.getBoundingClientRect()
  const linkRect = linkEl.getBoundingClientRect()
  pillEl.value.style.opacity  = '1'
  pillEl.value.style.width    = `${linkRect.width}px`
  pillEl.value.style.left     = `${linkRect.left - navRect.left}px`
}

function resetPill() {
  if (!pillEl.value) return
  // Slide to active link
  const activeLink = navLinks.find(l => isActive(l.to))
  if (activeLink) movePill(activeLink.to)
  else pillEl.value.style.opacity = '0'
}

// ── Spotlight follow ──────────────────────────────
function onMouseMove(e: MouseEvent) {
  if (!spotlightEl.value) return
  spotlightEl.value.style.setProperty('--mx', `${e.clientX}px`)
  spotlightEl.value.style.setProperty('--my', `${e.clientY}px`)
}

// ── Scroll logic ──────────────────────────────────
let lastScroll = 0

function onScroll() {
  const y = window.scrollY
  const maxY = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxY > 0 ? y / maxY : 0
  scrolled.value = y > 40
  navHidden.value = y > lastScroll + 6 && y > 120
  if (y < lastScroll - 6 || y < 80) navHidden.value = false
  lastScroll = y
}

watch(() => route.path, () => {
  mobileOpen.value = false
  nextTick(() => resetPill())
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  nextTick(() => resetPill())
})

watch(mobileOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouseMove)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Scroll progress ── */
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 2.5px;
  background: linear-gradient(90deg, #E61E26, #ff6b6b, #E61E26);
  transform-origin: left;
  z-index: 9999;
  transition: transform 0.1s linear;
}

/* ── Announcement bar ── */
.ann-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  background: var(--red);
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: #fff;
}

.ann-text { display: flex; align-items: center; gap: 0.5rem; }

.ann-link {
  color: #fff;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ann-close {
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.2s ease;
}
.ann-close:hover { color: #fff; }

.ann-bar-enter-active, .ann-bar-leave-active { transition: all 0.35s ease; }
.ann-bar-enter-from, .ann-bar-leave-to { opacity: 0; transform: translateY(-100%); }

/* ── Header ── */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.4s ease, border-color 0.4s ease,
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              top 0.3s ease;
  border-bottom: 1px solid transparent;
  overflow: hidden;
}

.site-header--shifted { top: 34px; }

.site-header--scrolled {
  background: rgba(4, 4, 4, 0.82);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-bottom-color: rgba(255,255,255,0.06);
}

.site-header--hidden {
  transform: translateY(-110%);
}

/* ── Spotlight effect ── */
.header-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    280px circle at var(--mx, 50%) var(--my, 50%),
    rgba(230,30,38,0.06),
    transparent 60%
  );
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-header--scrolled .header-spotlight { opacity: 1; }

/* ── Inner layout ── */
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
  position: relative;
  z-index: 1;
}

/* ── Logo ── */
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  position: relative;
  width: 38px; height: 38px;
  flex-shrink: 0;
}

.logo-mark-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--red);
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 900;
  color: #fff;
  z-index: 1;
}

.logo-mark-ring {
  position: absolute;
  inset: -3px;
  border-radius: 13px;
  border: 1.5px solid rgba(230,30,38,0.4);
  animation: ring-spin 8s linear infinite;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(230,30,38,0.5) 10%,
    transparent 20%
  );
}

@keyframes ring-spin {
  to { transform: rotate(360deg); }
}

.logo-words {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-main {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.logo-sub {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--red);
}

.logo-live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34,197,94,0.9);
  animation: live-glow 1.8s ease infinite;
  align-self: flex-start;
  margin-top: 2px;
}

@keyframes live-glow {
  0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.9); }
  50%       { box-shadow: 0 0 14px rgba(34,197,94,0.4); opacity: 0.6; }
}

/* ── Desktop nav ── */
.desktop-nav {
  display: none;
  align-items: center;
  position: relative;
  padding: 0.3rem;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
}

@media (min-width: 1024px) {
  .desktop-nav { display: flex; }
}

/* Sliding background pill */
.nav-pill-bg {
  position: absolute;
  top: 0.3rem; bottom: 0.3rem;
  border-radius: 9999px;
  background: rgba(230,30,38,0.18);
  border: 1px solid rgba(230,30,38,0.35);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s ease;
  pointer-events: none;
  opacity: 0;
}

.nav-link {
  position: relative;
  padding: 0.45rem 0.95rem;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  z-index: 1;
}

.nav-link:hover { color: rgba(255,255,255,0.9); }

.nav-link--active {
  color: #fff;
}

.nav-hot {
  font-size: 0.52rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: linear-gradient(135deg, #ff6b35, #E61E26);
  color: #fff;
  line-height: 1;
}

/* ── Right actions ── */
.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ── Social icon buttons ── */
.social-icons {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 1024px) { .social-icons { display: flex; } }

.social-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.social-icon-btn:hover { transform: translateY(-3px); filter: brightness(1.2); }

/* Vertical divider BEFORE the social icons (between Contact btn and icons) */
.social-icons::before {
  content: '';
  display: block;
  width: 1px;
  height: 22px;
  background: rgba(255,255,255,0.1);
  margin: 0 0.35rem;
}

/* Remove old after divider if present */
.social-icons::after { display: none; }

/* LIVE badge */
.live-badge {
  display: none;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid rgba(34,197,94,0.25);
  background: rgba(34,197,94,0.07);
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #22c55e;
  text-transform: uppercase;
  position: relative;
}

@media (min-width: 1024px) { .live-badge { display: flex; } }

.live-ring {
  position: absolute;
  inset: -3px;
  border-radius: 9999px;
  border: 1px solid rgba(34,197,94,0.3);
  animation: ring-pulse 2s ease-out infinite;
}

@keyframes ring-pulse {
  0%   { transform: scale(1);    opacity: 0.8; }
  100% { transform: scale(1.15); opacity: 0;   }
}

.live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: live-glow 1.5s ease infinite;
}

/* WhatsApp button — green (WhatsApp brand color) */
.wa-btn {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 9999px;
  background: #25D366;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(37,211,102,0.4);
}

.wa-btn:hover {
  background: #1ebe5d;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(37,211,102,0.6);
}

@media (min-width: 1024px) { .wa-btn { display: flex; } }

.wa-btn-text { white-space: nowrap; }

/* ── Hamburger ── */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 40px; height: 40px;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.hamburger:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(230,30,38,0.4);
}

@media (min-width: 1024px) { .hamburger { display: none; } }

.hb-line {
  display: block;
  width: 20px; height: 1.5px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.hamburger--open .hb-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger--open .hb-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger--open .hb-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile overlay ── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Flow from top so overflowing menu is scrollable */
  overflow-y: auto; /* Allow native vertical scrolling for small screens */
  -webkit-overflow-scrolling: touch; /* Inertial touch scroll in iOS Safari */
  overscroll-behavior: contain; /* Prevent body scrolling chaining */
  padding-bottom: 4rem;
}

@media (min-width: 1024px) { .mobile-overlay { display: none !important; } }

.mobile-overlay-bg {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 5, 0.98); /* Almost solid black for high performance */
  backdrop-filter: blur(8px); /* Efficient blur radius to avoid WebKit lag */
  -webkit-backdrop-filter: blur(8px);
}

.mobile-nav {
  position: relative;
  z-index: 1;
  padding: 6rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  text-decoration: none;
  animation: mobile-link-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: calc(var(--i) * 0.06s + 0.1s);
  transform: translateX(-20px);
  opacity: 0;
  transition: background 0.2s ease;
}

@keyframes mobile-link-in {
  to { transform: translateX(0); opacity: 1; }
}

.mobile-link-num {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 24px;
}

.mobile-link-label {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  flex: 1;
}

.mobile-link--active .mobile-link-label,
.mobile-link:hover .mobile-link-label {
  color: #fff;
}

.mobile-link--active .mobile-link-num { color: var(--red); }

.mobile-hot {
  font-size: 0.55rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background: var(--red);
  color: #fff;
  letter-spacing: 0.1em;
}

.mobile-link-arrow {
  font-size: 1.5rem;
  color: rgba(255,255,255,0.1);
  transition: color 0.2s ease, transform 0.2s ease;
}

.mobile-link:hover .mobile-link-arrow {
  color: var(--red);
  transform: translateX(4px);
}

.mobile-wa-btn {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.5rem 2rem 0;
  padding: 1rem 2rem;
  border-radius: 14px;
  background: #25D366; /* Solid WhatsApp Green brand color */
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  box-shadow: 0 8px 30px rgba(37,211,102,0.4);
  animation: mobile-link-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0.5s;
  transform: translateX(-20px);
  opacity: 0;
  transition: box-shadow 0.25s ease, transform 0.25s ease, background-color 0.2s;
}

.mobile-wa-btn:hover {
  background: #20ba56;
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(37,211,102,0.6);
}


/* ── Mobile overlay transition ── */
.mobile-overlay-enter-active { transition: opacity 0.35s ease; }
.mobile-overlay-leave-active  { transition: opacity 0.25s ease; }
.mobile-overlay-enter-from, .mobile-overlay-leave-to { opacity: 0; }

/* Premium Image Logo Wrapper */
.logo-img-wrap {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(230, 30, 38, 0.35);
  box-shadow: 0 0 16px rgba(230, 30, 38, 0.25);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  flex-shrink: 0;
}
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.header-logo:hover .logo-img-wrap {
  border-color: rgba(230, 30, 38, 0.65);
  box-shadow: 0 0 24px rgba(230, 30, 38, 0.55);
  transform: scale(1.05) rotate(4deg);
}
</style>
