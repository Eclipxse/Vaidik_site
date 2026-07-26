<script setup lang="ts">
import { Motion } from 'motion-v'

const route = useRoute()
const { ownerNumber } = useWhatsApp()

const scrolled = ref(false)
const mobileOpen = useState('mobileOpen', () => false)
const noticeVisible = ref(true)
let lockedScrollY = 0

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cheats/android', label: 'Phone panel' },
  { to: '/cheats/ios', label: 'iOS panel' },
  { to: '/pc-panel', label: 'PC panel' },
  { to: '/free-fire-ids', label: 'FF IDs' },
  { to: '/reseller', label: 'Reseller', badge: 'New' },
  { to: '/ssm-panel', label: 'Socials' },
]

const socialLinks = [
  { id: 'instagram', label: 'Instagram', color: '#E4405F', href: 'https://www.instagram.com/fit_vaidik' },
  { id: 'telegram', label: 'Telegram', color: '#229ED9', href: 'https://t.me/+fp8yl-Roaek5YmU1' },
  { id: 'youtube', label: 'YouTube', color: '#FF0033', href: 'https://www.youtube.com/@aslilgangliveff' },
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

<template>
  <header
    class="site-header"
    :class="{
      'site-header--scrolled': scrolled,
      'site-header--open': mobileOpen,
      'site-header--notice-hidden': !noticeVisible,
    }"
  >
    <Transition name="notice">
      <div v-if="noticeVisible" class="announcement">
        <div class="announcement__shell">
          <span class="announcement__spark" aria-hidden="true">◆</span>
          <p>
            <strong>Direct setup support included.</strong>
            PC, Android and iOS collections are ready to explore.
          </p>
          <NuxtLink to="/pc-panel">Shop panels <span aria-hidden="true">→</span></NuxtLink>
          <button type="button" aria-label="Dismiss announcement" @click="noticeVisible = false">
            ×
          </button>
        </div>
      </div>
    </Transition>

    <div class="nav-stage">
      <div class="header-shell">
        <NuxtLink to="/" class="wordmark" aria-label="Aslil Gang home">
          <span class="wordmark-mark">
            <img src="/brand/aslil-logo.png" alt="" />
          </span>
          <span class="wordmark-copy">
            <strong>Aslil Gang</strong>
            <small>Panel store</small>
          </span>
          <i class="wordmark-live" aria-hidden="true" />
        </NuxtLink>

        <nav class="desktop-nav" aria-label="Main navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="{ active: isActive(link.to) }"
          >
            <Motion
              v-if="isActive(link.to)"
              layout-id="active-header-nav"
              as="span"
              class="nav-active-bg"
              aria-hidden="true"
              :transition="{ type: 'spring', stiffness: 360, damping: 32 }"
            />
            <span class="nav-label">{{ link.label }}</span>
            <small v-if="link.badge">{{ link.badge }}</small>
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <span class="live-pill">
            <i aria-hidden="true" />
            Live
          </span>
          <a
            :href="`https://wa.me/${ownerNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="support-link"
          >
            <span class="support-link__icon" aria-hidden="true">W</span>
            Contact
          </a>
          <span class="action-divider" aria-hidden="true" />
          <div class="social-actions" aria-label="Social links">
            <a
              v-for="social in socialLinks"
              :key="social.href"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              :style="{ '--social-color': social.color }"
            >
              <svg
                v-if="social.id === 'instagram'"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle class="social-icon-fill" cx="17.4" cy="6.7" r="1.1" />
              </svg>
              <svg
                v-else-if="social.id === 'telegram'"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path class="social-icon-fill" d="M21.4 3.2 18 20.1c-.25 1.2-.92 1.5-1.86.94l-5.18-3.82-2.5 2.4c-.28.28-.51.51-1.05.51l.37-5.27 9.6-8.68c.42-.37-.09-.58-.65-.21L4.86 13.45l-5.1-1.6c-1.11-.35-1.13-1.11.23-1.64L19.92 2.53c.92-.34 1.73.22 1.48.67Z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path class="social-icon-fill" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
              </svg>
            </a>
          </div>

          <button
            class="menu-toggle"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-navigation"
            :aria-label="mobileOpen ? 'Close navigation' : 'Open navigation'"
            @click="mobileOpen = !mobileOpen"
          >
            <span>{{ mobileOpen ? 'Close' : 'Menu' }}</span>
            <i class="menu-toggle__icon" :class="{ open: mobileOpen }" aria-hidden="true">
              <b />
              <b />
            </i>
          </button>
        </div>
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
            <div>
              <a
                v-for="social in socialLinks"
                :key="social.href"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ '--social-color': social.color }"
              >
                {{ social.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  --notice-height: 34px;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
}

.site-header--notice-hidden {
  --notice-height: 0px;
}

.announcement {
  position: relative;
  z-index: 3;
  height: 34px;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(90deg, #b00819 0%, #ff2d2d 44%, #c30b1b 100%);
  box-shadow: 0 8px 30px rgba(125, 5, 16, 0.18);
}

.announcement__shell {
  display: flex;
  width: min(1380px, calc(100% - 2rem));
  height: 34px;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin: 0 auto;
  font-size: 0.64rem;
  letter-spacing: -0.01em;
}

.announcement__spark {
  color: #fff;
  font-size: 0.55rem;
}

.announcement p {
  margin: 0;
}

.announcement a {
  color: #fff;
  font-weight: 800;
  text-decoration: none;
}

.announcement a span {
  display: inline-block;
  transition: transform 180ms ease;
}

.announcement a:hover span {
  transform: translateX(3px);
}

.announcement button {
  position: absolute;
  right: 0;
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 0;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  font-size: 1.15rem;
  cursor: pointer;
}

.nav-stage {
  position: relative;
  z-index: 2;
  padding: 0.72rem 1rem;
  border-bottom: 1px solid transparent;
  background: linear-gradient(to bottom, rgba(7, 7, 8, 0.92), rgba(7, 7, 8, 0.7));
  backdrop-filter: blur(22px) saturate(1.25);
  transition: padding 220ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.site-header--scrolled .nav-stage,
.site-header--open .nav-stage {
  border-color: var(--line);
  background: rgba(7, 7, 8, 0.9);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
}

.site-header--scrolled .nav-stage {
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}

.header-shell {
  display: grid;
  grid-template-columns: minmax(205px, 0.85fr) auto minmax(310px, 1fr);
  align-items: center;
  gap: 1rem;
  width: min(1420px, 100%);
  min-height: 62px;
  margin: 0 auto;
}

.wordmark {
  position: relative;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.72rem;
  color: var(--white);
  text-decoration: none;
}

.wordmark-mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(246, 241, 232, 0.3);
  border-radius: 50%;
  color: #fff;
  background: #171719;
  box-shadow: 0 0 0 4px rgba(255, 45, 45, 0.045);
}

.wordmark-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wordmark-copy {
  display: flex;
  flex-direction: column;
  gap: 0.14rem;
}

.wordmark-copy strong {
  font-family: var(--font-display);
  font-size: 1.22rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.wordmark-copy small {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.45rem;
  font-weight: 800;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.wordmark-live {
  position: absolute;
  top: 2px;
  right: -12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #76e899;
  box-shadow: 0 0 0 3px rgba(118, 232, 153, 0.1);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.32rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent),
    rgba(12, 12, 15, 0.75);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.035), 0 12px 34px rgba(0, 0, 0, 0.16);
}

.desktop-nav a {
  position: relative;
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 0.38rem;
  padding: 0 0.82rem;
  border-radius: 999px;
  color: #8b8988;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 180ms ease;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  color: var(--white);
}

.nav-label,
.desktop-nav small {
  position: relative;
  z-index: 2;
}

.nav-active-bg {
  position: absolute;
  z-index: 1;
  inset: 0;
  border: 1px solid rgba(255, 70, 65, 0.46);
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent),
    rgba(255, 45, 45, 0.11);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.04), 0 5px 18px rgba(125, 6, 16, 0.12);
}

