<template>
  <div>
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Operations Console</h1>
        <p class="page-sub">Overview of your gaming store catalog assets</p>
      </div>
    </div>

    <!-- Stats Bento Grid -->
    <div v-if="!loading" class="stats-grid">
      
      <!-- Total -->
      <div class="stat-card stat-card--blue">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Total Assets</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.total }}</div>
        <span class="stat-trend text-blue">System integrated</span>
      </div>

      <!-- Published -->
      <div class="stat-card stat-card--green">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Published Live</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.published }}</div>
        <span class="stat-trend text-green">🟢 Customer visible</span>
      </div>

      <!-- Limited -->
      <div class="stat-card stat-card--yellow">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Limited Stock</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.limited }}</div>
        <span class="stat-trend text-yellow">⚠️ Low slots remaining</span>
      </div>

      <!-- Out of stock -->
      <div class="stat-card stat-card--red">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Out of Stock</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.out }}</div>
        <span class="stat-trend text-red">🚫 Purchase locked</span>
      </div>

      <!-- Featured -->
      <div class="stat-card stat-card--purple">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Featured Deals</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.featured }}</div>
        <span class="stat-trend text-purple">⭐ Highlighted on home</span>
      </div>

      <!-- Drafts -->
      <div class="stat-card stat-card--gray">
        <div class="card-glow-bg" />
        <div class="stat-header">
          <span class="stat-label">Offline Drafts</span>
          <div class="stat-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ stats.drafts }}</div>
        <span class="stat-trend text-gray">📂 Under configuration</span>
      </div>

    </div>

    <!-- Stats loading skeleton -->
    <div v-if="loading" class="loading-grid">
      <div v-for="i in 6" :key="i" class="stat-skeleton" />
    </div>

    <!-- Category Breakdown & Recent Listings in two-column grid -->
    <div class="dashboard-sections" v-if="!loading">
      
      <!-- Category breakdown -->
      <div v-if="categories.length" class="section cat-section">
        <div class="section-header">
          <h2 class="section-title">Asset Distribution</h2>
        </div>
        <div class="category-list card">
          <div v-for="cat in categories" :key="cat.name" class="category-row">
            <span class="cat-name">{{ cat.name }}</span>
            <div class="cat-bar-wrap">
              <div class="cat-bar" :style="`width: ${(cat.count / stats.total) * 100}%`" />
            </div>
            <span class="cat-count">{{ cat.count }}</span>
          </div>
        </div>
      </div>

      <!-- Recent products table -->
      <div v-if="products.length" class="section table-section">
        <div class="section-header">
          <h2 class="section-title">Inventory Ledger</h2>
        </div>
        
        <div class="recent-table">
          <div class="table-head">
            <span>Name</span>
            <span>Category</span>
            <span>Availability</span>
            <span>Actions</span>
          </div>
          
          <div class="table-rows-container">
            <div v-for="p in products" :key="p.slug" class="table-row">
              <span class="row-name">
                {{ p.name }}
                <span v-if="isFeatured(p)" class="badge-featured-star">⭐</span>
              </span>
              <span class="row-cat">
                <span class="cat-pill">{{ p.category }}</span>
              </span>
              <span class="row-status">
                <span :class="statusClass(getStockStatus(p))">
                  {{ getStockStatus(p) }}
                </span>
              </span>
              <span class="row-actions">
                <NuxtLink :to="`/${adminPath}/products/edit-static/${p.slug}`" class="action-link">
                  ✏️ Edit
                </NuxtLink>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: ['admin-guard'] })

const { adminPath } = useAdmin()
const loading = ref(true)
const products = ref<Record<string, any>[]>([])

interface CategoryStat { name: string; count: number }
const categories = ref<CategoryStat[]>([])

function getStockStatus(p: any) {
  if (!p.durations || p.durations.every((d: any) => d.stock === 0)) return 'out'
  if (p.durations.some((d: any) => d.stock > 0 && d.stock <= 15)) return 'limited'
  return 'active'
}

function isFeatured(p: any) {
  return p.badge && (
    p.badge.toLowerCase().includes('best') || 
    p.badge.toLowerCase().includes('featured') || 
    p.badge.toLowerCase().includes('round')
  )
}

const stats = computed(() => {
  const total = products.value.length
  const published = products.value.length // all static site products are live
  const limited = products.value.filter(p => getStockStatus(p) === 'limited').length
  const out = products.value.filter(p => getStockStatus(p) === 'out').length
  const featured = products.value.filter(p => isFeatured(p)).length
  const drafts = 0
  return { total, published, limited, out, featured, drafts }
})

