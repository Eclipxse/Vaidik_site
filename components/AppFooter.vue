<script setup lang="ts">
const { ownerNumber } = useWhatsApp()
const year = new Date().getFullYear()

const collections = [
  { label: 'PC panels', to: '/pc-panel' },
  { label: 'Android', to: '/cheats/android' },
  { label: 'iOS', to: '/cheats/ios' },
  { label: 'Player IDs', to: '/free-fire-ids' },
  { label: 'Reseller', to: '/reseller' },
  { label: 'Social services', to: '/ssm-panel' },
]

const socials = [
  { label: 'Instagram', color: '#E4405F', href: 'https://www.instagram.com/fit_vaidik' },
  { label: 'Telegram', color: '#229ED9', href: 'https://t.me/+fp8yl-Roaek5YmU1' },
  { label: 'YouTube', color: '#FF0033', href: 'https://www.youtube.com/@aslilgangliveff' },
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
    <section class="footer-contact">
      <div>
        <span>Need help choosing?</span>
        <h2>Send your device.<br />Get a clearer answer.</h2>
      </div>
      <a
        :href="`https://wa.me/${ownerNumber}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Talk on WhatsApp
        <span aria-hidden="true">↗</span>
      </a>
    </section>

    <div class="footer-main">
      <div class="footer-brand">
        <NuxtLink to="/" aria-label="Aslil Gang home">
          <img src="/brand/aslil-logo.png" alt="" />
          <span>
            <strong>Aslil Gang</strong>
            <small>Panel store</small>
          </span>
        </NuxtLink>
        <p>
          A focused digital storefront for panels, player IDs, creator services
          and reseller access.
        </p>
      </div>

      <nav class="footer-links" aria-label="Footer collections">
        <span>Collections</span>
        <NuxtLink v-for="link in collections" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <nav class="footer-links" aria-label="Social links">
        <span>Follow</span>
        <a
          v-for="social in socials"
          :key="social.href"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :style="{ '--social-color': social.color }"
        >
          {{ social.label }}
          <i aria-hidden="true" />
        </a>
      </nav>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} Aslil Gang</span>
      <span>Compatibility and availability should be confirmed before payment.</span>
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
  background:
    radial-gradient(circle at 20% 20%, rgba(140, 6, 18, 0.08), transparent 26rem),
    #070708;
}

.footer-contact,
.footer-main,
.footer-bottom {
  width: min(var(--shell), calc(100% - 3rem));
  margin: 0 auto;
}

.footer-contact {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
  padding: clamp(4rem, 8vw, 7rem);
  overflow: hidden;
  margin-top: 1rem;
  border: 1px solid var(--line);
  border-radius: 28px;
  color: var(--white);
  background:
    linear-gradient(120deg, rgba(255, 45, 45, 0.08), transparent 42%),
    #0e0e11;
}

.footer-contact > div > span {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.51rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-contact h2 {
  margin: 0.9rem 0 0;
  font-size: clamp(3.5rem, 6.4vw, 6.8rem);
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.footer-contact > a {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  border: 1px solid rgba(255, 69, 64, 0.42);
  border-radius: 999px;
  color: #fff;
  background: var(--red);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) repeat(2, minmax(150px, 0.34fr));
  gap: clamp(3rem, 8vw, 8rem);
  padding: clamp(5rem, 8vw, 8rem) 0;
}

.footer-brand > a {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--white);
  text-decoration: none;
}

.footer-brand img {
  width: 46px;
  height: 46px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  object-fit: cover;
}

.footer-brand a > span {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.footer-brand strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.footer-brand small {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.45rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.footer-brand p {
  max-width: 430px;
  margin: 1.4rem 0 0;
  color: var(--gray);
  font-size: 0.82rem;
  line-height: 1.7;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
}

.footer-links > span {
  margin-bottom: 0.35rem;
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-lt);
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 180ms ease;
}

.footer-links a:hover {
  color: var(--white);
}

.footer-links a i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--social-color, transparent);
}

.footer-bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
  min-height: 70px;
  border-top: 1px solid var(--line);
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.46rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.footer-bottom button {
  justify-self: end;
  padding: 0;
  border: 0;
  color: var(--gray-lt);
  background: transparent;
  font: inherit;
  text-transform: inherit;
  cursor: pointer;
}

@media (max-width: 800px) {
  .footer-contact,
  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-contact > a {
    width: fit-content;
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    grid-template-columns: 1fr auto;
  }

  .footer-bottom > span:nth-child(2) {
    display: none;
  }
}

@media (max-width: 560px) {
  .footer-contact,
  .footer-main,
  .footer-bottom {
    width: min(100% - 2rem, 1280px);
  }

  .footer-contact {
    padding: 3rem 1.3rem;
  }
}
</style>
