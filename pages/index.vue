<script setup lang="ts">
import AnimatedProductTabs, { type ProductTab } from '~/components/ui/AnimatedProductTabs.vue'
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'
import SpotlightCard from '~/components/ui/inspira/SpotlightCard.vue'
import InteractiveFaq from '~/components/InteractiveFaq.vue'
import { ALL_PRODUCTS } from '~/composables/useProducts'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Aslil Gang — Premium Game Panels, Player IDs & Setup Support',
  meta: [
    {
      name: 'description',
      content: 'Explore PC, Android and iOS panels, player IDs and reseller access with direct compatibility and setup support.',
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
    title: 'Built for serious PC setups.',
    description: 'The deepest collection in the store, with focused options for different play styles and direct setup guidance.',
    price: '₹999',
    image: '/products/PC_VISIBLE+AIMBOT+INTERNAL_PANEL/VISIBLE_AIMBOT_INTERNAL.png',
    to: '/pc-panel',
    features: ['Multiple panel configurations', 'Streamer-focused options available', 'Windows 10 and 11 support notes'],
  },
  {
    id: 'android',
    label: 'Android',
    eyebrow: 'Mobile collection',
    title: 'A cleaner route for Android.',
    description: 'A focused mobile option for supported phones and tablets, with compatibility checked before ordering.',
    price: '₹999',
    image: '/products/PHONE_PANEL/Phonepanel.png',
    to: '/cheats/android',
    features: ['Root and non-root options', 'Phone and tablet support notes', 'Direct installation guidance'],
  },
  {
    id: 'ios',
    label: 'iOS',
    eyebrow: 'Apple collection',
    title: 'Purpose-built for iPhone and iPad.',
    description: 'A considered iOS option with a simple purchase path and setup guidance for supported versions.',
    price: '₹1,999',
    image: '/products/IOS_PANEL/IOSPANEL.png',
    to: '/cheats/ios',
    features: ['iPhone and iPad support', 'No-jailbreak setup path', 'Compatibility confirmation included'],
  },
]

const collections = [
  {
    to: '/pc-panel',
    label: 'Desktop',
    title: 'PC Panels',
    copy: 'The broadest collection, from external panels to streamer-focused setups.',
    image: '/products/PC_EXTERNAL PANEL/External.png',
    accent: '#ff3434',
    stat: '06 products',
  },
  {
    to: '/cheats/android',
    label: 'Mobile',
    title: 'Android',
    copy: 'A direct, device-first collection for supported phones and tablets.',
    image: '/products/PHONE_PANEL/Phonepanel.png',
    accent: '#ff704e',
    stat: 'Root + non-root',
  },
  {
    to: '/cheats/ios',
    label: 'Apple',
    title: 'iOS',
    copy: 'One focused option for iPhone and iPad with guided setup.',
    image: '/products/IOS_PANEL/IOSPANEL.png',
    accent: '#a9b4ff',
    stat: 'No jailbreak',
  },
  {
    to: '/free-fire-ids',
    label: 'Inventory',
    title: 'Player IDs',
    copy: 'Curated player accounts with comparable details and direct enquiries.',
    image: '/products/uploads/1779623174189_content.png',
    accent: '#e2bb65',
    stat: 'Live inventory',
  },
]

const featuredProducts = ALL_PRODUCTS.slice(0, 3)

const principles = [
  {
    number: '01',
    title: 'Choose your platform',
    copy: 'Start with PC, Android or iOS so you only see options relevant to the device you actually use.',
  },
  {
    number: '02',
    title: 'Confirm compatibility',
    copy: 'Share your device and operating system on WhatsApp before ordering so the current fit can be checked.',
  },
  {
    number: '03',
    title: 'Order with guidance',
    copy: 'Complete the order directly and receive the setup instructions for the product you selected.',
  },
]
</script>

