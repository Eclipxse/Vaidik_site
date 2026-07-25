<script setup lang="ts">
import type { ProductTab } from '~/components/ui/AnimatedProductTabs.vue'
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'
import SystemStatusTicker from '~/components/SystemStatusTicker.vue'
import TrustProofWall from '~/components/TrustProofWall.vue'
import InteractiveFaq from '~/components/InteractiveFaq.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Aslil Gang — Premium Game Panels, Player IDs & Setup Support',
  meta: [
    {
      name: 'description',
      content: 'Explore PC, Android, and iOS game panels, player IDs, and reseller access with 100% anti-ban security and instant WhatsApp delivery.',
    },
  ],
})

const { ownerNumber } = useWhatsApp()
const supportMessage = encodeURIComponent('Hi! I need help choosing the right Aslil Gang panel for my device.')
const supportLink = computed(() => `https://wa.me/${ownerNumber}?text=${supportMessage}`)

const productTabs: ProductTab[] = [
  {
    id: 'pc',
    label: 'PC Panels',
    eyebrow: 'Desktop collection',
    title: 'Built for the ultimate PC setup.',
    description: 'A broader range of panels for players who want feature depth, flexible control, and guided setup.',
    price: '₹999',
    image: '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/VISIBLE_AIMBOT_INTERNAL.png',
    to: '/pc-panel',
    features: ['5-Type Aimbot AI', 'OBS Streamer Mode safe', 'Windows 10 & 11 64-Bit'],
  },
  {
    id: 'android',
    label: 'Android Mobile',
    eyebrow: 'Mobile collection',
    title: 'A focused panel for Android.',
    description: 'A streamlined mobile option designed for broad device support and a simple purchase path.',
    price: '₹999',
    image: '/products/PHONE_PANEL/Phonepanel.png',
    to: '/cheats/android',
    features: ['Root & Non-Root both work', 'All Android phones & tablets', 'Drag headshot & Chams'],
  },
  {
    id: 'ios',
    label: 'iOS iPhone/iPad',
    eyebrow: 'Apple collection',
    title: 'A clean route into iOS.',
    description: 'One considered panel for iPhone and iPad, with direct setup guidance and no jailbreak required.',
    price: '₹1,999',
    image: '/products/IOS_PANEL/IOSPANEL.png',
    to: '/cheats/ios',
    features: ['All iPhone & iPad models', 'No jailbreak required', 'Hologram ESP & Aimbot'],
  },
]

const collections = [
  {
    to: '/pc-panel',
    label: 'Desktop',
    title: 'PC panels',
    copy: 'The broadest collection, from external panels to streamer-ready setups.',
    image: '/products/PC_EXTERNAL PANEL/External.png',
    accent: '#ff4136',
  },
  {
    to: '/cheats/android',
    label: 'Mobile',
    title: 'Android',
    copy: 'A direct, device-friendly route for phone and tablet players.',
    image: '/products/PHONE_PANEL/Phonepanel.png',
    accent: '#ef7349',
  },
  {
    to: '/cheats/ios',
    label: 'Apple',
    title: 'iOS',
    copy: 'A considered option for iPhone and iPad with guided setup.',
    image: '/products/IOS_PANEL/IOSPANEL.png',
    accent: '#9ca6ff',
  },
  {
    to: '/free-fire-ids',
    label: 'Inventory',
    title: 'Player IDs',
    copy: 'Distinct player accounts presented with clear, comparable details.',
    image: '/products/uploads/1779623174189_content.png',
    accent: '#d6b968',
  },
]

const principles = [
  {
    number: '01',
    title: 'Choose with context',
    copy: 'Products are grouped by device and use case, with important anti-ban details surfaced early.',
  },
  {
    number: '02',
    title: 'Talk before checkout',
    copy: 'Use WhatsApp to confirm compatibility, pricing, and your exact setup before ordering.',
  },
  {
    number: '03',
    title: '1:1 Guided Setup',
    copy: 'Our dedicated team assists you line-by-line to get your panel up and running in under 5 minutes.',
  },
]

const process = [
  { title: 'Pick your platform', copy: 'Start with PC, Android, iOS or player IDs.' },
  { title: 'Review your fit', copy: 'Compare product features and anti-ban capabilities.' },
  { title: 'Message to order', copy: 'Confirm everything directly with the Aslil Gang team on WhatsApp.' },
]
</script>

