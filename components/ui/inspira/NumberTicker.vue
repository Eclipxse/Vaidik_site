<script setup lang="ts">
interface Props {
  value: number
  duration?: number
  delay?: number
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 900,
  delay: 0,
  suffix: '',
})

const element = ref<HTMLElement | null>(null)
const output = ref(0)
let frame = 0
let observer: IntersectionObserver | undefined

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function start() {
  const startedAt = performance.now() + props.delay

  const tick = (now: number) => {
    if (now < startedAt) {
      frame = requestAnimationFrame(tick)
      return
    }

    const progress = Math.min((now - startedAt) / props.duration, 1)
    output.value = Math.round(props.value * easeOutCubic(progress))

    if (progress < 1) frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    output.value = props.value
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    start()
    observer?.disconnect()
  }, { threshold: 0.4 })

  if (element.value) observer.observe(element.value)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <!-- Inspired by Inspira UI's Number Ticker, implemented without VueUse. -->
  <span ref="element" class="number-ticker">{{ output }}{{ props.suffix }}</span>
</template>

<style scoped>
.number-ticker {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
</style>