<template>
  <div class="home">
    <HeroSection />

    <section class="category-rail" aria-label="Available categories">
      <div class="category-rail__track">
        <template v-for="copy in 2" :key="copy">
          <NuxtLink
            v-for="item in [
              { label: 'PC Panels', to: '/pc-panel' },
              { label: 'Android', to: '/cheats/android' },
              { label: 'iOS', to: '/cheats/ios' },
              { label: 'Player IDs', to: '/free-fire-ids' },
              { label: 'Reseller Access', to: '/reseller' },
              { label: 'Social Services', to: '/ssm-panel' },
            ]"
            :key="`${copy}-${item.to}`"
            :to="item.to"
          >
            {{ item.label }}
            <i aria-hidden="true" />
          </NuxtLink>
        </template>
      </div>
    </section>

    <section id="featured" class="featured" aria-labelledby="featured-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="section-head">
            <div>
              <span class="section-label">Choose your platform</span>
              <h2 id="featured-title">Your device.<br /><em>Your collection.</em></h2>
            </div>
            <p>
              Switch between the three main platforms. The product, key details
              and starting price move with your selection.
            </p>
          </div>
        </BlurReveal>

        <BlurReveal :delay="0.08" :duration="0.8">
          <AnimatedProductTabs :tabs="productTabs" />
        </BlurReveal>
      </div>
    </section>

    <section class="signal-strip" aria-label="Store information">
      <div class="section-shell signal-strip__inner">
        <div>
          <small>Catalog</small>
          <strong>08</strong>
          <span>Core panel options</span>
        </div>
        <div>
          <small>Platforms</small>
          <strong>03</strong>
          <span>PC, Android and iOS</span>
        </div>
        <div>
          <small>Support</small>
          <strong>1:1</strong>
          <span>Direct setup guidance</span>
        </div>
        <div>
          <small>Status</small>
          <strong class="signal-live">Live</strong>
          <span>WhatsApp enquiries</span>
        </div>
      </div>
    </section>

    <section class="collections" aria-labelledby="collections-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="collections-head">
            <span class="section-label">Explore the store</span>
            <h2 id="collections-title">
              Built around<br />
              <em>how you play.</em>
            </h2>
          </div>
        </BlurReveal>

        <div class="collection-grid">
          <BlurReveal
            v-for="(collection, index) in collections"
            :key="collection.to"
            :class="[
              'collection-cell',
              { 'collection-cell--wide': index === 0 || index === 3 },
            ]"
            :delay="index * 0.04"
            :duration="0.7"
          >
            <SpotlightCard
              class-name="collection-spotlight"
              :spotlight-color="`${collection.accent}20`"
              :border-color="`${collection.accent}66`"
            >
              <NuxtLink
                :to="collection.to"
                class="collection-card"
                :style="{ '--card-accent': collection.accent }"
              >
                <BorderBeam
                  v-if="index === 0"
                  :duration="16"
                  :size="210"
                  :color-from="collection.accent"
                  color-to="#f6f1e8"
                />

                <div class="collection-card__top">
                  <span>{{ collection.label }}</span>
                  <small>{{ String(index + 1).padStart(2, '0') }} / 04</small>
                </div>

                <div class="collection-card__media">
                  <img :src="collection.image" :alt="collection.title" loading="lazy" />
                </div>

                <div class="collection-card__copy">
                  <span class="collection-card__stat">{{ collection.stat }}</span>
                  <h3>{{ collection.title }}</h3>
                  <p>{{ collection.copy }}</p>
                  <span class="collection-card__arrow" aria-hidden="true">↗</span>
                </div>
              </NuxtLink>
            </SpotlightCard>
          </BlurReveal>
        </div>
      </div>
    </section>

    <section class="popular" aria-labelledby="popular-title">
      <div class="section-shell">
        <BlurReveal>
          <div class="section-head section-head--compact">
            <div>
              <span class="section-label">Popular on PC</span>
              <h2 id="popular-title">Start with the<br /><em>main lineup.</em></h2>
            </div>
            <NuxtLink to="/pc-panel" class="section-link">
              View every PC panel <span aria-hidden="true">↗</span>
            </NuxtLink>
          </div>
        </BlurReveal>

        <div class="popular-grid">
          <BlurReveal
            v-for="(product, index) in featuredProducts"
            :key="product.slug"
            :delay="index * 0.05"
          >
            <ProductCard
              :to="`/products/${product.slug}`"
              :name="product.name"
              :description="product.tagline"
              :category="product.category"
              :features="product.features"
              :price="product.durations[0]?.price || 'Contact'"
              :duration="product.durations[0]?.label"
              :thumbnail="product.images[0]"
              :stock-status="product.durations[0]?.stock ? 'active' : 'limited'"
              :featured="index === 0"
            />
          </BlurReveal>
        </div>
      </div>
    </section>

    <section class="principles" aria-labelledby="principles-title">
      <div class="principles-aura" aria-hidden="true" />
      <div class="section-shell principles-grid">
        <BlurReveal class="principles-intro">
          <span class="section-label">Before checkout</span>
          <h2 id="principles-title">Three steps.<br /><em>No guessing.</em></h2>
          <p>
            The store is organized around compatibility first. Get the important
            details straight before payment.
          </p>
          <NuxtLink to="/reseller">
            Explore reseller access
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
              <i aria-hidden="true">↗</i>
            </article>
          </BlurReveal>
        </div>
      </div>
    </section>

    <InteractiveFaq />

    <section class="contact-band" aria-labelledby="contact-title">
      <span class="contact-band__grid" aria-hidden="true" />
      <div class="section-shell contact-band__inner">
        <BlurReveal>
          <span class="contact-kicker">Not sure what fits?</span>
          <h2 id="contact-title">Send your setup.<br /><em>Get a clear answer.</em></h2>
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
  background: var(--black);
}

