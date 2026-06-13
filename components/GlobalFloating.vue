<template>
  <!-- Floating WhatsApp button -->
  <Transition name="fab-pop">
    <a
      v-if="showFab"
      :href="`https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to buy a Free Fire product.')}`"
      target="_blank"
      rel="noopener noreferrer"
      class="wa-fab"
      aria-label="Chat on WhatsApp"
      @mouseenter="fabHovered = true"
      @mouseleave="fabHovered = false"
    >
      <div class="wa-fab-ripple" aria-hidden="true" />
      <svg class="wa-fab-icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <Transition name="tooltip-pop">
        <span v-if="fabHovered" class="wa-fab-label">Chat with us!</span>
      </Transition>
    </a>
  </Transition>

  <!-- Back to top -->
  <Transition name="fab-pop">
    <button
      v-if="showBtt"
      class="btt-btn"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const { ownerNumber } = useWhatsApp()

const showFab    = ref(false)
const showBtt    = ref(false)
const fabHovered = ref(false)

function onScroll() {
  showFab.value = window.scrollY > 300
  showBtt.value = window.scrollY > 600
}

function scrollToTop() {
  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // check immediately in case of loaded page position
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
   ═══════════════════════════════════════════════ */
.wa-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 500;
  width: 58px; height: 58px;
  border-radius: 50%;
  background: #25D366;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 8px 30px rgba(37,211,102,0.4);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  overflow: visible;
}

.wa-fab:hover {
  transform: scale(1.12) translateY(-3px);
  box-shadow: 0 16px 44px rgba(37,211,102,0.55);
}

.wa-fab-ripple {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(37,211,102,0.4);
  animation: wa-ripple 2s ease-out infinite;
}

@keyframes wa-ripple {
  0%   { transform: scale(1);   opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0;   }
}

.wa-fab-icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.wa-fab-label {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
}

.tooltip-pop-enter-active, .tooltip-pop-leave-active { transition: all 0.2s ease; }
.tooltip-pop-enter-from, .tooltip-pop-leave-to { opacity: 0; transform: translateY(-50%) translateX(8px); }

/* ═══════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════ */
.btt-btn {
  position: fixed;
  bottom: 6.5rem;
  right: 2rem;
  z-index: 500;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(15,15,15,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Back to normal cursor style */
  transition: all 0.25s ease;
}

.btt-btn:hover {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(230,30,38,0.4);
}

/* ═══════════════════════════════════════════════
   TRANSITIONS
   ═══════════════════════════════════════════════ */
.fab-pop-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fab-pop-leave-active  { transition: all 0.2s ease; }
.fab-pop-enter-from, .fab-pop-leave-to { opacity: 0; transform: scale(0.5) translateY(20px); }

@media (max-width: 768px) {
  .wa-fab {
    right: 1rem;
    bottom: max(1rem, env(safe-area-inset-bottom));
    width: 54px;
    height: 54px;
  }

  .btt-btn {
    right: 1rem;
    bottom: calc(max(1rem, env(safe-area-inset-bottom)) + 4.5rem);
  }

  .wa-fab-ripple {
    display: none;
  }
}
</style>
