<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (process.client) {
    console.log(
      '%c' +
      ' __  __   _   ___ ___ ___ \n' +
      '|  \\/  | /_\\ | _ \\_ _/ _ \\\n' +
      '| |\\/| |/ _ \\|   /| | (_) |\n' +
      '|_|  |_/_/ \\_\\_|_\\___\\___/\n\n' +
      '🔓 CONSOLE UNLOCKED BY MARIO',
      'color: #ff2a35; font-weight: 900; font-family: monospace; font-size: 14px; text-shadow: 0 0 8px rgba(230,30,38,0.5);'
    )
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
