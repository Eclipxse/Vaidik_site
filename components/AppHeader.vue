<template>
  <div>
    <div
      class="scroll-progress"
      :style="{ transform: `scaleX(${scrollProgress})` }"
      aria-hidden="true"
    />

    <header
      class="site-header"
      :class="{
        'site-header--scrolled': scrolled,
        'site-header--menu-open': mobileOpen,
      }"
    >
      <div class="header-inner">
        <NuxtLink to="/" class="brand" aria-label="Aslil Gang Panel home">
          <span class="brand-mark" aria-hidden="true">AG</span>
          <span class="brand-copy">
            <strong>Aslil Gang</strong>
            <small>Premium panel store</small>
          </span>
        </NuxtLink>

        <nav class="desktop-nav" aria-label="Main navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ 'nav-link--active': isActive(link.to) }"
          >
            {{ link.label }}
            <span v-if="link.hot" class="nav-hot">Pro</span>
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <span class="support-status">
            <i aria-hidden="true" />
            Support online
          </span>
          <a
            :href="`https://wa.me/${ownerNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="header-cta"
          >
            WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
          <button
            class="menu-button"
            :class="{ 'menu-button--open': mobileOpen }"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
            @click="mobileOpen = !mobileOpen"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <Transition name="menu">
        <div
          v-if="mobileOpen"
          id="mobile-navigation"
          class="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div class="mobile-menu__inner">
            <p class="mobile-kicker">Explore the store</p>
            <nav class="mobile-nav" aria-label="Mobile navigation">
              <NuxtLink
                v-for="(link, index) in navLinks"
                :key="link.to"
                :to="link.to"
                class="mobile-link"
                :class="{ 'mobile-link--active': isActive(link.to) }"
                @click="mobileOpen = false"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ link.label }}</strong>
                <i aria-hidden="true">↗</i>
              </NuxtLink>
            </nav>

            <div class="mobile-footer">
              <a
                :href="`https://wa.me/${ownerNumber}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-green"
                @click="mobileOpen = false"
              >
                Chat with support
              </a>
              <div class="mobile-socials">
                <a
                  v-for="social in socialLinks"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ social.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { ownerNumber } = useWhatsApp()

const scrolled = ref(false)
const scrollProgress = ref(0)
const mobileOpen = useState('mobileOpen', () => false)
let lockedScrollY = 0

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cheats/android', label: 'Android' },
  { to: '/cheats/ios', label: 'iOS' },
  { to: '/pc-panel', label: 'PC Panels' },
  { to: '/free-fire-ids', label: 'FF IDs' },
  { to: '/reseller', label: 'Reseller', hot: true },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/fit_vaidik' },
  { label: 'Telegram', href: 'https://t.me/+fp8yl-Roaek5YmU1' },
  { label: 'YouTube', href: 'https://www.youtube.com/@aslilgangliveff' },
  { label: 'Discord', href: 'https://discord.gg/g6BdyeWQvQ' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function updateScrollState() {
  const top = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = top > 18
  scrollProgress.value = max > 0 ? top / max : 0
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
    document.body.style.overflow = 'hidden'
    return
  }

  document.documentElement.classList.remove('mobile-menu-open')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
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
  document.body.style.overflow = ''
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--red), #ff8a91);
  transform-origin: left;
}

.site-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.9rem 1.25rem;
  transition: padding 180ms ease;
}

.header-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(1380px, 100%);
  min-height: 68px;
  margin: 0 auto;
  padding: 0.65rem 0.75rem 0.65rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 18px;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.site-header--scrolled {
  padding-top: 0.65rem;
}

.site-header--scrolled .header-inner,
.site-header--menu-open .header-inner {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(8, 8, 9, 0.84);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(22px) saturate(145%);
}

.brand {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.22), transparent 38%),
    linear-gradient(135deg, var(--red-bright), var(--red-deep));
  box-shadow: 0 10px 28px rgba(255, 52, 65, 0.24);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.05em;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 0.14rem;
}

.brand-copy strong {
  font-family: var(--font-display);
  font-size: 0.92rem;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-copy small {
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.62rem 0.72rem;
  border-radius: 9px;
  color: rgba(255, 255, 255, 0.58);
  font-family: var(--font-display);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease, background-color 160ms ease;
}

.nav-link:hover,
.nav-link--active {
  color: #fff;
  background: rgba(255, 255, 255, 0.065);
}

.nav-link--active::after {
  position: absolute;
  right: 0.7rem;
  bottom: 0.24rem;
  left: 0.7rem;
  height: 1px;
  background: var(--red);
  content: '';
}

.nav-hot {
  padding: 0.15rem 0.3rem;
  border-radius: 4px;
  color: #fff;
  background: var(--red);
  font-size: 0.48rem;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.support-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.support-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #54e789;
  box-shadow: 0 0 12px rgba(84, 231, 137, 0.72);
}

.header-cta {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(84, 231, 137, 0.25);
  border-radius: 10px;
  color: #0a1a10;
  background: #54e789;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.header-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(84, 231, 137, 0.2);
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
}

.menu-button span {
  display: block;
  width: 18px;
  height: 1.5px;
  margin: 5px auto;
  border-radius: 99px;
  background: #fff;
  transition: transform 180ms ease;
}

.menu-button--open span:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.menu-button--open span:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  z-index: -1;
  inset: 0;
  min-height: 100dvh;
  overflow-y: auto;
  background:
    radial-gradient(circle at 85% 12%, rgba(255, 52, 65, 0.18), transparent 32%),
    #070708;
}

.mobile-menu__inner {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  padding: 8rem 1.25rem 2rem;
}

.mobile-kicker {
  margin: 0 0 1.2rem;
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.mobile-nav {
  border-top: 1px solid var(--line);
}

.mobile-link {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
  color: #fff;
  text-decoration: none;
}

.mobile-link > span {
  color: var(--gray);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
}

.mobile-link strong {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 7vw, 2rem);
  line-height: 1;
  text-transform: uppercase;
}

.mobile-link i {
  color: var(--gray);
  font-style: normal;
  transition: color 160ms ease, transform 160ms ease;
}

.mobile-link--active strong,
.mobile-link:hover strong {
  color: var(--red-bright);
}

.mobile-link:hover i {
  color: var(--red);
  transform: translate(2px, -2px);
}

.mobile-footer {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: auto;
  padding-top: 2rem;
}

.mobile-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.mobile-socials a {
  color: var(--gray-lt);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 200ms ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (max-width: 1180px) {
  .desktop-nav,
  .support-status,
  .header-cta {
    display: none;
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
  }

  .menu-button {
    display: block;
  }
}

@media (max-width: 640px) {
  .site-header {
    padding: 0.65rem;
  }

  .header-inner {
    min-height: 60px;
    border-radius: 15px;
  }

  .brand-mark {
    width: 38px;
    height: 38px;
  }

  .brand-copy small {
    display: none;
  }

  .site-header--scrolled .header-inner {
    backdrop-filter: none;
    background: rgba(8, 8, 9, 0.96);
  }
}
</style>