.desktop-nav small {
  padding: 0.17rem 0.32rem;
  border-radius: 4px;
  color: #181414;
  background: var(--red);
  font-size: 0.43rem;
  letter-spacing: 0.08em;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.65rem;
}

.live-pill {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  gap: 0.48rem;
  padding: 0 0.25rem;
  border: 0;
  color: #76e899;
  background: transparent;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.live-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.support-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 0.55rem;
  padding: 0 1rem;
  border-radius: 999px;
  color: #07120b;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 50%),
    #58e58c;
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 12px 30px rgba(84, 230, 139, 0.14);
  transition: transform 180ms ease, background-color 180ms ease;
}

.support-link:hover {
  background: #96f0b0;
  transform: translateY(-2px);
}

.support-link__icon {
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  font-size: 0.52rem;
}

.action-divider {
  width: 1px;
  height: 24px;
  margin: 0 0.1rem;
  background: var(--line);
}

.social-actions {
  display: flex;
  gap: 0.4rem;
}

.social-actions a {
  --social-color: var(--gray-lt);
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--social-color) 24%, var(--line));
  border-radius: 50%;
  color: var(--social-color);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent),
    color-mix(in srgb, var(--social-color) 7%, transparent);
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.social-actions a:hover {
  border-color: color-mix(in srgb, var(--social-color) 62%, transparent);
  color: var(--social-color);
  background: color-mix(in srgb, var(--social-color) 12%, transparent);
  transform: translateY(-2px);
}

