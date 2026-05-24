<template>
  <footer class="site-footer">
    <div class="footer-glow" aria-hidden="true" />
    <div class="footer-grid-bg" aria-hidden="true" />

    <!-- Stats strip -->
    <div class="footer-stats">
      <div v-for="s in footerStats" :key="s.label" class="footer-stat">
        <span class="footer-stat-num">{{ s.num }}</span>
        <span class="footer-stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="footer-inner">

      <!-- Brand block -->
      <div class="footer-brand">
        <div class="footer-logo">
          <div class="logo-img-wrap">
            <img src="/products/favicon/logo/image.png" alt="ASLIL GANG PANEL Logo" class="logo-img" />
          </div>
          <div class="footer-logo-words">
            <span class="footer-logo-main">ASLIL GANG</span>
            <span class="footer-logo-sub">PANEL</span>
          </div>
        </div>
        <p class="footer-tagline">
          India's #1 premium Free Fire panel.<br/>Instant delivery, impeccable service.
        </p>
        <a
          :href="`https://wa.me/${ownerNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-wa-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
        </a>
      </div>

      <!-- Nav columns -->
      <nav class="footer-nav" aria-label="Footer navigation">
        <div v-for="col in navCols" :key="col.title" class="footer-col">
          <h3 class="footer-col-title">{{ col.title }}</h3>
          <ul>
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link">
                <span class="footer-link-arrow">›</span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © {{ year }} Aslil Gang Panel. All rights reserved.
      </p>
      <p class="footer-copy">
        Made with ❤️ in India &middot; Contact: +{{ ownerNumber }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { ownerNumber } = useWhatsApp()
const year = new Date().getFullYear()

const footerStats = [
  { num: '2K+',   label: 'Happy Customers' },
  { num: '99.9%', label: 'Uptime'        },
  { num: '8+',    label: 'Panels'        },
  { num: '24/7',  label: 'Support'       },
]

const navCols = [
  {
    title: 'Products',
    links: [
      { to: '/cheats/ios',     label: 'iOS Panel'     },
      { to: '/cheats/android', label: 'Android Panel' },
      { to: '/pc-panel',       label: 'PC Panel'      },
      { to: '/pc-game-panel',  label: 'PC Game Panel' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/free-fire-ids', label: 'Premium IDs'  },
      { to: '/ssm-panel',     label: 'SSM Panel'    },
      { to: '/reseller',      label: 'Reseller Plan'},
    ],
  },
]
</script>

<style scoped>
.site-footer {
  position: relative;
  background: rgba(0,0,0,0.97);
  border-top: 1px solid rgba(230,30,38,0.12);
  overflow: hidden;
}

/* Grid background */
.footer-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, black 20%, transparent 80%);
  pointer-events: none;
}

.footer-glow {
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 900px; height: 350px;
  background: radial-gradient(ellipse, rgba(160,8,8,0.22) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}

/* Stats strip */
.footer-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  padding: 3rem 2rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
}

.footer-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 3rem;
  position: relative;
}

.footer-stat:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: rgba(255,255,255,0.07);
}

.footer-stat-num {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.footer-stat-label {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
}

/* Inner layout */
.footer-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

/* Brand */
.footer-brand { max-width: 360px; }

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.footer-logo-mark {
  width: 42px; height: 42px;
  border-radius: 11px;
  background: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 900;
  color: #fff;
  flex-shrink: 0;
}

.footer-logo-words {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.footer-logo-main {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-logo-sub {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--red);
  text-transform: uppercase;
}

.footer-tagline {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.65;
  margin: 0 0 1.5rem;
}

.footer-wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: 9999px;
  background: #25D366;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 18px rgba(37,211,102,0.3);
}

.footer-wa-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37,211,102,0.5);
}

/* Nav */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.footer-col ul {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-col-title {
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin: 0 0 1.25rem;
}

.footer-link {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--gray);
  text-decoration: none;
  transition: color 0.25s ease, padding-left 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.footer-link:hover { color: #fff; padding-left: 4px; }

.footer-link-arrow {
  font-size: 1rem;
  color: var(--red);
  transition: transform 0.25s ease;
  line-height: 1;
}

.footer-link:hover .footer-link-arrow { transform: translateX(2px); }

/* Bottom bar */
.footer-bottom {
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255,255,255,0.04);
  padding: 1.5rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-copy {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: rgba(255,255,255,0.25);
  margin: 0;
}

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
.footer-logo:hover .logo-img-wrap {
  border-color: rgba(230, 30, 38, 0.65);
  box-shadow: 0 0 24px rgba(230, 30, 38, 0.55);
  transform: scale(1.05) rotate(-4deg);
}
</style>
