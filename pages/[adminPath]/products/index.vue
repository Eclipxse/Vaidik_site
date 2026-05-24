<template>
  <div>
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Store Inventory</h1>
        <p class="page-sub">{{ filteredStatic.length + filteredDb.length }} assets registered in ledger</p>
      </div>
      <NuxtLink :to="`/${adminPath}/products/new`" class="btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add New Product
      </NuxtLink>
    </div>

    <!-- Search & Filter Bar -->
    <div class="toolbar">
      <div class="search-input-wrap">
        <span class="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input
          id="admin-search"
          v-model="search"
          type="text"
          class="search-input"
          placeholder="Search items by name, tagline, category…"
        />
      </div>
      <div class="filter-select-wrap">
        <select id="admin-filter-cat" v-model="filterCat" class="filter-select">
          <option value="">All Categories</option>
          <option value="PC">PC Panel</option>
          <option value="Mobile">Mobile Panel</option>
          <option value="iOS">iOS Panel</option>
          <option value="FF Cheats">FF Cheats</option>
          <option value="FF IDs">FF IDs</option>
          <option value="SSM Panel">SSM Panel</option>
          <option value="Reseller">Reseller</option>
        </select>
      </div>
    </div>

    <!-- ─── SITE PRODUCTS (Static, live website files) ────────── -->
    <div class="section-block">
      <div class="section-label-row">
        <div class="section-dot site-dot" />
        <h2 class="section-heading">Live Site Products</h2>
        <span class="section-badge">{{ filteredStatic.length }} assets · compiled in frontend composable</span>
      </div>

      <div v-if="loadingStatic" class="skeleton-list">
        <div v-for="i in 4" :key="i" class="row-skeleton" />
      </div>

      <div v-else-if="filteredStatic.length" class="products-table">
        <div class="table-head table-head--site">
          <span>Product Details</span>
          <span>Category</span>
          <span>Badge</span>
          <span>Duration Plans</span>
          <span>Actions</span>
        </div>
        <div
          v-for="p in filteredStatic"
          :key="p.slug"
          class="table-row table-row--site"
        >
          <!-- Thumbnail & Product Info -->
          <div class="row-product">
            <div class="row-thumb">
              <img
                v-if="p.images[0]"
                :src="p.images[0]"
                :alt="p.name"
                class="thumb"
                @error="(e) => (e.target as HTMLImageElement).style.display='none'"
              />
              <div v-else class="thumb-placeholder">📦</div>
            </div>
            <div>
              <div class="row-name">{{ p.name }}</div>
              <div class="row-tagline">{{ p.tagline.slice(0, 65) }}...</div>
            </div>
          </div>
          
          <div class="row-col">
            <span class="cat-pill">{{ p.category }}</span>
          </div>
          
          <div class="row-col">
            <span class="badge-pill" v-if="p.badge">{{ p.badge }}</span>
            <span class="badge-pill badge-pill--none" v-else>no badge</span>
          </div>
          
          <div class="row-col row-durations">
            <span v-for="d in p.durations" :key="d.label" class="dur-chip">
              {{ d.label }} · <span class="text-white font-bold">{{ d.price }}</span>
            </span>
          </div>
          
          <div class="row-actions">
            <NuxtLink
              :to="`/${adminPath}/products/edit-static/${p.slug}`"
              class="btn-edit-site"
            >
              ⚡ Quick Edit
            </NuxtLink>
            <button class="btn-delete" @click="confirmStaticDelete(p)">Delete</button>
          </div>
        </div>
      </div>

      <div v-else class="empty-hint-row card">No live products match your search filters.</div>
    </div>

    <!-- ─── DATABASE PRODUCTS (Supabase) ────────────────────── -->
    <div class="section-block">
      <div class="section-label-row">
        <div class="section-dot db-dot" />
        <h2 class="section-heading">Database Products</h2>
        <span class="section-badge">{{ filteredDb.length }} assets · synchronized with Supabase DB</span>
      </div>

      <div v-if="loadingDb" class="skeleton-list">
        <div v-for="i in 3" :key="i" class="row-skeleton" />
      </div>

      <div v-else-if="filteredDb.length" class="products-table">
        <div class="table-head table-head--db">
          <span>Asset Details</span>
          <span>Category</span>
          <span>Price Plan</span>
          <span>Inventory</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div
          v-for="p in filteredDb"
          :key="String(p.id)"
          class="table-row table-row--db"
          :class="{ 'row--draft': !p.is_published }"
        >
          <div class="row-name-simple">
            {{ p.name }}
            <span v-if="p.is_featured" class="feat-badge" title="Featured Asset">⭐</span>
          </div>
          <div class="row-col">
            <span class="cat-pill">{{ p.category }}</span>
          </div>
          <div class="row-col font-display text-white font-semibold">₹{{ p.price }}</div>
          <div class="row-col">
            <span :class="stockClass(String(p.stock_status))">{{ p.stock_status }}</span>
          </div>
          <div class="row-col">
            <div class="toggle-wrapper">
              <label class="toggle" :for="`toggle-${p.id}`">
                <input
                  :id="`toggle-${p.id}`"
                  type="checkbox"
                  :checked="Boolean(p.is_published)"
                  @change="togglePublish(p)"
                />
                <span class="slider" />
              </label>
              <span class="toggle-label" :class="{ 'text-green': p.is_published }">{{ p.is_published ? 'Live' : 'Draft' }}</span>
            </div>
          </div>
          <div class="row-actions">
            <NuxtLink :to="`/${adminPath}/products/${p.id}`" class="btn-edit">Edit</NuxtLink>
            <button class="btn-delete" @click="confirmDelete(p)">Delete</button>
          </div>
        </div>
      </div>

      <div v-else class="empty-state-db card">
        <span class="empty-icon">🗄️</span>
        <p class="empty-text">No database-backed assets found on this server.</p>
        <NuxtLink :to="`/${adminPath}/products/new`" class="btn-primary-sm">
          + Add first DB product
        </NuxtLink>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal">
        <div class="modal-alert-icon">⚠️</div>
        <h2 class="modal-title">Delete Product?</h2>
        <p class="modal-body">This will delete "<strong>{{ deleteTarget.name }}</strong>" from the database ledger.</p>
        <div class="modal-row">
          <label class="modal-check">
            <input v-model="hardDelete" type="checkbox" />
            <span class="checkbox-box" />
            Permanently delete (cannot be undone)
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="deleteTarget = null">Cancel</button>
          <button class="btn-confirm-delete" :disabled="deleting" @click="doDelete">
            {{ hardDelete ? 'Delete Forever' : 'Unpublish' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Static Delete Modal -->
    <div v-if="deleteStaticTarget" class="modal-overlay" @click.self="deleteStaticTarget = null">
      <div class="modal">
        <div class="modal-alert-icon">⚠️</div>
        <h2 class="modal-title">Delete Static Product?</h2>
        <p class="modal-body">This will permanently delete "<strong>{{ deleteStaticTarget.name }}</strong>" from the source code files (`useProducts.ts` and `static.get.ts`). This action cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="deleteStaticTarget = null">Cancel</button>
          <button class="btn-confirm-delete" :disabled="deletingStatic" @click="doStaticDelete">
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: ['admin-guard'] })

