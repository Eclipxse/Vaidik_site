<template>
  <header class="page-header" aria-label="Page header">
    <div class="page-header__content">
      <h1 class="page-header__headline">
        <span class="reveal-mask">
          <span class="reveal-line">{{ title }}</span>
        </span>
      </h1>
      <p v-if="subtitle" class="page-header__sub">
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()

onMounted(() => {
  const { $gsap } = useNuxtApp()
  const tl = $gsap.timeline()

  tl.fromTo('.reveal-line', 
    { y: '110%' },
    { y: '0%', duration: 1.2, ease: 'power4.out', delay: 0.1 }
  )
  .fromTo('.page-header__sub', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
})
</script>

<style scoped>
.page-header {
  position: relative;
  padding: 12rem 4vw 6rem;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.page-header__content {
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header__headline {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.reveal-mask {
  display: block;
  overflow: hidden;
}

.reveal-line {
  display: block;
  transform: translateY(110%);
  animation: revealUp 1s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.page-header__sub {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: var(--brand-gray);
  line-height: 1.6;
  max-width: 600px;
  opacity: 0;
}
</style>
