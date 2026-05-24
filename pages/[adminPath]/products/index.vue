<template>
  <div>
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Store Inventory</h1>
        <p class="page-sub">{{ filteredStatic.length }} assets registered in ledger</p>
      </div>
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

const search = ref('')
const filterCat = ref('')

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

onMounted(async () => {
  try {
    const data = await $fetch<StaticProduct[]>('/api/admin/products/static')
    staticProducts.value = data
  } catch (err) {
    console.error('Failed to load static products', err)
  } finally {
    loadingStatic.value = false
  }
})
</script>

<style scoped>
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 32px; flex-wrap: wrap; gap: 20px;
}
.page-title { font-family: 'Outfit', sans-serif; font-size: 30px; font-weight: 900; color: #fff; margin: 0 0 4px; letter-spacing: -0.02em; }
.page-sub { font-size: 14px; color: #64748b; margin: 0; font-weight: 500; }

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

.table-row {
  display: grid; padding: 18px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02); align-items: center;
  transition: all .25s ease;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(255, 255, 255, 0.015); }

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

.row-actions { display: flex; gap: 8px; align-items: center; }

.btn-edit-site {
  padding: 8px 14px;
  background: rgba(34, 197, 94, 0.03);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px; color: #22c55e; font-size: 12px; font-weight: 700;
  text-decoration: none; white-space: nowrap; transition: all .25s ease;
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.btn-edit-site:hover { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.5); box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2); }

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

.modal-actions { display: flex; gap: 12px; justify-content: center; }
.btn-cancel { padding: 12px 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; color: #cbd5e1; font-size: 13px; font-weight: 700; cursor: pointer !important; transition: all 0.2s; }
.btn-cancel:hover { background: rgba(255,255,255,0.06); }
.btn-confirm-delete { padding: 12px 24px; background: #ef4444; border: none; border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800; cursor: pointer !important; transition: all 0.2s; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35); }
.btn-confirm-delete:hover { background: #ff3333; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(239, 68, 68, 0.5); }
.btn-confirm-delete:disabled { opacity: .4; }
</style>