onMounted(async () => {
  try {
    const data = await $fetch<Record<string, any>[]>('/api/admin/products/static')
    products.value = data

    // Build category stats
    const catMap: Record<string, number> = {}
    for (const p of data) {
      const cat = String(p.category)
      catMap[cat] = (catMap[cat] || 0) + 1
    }
    categories.value = Object.entries(catMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  } catch (err) {
    console.error('Failed to load dashboard stats', err)
  } finally {
    loading.value = false
  }
})

function statusClass(status: string) {
  const map: Record<string, string> = {
    active: 'badge-active',
    limited: 'badge-limited',
    out: 'badge-out',
  }
  return ['badge', map[status] || '']
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 20px;
}

.page-title {
  font-family: 'Outfit', sans-serif;
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.page-sub {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* ── Stats Bento Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  position: relative;
  background: rgba(18, 17, 28, 0.45);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 22px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(22, 21, 34, 0.6);
}

.card-glow-bg {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  top: -60px; right: -60px;
  filter: blur(40px);
  opacity: 0.12;
  transition: opacity 0.3s ease;
}

.stat-card:hover .card-glow-bg {
  opacity: 0.25;
}

/* Bento Color Variations */
.stat-card--blue { border-color: rgba(59, 130, 246, 0.15); }
.stat-card--blue .card-glow-bg { background: #3b82f6; }
.stat-card--blue .stat-icon-circle { background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3); color: #3b82f6; }

.stat-card--green { border-color: rgba(34, 197, 94, 0.15); }
.stat-card--green .card-glow-bg { background: #22c55e; }
.stat-card--green .stat-icon-circle { background: rgba(34, 197, 94, 0.08); border-color: rgba(34, 197, 94, 0.3); color: #22c55e; }

.stat-card--yellow { border-color: rgba(245, 158, 11, 0.15); }
.stat-card--yellow .card-glow-bg { background: #f59e0b; }
.stat-card--yellow .stat-icon-circle { background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.3); color: #f59e0b; }

.stat-card--red { border-color: rgba(239, 68, 68, 0.15); }
.stat-card--red .card-glow-bg { background: #ef4444; }
.stat-card--red .stat-icon-circle { background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3); color: #ef4444; }

.stat-card--purple { border-color: rgba(168, 85, 247, 0.15); }
.stat-card--purple .card-glow-bg { background: #a855f7; }
.stat-card--purple .stat-icon-circle { background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3); color: #a855f7; }

.stat-card--gray { border-color: rgba(100, 116, 139, 0.15); }
.stat-card--gray .card-glow-bg { background: #64748b; }
.stat-card--gray .stat-icon-circle { background: rgba(100, 116, 139, 0.08); border-color: rgba(100, 116, 139, 0.3); color: #64748b; }

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-icon-circle {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon-circle {
  transform: scale(1.08);
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin-bottom: 10px;
}

.stat-trend {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.text-blue { color: #3b82f6; }
.text-green { color: #22c55e; }
.text-yellow { color: #f59e0b; }
.text-red { color: #ef4444; }
.text-purple { color: #a855f7; }
.text-gray { color: #64748b; }

/* ── Skeletons ── */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-skeleton {
  height: 118px;
  background: linear-gradient(90deg, rgba(17,16,25,0.4) 25%, rgba(30,29,45,0.4) 50%, rgba(17,16,25,0.4) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Two column layout below stats */
.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

@media (min-width: 1024px) {
  .dashboard-sections {
    grid-template-columns: 320px 1fr;
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0;
}

/* Category lists */
.category-list.card {
  background: rgba(13, 12, 22, 0.45);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.cat-name {
  width: 100px;
  font-size: 13px;
  color: #cbd5e1;
  font-weight: 600;
  flex-shrink: 0;
}

.cat-bar-wrap {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  overflow: hidden;
}

.cat-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff2a5f 0%, #e61e26 100%);
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(230, 30, 38, 0.5);
  transition: width 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.cat-count {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  width: 24px;
  text-align: right;
}

/* Tables style */
.recent-table {
  background: rgba(13, 12, 22, 0.45);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  overflow: hidden;
}

.table-head {
  display: grid;
  grid-template-columns: 2fr 100px 140px 90px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.table-rows-container {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 100px 140px 90px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  align-items: center;
  transition: all 0.2s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.015);
}

.row-name {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge-featured-star {
  font-size: 12px;
  filter: drop-shadow(0 0 4px #e61e26);
}

.row-cat {
  display: flex;
}

.cat-pill {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.row-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Glass-backed Badges */
.badge {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 1px solid transparent;
}

.badge-active {
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.badge-limited {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.badge-out {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.action-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.action-link:hover {
  border-color: rgba(230, 30, 38, 0.3);
  color: #ff425f;
  background: rgba(230, 30, 38, 0.06);
  box-shadow: 0 4px 12px rgba(230, 30, 38, 0.15);
}
</style>
