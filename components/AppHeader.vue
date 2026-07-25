<template>
  <header class="site-header" :class="{ 'site-header--scrolled': scrolled, 'site-header--open': mobileOpen }">
    <div class="header-shell">
      <NuxtLink to="/" class="wordmark" aria-label="Aslil Gang home">
        <span class="wordmark-mark">A</span>
        <span class="wordmark-copy">
          <strong>Aslil Gang</strong>
          <small>Digital performance</small>
        </span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <a
          :href="`https://wa.me/${ownerNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="support-link"
        >
          Get support
          <span aria-hidden="true">↗</span>
        </a>

        <button
          class="menu-toggle"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileOpen ? 'Close navigation' : 'Open navigation'"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="menu-toggle__label">{{ mobileOpen ? 'Close' : 'Menu' }}</span>
          <span class="menu-toggle__icon" :class="{ open: mobileOpen }" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="mobileOpen" id="mobile-navigation" class="mobile-menu">
        <div class="mobile-menu__shell">
          <span class="mobile-menu__label">Navigation</span>
          <nav aria-label="Mobile navigation">
            <NuxtLink
              v-for="(link, index) in navLinks"
              :key="link.to"
              :to="link.to"
              :class="{ active: isActive(link.to) }"
              @click="mobileOpen = false"
            >
              <small>{{ String(index + 1).padStart(2, '0') }}</small>
              <strong>{{ link.label }}</strong>
              <span aria-hidden="true">↗</span>
            </NuxtLink>
          </nav>

          <div class="mobile-menu__footer">
            <a :href="`https://wa.me/${ownerNumber}`" target="_blank" rel="noopener noreferrer">
              WhatsApp support
              <span aria-hidden="true">↗</span>
            </a>
            <p>PC, Android and iOS products with direct setup guidance.</p>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { ownerNumber } = useWhatsApp()

const scrolled = ref(false)
const mobileOpen = useState('mobileOpen', () => false)
let lockedScrollY = 0

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/pc-panel', label: 'PC' },
  { to: '/cheats/android', label: 'Android' },
  { to: '/cheats/ios', label: 'iOS' },
  { to: '/free-fire-ids', label: 'Player IDs' },
  { to: '/reseller', label: 'Reseller' },
]

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}

function updateScrollState() {
  scrolled.value = window.scrollY > 12
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') mobileOpen.value = false
}

watch(() => route.path, () => {
  mobileOpen.value = false
})

watch(mobileOpen, (open) => {
  if (open) {
    lockedScrollY = window.scrollY
    document.documentElement.classList.add('mobile-menu-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lockedScrollY}px`
    document.body.style.width = '100%'
    return
  }

  document.documentElement.classList.remove('mobile-menu-open')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  window.scrollTo(0, lockedScrollY)
})

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', closeOnEscape)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', closeOnEscape)
  document.documentElement.classList.remove('mobile-menu-open')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
})
</script>

<style scoped>
.site-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  padding: 1rem 1.25rem 0;
  transition: padding 180ms ease;
}

.header-shell {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(1360px, 100%);
  min-height: 66px;
  margin: 0 auto;
  padding: 0 0.75rem 0 0.8rem;
  border: 1px solid transparent;
  border-radius: 14px;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.site-header--scrolled {
  padding-top: 0.65rem;
}

.site-header--scrolled .header-shell,
.site-header--open .header-shell {
  border-color: var(--line);
  background: rgba(10, 10, 11, 0.86);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(18px) saturate(140%);
}

.wordmark {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.75rem;
  color: var(--white);
  text-decoration: none;
}

.wordmark-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 9px;
  color: #fff;
  background: var(--red);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.07em;
}

.wordmark-copy {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.wordmark-copy strong {
  font-family: var(--font-display);
  font-size: 0.83rem;
  line-height: 1;
  letter-spacing: -0.02em;
}

.wordmark-copy small {
  color: var(--gray);
  font-size: 0.52rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.desktop-nav a {
  position: relative;
  padding: 0.4rem 0;
  color: var(--gray-lt);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease;
}

.desktop-nav a::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  content: '';
  transition: transform 180ms ease;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  color: var(--white);
}

.desktop-nav a.active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.support-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 0.7rem;
  padding: 0 0.95rem;
  border: 1px solid var(--line-strong);
  border-radius: 9px;
  color: var(--white);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 180ms ease, border-color 180ms ease;
}

.support-link:hover {
  border-color: var(--red);
  background: var(--red);
}

.menu-toggle {
  display: none;
  min-height: 42px;
  align-items: center;
  gap: 0.65rem;
  padding: 0 0.8rem;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--white);
  background: transparent;
  cursor: pointer;
}

.menu-toggle__label {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-toggle__icon {
  position: relative;
  width: 16px;
  height: 12px;
}

.menu-toggle__icon i {
  position: absolute;
  left: 0;
  width: 16px;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transition: top 220ms ease, transform 220ms ease;
}

.menu-toggle__icon i:first-child {
  top: 2px;
}

.menu-toggle__icon i:last-child {
  top: 9px;
}

.menu-toggle__icon.open i:first-child {
  top: 5px;
  transform: rotate(45deg);
}

.menu-toggle__icon.open i:last-child {
  top: 5px;
  transform: rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  z-index: -1;
  inset: 0;
  min-height: 100dvh;
  overflow-y: auto;
  background: #0a0a0b;
}

.mobile-menu__shell {
  display: flex;
  width: min(100% - 2rem, 760px);
  min-height: 100dvh;
  flex-direction: column;
  margin: 0 auto;
  padding: 8.5rem 0 2rem;
}

.mobile-menu__label {
  margin-bottom: 1rem;
  color: var(--gray);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mobile-menu nav {
  border-top: 1px solid var(--line);
}

.mobile-menu nav a {
  display: grid;
  grid-template-columns: 2.25rem 1fr auto;
  align-items: center;
  gap: 0.8rem;
  padding: 1.05rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--white);
  text-decoration: none;
}

.mobile-menu nav small {
  color: var(--gray);
  font-size: 0.58rem;
}

.mobile-menu nav strong {
  font-size: clamp(1.8rem, 8vw, 3.4rem);
  line-height: 0.96;
  letter-spacing: -0.055em;
}

.mobile-menu nav a > span {
  color: var(--gray);
  transition: color 180ms ease, transform 180ms ease;
}

.mobile-menu nav a:hover > span,
.mobile-menu nav a.active > span {
  color: var(--red);
  transform: translate(2px, -2px);
}

.mobile-menu__footer {
  display: grid;
  grid-template-columns: auto minmax(200px, 360px);
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: auto;
  padding-top: 2.5rem;
}

.mobile-menu__footer a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.mobile-menu__footer p {
  margin: 0;
  color: var(--gray);
  font-size: 0.72rem;
  line-height: 1.65;
  text-align: right;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 180ms ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (max-width: 1160px) {
  .desktop-nav,
  .support-link {
    display: none;
  }

  .header-shell {
    display: flex;
    justify-content: space-between;
  }

  .menu-toggle {
    display: inline-flex;
  }
}

@media (max-width: 620px) {
  .site-header {
    padding: 0.7rem 0.7rem 0;
  }

  .header-shell {
    min-height: 60px;
  }

  .wordmark-copy small {
    display: none;
  }

  .mobile-menu__footer {
    grid-template-columns: 1fr;
  }

  .mobile-menu__footer p {
    max-width: 360px;
    text-align: left;
  }
}
</style>
