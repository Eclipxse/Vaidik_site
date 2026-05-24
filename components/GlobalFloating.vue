<template>
  <!-- ── SVG Gooey Filter ── -->
  <svg class="cursor-goo-svg" aria-hidden="true">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>

  <!-- ── Liquid Gooey Cursor ── -->
  <div
    class="cursor-goo-container"
    :class="{
      'is-touch': isTouchDevice,
      'is-idle': isIdle,
      'is-clicked': isClicked,
      'is-hovered': isHovered
    }"
    aria-hidden="true"
  >
    <div class="cursor-blob-small" ref="smallEl" />
    <div class="cursor-blob-large" ref="largeEl" />
  </div>

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

const smallEl = ref<HTMLElement | null>(null)
const largeEl = ref<HTMLElement | null>(null)

const showFab    = ref(false)
const showBtt    = ref(false)
const fabHovered = ref(false)
const isIdle     = ref(false)
const isClicked  = ref(false)
const isHovered  = ref(false)
const isTouchDevice = ref(false)

// Smooth JS Lerp coordinates and scales
let targetX = -100
let targetY = -100
let smallX = -100
let smallY = -100
let largeX = -100
let largeY = -100

// Lerp states for scale & opacity
let smallScale = 1.0
let largeScale = 1.0
let largeOpacity = 0.8

let idleTimer: ReturnType<typeof setTimeout> | null = null
let rafId: number

function loop() {
  // Smoothly lerp small cursor (very fast & responsive)
  const smallLerp = 0.25
  smallX += (targetX - smallX) * smallLerp
  smallY += (targetY - smallY) * smallLerp

  // Smoothly lerp large trailing cursor
  const largeLerp = isIdle.value ? 0.05 : 0.08
  largeX += (targetX - largeX) * largeLerp
  largeY += (targetY - largeY) * largeLerp

  // Target scale & opacity based on active states
  let targetSmallScale = 1.0
  let targetLargeScale = 1.0
  let targetLargeOpacity = 0.8

  if (isClicked.value) {
    targetSmallScale = 0.6
    targetLargeScale = 0.5
    targetLargeOpacity = 1.0
  } else if (isHovered.value) {
    targetSmallScale = 1.3
    targetLargeScale = 1.75
    targetLargeOpacity = 0.45
  } else if (isIdle.value) {
    targetSmallScale = 1.0
    targetLargeScale = 1.3
    targetLargeOpacity = 0.9
  }

  // Smoothly lerp scale and opacity (using fast rates for responsive feel)
  const scaleLerpSmall = 0.2
  const scaleLerpLarge = 0.15
  smallScale += (targetSmallScale - smallScale) * scaleLerpSmall
  largeScale += (targetLargeScale - largeScale) * scaleLerpLarge
  largeOpacity += (targetLargeOpacity - largeOpacity) * 0.15

  if (smallEl.value) {
    smallEl.value.style.transform = `translate3d(${smallX}px, ${smallY}px, 0) translate(-50%, -50%) scale(${smallScale})`
  }
  if (largeEl.value) {
    largeEl.value.style.transform = `translate3d(${largeX}px, ${largeY}px, 0) translate(-50%, -50%) scale(${largeScale})`
    largeEl.value.style.opacity = largeOpacity.toString()
  }

  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY

  if (isIdle.value) isIdle.value = false

  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    isIdle.value = true
  }, 400)
}

function onMouseDown() {
  isClicked.value = true
}
function onMouseUp() {
  isClicked.value = false
}

function onMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target) return
  
  // Detect if mouse is over interactive/clickable element
  const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable, .social-icon-btn, .wa-btn')
  isHovered.value = !!isClickable
}

function onScroll() {
  showFab.value = window.scrollY > 300
  showBtt.value = window.scrollY > 600
}

function scrollToTop() {
  const lenis = (useNuxtApp() as any).$lenis
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

function checkPointer() {
  isTouchDevice.value = window.matchMedia('(pointer: coarse)').matches
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mousedown', onMouseDown, { passive: true })
  window.addEventListener('mouseup',   onMouseUp,   { passive: true })
  window.addEventListener('mouseover', onMouseOver, { passive: true })
  window.addEventListener('scroll',    onScroll,    { passive: true })
  checkPointer()
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup',   onMouseUp)
  window.removeEventListener('mouseover', onMouseOver)
  window.removeEventListener('scroll',    onScroll)
  cancelAnimationFrame(rafId)
  if (idleTimer) clearTimeout(idleTimer)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   LIQUID GOOEY CURSOR — vivid fuchsia/magenta
   ═══════════════════════════════════════════════ */
.cursor-goo-svg {
  position: fixed;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
  z-index: -100;
}

.cursor-goo-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  filter: url('#goo');
  overflow: hidden;
  display: block;
}

.cursor-goo-container.is-touch {
  display: none;
}

.cursor-blob-small,
.cursor-blob-large {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: #e040fb;
  will-change: transform, opacity;
  pointer-events: none;
}

.cursor-blob-small {
  width: 12px;
  height: 12px;
  background: #e040fb;
  box-shadow: 
    0 0 6px rgba(224, 64, 251, 0.7),
    0 0 12px rgba(224, 64, 251, 0.3);
  transition: 
    background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.cursor-blob-large {
  width: 22px;
  height: 22px;
  background: #e040fb;
  box-shadow: 
    0 0 10px rgba(224, 64, 251, 0.6),
    0 0 20px rgba(224, 64, 251, 0.2);
  transition: 
    background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Idle grew state (stopped moving) */
.cursor-goo-container.is-idle .cursor-blob-large {
  box-shadow: 
    0 0 15px rgba(224, 64, 251, 0.8),
    0 0 30px rgba(224, 64, 251, 0.4);
}

/* Hover state (over interactive elements) */
.cursor-goo-container.is-hovered .cursor-blob-small {
  background-color: #ff80ff;
  box-shadow: 0 0 15px rgba(255, 128, 255, 0.9);
}
.cursor-goo-container.is-hovered .cursor-blob-large {
  background-color: #ff80ff;
  box-shadow: 0 0 20px rgba(255, 128, 255, 0.6);
}

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
  cursor: none;
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
</style>
