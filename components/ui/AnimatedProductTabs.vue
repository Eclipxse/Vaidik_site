<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'

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
</script>

<template>
  <div v-if="active" class="product-tabs">
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
          :transition="{ type: 'spring', stiffness: 280, damping: 28 }"
        />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="tabs-viewport">
      <AnimatePresence mode="wait" :initial="false">
        <Motion
          :key="active.id"
          as="article"
          class="tab-panel"
          :initial="{ opacity: 0, filter: 'blur(6px)', y: 8 }"
          :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
          :exit="{ opacity: 0, filter: 'blur(5px)', y: -6 }"
          :transition="{ type: 'spring', stiffness: 240, damping: 26 }"
        >
          <div class="panel-copy">
            <span class="panel-eyebrow">{{ active.eyebrow }}</span>
            <h3>{{ active.title }}</h3>
            <p>{{ active.description }}</p>

            <ul>
              <li v-for="feature in active.features" :key="feature">
                <span aria-hidden="true">+</span>
                {{ feature }}
              </li>
            </ul>

            <div class="panel-action">
              <span>
                <small>Starting at</small>
                <strong>{{ active.price }}</strong>
              </span>
              <NuxtLink :to="active.to">
                View collection
                <span aria-hidden="true">↗</span>
              </NuxtLink>
            </div>
          </div>

          <NuxtLink :to="active.to" class="panel-media" :aria-label="`View ${active.title}`">
            <img :src="active.image" :alt="active.title" />
            <span class="panel-media__index">{{ active.label }}</span>
          </NuxtLink>
        </Motion>
      </AnimatePresence>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 1.25rem;
}

.tabs-list {
  display: flex;
  align-self: start;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.35rem;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: #0e0e10;
}

.tab-trigger {
  position: relative;
  min-height: 48px;
  overflow: hidden;
  padding: 0 0.9rem;
  border: 0;
  border-radius: 9px;
  color: var(--gray);
  background: transparent;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 180ms ease;
}

.tab-trigger > span:last-child {
  position: relative;
  z-index: 2;
}

.tab-trigger--active {
  color: var(--white);
}

.tab-highlight {
  position: absolute;
  z-index: 1;
  inset: 0;
  border: 1px solid var(--line-strong);
  border-radius: inherit;
  background: #19191c;
}

.tabs-viewport {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #0e0e10;
}

.tab-panel {
  display: grid;
  min-height: 580px;
  grid-template-columns: minmax(280px, 0.78fr) minmax(0, 1.22fr);
}

.panel-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: clamp(1.6rem, 3.2vw, 3.4rem);
}

.panel-eyebrow {
  color: var(--red-bright);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.panel-copy h3 {
  max-width: 470px;
  margin: 1.1rem 0 0;
  font-size: clamp(2.3rem, 4.2vw, 4.7rem);
  line-height: 0.94;
  letter-spacing: -0.06em;
}

.panel-copy > p {
  max-width: 470px;
  margin: 1.35rem 0 0;
  color: var(--gray-lt);
  font-size: 0.9rem;
  line-height: 1.72;
}

.panel-copy ul {
  display: grid;
  gap: 0.72rem;
  margin: 2rem 0 0;
  padding: 0;
  color: var(--gray-lt);
  font-size: 0.78rem;
  list-style: none;
}

.panel-copy li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.panel-copy li span {
  color: var(--red);
  font-weight: 700;
}

.panel-action {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
}

.panel-action > span {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.panel-action small {
  color: var(--gray);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-action strong {
  font-family: var(--font-display);
  font-size: 1.7rem;
  letter-spacing: -0.04em;
}

.panel-action a {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1rem;
  border-radius: 9px;
  color: #fff;
  background: var(--red);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.panel-media {
  position: relative;
  display: block;
  min-width: 0;
  overflow: hidden;
  border-left: 1px solid var(--line);
  color: inherit;
  background: #151517;
}

.panel-media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 11, 0.45), transparent 42%);
  content: '';
  pointer-events: none;
}

.panel-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.panel-media:hover img {
  transform: scale(1.025);
}

.panel-media__index {
  position: absolute;
  z-index: 2;
  right: 1.3rem;
  bottom: 1.1rem;
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .product-tabs {
    grid-template-columns: 1fr;
  }

  .tabs-list {
    flex-direction: row;
    overflow-x: auto;
  }

  .tab-trigger {
    min-width: 120px;
    flex: 1;
    text-align: center;
  }

  .tab-panel {
    grid-template-columns: 1fr;
  }

  .panel-media {
    min-height: 420px;
    border-top: 1px solid var(--line);
    border-left: 0;
  }
}

@media (max-width: 620px) {
  .tab-panel {
    min-height: 0;
  }

  .panel-copy {
    min-height: 470px;
  }

  .panel-action {
    align-items: stretch;
    flex-direction: column;
  }

  .panel-action a {
    justify-content: space-between;
  }

  .panel-media {
    min-height: 300px;
  }
}
</style>
