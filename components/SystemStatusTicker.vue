<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const tickerItems = [
  { type: 'order', text: '🔥 Gamer from Mumbai unlocked PC External Panel (2m ago)' },
  { type: 'status', text: '🟢 Anti-Ban Engine v4.2 Active — 100% Undetected' },
  { type: 'order', text: '⚡ Rahul from Delhi purchased iOS Panel (5m ago)' },
  { type: 'review', text: '⭐ "Best streamer panel for Free Fire, 0 lag!" — @ViperGaming' },
  { type: 'order', text: '👑 New Reseller Access activated in Punjab' },
  { type: 'status', text: '🛡️ Windows 10/11 & Android 14 Fully Supported' },
  { type: 'order', text: '🔥 Grandmaster Free Fire ID sold directly via WhatsApp' },
]

const currentIndex = ref(0)
let interval: any = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % tickerItems.length
  }, 4000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="system-status-bar" aria-label="System status ticker">
    <div class="status-shell">
      <div class="status-left">
        <span class="status-dot" aria-hidden="true" />
        <span class="status-badge">SYSTEMS ONLINE</span>
        <span class="status-divider" aria-hidden="true">|</span>
        <span class="status-text hidden sm:inline">99.8% Uptime &amp; Instant WhatsApp Delivery</span>
      </div>

      <div class="status-ticker">
        <Transition name="fade-slide" mode="out-in">
          <div :key="currentIndex" class="ticker-content">
            {{ tickerItems[currentIndex].text }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-status-bar {
  border-bottom: 1px solid var(--line);
  color: var(--gray-lt);
  background: #060607;
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-shell {
  display: flex;
  height: 38px;
  max-width: 1360px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.status-left {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8ff0ae;
  box-shadow: 0 0 10px #8ff0ae;
  animation: pulse-dot 2s infinite ease-in-out;
}

.status-badge {
  color: #8ff0ae;
  letter-spacing: 0.12em;
}

.status-divider {
  color: var(--line-strong);
}

.status-text {
  color: var(--gray);
}

.status-ticker {
  position: relative;
  height: 20px;
  overflow: hidden;
  color: var(--white);
  font-weight: 600;
  text-align: right;
}

.ticker-content {
  display: inline-block;
  white-space: nowrap;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 400ms ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

@media (max-width: 640px) {
  .status-shell {
    padding: 0 1rem;
  }
  .status-ticker {
    font-size: 0.58rem;
  }
}
</style>
