<template>
  <header class="page-header" aria-label="Page header">
    <div class="page-grid" aria-hidden="true" />
    <div class="page-orbit" aria-hidden="true" />
    <div class="page-header__content">
      <span class="page-kicker">Aslil Gang / Store</span>
      <h1 class="page-header__headline">
        <span class="reveal-mask">
          <span class="reveal-line">{{ title }}</span>
        </span>
      </h1>
      <div class="page-header__foot">
        <p v-if="subtitle" class="page-header__sub">{{ subtitle }}</p>
        <span class="page-scroll" aria-hidden="true">Scroll to explore ↓</span>
      </div>
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
  if (!$gsap) return

  $gsap.timeline()
    .fromTo(
      '.reveal-line',
      { y: '110%' },
      { y: '0%', duration: 1, ease: 'power4.out', delay: 0.08 },
    )
    .fromTo(
      '.page-kicker, .page-header__sub, .page-scroll',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
      '-=0.55',
    )
})
</script>

<style scoped>
.page-header {
  position: relative;
  min-height: 76svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 11rem 1.5rem 4.5rem;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 80% 20%, rgba(255, 52, 65, 0.14), transparent 28%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.01), transparent);
}

.page-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 95%);
  pointer-events: none;
}

.page-orbit {
  position: absolute;
  top: -26rem;
  right: -18rem;
  width: 56rem;
  height: 56rem;
  border: 1px solid rgba(255, 52, 65, 0.13);
  border-radius: 50%;
  box-shadow:
    0 0 0 7rem rgba(255, 52, 65, 0.018),
    0 0 0 14rem rgba(255, 52, 65, 0.01);
}

.page-header__content {
  position: relative;
  z-index: 1;
  width: min(1280px, 100%);
  margin: 0 auto;
}

.page-kicker {
  display: block;
  margin-bottom: 1.35rem;
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  opacity: 0;
}

.page-header__headline {
  margin: 0;
  font-size: clamp(3.6rem, 9vw, 9rem);
  line-height: 0.85;
  letter-spacing: -0.075em;
  text-transform: uppercase;
}

.reveal-mask {
  display: block;
  overflow: hidden;
}

.reveal-line {
  display: block;
  transform: translateY(110%);
}

.page-header__foot {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.page-header__sub {
  max-width: 640px;
  margin: 0;
  color: var(--gray-lt);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  opacity: 0;
}

.page-scroll {
  color: rgba(255, 255, 255, 0.34);
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  opacity: 0;
}

@media (max-width: 680px) {
  .page-header {
    min-height: 68svh;
    padding: 8rem 1rem 3rem;
  }

  .page-header__headline {
    font-size: clamp(3rem, 16vw, 5rem);
  }

  .page-header__foot {
    display: block;
  }

  .page-scroll {
    display: none;
  }
}
</style>