.category-rail {
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #0b0b0d;
}

.category-rail__track {
  display: flex;
  width: max-content;
  min-height: 68px;
  align-items: center;
  animation: rail 30s linear infinite;
}

.category-rail a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 2.2rem;
  padding: 0 1.5rem;
  color: rgba(246, 241, 232, 0.55);
  font-family: var(--font-mono);
  font-size: 0.54rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease;
}

.category-rail a:hover {
  color: var(--white);
}

.category-rail i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 10px rgba(255, 45, 45, 0.45);
}

.featured,
.collections,
.popular {
  padding: clamp(6.5rem, 10vw, 10rem) 0;
}

.section-head {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 410px);
  align-items: end;
  gap: 3rem;
  margin-bottom: 3.4rem;
}

.section-head h2,
.collections-head h2,
.principles-intro h2,
.contact-band h2 {
  margin: 1.05rem 0 0;
  font-size: clamp(4rem, 7.2vw, 7.5rem);
  font-weight: 800;
  line-height: 0.78;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.section-head h2 em,
.collections-head h2 em,
.principles-intro h2 em,
.contact-band h2 em {
  color: var(--red-bright);
  font-style: normal;
}

.section-head > p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.86rem;
  line-height: 1.75;
}

.signal-strip {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(90deg, rgba(255, 45, 45, 0.04), transparent 25%, transparent 75%, rgba(255, 45, 45, 0.04)),
    #0a0a0c;
}

.signal-strip__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.signal-strip__inner > div {
  display: grid;
  min-height: 142px;
  grid-template-columns: auto 1fr;
  align-content: center;
  gap: 0.2rem 0.75rem;
  padding: 1.2rem;
}

.signal-strip__inner > div + div {
  border-left: 1px solid var(--line);
}

.signal-strip small {
  grid-column: 1 / -1;
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.45rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.signal-strip strong {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}

.signal-strip span {
  align-self: end;
  padding-bottom: 0.24rem;
  color: var(--gray);
  font-size: 0.57rem;
}

.signal-strip .signal-live {
  color: var(--green);
}

.collections {
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 18% 35%, rgba(128, 6, 17, 0.12), transparent 28rem),
    #0a0a0c;
}

