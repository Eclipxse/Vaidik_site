<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 150,
  duration: 12,
  borderWidth: 1,
  colorFrom: '#ff4136',
  colorTo: '#f5f4ef',
  delay: 0,
})

const beamStyle = computed(() => ({
  '--beam-size': `${props.size}px`,
  '--beam-duration': `${props.duration}s`,
  '--beam-width': `${props.borderWidth}px`,
  '--beam-from': props.colorFrom,
  '--beam-to': props.colorTo,
  '--beam-delay': `${props.delay}s`,
}))
</script>

<template>
  <!-- Tailwind-3-safe adaptation of Inspira UI's MIT-licensed Border Beam. -->
  <span class="border-beam" :style="beamStyle" aria-hidden="true" />
</template>

<style scoped>
.border-beam {
  position: absolute;
  z-index: 5;
  inset: 0;
  overflow: hidden;
  border: var(--beam-width) solid transparent;
  border-radius: inherit;
  pointer-events: none;
  mask:
    linear-gradient(transparent, transparent) padding-box,
    linear-gradient(#fff, #fff) border-box;
  mask-composite: intersect;
}

.border-beam::after {
  position: absolute;
  width: var(--beam-size);
  aspect-ratio: 1;
  background: linear-gradient(to left, var(--beam-from), var(--beam-to), transparent);
  offset-anchor: 50% 50%;
  offset-path: rect(0 auto auto 0 round 18px);
  animation: border-beam var(--beam-duration) linear var(--beam-delay) infinite;
  content: '';
}

@keyframes border-beam {
  to {
    offset-distance: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .border-beam {
    display: none;
  }
}
</style>
