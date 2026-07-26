<script setup lang="ts">
import BlurReveal from '~/components/ui/inspira/BlurReveal.vue'
import ParticlesBg from '~/components/ui/inspira/ParticlesBg.vue'

defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
}>()
</script>

<template>
  <header class="page-header">
    <div class="page-header__ambient" aria-hidden="true">
      <span class="page-header__aura" />
      <span class="page-header__grid" />
      <span class="page-header__orbit" />
      <ParticlesBg :quantity="24" color="#ff4540" :staticity="70" :ease="90" />
    </div>

    <div class="page-header__shell">
      <div class="page-header__index">
        <span>{{ eyebrow || 'Aslil Gang / Store' }}</span>
        <span><i /> Catalog online</span>
      </div>

      <BlurReveal :delay="0.05" blur="12px" :duration="0.72">
        <h1>{{ title }}</h1>
      </BlurReveal>

      <BlurReveal :delay="0.12">
        <div class="page-header__foot">
          <p v-if="subtitle">{{ subtitle }}</p>
          <div aria-hidden="true">
            <span />
            <small>Browse the collection ↓</small>
          </div>
        </div>
      </BlurReveal>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  position: relative;
  display: flex;
  min-height: 66svh;
  align-items: flex-end;
  overflow: hidden;
  padding: 10rem 1.5rem 4rem;
  border-bottom: 1px solid var(--line);
  background: #08080a;
  isolation: isolate;
}

.page-header__ambient,
.page-header__ambient > span {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
}

.page-header__aura {
  top: -20%;
  right: -5%;
  bottom: -35%;
  left: 46%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(199, 10, 26, 0.22), rgba(91, 3, 13, 0.08) 46%, transparent 70%);
  filter: blur(38px);
  animation: header-aura 12s ease-in-out infinite;
}

.page-header__grid {
  top: 30%;
  right: -10%;
  bottom: -55%;
  left: -10%;
  background:
    linear-gradient(rgba(255, 68, 62, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 68, 62, 0.09) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: linear-gradient(to bottom, transparent 0%, #000 35%, transparent 90%);
  transform: perspective(440px) rotateX(62deg);
  transform-origin: center bottom;
  animation: page-grid 15s linear infinite;
}

.page-header__orbit {
  top: 10%;
  right: -5%;
  bottom: -46%;
  left: 48%;
  border: 1px solid rgba(255, 64, 58, 0.13);
  border-radius: 50%;
  transform: rotate(-12deg);
}

.page-header__orbit::after {
  position: absolute;
  top: 47%;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 14px rgba(255, 45, 45, 0.8);
  content: '';
}

.page-header__shell {
  position: relative;
  z-index: 2;
  width: min(var(--shell), 100%);
  margin: 0 auto;
}

.page-header__index {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.51rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.page-header__index span:first-child {
  color: var(--red-bright);
}

.page-header__index span:last-child {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--green);
}

.page-header__index i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 12px currentColor;
}

.page-header h1 {
  max-width: 1120px;
  margin: 1.8rem 0 0;
  font-size: clamp(5rem, 10.5vw, 10.5rem);
  font-weight: 900;
  line-height: 0.75;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.page-header__foot {
  display: grid;
  grid-template-columns: minmax(0, 680px) 1fr;
  align-items: end;
  gap: 3rem;
  margin-top: 2.4rem;
}

.page-header__foot p {
  margin: 0;
  color: var(--gray-lt);
  font-size: clamp(0.88rem, 1.2vw, 1rem);
  line-height: 1.72;
}

.page-header__foot > div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.8rem;
}

.page-header__foot > div span {
  width: min(150px, 12vw);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(246, 241, 232, 0.28));
}

.page-header__foot small {
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.47rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

@keyframes header-aura {
  0%, 100% { opacity: 0.65; transform: scale(0.94); }
  50% { opacity: 0.95; transform: scale(1.08) translateX(-2%); }
}

@keyframes page-grid {
  to { background-position: 0 58px, 58px 0; }
}

@media (max-width: 680px) {
  .page-header {
    min-height: 58svh;
    padding: 8.7rem 1rem 3.2rem;
  }

  .page-header__index span:last-child,
  .page-header__foot > div {
    display: none;
  }

  .page-header h1 {
    font-size: clamp(4.2rem, 20vw, 7rem);
  }

  .page-header__foot {
    grid-template-columns: 1fr;
    margin-top: 1.8rem;
  }

  .page-header__orbit {
    inset: 12% -50% -15% 30%;
  }
}
</style>