.collections-head {
  margin-bottom: 3.4rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.collection-cell {
  grid-column: span 5;
  min-width: 0;
}

.collection-cell--wide {
  grid-column: span 7;
}

:deep(.collection-spotlight) {
  height: 100%;
  overflow: hidden;
  border-color: rgba(246, 241, 232, 0.1);
  border-radius: 26px;
  background: #0d0d10;
}

.collection-card {
  --card-accent: var(--red);
  position: relative;
  display: flex;
  min-height: 540px;
  flex-direction: column;
  overflow: hidden;
  border-radius: 26px;
  color: var(--white);
  text-decoration: none;
  isolation: isolate;
}

.collection-card__media {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  background: #080809;
}

.collection-card__media::after {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(7, 7, 8, 0.95) 5%, rgba(7, 7, 8, 0.52) 42%, transparent 74%),
    linear-gradient(140deg, rgba(7, 7, 8, 0.18), transparent);
  content: '';
}

.collection-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88) brightness(0.9);
  transition: filter 420ms ease, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.collection-card:hover .collection-card__media img {
  filter: saturate(1.05) brightness(0.98);
  transform: scale(1.04);
}

.collection-card__top {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  color: var(--card-accent);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.collection-card__top span {
  display: inline-flex;
  align-items: center;
  gap: 0.48rem;
}

.collection-card__top span::before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 12px currentColor;
  content: '';
}

.collection-card__top small {
  color: rgba(246, 241, 232, 0.5);
  font: inherit;
}

.collection-card__copy {
  position: relative;
  display: flex;
  margin-top: auto;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1.35rem 1.35rem;
}

.collection-card__stat {
  padding: 0.38rem 0.55rem;
  border: 1px solid color-mix(in srgb, var(--card-accent) 36%, transparent);
  border-radius: 999px;
  color: color-mix(in srgb, var(--card-accent) 82%, white);
  background: rgba(7, 7, 8, 0.44);
  font-family: var(--font-mono);
  font-size: 0.45rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.collection-card h3 {
  margin: 0.85rem 0 0;
  font-size: clamp(3.5rem, 6vw, 6.5rem);
  font-weight: 800;
  line-height: 0.78;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.collection-card p {
  max-width: 470px;
  margin: 1rem 0 0;
  color: rgba(246, 241, 232, 0.64);
  font-size: 0.74rem;
  line-height: 1.65;
}

.collection-card__arrow {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  width: 50px;
  height: 50px;
  place-items: center;
  border: 1px solid rgba(246, 241, 232, 0.18);
  border-radius: 50%;
  background: rgba(7, 7, 8, 0.54);
  font-size: 1.1rem;
  backdrop-filter: blur(12px);
  transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease;
}

.collection-card:hover .collection-card__arrow {
  border-color: var(--card-accent);
  background: var(--card-accent);
  transform: rotate(8deg);
}

.popular {
  background: #070708;
}

.section-head--compact {
  margin-bottom: 2.7rem;
}

.section-link {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(246, 241, 232, 0.22);
  color: var(--gray-lt);
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.section-link span {
  color: var(--red-bright);
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.popular-grid > :deep(*) {
  min-width: 0;
}

.principles {
  position: relative;
  overflow: hidden;
  padding: clamp(7rem, 11vw, 11rem) 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #0c0c0f;
}

.principles-aura {
  position: absolute;
  top: -25%;
  right: -15%;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(171, 8, 23, 0.15), transparent 65%);
  filter: blur(35px);
}

.principles-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1fr);
  gap: clamp(4rem, 9vw, 9rem);
}

.principles-intro {
  position: sticky;
  top: 8rem;
  align-self: start;
}

.principles-intro h2 {
  font-size: clamp(4rem, 6.5vw, 6.8rem);
}

.principles-intro p {
  max-width: 480px;
  margin: 1.5rem 0 0;
  color: var(--gray-lt);
  font-size: 0.85rem;
  line-height: 1.72;
}

.principles-intro > a {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 2rem;
  padding-bottom: 0.32rem;
  border-bottom: 1px solid rgba(246, 241, 232, 0.24);
  color: var(--white);
  font-size: 0.61rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
}

.principle-list {
  border-top: 1px solid var(--line-strong);
}

.principle {
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  align-items: start;
  gap: 1.4rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--line);
  transition: padding 220ms ease, background-color 220ms ease;
}