.social-actions svg {
  width: 16px;
  height: 16px;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.social-actions .social-icon-fill {
  fill: currentColor;
  stroke: none;
}

.menu-toggle {
  display: none;
  min-height: 42px;
  align-items: center;
  gap: 0.65rem;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--white);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
}

.menu-toggle > span {
  font-size: 0.61rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-toggle__icon {
  position: relative;
  width: 15px;
  height: 12px;
}

.menu-toggle__icon b {
  position: absolute;
  left: 0;
  width: 15px;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transition: top 220ms ease, transform 220ms ease;
}

.menu-toggle__icon b:first-child {
  top: 2px;
}

.menu-toggle__icon b:last-child {
  top: 9px;
}

.menu-toggle__icon.open b:first-child,
.menu-toggle__icon.open b:last-child {
  top: 5px;
}

.menu-toggle__icon.open b:first-child {
  transform: rotate(45deg);
}

.menu-toggle__icon.open b:last-child {
  transform: rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  z-index: 1;
  top: calc(var(--notice-height) + 71px);
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  background: rgba(8, 8, 9, 0.98);
  backdrop-filter: blur(24px);
}

.mobile-menu__shell {
  display: flex;
  width: min(100% - 2rem, 760px);
  min-height: calc(100dvh - var(--notice-height) - 71px);
  flex-direction: column;
  margin: 0 auto;
  padding: 2.5rem 0 2rem;
}

.mobile-menu__label {
  margin-bottom: 1rem;
  color: var(--gray);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mobile-menu nav {
  border-top: 1px solid var(--line);
}

.mobile-menu nav > a {
  display: grid;
  grid-template-columns: 2.25rem 1fr auto;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
  color: var(--white);
  text-decoration: none;
}

.mobile-menu nav small {
  color: var(--gray);
  font-size: 0.56rem;
}

.mobile-menu nav strong {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 8vw, 3.3rem);
  line-height: 0.96;
  letter-spacing: -0.055em;
}

.mobile-menu nav > a > span {
  color: var(--gray);
}

.mobile-menu nav > a.active strong,
.mobile-menu nav > a.active > span {
  color: var(--red-bright);
}

.mobile-menu__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: auto;
  padding-top: 2.5rem;
}

.mobile-menu__footer > a {
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.mobile-menu__footer > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem;
}

.mobile-menu__footer > div a {
  color: var(--social-color, var(--gray));
  font-size: 0.62rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
}

.notice-enter-active,
.notice-leave-active {
  transition: height 180ms ease, opacity 180ms ease;
}

.notice-enter-from,
.notice-leave-to {
  height: 0;
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 180ms ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (max-width: 1360px) {
  .desktop-nav a {
    padding: 0 0.62rem;
  }

  .social-actions {
    display: none;
  }

  .action-divider {
    display: none;
  }
}

@media (max-width: 1160px) {
  .header-shell {
    display: flex;
    justify-content: space-between;
  }

  .desktop-nav,
  .live-pill,
  .support-link {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }
}

@media (max-width: 720px) {
  .announcement__shell {
    justify-content: flex-start;
    padding-right: 2.2rem;
    overflow: hidden;
  }

  .announcement p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .announcement p strong {
    display: none;
  }

  .announcement a {
    flex: 0 0 auto;
  }

  .nav-stage {
    padding: 0.55rem 0.7rem;
  }

  .wordmark-copy small {
    display: none;
  }

  .mobile-menu {
    top: calc(var(--notice-height) + 67px);
  }

  .mobile-menu__shell {
    min-height: calc(100dvh - var(--notice-height) - 67px);
  }

  .mobile-menu__footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .mobile-menu__footer > div {
    justify-content: flex-start;
  }
}
</style>