const { adminPath } = useAdmin()

// Static site products
interface Duration { label: string; days: number; price: string; stock: number }
interface StaticProduct {
  slug: string; name: string; category: string; tagline: string
  badge: string; images: string[]; durations: Duration[]
  features: string[]; support: string[]
}
const staticProducts = ref<StaticProduct[]>([])
const loadingStatic = ref(true)

// DB products
const dbProducts = ref<Record<string, any>[]>([])
const loadingDb = ref(true)

const search = ref('')
const filterCat = ref('')
const deleteTarget = ref<Record<string, any> | null>(null)
const hardDelete = ref(false)
const deleting = ref(false)

// Static product deletion state
const deleteStaticTarget = ref<StaticProduct | null>(null)
const deletingStatic = ref(false)

function confirmStaticDelete(p: StaticProduct) {
  deleteStaticTarget.value = p
}

async function doStaticDelete() {
  if (!deleteStaticTarget.value) return
  deletingStatic.value = true
  try {
    await $fetch(`/api/admin/products/static?slug=${deleteStaticTarget.value.slug}`, {
      method: 'DELETE',
    })
    staticProducts.value = staticProducts.value.filter(p => p.slug !== deleteStaticTarget.value!.slug)
    deleteStaticTarget.value = null
  } catch (err: any) {
    alert('Failed to delete static product: ' + (err.message || err))
  } finally {
    deletingStatic.value = false
  }
}

