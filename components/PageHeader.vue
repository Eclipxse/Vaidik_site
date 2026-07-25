<script setup lang="ts">
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'

defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
}>()
</script>

<template>
  <header class="page-header" aria-label="Page header">
    <div class="page-header__shell">
      <BlurReveal :delay="0.05">
        <span class="page-kicker">{{ eyebrow || 'Aslil Gang / Store' }}</span>
      </BlurReveal>

      <BlurReveal :delay="0.12" blur="16px" :duration="0.75">
        <h1>{{ title }}</h1>
      </BlurReveal>

      <BlurReveal :delay="0.2">
        <div class="page-header__foot">
          <p v-if="subtitle">{{ subtitle }}</p>
          <span aria-hidden="true">Scroll to explore ↓</span>
        </div>
      </BlurReveal>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  position: relative;
  display: flex;
  min-height: 68svh;
  align-items: flex-end;
  overflow: hidden;
  padding: 10.5rem 1.5rem 4rem;
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(rgba(245, 244, 239, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 244, 239, 0.025) 1px, transparent 1px),
    #0a0a0b;
  background-size: 72px 72px;
}

.page-header::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 45%;
  background: linear-gradient(to top, #0a0a0b, transparent);
  content: '';
  pointer-events: none;
}

.page-header__shell {
  position: relative;
  z-index: 2;
  width: min(1280px, 100%);
  margin: 0 auto;
}

.page-kicker {
  display: block;
  color: var(--red-bright);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 1.3rem 0 0;
  font-size: clamp(4rem, 10vw, 10rem);
  line-height: 0.82;
  letter-spacing: -0.078em;
}

.page-header__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2.2rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
}

.page-header__foot p {
  max-width: 650px;
  margin: 0;
  color: var(--gray-lt);
  font-size: clamp(0.9rem, 1.4vw, 1.04rem);
  line-height: 1.7;
}

.page-header__foot span {
  flex: 0 0 auto;
  color: var(--gray);
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 680px) {
  .page-header {
    min-height: 60svh;
    padding: 8rem 1rem 3rem;
    background-size: 48px 48px;
  }

  .page-header h1 {
    font-size: clamp(3.7rem, 18vw, 6rem);
  }

  .page-header__foot span {
    display: none;
  }
}
</style>
