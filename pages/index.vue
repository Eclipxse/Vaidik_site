<template>
  <div class="home">
    <HeroSection />

    <section class="signal-strip" aria-label="Store benefits">
      <div class="signal-strip__inner">
        <div v-for="item in signals" :key="item.title" class="signal">
          <span class="signal-mark" aria-hidden="true">{{ item.mark }}</span>
          <span>
            <strong>{{ item.title }}</strong>
            <small>{{ item.detail }}</small>
          </span>
        </div>
      </div>
    </section>

    <section id="collection" class="collection" aria-labelledby="collection-heading">
      <div class="section-shell">
        <div class="section-heading reveal">
          <div>
            <span class="section-label">Choose your setup</span>
            <h2 id="collection-heading">
              One store.<br />
              <span>Every edge.</span>
            </h2>
          </div>
          <p>
            Start with your device or your goal. Each collection is built to
            get you to the right product without the noise.
          </p>
        </div>

        <div class="collection-grid">
          <NuxtLink
            v-for="(category, index) in categories"
            :key="category.id"
            :to="category.to"
            class="category-card reveal"
            :class="{ 'category-card--wide': category.wide }"
            :style="{ '--accent': category.accent }"
          >
            <div class="category-top">
              <span class="category-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="category-code">{{ category.code }}</span>
            </div>

            <div class="category-art" aria-hidden="true">
              <span>{{ category.symbol }}</span>
              <i />
            </div>

            <div class="category-copy">
              <span class="category-type">{{ category.type }}</span>
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>

            <span class="category-link">
              Explore
              <i aria-hidden="true">↗</i>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="why" aria-labelledby="why-heading">
      <div class="section-shell why-grid">
        <div class="why-intro reveal">
          <span class="section-label">Why Aslil Gang</span>
          <h2 id="why-heading">
            A cleaner way<br />
            to gear up.
          </h2>
          <p>
            Clear choices, direct communication and real assistance from
            discovery to setup.
          </p>
        </div>

        <div class="benefit-list">
          <article v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit reveal">
            <span class="benefit-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.copy }}</p>
            </div>
            <span class="benefit-mark" aria-hidden="true">{{ benefit.mark }}</span>
          </article>
        </div>
      </div>
    </section>

    <section class="process" aria-labelledby="process-heading">
      <div class="section-shell">
        <div class="process-head reveal">
          <span class="section-label">Simple by design</span>
          <h2 id="process-heading">From browse to ready in three moves.</h2>
        </div>

        <ol class="process-grid">
          <li v-for="(step, index) in steps" :key="step.title" class="process-step reveal">
            <span class="process-number">{{ index + 1 }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="cta-heading">
      <div class="cta-orbit cta-orbit--one" aria-hidden="true" />
      <div class="cta-orbit cta-orbit--two" aria-hidden="true" />
      <div class="section-shell final-cta__inner">
        <div class="cta-copy reveal">
          <span class="section-label">Need a recommendation?</span>
          <h2 id="cta-heading">Tell us how you play.</h2>
          <p>
            We’ll point you toward the setup that fits your device, play style
            and budget.
          </p>
        </div>
        <a
          :href="supportLink"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-action reveal"
        >
          <span>
            <small>Talk to a real person</small>
            Open WhatsApp
          </span>
          <i aria-hidden="true">↗</i>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'Aslil Gang Panel — Premium Free Fire Store',
  meta: [
    {
      name: 'description',
      content: 'Premium Free Fire panels, player IDs and reseller access with direct WhatsApp support.',
    },
  ],
})

const { ownerNumber } = useWhatsApp()
const supportMessage = encodeURIComponent('Hi! I need help choosing the right Aslil Gang product.')
const supportLink = computed(() => `https://wa.me/${ownerNumber}?text=${supportMessage}`)