const filteredStatic = computed(() => {
  return staticProducts.value.filter(p => {
    const q = search.value.toLowerCase()
    const nameMatch = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)
    const catMatch = !filterCat.value || p.category === filterCat.value
    return nameMatch && catMatch
  })
})

const filteredDb = computed(() => {
  return dbProducts.value.filter(p => {
    const q = search.value.toLowerCase()
    const nameMatch = !q || String(p.name).toLowerCase().includes(q) || String(p.description || '').toLowerCase().includes(q)
    const catMatch = !filterCat.value || p.category === filterCat.value
    return nameMatch && catMatch
  })
})

onMounted(async () => {
  await Promise.allSettled([
    $fetch<StaticProduct[]>('/api/admin/products/static')
      .then(data => { staticProducts.value = data })
      .finally(() => { loadingStatic.value = false }),

    $fetch<Record<string, any>[]>('/api/admin/products')
      .then(data => { dbProducts.value = data })
      .catch(() => {}) 
      .finally(() => { loadingDb.value = false }),
  ])
})

function stockClass(status: string) {
  return {
    active: 'badge badge-active',
    limited: 'badge badge-limited',
    out: 'badge badge-out',
  }[status] || 'badge'
}

async function togglePublish(p: Record<string, any>) {
  const newVal = !p.is_published
  p.is_published = newVal
  await $fetch(`/api/admin/products/${p.id}`, {
    method: 'PUT',
    body: { is_published: newVal },
  })
}

function confirmDelete(p: Record<string, any>) {
  deleteTarget.value = p
  hardDelete.value = false
}