<template>
  <div class="home">
    <!-- Real-Time Cybernetic System Status Ticker -->
    <SystemStatusTicker />

    <!-- Hero Section with Particles & Spotlight Card -->
    <HeroSection />

    <section class="category-rail" aria-label="Available categories">
      <div class="category-rail__shell">
        <span v-for="item in ['PC panels', 'Android', 'iOS', 'Player IDs', 'Reseller access', 'SMM Services']" :key="item">
          {{ item }}
          <i aria-hidden="true" />
        </span>
      </div>
    </section>

    <!-- Featured Platforms -->
    <section id="featured" class="featured" aria-labelledby="featured-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="section-head">
            <div>
              <span class="section-label">Featured platforms</span>
              <h2 id="featured-title">Start with how you play.</h2>
            </div>
            <p>
              Three platforms, one clear catalog. Switch between collections
              to find the product family that fits your device.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal :delay="0.08" :duration="0.8">
          <AnimatedProductTabs :tabs="productTabs" />
        </BlurReveal>
      </div>
    </section>

    <!-- Catalog Overview -->
    <section class="collections" aria-labelledby="collections-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="collections-head">
            <span class="section-label">The catalog</span>
            <h2 id="collections-title">
              Four ways in.<br />
              <span>No dead ends.</span>
            </h2>
          </div>
        </BlurReveal>

        <div class="collection-grid">
          <BlurReveal
            v-for="(collection, index) in collections"
            :key="collection.to"
            :delay="index * 0.04"
            :duration="0.7"
          >
            <NuxtLink
              :to="collection.to"
              class="collection-card"
              :style="{ '--card-accent': collection.accent }"
            >
              <div class="collection-card__top">
                <span>{{ collection.label }}</span>
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="collection-card__media">
                <img :src="collection.image" :alt="collection.title" loading="lazy" />
              </div>
              <div class="collection-card__copy">
                <div>
                  <h3>{{ collection.title }}</h3>
                  <p>{{ collection.copy }}</p>
                </div>
                <span class="collection-card__arrow" aria-hidden="true">↗</span>
              </div>
            </NuxtLink>
          </BlurReveal>
        </div>
      </div>
    </section>

    <!-- Verified Customer Trust Wall -->
    <TrustProofWall />

    <!-- Aslil Principles -->
    <section class="principles" aria-labelledby="principles-title">
      <div class="section-shell principles-grid">
        <BlurReveal class="principles-intro">
          <span class="section-label">The Aslil standard</span>
          <h2 id="principles-title">Less friction. Better decisions.</h2>
          <p>
            This store is built around clarity: what works where, what it
            costs, and who you can talk to when a question comes up.
          </p>
          <NuxtLink to="/reseller">
            Explore the reseller program
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </BlurReveal>

        <div class="principle-list">
          <BlurReveal
            v-for="(principle, index) in principles"
            :key="principle.number"
            :delay="index * 0.05"
          >
            <article class="principle">
              <span>{{ principle.number }}</span>
              <div>
                <h3>{{ principle.title }}</h3>
                <p>{{ principle.copy }}</p>
              </div>
            </article>
          </BlurReveal>
        </div>
      </div>
    </section>

    <!-- Interactive FAQ Section -->
    <InteractiveFaq />

    <!-- Step Process -->
    <section class="process" aria-labelledby="process-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="process-head">
            <span class="section-label">How it works</span>
            <h2 id="process-title">From product to setup in three steps.</h2>
          </div>
        </BlurReveal>

        <ol class="process-grid">
          <li v-for="(step, index) in process" :key="step.title">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- WhatsApp Contact Band -->
    <section class="contact-band" aria-labelledby="contact-title">
      <div class="section-shell contact-band__grid">
        <BlurReveal>
          <span class="contact-kicker">Not sure what fits?</span>
          <h2 id="contact-title">Tell us your device. We’ll narrow it down.</h2>
        </BlurReveal>
        <BlurReveal :delay="0.08">
          <a :href="supportLink" target="_blank" rel="noopener noreferrer" class="contact-action">
            <span>
              <small>Direct WhatsApp support</small>
              Start a conversation
            </span>
            <i aria-hidden="true">↗</i>
          </a>
        </BlurReveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  overflow: hidden;
}

.section-shell {
  width: min(1280px, calc(100% - 3rem));
  margin: 0 auto;
}

.category-rail {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #0d0d0e;
}

.category-rail__shell {
  display: flex;
  width: min(1360px, 100%);
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  overflow-x: auto;
}

.category-rail span {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4rem);
  color: var(--gray-lt);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.category-rail i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--red);
}

.featured,
.collections,
.process {
  padding: clamp(6.5rem, 10vw, 10rem) 0;
}

.section-head {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 400px);
  align-items: end;
  gap: 3rem;
  margin-bottom: 3.5rem;
}

.section-head h2,
.collections-head h2,
.principles-intro h2,
.process-head h2,
.contact-band h2 {
  margin: 1.1rem 0 0;
  font-size: clamp(3rem, 6.3vw, 6.8rem);
  line-height: 0.9;
  letter-spacing: -0.068em;
}

.section-head p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.9rem;
  line-height: 1.72;
}

.collections {
  border-top: 1px solid var(--line);
  background: #0d0d0e;
}

.collections-head {
  margin-bottom: 3.5rem;
}

.collections-head h2 span {
  color: var(--gray);
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.collection-card {
  --card-accent: var(--red);
  display: flex;
  min-height: 620px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  color: var(--white);
  background: #111113;
  text-decoration: none;
  transition: border-color 220ms ease, transform 220ms ease;
}

.collection-card:hover {
  border-color: color-mix(in srgb, var(--card-accent) 70%, var(--line));
  transform: translateY(-4px);
}

.collection-card__top {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.collection-card__top span:first-child {
  color: color-mix(in srgb, var(--card-accent) 72%, white);
}

.collection-card__media {
  min-height: 0;
  flex: 1;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #09090a;
}

.collection-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.86);
  transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 300ms ease;
}