const signals = [
  { mark: '01', title: 'Curated catalog', detail: 'Only focused, relevant options' },
  { mark: '02', title: 'Direct guidance', detail: 'Support before you order' },
  { mark: '03', title: 'Fast checkout', detail: 'Simple WhatsApp ordering' },
  { mark: '04', title: 'Setup support', detail: 'Help when it matters' },
]

const categories = [
  {
    id: 'android',
    to: '/cheats/android',
    code: 'ANDROID',
    type: 'Mobile collection',
    name: 'Phone panels',
    description: 'Lightweight options built for everyday Android play.',
    symbol: 'A',
    accent: '#ff3441',
    wide: true,
  },
  {
    id: 'ios',
    to: '/cheats/ios',
    code: 'APPLE',
    type: 'Mobile collection',
    name: 'iOS panels',
    description: 'A focused selection for iPhone and iPad players.',
    symbol: 'i',
    accent: '#9ca9ff',
  },
  {
    id: 'pc',
    to: '/pc-panel',
    code: 'DESKTOP',
    type: 'Performance collection',
    name: 'PC panels',
    description: 'Our broadest lineup for players who want more control.',
    symbol: 'PC',
    accent: '#ff6b43',
  },
  {
    id: 'ids',
    to: '/free-fire-ids',
    code: 'ACCOUNTS',
    type: 'Premium inventory',
    name: 'Free Fire IDs',
    description: 'Distinctive player accounts with standout collections.',
    symbol: 'ID',
    accent: '#e6c465',
  },
  {
    id: 'ssm',
    to: '/ssm-panel',
    code: 'SOCIAL',
    type: 'Growth services',
    name: 'Social panels',
    description: 'Streamlined social and gaming growth services.',
    symbol: 'S',
    accent: '#66d9c4',
  },
  {
    id: 'reseller',
    to: '/reseller',
    code: 'BUSINESS',
    type: 'Partner program',
    name: 'Reseller access',
    description: 'Wholesale-ready plans for builders with an audience.',
    symbol: 'R',
    accent: '#ff3441',
    wide: true,
  },
]

const benefits = [
  {
    title: 'Find the right fit faster',
    copy: 'Collections are organized around your device and goal, so comparison stays simple.',
    mark: '→',
  },
  {
    title: 'Ask before you commit',
    copy: 'Direct WhatsApp support makes it easy to confirm details before placing an order.',
    mark: '↗',
  },
  {
    title: 'Keep help close',
    copy: 'The same support channel stays available if you need assistance after purchase.',
    mark: '✓',
  },
]

const steps = [
  { title: 'Choose a collection', copy: 'Pick your platform, account type or reseller plan.' },
  { title: 'Review the details', copy: 'Compare the available options and choose your fit.' },
  { title: 'Message to order', copy: 'Confirm your selection directly through WhatsApp.' },
]

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    $gsap.set('.reveal', { opacity: 1, y: 0 })
    return
  }

  $gsap.utils.toArray('.reveal').forEach((element: any) => {
    $gsap.fromTo(
      element,
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      },
    )
  })
})
</script>

<style scoped>
.home {
  overflow: hidden;
}

.section-shell {
  width: min(1280px, calc(100% - 3rem));
  margin: 0 auto;
}

.signal-strip {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.018);
}

.signal-strip__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: min(1380px, 100%);
  margin: 0 auto;
}

.signal {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 104px;
  padding: 1.2rem 1.7rem;
}

.signal + .signal {
  border-left: 1px solid var(--line);
}

.signal-mark {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(255, 52, 65, 0.26);
  border-radius: 10px;
  color: var(--red-bright);
  background: rgba(255, 52, 65, 0.08);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
}

.signal > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.signal strong {
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.76rem;
}

.signal small {
  color: var(--gray);
  font-size: 0.64rem;
}

.collection,
.why,
.process {
  padding: clamp(6rem, 10vw, 10rem) 0;
}

