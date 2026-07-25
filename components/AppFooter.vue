<script setup lang="ts">
const { ownerNumber } = useWhatsApp()
const year = new Date().getFullYear()

const collections = [
  { label: 'PC panels', to: '/pc-panel' },
  { label: 'Android', to: '/cheats/android' },
  { label: 'iOS', to: '/cheats/ios' },
  { label: 'Player IDs', to: '/free-fire-ids' },
  { label: 'Reseller', to: '/reseller' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/fit_vaidik' },
  { label: 'Telegram', href: 'https://t.me/+fp8yl-Roaek5YmU1' },
  { label: 'YouTube', href: 'https://www.youtube.com/@aslilgangliveff' },
  { label: 'Discord', href: 'https://discord.gg/g6BdyeWQvQ' },
]

function scrollToTop() {
  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) {
    lenis.scrollTo(0)
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-lead">
        <NuxtLink to="/" class="footer-wordmark">
          <span>A</span>
          <strong>Aslil Gang</strong>
        </NuxtLink>
        <p>
          A focused digital storefront for panels, player IDs and reseller
          access—supported directly through WhatsApp.
        </p>
        <a
          :href="`https://wa.me/${ownerNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-support"
        >
          Talk to support
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="footer-nav">
        <div>
          <span class="footer-label">Collections</span>
          <nav aria-label="Footer collections">
            <NuxtLink v-for="link in collections" :key="link.to" :to="link.to">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
        <div>
          <span class="footer-label">Follow</span>
          <nav aria-label="Social links">
            <a
              v-for="link in socialLinks"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} Aslil Gang</span>
      <span>Built for clear choices and direct support.</span>
      <button type="button" @click="scrollToTop">
        Back to top
        <span aria-hidden="true">↑</span>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  background: #080809;
}

.footer-shell {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 0.7fr);
  justify-content: space-between;
  gap: clamp(4rem, 10vw, 10rem);
  width: min(1280px, calc(100% - 3rem));
  margin: 0 auto;
  padding: clamp(5rem, 8vw, 8rem) 0;
}

.footer-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--white);
  text-decoration: none;
}

.footer-wordmark > span {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  background: var(--red);
  font-family: var(--font-display);
  font-weight: 700;
}

.footer-wordmark strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: -0.03em;
}

.footer-lead p {
  max-width: 500px;
  margin: 1.5rem 0 0;
  color: var(--gray);
  font-size: 0.84rem;
  line-height: 1.72;
}

.footer-support {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--white);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 2rem;
}

.footer-label {
  display: block;
  margin-bottom: 1.3rem;
  color: var(--gray);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.footer-nav nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
}

.footer-nav a {
  color: var(--gray-lt);
  font-size: 0.76rem;
  text-decoration: none;
  transition: color 160ms ease;
}

.footer-nav a:hover {
  color: var(--white);
}

.footer-bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  width: min(1280px, calc(100% - 3rem));
  min-height: 76px;
  margin: 0 auto;
  border-top: 1px solid var(--line);
  color: var(--gray);
  font-size: 0.57rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.footer-bottom > span:nth-child(2) {
  text-align: center;
}

.footer-bottom button {
  justify-self: end;
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

@media (max-width: 800px) {
  .footer-shell {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    grid-template-columns: 1fr auto;
  }

  .footer-bottom > span:nth-child(2) {
    display: none;
  }
}

@media (max-width: 560px) {
  .footer-shell,
  .footer-bottom {
    width: min(100% - 2rem, 1280px);
  }

  .footer-nav {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