.collection-card:hover .collection-card__media img {
  filter: saturate(1);
  transform: scale(1.025);
}

.collection-card__copy {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1.5rem;
  padding: 1.35rem;
}

.collection-card h3 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.9rem);
  line-height: 1;
  letter-spacing: -0.052em;
}

.collection-card p {
  max-width: 430px;
  margin: 0.7rem 0 0;
  color: var(--gray);
  font-size: 0.78rem;
  line-height: 1.62;
}

.collection-card__arrow {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--white);
  transition: border-color 180ms ease, background-color 180ms ease;
}

.collection-card:hover .collection-card__arrow {
  border-color: var(--card-accent);
  background: var(--card-accent);
}

.principles {
  padding: clamp(6.5rem, 10vw, 10rem) 0;
  color: #151515;
  background: var(--paper);
}

.principles .section-label {
  color: #65645f;
}

.principles-grid {
  display: grid;
  grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1fr);
  gap: clamp(4rem, 9vw, 9rem);
}

.principles-intro {
  align-self: start;
  position: sticky;
  top: 8rem;
}

.principles-intro h2 {
  max-width: 650px;
}

.principles-intro p {
  max-width: 500px;
  margin: 1.5rem 0 0;
  color: #5f5e5a;
  font-size: 0.92rem;
  line-height: 1.72;
}

.principles-intro a {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(21, 21, 21, 0.35);
  color: #151515;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.principle-list {
  border-top: 1px solid rgba(21, 21, 21, 0.18);
}

.principle {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1.4rem;
  padding: 2.2rem 0;
  border-bottom: 1px solid rgba(21, 21, 21, 0.18);
}

.principle > span {
  padding-top: 0.25rem;
  color: var(--red-deep);
  font-size: 0.62rem;
  font-weight: 700;
}

.principle h3 {
  margin: 0;
  font-size: clamp(1.5rem, 2.7vw, 2.4rem);
  letter-spacing: -0.045em;
}

.principle p {
  max-width: 570px;
  margin: 0.75rem 0 0;
  color: #66645f;
  font-size: 0.84rem;
  line-height: 1.7;
}

.process-head {
  display: grid;
  grid-template-columns: 0.38fr 1fr;
  align-items: start;
  gap: 3rem;
  margin-bottom: 3rem;
}

.process-head h2 {
  max-width: 880px;
  margin-top: 0;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.process-grid li {
  display: flex;
  min-height: 290px;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem;
  border-bottom: 1px solid var(--line);
}

.process-grid li + li {
  border-left: 1px solid var(--line);
}

.process-grid li > span {
  color: var(--red);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.process-grid h3 {
  margin: 0;
  font-size: clamp(1.45rem, 2.4vw, 2.1rem);
  letter-spacing: -0.04em;
}

.process-grid p {
  max-width: 330px;
  margin: 0.7rem 0 0;
  color: var(--gray);
  font-size: 0.8rem;
  line-height: 1.65;
}

.contact-band {
  padding: clamp(5rem, 8vw, 8rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  background: var(--red-deep);
}

.contact-band__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
}

.contact-kicker {
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-band h2 {
  max-width: 900px;
  font-size: clamp(3rem, 6.5vw, 7rem);
}

.contact-action {
  display: flex;
  min-width: 280px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.1rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  color: #151515;
  background: var(--white);
  text-decoration: none;
  transition: transform 180ms ease;
}

.contact-action:hover {
  transform: translateY(-3px);
}

.contact-action > span {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-display);
  font-weight: 650;
}

.contact-action small {
  color: #75726c;
  font-family: var(--font-body);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-action i {
  font-size: 1.25rem;
  font-style: normal;
}

@media (max-width: 900px) {
  .section-head,
  .principles-grid,
  .process-head,
  .contact-band__grid {
    grid-template-columns: 1fr;
  }

  .principles-intro {
    position: static;
  }

  .process-grid {
    grid-template-columns: 1fr;
  }

  .process-grid li {
    min-height: 220px;
  }

  .process-grid li + li {
    border-left: 0;
  }

  .contact-action {
    width: min(100%, 380px);
  }
}

@media (max-width: 680px) {
  .section-shell {
    width: min(100% - 2rem, 1280px);
  }

  .category-rail__shell {
    padding: 0 1rem;
  }

  .featured,
  .collections,
  .process {
    padding: 5.5rem 0;
  }

  .section-head {
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .section-head h2,
  .collections-head h2,
  .principles-intro h2,
  .process-head h2,
  .contact-band h2 {
    font-size: clamp(2.8rem, 14vw, 4.4rem);
  }

  .collection-grid {
    grid-template-columns: 1fr;
  }

  .collection-card {
    min-height: 520px;
  }

  .principles-grid {
    gap: 3rem;
  }

  .process-head {
    gap: 1.5rem;
  }

  .contact-action {
    min-width: 0;
  }
}
</style>