.section-heading {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 420px);
  align-items: end;
  gap: 3rem;
  margin-bottom: 4rem;
}

.section-heading h2,
.why-intro h2 {
  margin: 1.1rem 0 0;
  color: #fff;
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 0.9;
  letter-spacing: -0.065em;
  text-transform: uppercase;
}

.section-heading h2 span {
  color: var(--red);
}

.section-heading p,
.why-intro > p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.96rem;
  line-height: 1.75;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.category-card {
  --accent: var(--red);
  position: relative;
  display: flex;
  min-height: 430px;
  flex-direction: column;
  overflow: hidden;
  padding: 1.35rem;
  border: 1px solid var(--line);
  border-radius: 22px;
  color: #fff;
  background:
    radial-gradient(circle at 78% 28%, color-mix(in srgb, var(--accent) 19%, transparent), transparent 30%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  text-decoration: none;
  transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
}

.category-card::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  content: '';
  transition: transform 300ms ease;
}

.category-card:hover {
  z-index: 2;
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 42%, rgba(255, 255, 255, 0.1));
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.36);
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-card--wide {
  grid-column: span 2;
}

.category-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.48);
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.13em;
}

.category-code {
  color: color-mix(in srgb, var(--accent) 74%, #fff);
}

.category-art {
  position: absolute;
  top: 2.5rem;
  right: 1.25rem;
  display: grid;
  width: min(68%, 285px);
  aspect-ratio: 1;
  place-items: center;
}

.category-art::before,
.category-art::after,
.category-art i {
  position: absolute;
  border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent);
  border-radius: 50%;
  content: '';
}

.category-art::before {
  inset: 0;
}

.category-art::after {
  inset: 17%;
}

.category-art i {
  inset: 34%;
  background: color-mix(in srgb, var(--accent) 9%, transparent);
  box-shadow: 0 0 70px color-mix(in srgb, var(--accent) 18%, transparent);
}

