<template>
  <div class="app-shell">
    <AppHeader />

    <main>
      <slot />
    </main>

    <AppFooter />

    <WhatsAppModal />
    <GlobalFloating />
  </div>
</template>

<script setup lang="ts">
// Scroll reveal for .reveal elements
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
