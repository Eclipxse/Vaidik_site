<template>
  <div class="admin-shell">
    <!-- Ambient glowing backgrounds and grids -->
    <div class="admin-grid" aria-hidden="true" />
    <div class="admin-orb admin-orb-1" aria-hidden="true" />
    <div class="admin-orb admin-orb-2" aria-hidden="true" />
    <div class="admin-orb admin-orb-3" aria-hidden="true" />

    <!-- Sidebar -->
    <aside class="admin-sidebar" :class="{ 'admin-sidebar--open': sidebarOpen }">
      <div class="sidebar-logo">
        <div class="logo-img-wrap">
          <img src="/products/favicon/logo/image.png" alt="ASLIL GANG PANEL Logo" class="logo-img" />
        </div>
        <div>
          <div class="logo-title">VaidikStore</div>
          <div class="logo-sub">Operations Panel</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink :to="`/${adminPath}/dashboard`" class="nav-item" active-class="nav-item--active">
          <span class="nav-icon-wrap">
            <svg class="nav-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </span>
          <span>Dashboard</span>
        </NuxtLink>
        <NuxtLink :to="`/${adminPath}/products`" class="nav-item" active-class="nav-item--active">
          <span class="nav-icon-wrap">
            <svg class="nav-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          </span>
          <span>Products</span>
        </NuxtLink>
        <NuxtLink :to="`/${adminPath}/products/new`" class="nav-item" active-class="nav-item--active">
          <span class="nav-icon-wrap">
            <svg class="nav-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </span>
          <span>Add Product</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <div class="session-badge">
          <span class="session-dot" />
          <span class="session-text">Session authenticated</span>
        </div>
        <button class="logout-btn" @click="doLogout">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout Session
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="admin-main">
      <header class="admin-topbar">
        <button class="mobile-menu-btn" @click="sidebarOpen = !sidebarOpen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="topbar-right">
          <span class="topbar-label">
            <span class="secure-icon">🛡️</span>
            SECURE SANDBOX
          </span>
        </div>
      </header>

      <main class="admin-content">
        <slot />
      </main>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { logout, adminPath } = useAdmin()
const sidebarOpen = ref(false)

async function doLogout() {
  await logout()
}

// Inject premium Typography from Google Fonts
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap' }
  ]
})

// Verify session on every admin page
onMounted(async () => {
  const { checkAuth } = useAdmin()
  const ok = await checkAuth()
  if (!ok) {
    await navigateTo(`/${adminPath}`)
  }
})
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, #0d0c15 0%, #06050b 100%);
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
  cursor: auto !important;
}

.admin-shell *,
.admin-shell a,
.admin-shell button,
.admin-shell input,
.admin-shell select,
.admin-shell textarea {
  cursor: revert !important;
}

.admin-shell button,
.admin-shell [role="button"] {
  cursor: pointer !important;
}

.admin-shell input,
.admin-shell textarea {
  cursor: text !important;
}

/* ── Sidebar (Glassmorphic Premium) ────────────────── */
.admin-sidebar {
  width: 260px;
  min-height: 100vh;
  background: rgba(13, 12, 22, 0.45);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 30px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.logo-circle {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(230, 30, 38, 0.2), rgba(255, 42, 95, 0.05));
  border: 1px solid rgba(230, 30, 38, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 16px rgba(230, 30, 38, 0.25);
}

.logo-icon {
  font-size: 20px;
  filter: drop-shadow(0 0 8px #e61e26);
}

.logo-title {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #ffffff 30%, #ff6b8b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-sub {
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
  margin-top: 1px;
}

.sidebar-nav {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #8f9bb3;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent;
}

.nav-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: #64748b;
  transition: color 0.25s ease;
}

.nav-svg {
  transition: transform 0.25s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.03);
}

.nav-item:hover .nav-icon-wrap {
  color: #ff425f;
}

.nav-item:hover .nav-svg {
  transform: scale(1.08);
}

.nav-item--active {
  background: linear-gradient(90deg, rgba(230, 30, 38, 0.08) 0%, rgba(255, 42, 95, 0.01) 100%);
  color: #ff425f !important;
  border: 1px solid rgba(230, 30, 38, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  position: relative;
}

.nav-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 15%;
  bottom: 15%;
  width: 3px;
  background: linear-gradient(to bottom, #ff425f, #e61e26);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px #ff425f;
}

.nav-item--active .nav-icon-wrap {
  color: #ff425f;
}

.sidebar-footer {
  padding: 20px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #828fa9;
  background: rgba(34, 197, 94, 0.04);
  border: 1px solid rgba(34, 197, 94, 0.12);
  padding: 8px 12px;
  border-radius: 10px;
}

.session-text {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.session-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.92); }
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout-btn:hover {
  background: rgba(230, 30, 38, 0.06);
  color: #ff425f;
  border-color: rgba(230, 30, 38, 0.2);
  box-shadow: 0 4px 15px rgba(230, 30, 38, 0.1);
}

/* ── Main content shell ────────────────────────── */
.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  height: 70px;
  background: rgba(10, 9, 21, 0.3);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #8f9bb3;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
}

.topbar-right {
  margin-left: auto;
}

.topbar-label {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #8f9bb3;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 6px 12px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.secure-icon {
  font-size: 13px;
}

.admin-content {
  flex: 1;
  padding: 40px;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* ── Mobile Responsive Overlay ──────────────── */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(3, 2, 8, 0.85);
  backdrop-filter: blur(8px);
  z-index: 90;
}

@media (max-width: 900px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  .admin-sidebar--open {
    transform: translateX(0);
  }
  .admin-main {
    margin-left: 0;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .sidebar-overlay {
    display: block;
  }
}

/* ── Premium Ambient Graphics ────────────────── */
.admin-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.75;
}
.admin-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  z-index: 0;
  opacity: 0.15;
  animation: floatOrb 10s ease-in-out infinite alternate;
}
.admin-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(230,30,38,0.3) 0%, transparent 70%);
  top: -100px; left: -100px;
}
.admin-orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,42,95,0.2) 0%, transparent 70%);
  bottom: -150px; right: -150px;
  animation-delay: -3s;
}
.admin-orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(230,30,38,0.2) 0%, transparent 70%);
  top: 40%; right: 40%;
  animation-delay: -6s;
}
@keyframes floatOrb {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 20px) scale(1.08); }
}

/* Sidebar Logo Wrapper */
.logo-img-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(230, 30, 38, 0.4);
  box-shadow: 0 0 16px rgba(230, 30, 38, 0.25);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  flex-shrink: 0;
}
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.admin-sidebar:hover .logo-img-wrap {
  border-color: rgba(230, 30, 38, 0.7);
  box-shadow: 0 0 24px rgba(230, 30, 38, 0.5);
  transform: scale(1.04) rotate(4deg);
}

/* Subtle micro-animations to existing blocks */
.admin-content > * {
  position: relative;
  z-index: 1;
}
</style>
