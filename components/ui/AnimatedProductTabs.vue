<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import BorderBeam from '~/components/ui/inspira/BorderBeam.vue'

export interface ProductTab {
  id: string
  label: string
  eyebrow: string
  title: string
  description: string
  price: string
  image: string
  to: string
  features: string[]
}

const props = defineProps<{
  tabs: ProductTab[]
}>()

const activeId = ref(props.tabs[0]?.id ?? '')
const active = computed(() => props.tabs.find(tab => tab.id === activeId.value) ?? props.tabs[0])

const tabMark: Record<string, string> = {
  pc: 'PC',
  android: 'A',
  ios: 'i',
}
</script>

<template>
  <div v-if="active" class="product-tabs" :class="`product-tabs--${active.id}`">
    <div class="tabs-header">
      <div class="tabs-intro">
        <span>Platform selector</span>
        <small>Choose your device</small>
      </div>

      <div class="tabs-list" role="tablist" aria-label="Featured collections">
        <button
          v-for="tab in props.tabs"
          :key="tab.id"
          class="tab-trigger"
          :class="{ 'tab-trigger--active': activeId === tab.id }"
          role="tab"
          :aria-selected="activeId === tab.id"
          @click="activeId = tab.id"
        >
          <Motion
            v-if="activeId === tab.id"
            layout-id="active-product-tab"
            as="span"
            class="tab-highlight"
            :transition="{ type: 'spring', stiffness: 360, damping: 31 }"
          />
          <i aria-hidden="true">{{ tabMark[tab.id] || tab.id.slice(0, 2) }}</i>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <span class="tabs-live">
        <i aria-hidden="true" />
        Available now
      </span>
    </div>

    <div class="tabs-stage">
      <BorderBeam :duration="15" :size="210" color-from="#ff2d2d" color-to="#f6f1e8" />
      <AnimatePresence mode="wait" :initial="false">
        <Motion
          :key="active.id"
          as="article"
          class="tab-panel"
          :initial="{ opacity: 0, filter: 'blur(10px)', x: 24 }"
          :animate="{ opacity: 1, filter: 'blur(0px)', x: 0 }"
          :exit="{ opacity: 0, filter: 'blur(8px)', x: -18 }"
          :transition="{ type: 'spring', stiffness: 210, damping: 27, mass: 0.8 }"
        >
          <NuxtLink :to="active.to" class="panel-media" :aria-label="`View ${active.title}`">
            <span class="panel-media__glow" aria-hidden="true" />
            <img :src="active.image" :alt="active.title" />
            <span class="panel-media__shade" aria-hidden="true" />
            <span class="panel-media__top">
              <small>Featured / {{ active.id }}</small>
              <small>AG—{{ active.id.toUpperCase() }}</small>
            </span>
            <span class="panel-media__open" aria-hidden="true">View collection ↗</span>
          </NuxtLink>

          <div class="panel-copy">
            <div class="panel-copy__index">
              <span>{{ active.eyebrow }}</span>
              <small>{{ String(props.tabs.findIndex(tab => tab.id === active.id) + 1).padStart(2, '0') }} / {{ String(props.tabs.length).padStart(2, '0') }}</small>
            </div>

            <h3>{{ active.title }}</h3>
            <p>{{ active.description }}</p>

            <ul>
              <li v-for="(feature, index) in active.features" :key="feature">
                <small>{{ String(index + 1).padStart(2, '0') }}</small>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <div class="panel-action">
              <span>
                <small>Starting from</small>
                <strong>{{ active.price }}</strong>
              </span>
              <NuxtLink :to="active.to">
                Explore {{ active.label }}
                <span aria-hidden="true">↗</span>
              </NuxtLink>
            </div>
          </div>
        </Motion>
      </AnimatePresence>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  --tab-accent: #ff3633;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(246, 241, 232, 0.13);
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.035), transparent 30%),
    #0c0c0f;
  box-shadow: 0 38px 90px rgba(0, 0, 0, 0.3);
}

.product-tabs--android {
  --tab-accent: #ff664a;
}

.product-tabs--ios {
  --tab-accent: #a7b2ff;
}

.tabs-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  min-height: 86px;
  padding: 0 1.35rem;
  border-bottom: 1px solid var(--line);
  background: rgba(17, 17, 20, 0.72);
  backdrop-filter: blur(18px);
}

.tabs-intro {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.54rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tabs-intro small {
  color: var(--gray);
  font: inherit;
  font-size: 0.46rem;
}

.tabs-list {
  display: flex;
  gap: 0.28rem;
  padding: 0.32rem;
  border: 1px solid rgba(246, 241, 232, 0.11);
  border-radius: 999px;
  background: rgba(5, 5, 7, 0.58);
  scrollbar-width: none;
}

.tabs-list::-webkit-scrollbar {
  display: none;
}

.tab-trigger {
  position: relative;
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 0.55rem;
  padding: 0 1.05rem 0 0.52rem;
  border: 0;
  border-radius: 999px;
  color: var(--gray);
  background: transparent;
  font-size: 0.65rem;
  font-weight: 800;
  cursor: pointer;
  transition: color 180ms ease;
}

.tab-trigger > i,
.tab-trigger > span:last-child {
  position: relative;
  z-index: 2;
}

.tab-trigger > i {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgba(246, 241, 232, 0.1);
  border-radius: 50%;
  color: currentColor;
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-style: normal;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.tab-trigger--active {
  color: var(--white);
}

.tab-trigger--active > i {
  border-color: color-mix(in srgb, var(--tab-accent) 55%, transparent);
  color: var(--tab-accent);
  background: color-mix(in srgb, var(--tab-accent) 12%, transparent);
}

.tab-highlight {
  position: absolute;
  z-index: 1;
  inset: 0;
  border: 1px solid color-mix(in srgb, var(--tab-accent) 40%, transparent);
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent),
    color-mix(in srgb, var(--tab-accent) 9%, transparent);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.06);
}

