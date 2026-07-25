<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    spotlightColor?: string
    borderColor?: string
    className?: string
  }>(),
  {
    spotlightColor: 'rgba(255, 65, 54, 0.15)',
    borderColor: 'rgba(255, 65, 54, 0.35)',
    className: '',
  }
)

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}
</script>

<template>
  <div
    ref="cardRef"
    class="spotlight-card relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[#111113] transition-all duration-300 hover:border-[var(--line-strong)]"
    :class="className"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Spotlight background glow -->
    <div
      class="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
      :style="{
        opacity: isHovered ? 1 : 0,
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`,
      }"
    />

    <!-- Spotlight border highlight -->
    <div
      class="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
      :style="{
        opacity: isHovered ? 1 : 0,
        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${borderColor}, transparent 40%)`,
        maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
        maskComposite: 'exclude',
        padding: '1px',
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spotlight-card {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
</style>