.principle:hover {
  padding-right: 1rem;
  padding-left: 1rem;
  background: rgba(255, 255, 255, 0.018);
}

.principle > span {
  padding-top: 0.25rem;
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.54rem;
}

.principle h3 {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 3.4rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.principle p {
  max-width: 580px;
  margin: 0.8rem 0 0;
  color: var(--gray);
  font-size: 0.75rem;
  line-height: 1.68;
}

.principle > i {
  color: var(--gray);
  font-style: normal;
  transition: color 180ms ease, transform 180ms ease;
}

.principle:hover > i {
  color: var(--red-bright);
  transform: rotate(8deg);
}

.contact-band {
  position: relative;
  overflow: hidden;
  padding: clamp(6rem, 10vw, 10rem) 0;
  background:
    radial-gradient(circle at 75% 50%, rgba(255, 80, 70, 0.19), transparent 32%),
    linear-gradient(120deg, #760914, #b30c1b 55%, #650711);
}

.contact-band__grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(circle at 50% 50%, #000, transparent 75%);
}

.contact-band__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
}

.contact-kicker {
  color: rgba(255, 255, 255, 0.62);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-band h2 {
  max-width: 980px;
}

.contact-band h2 em {
  color: #fff;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);
}

.contact-action {
  display: flex;
  min-width: 300px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.05rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 18px;
  color: #151111;
  background: var(--white);
  text-decoration: none;
  box-shadow: 0 22px 55px rgba(39, 0, 4, 0.24);
  transition: transform 180ms ease;
}

.contact-action:hover {
  transform: translateY(-4px) rotate(-1deg);
}

.contact-action > span {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
}

.contact-action small {
  color: #77706a;
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.08em;
}

.contact-action i {
  font-size: 1.3rem;
  font-style: normal;
}

@keyframes rail {
  to { transform: translateX(-50%); }
}

@media (max-width: 980px) {
  .section-head,
  .principles-grid,
  .contact-band__inner {
    grid-template-columns: 1fr;
  }

  .signal-strip__inner {
    grid-template-columns: repeat(2, 1fr);
  }

  .signal-strip__inner > div:nth-child(3) {
    border-left: 0;
  }

  .signal-strip__inner > div:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }

  .collection-cell,
  .collection-cell--wide {
    grid-column: span 6;
  }

  .popular-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .principles-intro {
    position: static;
  }

  .section-link {
    justify-self: start;
  }

  .contact-action {
    width: min(100%, 390px);
  }
}

@media (max-width: 680px) {
  .featured,
  .collections,
  .popular {
    padding: 5.8rem 0;
  }

  .section-head {
    gap: 1.5rem;
    margin-bottom: 2.4rem;
  }

  .section-head h2,
  .collections-head h2,
  .principles-intro h2,
  .contact-band h2 {
    font-size: clamp(3.4rem, 17vw, 5.4rem);
  }

  .signal-strip__inner > div {
    min-height: 116px;
    padding: 0.9rem;
  }

  .signal-strip strong {
    font-size: 2rem;
  }

  .signal-strip span {
    display: none;
  }

  .collection-grid,
  .popular-grid {
    grid-template-columns: 1fr;
  }

  .collection-cell,
  .collection-cell--wide {
    grid-column: 1 / -1;
  }

  .collection-card {
    min-height: 500px;
  }

  .collection-card h3 {
    font-size: 4.1rem;
  }

  .collection-card p {
    max-width: calc(100% - 4rem);
  }

  .principle {
    grid-template-columns: 2rem 1fr auto;
  }

  .contact-action {
    min-width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .category-rail__track {
    animation: none;
  }
}
</style>
