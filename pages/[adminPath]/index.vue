<template>
  <div class="login-page">
    <!-- Deep Space Glowing Background Effects -->
    <div class="bg-grid" />
    <div class="bg-glow-pink" />
    <div class="bg-glow-red" />

    <div class="login-card">
      <div class="card-glow" />
      
      <!-- Header -->
      <div class="card-header">
        <div class="lock-shield">
          <div class="shield-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
        </div>
        <h1 class="card-title">SECURE GATEWAY</h1>
        <p class="card-sub">VaidikStore Console Panel Access</p>
      </div>

      <!-- Login Form -->
      <form class="login-form" @submit.prevent="doLogin">
        <div class="field-group" :class="{ 'field-group--error': error }">
          <label class="field-label">System Authentication Key</label>
          <div class="password-wrapper">
            <span class="key-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input
              id="admin-password"
              v-model="password"
              :type="showPw ? 'text' : 'password'"
              class="password-input"
              placeholder="Enter secure access password"
              autocomplete="current-password"
              :disabled="loading"
              @keydown.enter="doLogin"
            />
            <button type="button" class="toggle-pw" @click="showPw = !showPw">
              <span v-if="showPw">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </span>
              <span v-else>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </span>
            </button>
          </div>
          <Transition name="fade">
            <p v-if="error" class="error-msg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ error }}
            </p>
          </Transition>
        </div>

        <button
          id="admin-login-btn"
          type="submit"
          class="login-btn"
          :disabled="loading || !password"
        >
          <span v-if="loading" class="spinner" />
          <span v-else class="btn-content">
            Unlock Console
            <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </button>
      </form>

      <p class="security-note">
        🔒 All administrative operations are monitored and encrypted.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ layout: false, middleware: ['admin-guard'] })

const config = useRuntimeConfig()
const router = useRouter()
const adminPath = config.public.adminPath as string

const password = ref('')
const loading = ref(false)
const error = ref('')
const showPw = ref(false)

// Verify Typography is loaded inside useHead
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap' }
  ]
})

onMounted(async () => {
  try {
    await $fetch('/api/admin/check')
    await router.push(`/${adminPath}/dashboard`)
  } catch {
    // Not authenticated
  }
})

async function doLogin() {
  if (!password.value || loading.value) return
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value },
    })
    await router.push(`/${adminPath}/dashboard`)
  } catch (err: unknown) {
    const e = err as { statusCode?: number; statusMessage?: string }
    error.value = e.statusCode === 401
      ? 'Unauthorized signature. Access denied.'
      : 'API gateway error. Please try again.'
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 50%, #0d0c16 0%, #05040a 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  cursor: auto !important;
}

.login-page *,
.login-page a,
.login-page button,
.login-page input {
  cursor: revert !important;
}

.login-page button { cursor: pointer !important; }
.login-page input { cursor: text !important; }

/* Subtle Digital Grid Overlay */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(230, 30, 38, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 30, 38, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Fluid Moving Background Lights */
.bg-glow-pink {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 42, 95, 0.07) 0%, transparent 70%);
  top: 20%;
  left: 20%;
  filter: blur(40px);
  pointer-events: none;
}

.bg-glow-red {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(230, 30, 38, 0.07) 0%, transparent 70%);
  bottom: 10%;
  right: 15%;
  filter: blur(40px);
  pointer-events: none;
}

/* Glassmorphic Login Container Card */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  background: rgba(13, 12, 22, 0.55);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(230, 30, 38, 0.18);
  border-radius: 24px;
  padding: 44px;
  box-shadow: 
    0 30px 70px rgba(0, 0, 0, 0.75), 
    0 0 40px rgba(230, 30, 38, 0.06),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #ff2a5f 50%, transparent 100%);
}

.card-header {
  text-align: center;
  margin-bottom: 36px;
}

.lock-shield {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.shield-circle {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(230, 30, 38, 0.15), rgba(255, 42, 95, 0.02));
  border: 1px solid rgba(230, 30, 38, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff425f;
  box-shadow: 0 0 24px rgba(230, 30, 38, 0.2);
  filter: drop-shadow(0 0 10px rgba(230, 30, 38, 0.2));
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 6px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.card-sub {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.key-icon {
  position: absolute;
  left: 14px;
  color: #475569;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s ease;
}

.password-input {
  width: 100%;
  padding: 14px 44px 14px 42px;
  background: rgba(15, 14, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: #f1f5f9;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
}

.password-input:focus {
  border-color: rgba(230, 30, 38, 0.5);
  background: #0f0e1a;
  box-shadow: 0 0 16px rgba(230, 30, 38, 0.15);
}

.password-input:focus ~ .key-icon {
  color: #ff425f;
}

.password-input:disabled {
  opacity: 0.5;
}

.field-group--error .password-input {
  border-color: rgba(239, 68, 68, 0.5);
}

.toggle-pw {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #475569;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.toggle-pw:hover {
  color: #ff425f;
}

.error-msg {
  font-size: 12px;
  color: #ef4444;
  margin: 2px 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.login-btn {
  position: relative;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e61e26 0%, #ff425f 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 6px 20px rgba(230, 30, 38, 0.35);
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(230, 30, 38, 0.5);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-arrow {
  transition: transform 0.25s ease;
}

.login-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(4px);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.security-note {
  text-align: center;
  font-size: 11px;
  color: #475569;
  margin-top: 24px;
  margin-bottom: 0;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