.category-art span {
  position: relative;
  z-index: 1;
  color: color-mix(in srgb, var(--accent) 86%, #fff);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.09em;
  text-shadow: 0 0 45px color-mix(in srgb, var(--accent) 38%, transparent);
}

.category-copy {
  position: relative;
  z-index: 2;
  max-width: 360px;
  margin-top: auto;
}

.category-type {
  color: var(--gray);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.category-copy h3 {
  margin: 0.45rem 0 0;
  font-size: clamp(1.7rem, 3vw, 2.45rem);
  line-height: 1;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.category-copy p {
  margin: 0.8rem 0 0;
  color: var(--gray-lt);
  font-size: 0.82rem;
  line-height: 1.6;
}

.category-link {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.4rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: rgba(255, 255, 255, 0.72);
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.category-link i {
  color: var(--accent);
  font-size: 1rem;
  font-style: normal;
  transition: transform 180ms ease;
}

.category-card:hover .category-link i {
  transform: translate(3px, -3px);
}

.why {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 10% 40%, rgba(255, 52, 65, 0.1), transparent 25%),
    rgba(255, 255, 255, 0.014);
}

.why-grid {
  display: grid;
  grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1fr);
  gap: clamp(4rem, 9vw, 9rem);
}

.why-intro {
  align-self: start;
  position: sticky;
  top: 8rem;
}

.why-intro > p {
  max-width: 440px;
  margin-top: 1.5rem;
}

.benefit-list {
  border-top: 1px solid var(--line);
}

.benefit {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  align-items: start;
  gap: 1.2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--line);
}

.benefit-index {
  padding-top: 0.25rem;
  color: var(--red);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.benefit h3 {
  margin: 0;
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  letter-spacing: -0.035em;
}

.benefit p {
  max-width: 530px;
  margin: 0.7rem 0 0;
  color: var(--gray);
  font-size: 0.88rem;
  line-height: 1.7;
}

.benefit-mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 11px;
  color: var(--red-bright);
  background: rgba(255, 255, 255, 0.03);
}

.process-head {
  display: grid;
  grid-template-columns: 0.45fr 1fr;
  align-items: start;
  gap: 3rem;
  margin-bottom: 3rem;
}

.process-head h2 {
  max-width: 800px;
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.process-step {
  min-height: 260px;
  padding: 1.6rem;
  border-bottom: 1px solid var(--line);
}

.process-step + .process-step {
  border-left: 1px solid var(--line);
}

.process-number {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 11px;
  color: #fff;
  background: var(--red);
  font-family: var(--font-display);
  font-weight: 700;
}

.process-step div {
  margin-top: 4.5rem;
}

.process-step h3 {
  margin: 0;
  font-size: 1.35rem;
}

.process-step p {
  margin: 0.7rem 0 0;
  color: var(--gray);
  font-size: 0.84rem;
  line-height: 1.65;
}

.final-cta {
  position: relative;
  overflow: hidden;
  padding: clamp(5rem, 9vw, 9rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(110deg, #2a0509 0%, #8c0a17 50%, #db1e2e 100%);
}

.final-cta__inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 3rem;
}

.cta-copy .section-label {
  color: rgba(255, 255, 255, 0.62);
}

.cta-copy h2 {
  max-width: 880px;
  margin: 1rem 0 0;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.07em;
  text-transform: uppercase;
}

.cta-copy p {
  max-width: 560px;
  margin: 1.5rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}

.cta-action {
  display: flex;
  min-width: 270px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.2rem 1.3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  color: #191010;
  background: #fff;
  text-decoration: none;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.cta-action:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.25);
}

.cta-action > span {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-display);
  font-weight: 700;
}

.cta-action small {
  color: #817174;
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cta-action i {
  font-size: 1.5rem;
  font-style: normal;
}

.cta-orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
}

.cta-orbit--one {
  top: -32rem;
  right: -10rem;
  width: 60rem;
  height: 60rem;
}

.cta-orbit--two {
  top: -22rem;
  right: 0;
  width: 40rem;
  height: 40rem;
}

.reveal {
  opacity: 0;
}

@media (max-width: 900px) {
  .signal-strip__inner {
    grid-template-columns: repeat(2, 1fr);
  }

  .signal:nth-child(3) {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .signal:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .section-heading,
  .why-grid,
  .process-head,
  .final-cta__inner {
    grid-template-columns: 1fr;
  }

  .collection-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-card--wide {
    grid-column: span 1;
  }

  .why-intro {
    position: static;
  }

  .process-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    min-height: 0;
  }

  .process-step + .process-step {
    border-left: 0;
  }

  .process-step div {
    margin-top: 2.5rem;
  }

  .cta-action {
    width: min(100%, 360px);
  }
}

@media (max-width: 620px) {
  .section-shell {
    width: min(100% - 2rem, 1280px);
  }

  .signal-strip__inner {
    grid-template-columns: 1fr;
  }

  .signal {
    min-height: 84px;
    padding: 1rem;
  }

  .signal + .signal,
  .signal:nth-child(3) {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .collection,
  .why,
  .process {
    padding: 5.5rem 0;
  }

  .section-heading {
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .section-heading h2,
  .why-intro h2 {
    font-size: clamp(2.8rem, 15vw, 4.2rem);
  }

  .collection-grid {
    grid-template-columns: 1fr;
  }

  .category-card {
    min-height: 390px;
  }

  .category-art {
    width: 62%;
  }

  .why-grid {
    gap: 3rem;
  }

  .benefit {
    grid-template-columns: 2rem 1fr;
  }

  .benefit-mark {
    display: none;
  }

  .process-head {
    gap: 1.5rem;
  }

  .process-head h2 {
    font-size: 2.75rem;
  }

  .final-cta__inner {
    gap: 2rem;
  }

  .cta-action {
    min-width: 0;
  }
}
</style>
