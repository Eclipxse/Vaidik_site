<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-lead">
        <div>
          <span class="footer-kicker">Ready when you are</span>
          <h2>Your next upgrade starts here.</h2>
        </div>
        <a
          :href="`https://wa.me/${ownerNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-contact"
        >
          <span>
            <small>Direct support</small>
            Start a conversation
          </span>
          <i aria-hidden="true">↗</i>
        </a>
      </div>

      <div class="footer-main">
        <div class="footer-brand">
          <NuxtLink to="/" class="brand" aria-label="Aslil Gang Panel home">
            <span class="brand-mark" aria-hidden="true">AG</span>
            <span>
              <strong>Aslil Gang</strong>
              <small>Premium panel store</small>
            </span>
          </NuxtLink>
          <p>
            A focused Free Fire marketplace for panels, player IDs and reseller
            access—supported directly from India.
          </p>
          <div class="footer-socials">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ social.label }}
            </a>
          </div>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <div v-for="column in navColumns" :key="column.title" class="footer-column">
            <h3>{{ column.title }}</h3>
            <ul>
              <li v-for="link in column.links" :key="link.to">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Aslil Gang Panel</p>
        <p>Built for players who take the details seriously.</p>
        <a :href="`https://wa.me/${ownerNumber}`" target="_blank" rel="noopener noreferrer">
          WhatsApp +{{ ownerNumber }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { ownerNumber } = useWhatsApp()
const year = new Date().getFullYear()

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/fit_vaidik' },
  { label: 'Telegram', href: 'https://t.me/+fp8yl-Roaek5YmU1' },
  { label: 'YouTube', href: 'https://www.youtube.com/@aslilgangliveff' },
  { label: 'Discord', href: 'https://discord.gg/g6BdyeWQvQ' },
]

const navColumns = [
  {
    title: 'Shop',
    links: [
      { to: '/cheats/android', label: 'Android panels' },
      { to: '/cheats/ios', label: 'iOS panels' },
      { to: '/pc-panel', label: 'PC panels' },
      { to: '/free-fire-ids', label: 'Free Fire IDs' },
    ],
  },
  {
    title: 'More',
    links: [
      { to: '/ssm-panel', label: 'Social panels' },
      { to: '/reseller', label: 'Reseller access' },
      { to: '/', label: 'Store home' },
    ],
  },
]
</script>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--line);
  background:
    radial-gradient(circle at 18% 100%, rgba(255, 52, 65, 0.1), transparent 30%),
    #050505;
}

.site-footer::after {
  position: absolute;
  right: -16rem;
  bottom: -28rem;
  width: 48rem;
  height: 48rem;
  border: 1px solid rgba(255, 255, 255, 0.045);
  border-radius: 50%;
  box-shadow:
    0 0 0 7rem rgba(255, 255, 255, 0.012),
    0 0 0 14rem rgba(255, 255, 255, 0.008);
  content: '';
  pointer-events: none;
}

.footer-shell {
  position: relative;
  z-index: 1;
  width: min(1280px, calc(100% - 3rem));
  margin: 0 auto;
}

.footer-lead {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
  padding: clamp(5rem, 9vw, 8rem) 0;
  border-bottom: 1px solid var(--line);
}

.footer-kicker {
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.footer-lead h2 {
  max-width: 820px;
  margin: 1rem 0 0;
  font-size: clamp(3rem, 6.5vw, 6.8rem);
  line-height: 0.9;
  letter-spacing: -0.07em;
  text-transform: uppercase;
}

.footer-contact {
  display: flex;
  min-width: 280px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid rgba(84, 231, 137, 0.22);
  border-radius: 15px;
  color: #07140b;
  background: #54e789;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.footer-contact:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(84, 231, 137, 0.17);
}

.footer-contact > span {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
}

.footer-contact small {
  color: rgba(7, 20, 11, 0.6);
  font-family: var(--font-body);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.footer-contact i {
  font-size: 1.4rem;
  font-style: normal;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) 1fr;
  gap: clamp(4rem, 10vw, 10rem);
  padding: 4.5rem 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, var(--red-bright), var(--red-deep));
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
}

.brand > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.brand strong {
  font-family: var(--font-display);
  font-size: 0.92rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand small {
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.footer-brand p {
  max-width: 440px;
  margin: 1.3rem 0 0;
  color: var(--gray);
  font-size: 0.84rem;
  line-height: 1.7;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.25rem;
  margin-top: 1.5rem;
}

.footer-socials a {
  color: var(--gray-lt);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease;
}

.footer-socials a:hover {
  color: var(--red-bright);
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;
}

.footer-column h3 {
  margin: 0 0 1.2rem;
  color: rgba(255, 255, 255, 0.42);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.footer-column ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-column a {
  color: var(--gray-lt);
  font-size: 0.84rem;
  text-decoration: none;
  transition: color 160ms ease, transform 160ms ease;
}

.footer-column a:hover {
  color: #fff;
}

.footer-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem 0 2rem;
  border-top: 1px solid var(--line);
}

.footer-bottom p,
.footer-bottom a {
  margin: 0;
  color: rgba(255, 255, 255, 0.36);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.footer-bottom p:nth-child(2) {
  text-align: center;
}

.footer-bottom a {
  text-align: right;
}

@media (max-width: 820px) {
  .footer-lead,
  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-contact {
    width: min(100%, 360px);
  }

  .footer-main {
    gap: 3rem;
  }
}

@media (max-width: 620px) {
  .footer-shell {
    width: min(100% - 2rem, 1280px);
  }

  .footer-lead {
    gap: 2rem;
  }

  .footer-lead h2 {
    font-size: 3.15rem;
  }

  .footer-contact {
    min-width: 0;
  }

  .footer-nav {
    gap: 1.5rem;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
  }

  .footer-bottom p:nth-child(2),
  .footer-bottom a {
    text-align: left;
  }
}
</style>
