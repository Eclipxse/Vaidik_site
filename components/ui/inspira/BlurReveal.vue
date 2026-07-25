<script setup lang="ts">
import { Motion } from 'motion-v'

interface Props {
  duration?: number
  delay?: number
  blur?: string
  yOffset?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.7,
  delay: 0,
  blur: '12px',
  yOffset: 22,
  once: true,
})
</script>

<template>
  <!-- Adapted from Inspira UI's MIT-licensed Blur Reveal for Nuxt. -->
  <Motion
    as="div"
    :initial="{
      opacity: 0,
      filter: `blur(${props.blur})`,
      y: props.yOffset,
    }"
    :while-in-view="{
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
    }"
    :in-view-options="{ once: props.once, amount: 0.2 }"
    :transition="{
      duration: props.duration,
      delay: props.delay,
      easing: [0.22, 1, 0.36, 1],
    }"
  >
    <slot />
  </Motion>
</template>