async function doDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await $fetch(`/api/admin/products/${deleteTarget.value.id}?hard=${hardDelete.value}`, {
      method: 'DELETE',
    })
    if (hardDelete.value) {
      dbProducts.value = dbProducts.value.filter(p => p.id !== deleteTarget.value!.id)
    } else {
      const found = dbProducts.value.find(p => p.id === deleteTarget.value!.id)
      if (found) found.is_published = false
    }
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 32px; flex-wrap: wrap; gap: 20px;
}
.page-title { font-family: 'Outfit', sans-serif; font-size: 30px; font-weight: 900; color: #fff; margin: 0 0 4px; letter-spacing: -0.02em; }
.page-sub { font-size: 14px; color: #64748b; margin: 0; font-weight: 500; }
.btn-primary {
  padding: 12px 22px; background: linear-gradient(135deg, #e61e26, #ff425f);
  border: none; border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800;
  text-decoration: none; box-shadow: 0 6px 20px rgba(230,30,38,.35); transition: all .25s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(230,30,38,.5); }
.btn-primary-sm {
  padding: 10px 18px; background: linear-gradient(135deg, #e61e26, #ff425f);
  border-radius: 10px; color: white; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 800;
  text-decoration: none; transition: all .25s; border: none;
}
.btn-primary-sm:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(230,30,38,.3); }

/* Toolbar inputs */
.toolbar { display: flex; gap: 16px; margin-bottom: 36px; flex-wrap: wrap; }
.search-input-wrap {
  position: relative; display: flex; align-items: center; flex: 1; min-width: 260px;
}
.search-icon {
  position: absolute; left: 14px; color: #475569; display: flex; pointer-events: none;
}
.search-input {
  width: 100%; background: rgba(13, 12, 22, 0.45); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
  color: #e2e8f0; padding: 12px 14px 12px 42px; font-size: 14px; font-family: 'Inter', sans-serif;
  outline: none; transition: all .25s ease;
}
.search-input:focus { border-color: rgba(230, 30, 38, 0.5); box-shadow: 0 0 16px rgba(230, 30, 38, 0.15); background: #0f0e1a; }

.filter-select-wrap { display: flex; min-width: 180px; }
.filter-select {
  width: 100%; background: rgba(13, 12, 22, 0.45); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
  color: #cbd5e1; padding: 12px 16px; font-size: 13px; font-family: 'Inter', sans-serif; font-weight: 600;
  outline: none; transition: all .25s ease;
}
.filter-select:focus { border-color: rgba(230, 30, 38, 0.5); box-shadow: 0 0 16px rgba(230, 30, 38, 0.15); }
.filter-select option { background: #111118; color: #cbd5e1; }

/* Section block headers */
.section-block { margin-bottom: 44px; }
.section-label-row {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 18px; flex-wrap: wrap;
}
.section-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.site-dot { background: #22c55e; box-shadow: 0 0 12px #22c55e; }
.db-dot { background: #3b82f6; box-shadow: 0 0 12px #3b82f6; }
.section-heading { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 900; color: #fff; margin: 0; letter-spacing: 0.02em; }
.section-badge {
  font-size: 11px; color: #828fa9; background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 4px 12px; border-radius: 20px; margin-left: auto;
}

/* Glassmorphic Tables */
.products-table { background: rgba(13, 12, 22, 0.45); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; overflow: hidden; }

.table-head {
  display: grid; padding: 14px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 11px; font-weight: 700; color: #64748b;
  text-transform: uppercase; letter-spacing: .1em;
}

/* Table Column Width configurations */
.table-head--site,
.table-row--site {
  grid-template-columns: 2fr 90px 110px 1.2fr 220px;
}
.table-head--db,
.table-row--db {
  grid-template-columns: 1.8fr 90px 90px 120px 120px 140px;
}

.table-row {
  display: grid; padding: 18px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02); align-items: center;
  transition: all .25s ease;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(255, 255, 255, 0.015); }
.row--draft { opacity: .55; }

/* Site Product card columns details */
.row-product {
  display: flex; align-items: center; gap: 14px;
}
.row-thumb {
  width: 56px; height: 56px; border-radius: 12px; overflow: hidden;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.thumb { width: 100%; height: 100%; object-fit: cover; }
.thumb-placeholder { font-size: 20px; }

.row-name { font-size: 15px; font-weight: 600; color: #fff; }
.row-tagline { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 500; }

.row-name-simple {
  font-size: 14px; font-weight: 600; color: #fff;
  display: flex; align-items: center; gap: 8px;
}
.feat-badge { font-size: 12px; }

.row-col { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #828fa9; }

.cat-pill {
  background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px; padding: 3px 8px;
  font-size: 10px; font-weight: 700; color: #cbd5e1; width: fit-content; text-transform: uppercase;
}

.badge-pill {
  background: rgba(255, 42, 95, 0.08); border: 1px solid rgba(255, 42, 95, 0.2);
  border-radius: 20px; padding: 3px 10px; font-size: 10px;
  color: #ff425f; font-weight: 700; width: fit-content; text-transform: uppercase;
}
.badge-pill--none {
  background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.05);
  color: #475569;
}

.row-durations { flex-direction: row; flex-wrap: wrap; gap: 4px; align-items: center; }
.dur-chip {
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px; padding: 4px 10px;
  font-size: 11px; color: #828fa9; white-space: nowrap;
}

/* Badges */
.badge { padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 700; width: fit-content; text-transform: uppercase; border: 1px solid transparent; }
.badge-active { background: rgba(34, 197, 94, 0.08); border-color: rgba(34, 197, 94, 0.2); color: #22c55e; }
.badge-limited { background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.badge-out { background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.2); color: #ef4444; }

/* Dynamic Toggles styling */
.toggle-wrapper { display: flex; align-items: center; gap: 10px; }
.toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer !important; }
.toggle input { opacity: 0; width: 0; height: 0; }
.slider { width: 38px; height: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; position: relative; transition: background .2s; }
.slider::after { content: ''; position: absolute; width: 14px; height: 14px; background: white; border-radius: 50%; top: 2px; left: 2px; transition: transform .2s; }
.toggle input:checked + .slider { background: #22c55e; border-color: rgba(34, 197, 94, 0.4); }
.toggle input:checked + .slider::after { transform: translateX(18px); }
.toggle-label { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.2s; }

.row-actions { display: flex; gap: 8px; align-items: center; }

.btn-edit-site {
  padding: 8px 14px;
  background: rgba(34, 197, 94, 0.03);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px; color: #22c55e; font-size: 12px; font-weight: 700;
  text-decoration: none; white-space: nowrap; transition: all .2s ease;
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.btn-edit-site:hover { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.5); box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2); }

.btn-edit {
  padding: 7px 14px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; color: #cbd5e1; font-size: 12px; font-weight: 700;
  text-decoration: none; transition: all .2s ease;
}
.btn-edit:hover { border-color: rgba(230, 30, 38, 0.4); color: #ff425f; background: rgba(230, 30, 38, 0.06); box-shadow: 0 4px 12px rgba(230,30,38,0.15); }

.btn-delete {
  padding: 7px 14px; background: transparent; border: 1px solid rgba(239,68,68,.2);
  border-radius: 8px; color: #ef4444; font-size: 12px; font-weight: 700;
  cursor: pointer !important; transition: all .2s ease;
}
.btn-delete:hover { background: rgba(239,68,68,.08); border-color: rgba(239, 68, 68, 0.5); }

/* Skeletons */
.skeleton-list { display: flex; flex-direction: column; gap: 4px; }
.row-skeleton {
  height: 74px;
  background: linear-gradient(90deg, rgba(17,16,25,0.4) 25%, rgba(30,29,45,0.4) 50%, rgba(17,16,25,0.4) 75%);
  background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-hint-row { padding: 30px; font-size: 14px; color: #64748b; text-align: center; font-weight: 500; }

.empty-state-db {
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  padding: 50px; text-align: center; color: #64748b;
  background: rgba(13, 12, 22, 0.45); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px;
}
.empty-icon { font-size: 32px; filter: grayscale(1) opacity(0.5); }
.empty-text { font-size: 14px; margin: 0; font-weight: 500; }

/* Glassmorphic Delete Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(3,2,8,0.8);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; backdrop-filter: blur(8px);
}
.modal {
  background: rgba(18, 17, 28, 0.75); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 24px;
  padding: 36px; width: 100%; max-width: 440px; text-align: center;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 68, 68, 0.08);
}
.modal-alert-icon { font-size: 40px; margin-bottom: 16px; color: #ef4444; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.4)); }
.modal-title { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 900; color: #fff; margin: 0 0 12px; letter-spacing: 0.02em; }
.modal-body { font-size: 14px; color: #94a3b8; margin: 0 0 24px; line-height: 1.5; font-weight: 500; }
.modal-row { margin-bottom: 28px; display: flex; justify-content: center; }

/* Custom Checkbox */
.modal-check { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #94a3b8; cursor: pointer !important; font-weight: 600; position: relative; }
.modal-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.checkbox-box {
  width: 18px; height: 18px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); border-radius: 5px; display: inline-block; transition: all 0.2s; position: relative;
}
.modal-check input:checked ~ .checkbox-box { background: #ef4444; border-color: #ef4444; }
.modal-check input:checked ~ .checkbox-box::after {
  content: '✓'; position: absolute; color: white; font-size: 12px; font-weight: 900; top: 50%; left: 50%; transform: translate(-50%, -50%);
}

.modal-actions { display: flex; gap: 12px; justify-content: center; }
.btn-cancel { padding: 12px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; color: #cbd5e1; font-size: 13px; font-weight: 700; cursor: pointer !important; transition: all 0.2s; }
.btn-cancel:hover { background: rgba(255,255,255,0.06); }
.btn-confirm-delete { padding: 12px 24px; background: #ef4444; border: none; border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800; cursor: pointer !important; transition: all 0.2s; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35); }
.btn-confirm-delete:hover { background: #ff3333; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(239, 68, 68, 0.5); }
.btn-confirm-delete:disabled { opacity: .4; }
</style>