.tabs-live {
  display: inline-flex;
  align-items: center;
  justify-self: end;
  gap: 0.5rem;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tabs-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 12px color-mix(in srgb, currentColor 70%, transparent);
}

.tabs-stage {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-radius: 0 0 28px 28px;
}

.tab-panel {
  display: grid;
  min-height: 650px;
  grid-template-columns: minmax(0, 1.15fr) minmax(390px, 0.85fr);
}

.panel-media {
  position: relative;
  display: block;
  min-width: 0;
  overflow: hidden;
  border-right: 1px solid var(--line);
  color: var(--white);
  background: #070708;
  text-decoration: none;
}

.panel-media__glow {
  position: absolute;
  z-index: 0;
  inset: 18%;
  border-radius: 50%;
  background: color-mix(in srgb, var(--tab-accent) 24%, transparent);
  filter: blur(50px);
}

.panel-media img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.04);
  transition: filter 380ms ease, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.panel-media:hover img {
  filter: saturate(1.06) contrast(1.04);
  transform: scale(1.035);
}

.panel-media__shade {
  position: absolute;
  z-index: 2;
  inset: 0;
  background:
    linear-gradient(to top, rgba(7, 7, 8, 0.72), transparent 48%),
    linear-gradient(90deg, transparent 72%, rgba(7, 7, 8, 0.42));
  pointer-events: none;
}

.panel-media__top {
  position: absolute;
  z-index: 3;
  top: 1.2rem;
  right: 1.2rem;
  left: 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.panel-media__top small,
.panel-media__open {
  padding: 0.45rem 0.62rem;
  border: 1px solid rgba(246, 241, 232, 0.15);
  border-radius: 999px;
  color: rgba(246, 241, 232, 0.72);
  background: rgba(7, 7, 8, 0.56);
  font-family: var(--font-mono);
  font-size: 0.46rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.panel-media__open {
  position: absolute;
  z-index: 3;
  right: 1.2rem;
  bottom: 1.2rem;
  color: var(--white);
}

.panel-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: clamp(2rem, 4vw, 4.3rem);
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--tab-accent) 9%, transparent), transparent 38%),
    #101013;
}

.panel-copy__index {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--tab-accent);
  font-family: var(--font-mono);
  font-size: 0.53rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.panel-copy__index small {
  color: var(--gray);
  font: inherit;
}

.panel-copy h3 {
  max-width: 520px;
  margin: 1.5rem 0 0;
  font-size: clamp(3.3rem, 5.8vw, 6.3rem);
  font-weight: 800;
  line-height: 0.83;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.panel-copy > p {
  max-width: 500px;
  margin: 1.4rem 0 0;
  color: var(--gray-lt);
  font-size: 0.86rem;
  line-height: 1.75;
}

.panel-copy ul {
  display: grid;
  margin: 2.2rem 0 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.panel-copy li {
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  gap: 0.7rem;
  min-height: 50px;
  border-bottom: 1px solid var(--line);
  color: rgba(246, 241, 232, 0.68);
  font-size: 0.7rem;
}

.panel-copy li small {
  color: var(--tab-accent);
  font-family: var(--font-mono);
  font-size: 0.46rem;
}

.panel-action {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2.5rem;
}

.panel-action > span {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.panel-action small {
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.47rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-action strong {
  font-family: var(--font-display);
  font-size: 2.3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.panel-action a {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  gap: 0.9rem;
  padding: 0 1.15rem;
  border: 1px solid color-mix(in srgb, var(--tab-accent) 48%, transparent);
  border-radius: 999px;
  color: #fff;
  background: color-mix(in srgb, var(--tab-accent) 84%, #101013);
  font-size: 0.59rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 180ms ease, filter 180ms ease;
}

.panel-action a:hover {
  filter: brightness(1.14);
  transform: translateY(-3px);
}

@media (max-width: 1000px) {
  .tabs-header {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .tabs-intro,
  .tabs-live {
    display: none;
  }

  .tabs-list {
    justify-self: stretch;
    overflow-x: auto;
  }

  .tab-trigger {
    min-width: 155px;
    flex: 1;
  }

  .tab-panel {
    grid-template-columns: 1fr;
  }

  .panel-media {
    min-height: 520px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .panel-copy {
    min-height: 560px;
  }
}

@media (max-width: 620px) {
  .product-tabs {
    border-radius: 20px;
  }

  .tabs-stage {
    border-radius: 0 0 20px 20px;
  }

  .tabs-list {
    gap: 0.15rem;
    padding: 0.24rem;
  }

  .tab-trigger {
    min-width: 118px;
    min-height: 44px;
    padding: 0 0.75rem 0 0.36rem;
    font-size: 0.56rem;
  }

  .tab-trigger > i {
    width: 32px;
    height: 32px;
  }

  .panel-media {
    min-height: 360px;
  }

  .panel-copy {
    min-height: 540px;
    padding: 1.5rem;
  }

  .panel-copy h3 {
    font-size: clamp(3.2rem, 15vw, 4.6rem);
  }

  .panel-action {
    align-items: stretch;
    flex-direction: column;
  }

  .panel-action a {
    justify-content: space-between;
  }
}
</style>
