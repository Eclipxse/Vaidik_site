<template>
  <div>
    <!-- Header -->
    <div class="page-header">
      <div>
        <NuxtLink :to="`/${adminPath}/products`" class="back-link">← All Products</NuxtLink>
        <h1 class="page-title">{{ form.name || 'Edit Product' }}</h1>
        <p class="page-sub">🌐 Live site product — editing updates <code>composables/useProducts.ts</code> instantly</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="resetForm">Reset</button>
        <button class="btn-primary" :disabled="saving" @click="saveProduct">
          <span v-if="saving" class="spinner" />
          <span v-else>Save Changes</span>
        </button>
      </div>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast.show" :class="`toast toast--${toast.type}`">
        {{ toast.message }}
      </div>
    </Transition>

    <!-- Loading skeleton -->
    <div v-if="loading" class="loading-state">
      <div v-for="i in 4" :key="i" class="field-skeleton" />
    </div>

    <!-- Editor form -->
    <div v-else class="editor-grid">

      <!-- ─ Left column ──────────────────────── -->
      <div class="col-main">

        <!-- Basic Info -->
        <div class="card">
          <h2 class="card-title">Basic Information</h2>
          <div class="fields">
            <div class="field">
              <label class="label">Product Name *</label>
              <input v-model="form.name" class="input" />
            </div>
            <div class="field">
              <label class="label">Tagline / Description</label>
              <textarea v-model="form.tagline" class="input textarea" rows="3" />
            </div>
            <div class="field-row">
              <div class="field">
                <label class="label">Category *</label>
                <select v-model="form.category" class="input">
                  <option value="PC">PC</option>
                  <option value="Mobile">Mobile</option>
                  <option value="iOS">iOS</option>
                </select>
              </div>
              <div class="field">
                <label class="label">Badge / Tag</label>
                <input v-model="form.badge" class="input" placeholder="e.g. Best Seller" />
              </div>
            </div>
            <div class="field">
              <label class="label">YouTube Demo Video Link</label>
              <input v-model="form.youtube_url" class="input" placeholder="e.g. https://www.youtube.com/watch?v=..." />
            </div>
          </div>
        </div>

        <!-- Durations / Pricing -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Durations & Pricing</h2>
            <button class="btn-add-row" @click="addDuration">+ Add Duration</button>
          </div>
          <div class="dur-grid" v-if="form.durations.length">
            <div class="dur-head">
              <span>Label</span><span>Days</span><span>Price</span><span>Stock</span><span></span>
            </div>
            <div v-for="(d, i) in form.durations" :key="i" class="dur-row">
              <input v-model="form.durations[i].label" class="input dur-input" placeholder="1 Day" />
              <input v-model.number="form.durations[i].days" type="number" class="input dur-input" placeholder="1" />
              <input v-model="form.durations[i].price" class="input dur-input" placeholder="₹99" />
              <input v-model.number="form.durations[i].stock" type="number" class="input dur-input" placeholder="50" />
              <button class="btn-remove-row" @click="form.durations.splice(i, 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <p v-else class="empty-hint">No durations yet. Click "+ Add Duration".</p>
        </div>

        <!-- Features list -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Features</h2>
            <button class="btn-add-row" @click="addFeature">+ Add Feature</button>
          </div>
          <div class="list-editor">
            <div
              v-for="(item, i) in featuresList"
              :key="item.id"
              class="list-row"
            >
              <span class="drag-handle">⠿</span>
              <input v-model="item.value" class="input list-input" :placeholder="`Feature ${i + 1}`" />
              <button class="btn-remove-row" @click="removeFeature(i)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
            <p v-if="!featuresList.length" class="empty-hint">No features yet. Click "+ Add Feature".</p>
          </div>
        </div>

        <!-- Support / compatibility list -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Support / Compatibility</h2>
            <button class="btn-add-row" @click="addSupport">+ Add Item</button>
          </div>
          <div class="list-editor">
            <div
              v-for="(item, i) in supportList"
              :key="item.id"
              class="list-row"
            >
              <span class="drag-handle">⠿</span>
              <input v-model="item.value" class="input list-input" :placeholder="`Compatibility item ${i + 1}`" />
              <button class="btn-remove-row" @click="removeSupport(i)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
            <p v-if="!supportList.length" class="empty-hint">No items yet.</p>
          </div>
        </div>

      </div>

      <!-- ─ Right column ─────────────────────── -->
      <div class="col-side">

        <!-- Images list -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Gallery Images</h2>
            <div class="card-head-btns">
              <button class="btn-add-row" @click="addImage">+ URL</button>
              <button class="btn-add-row btn-upload" @click="triggerFileUpload">📤 PC</button>
              <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="handleFileUpload" />
            </div>
          </div>
          <div class="list-editor">
            <div
              v-for="(item, i) in imagesList"
              :key="item.id"
              class="list-row"
            >
              <input v-model="item.value" class="input list-input" placeholder="/products/folder/image.png" />
              <button class="btn-remove-row" @click="removeImage(i)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
            <p v-if="!imagesList.length" class="empty-hint">No gallery images yet.</p>
          </div>
          <!-- Preview strip -->
          <div v-if="imagesList.filter(x => x.value).length" class="image-preview">
            <img
              v-for="(img, i) in imagesList.filter(x => x.value)"
              :key="i"
              :src="img.value"
              :alt="`Image ${i + 1}`"
              class="preview-thumb"
              @error="(e) => (e.target as HTMLImageElement).style.display='none'"
            />
          </div>
        </div>

        <!-- Info / Direct update alert -->
        <div class="card card--info">
          <h2 class="card-title card-title--info">Live Direct Update</h2>
          <p class="info-text">
            Saving updates both <code>composables/useProducts.ts</code> and the server API. The public site will reflect your changes instantly without manual code editing.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: ['admin-guard'] })

const route = useRoute()
const { adminPath } = useAdmin()
const slug = computed(() => String(route.params.slug))

const loading = ref(true)
const saving = ref(false)
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })

interface Duration { label: string; days: number; price: string; stock: number }
interface StaticProduct {
  slug: string; name: string; category: string; tagline: string
  badge: string; images: string[]; durations: Duration[]
  features: string[]; support: string[]
  youtube_url?: string
}

const form = reactive<StaticProduct>({
  slug: '', name: '', category: 'PC', tagline: '', badge: '',
  images: [], durations: [], features: [], support: [],
  youtube_url: '',
})
let original: StaticProduct = JSON.parse(JSON.stringify(form))

// Local reactive arrays of objects for stable focus key tracking
interface ListItem { id: string; value: string }
const featuresList = ref<ListItem[]>([])
const supportList = ref<ListItem[]>([])
const imagesList = ref<ListItem[]>([])

const fileInput = ref<HTMLInputElement | null>(null)

function showToast(msg: string, type: 'success' | 'error' = 'success') {
  toast.message = msg; toast.type = type; toast.show = true
  setTimeout(() => { toast.show = false }, 4000)
}

onMounted(async () => {
  try {
    const all = await $fetch<StaticProduct[]>('/api/admin/products/static')
    const found = all.find(p => p.slug === slug.value)
    if (!found) { showToast('Product not found', 'error'); return }
    Object.assign(form, JSON.parse(JSON.stringify(found)))
    
    // Populate stable keyed list items
    featuresList.value = (found.features || []).map((f, idx) => ({ id: `feat-${idx}-${Date.now()}`, value: f }))
    supportList.value = (found.support || []).map((s, idx) => ({ id: `supp-${idx}-${Date.now()}`, value: s }))
    imagesList.value = (found.images || []).map((img, idx) => ({ id: `img-${idx}-${Date.now()}`, value: img }))

    original = JSON.parse(JSON.stringify(form))
  } catch {
    showToast('Failed to load product', 'error')
  } finally {
    loading.value = false
  }
})

function resetForm() {
  Object.assign(form, JSON.parse(JSON.stringify(original)))
  featuresList.value = (original.features || []).map((f, idx) => ({ id: `feat-${idx}-${Date.now()}`, value: f }))
  supportList.value = (original.support || []).map((s, idx) => ({ id: `supp-${idx}-${Date.now()}`, value: s }))
  imagesList.value = (original.images || []).map((img, idx) => ({ id: `img-${idx}-${Date.now()}`, value: img }))
}

// stable features / support / images helper actions
function addFeature() {
  featuresList.value.push({ id: `feat-${Date.now()}-${Math.random()}`, value: '' })
}
function removeFeature(index: number) {
  featuresList.value.splice(index, 1)
}

function addSupport() {
  supportList.value.push({ id: `supp-${Date.now()}-${Math.random()}`, value: '' })
}
function removeSupport(index: number) {
  supportList.value.splice(index, 1)
}

function addImage() {
  imagesList.value.push({ id: `img-${Date.now()}-${Math.random()}`, value: '' })
}
function removeImage(index: number) {
  imagesList.value.splice(index, 1)
}

function addDuration() {
  form.durations.push({ label: '', days: 1, price: '₹', stock: 0 })
}

// Trigger PC file upload
function triggerFileUpload() {
  fileInput.value?.click()
}

// Upload handlers
async function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  showToast('Uploading image...', 'success')
  try {
    const res = await $fetch<{ path: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })
    imagesList.value.push({ id: `img-${Date.now()}-${Math.random()}`, value: res.path })
    showToast('Image uploaded successfully!')
  } catch (err: any) {
    const errorMsg = err.data?.statusMessage || err.statusMessage || err.message || 'Failed to upload image'
    showToast(errorMsg, 'error')
  } finally {
    target.value = ''
  }
}

async function saveProduct() {
  // Map keyed list items back to pure string arrays
  form.features = featuresList.value.map(x => x.value).filter(Boolean)
  form.support = supportList.value.map(x => x.value).filter(Boolean)
  form.images = imagesList.value.map(x => x.value).filter(Boolean)

  if (!form.name || !form.category) {
    showToast('Name and Category are required', 'error')
    return
  }

  saving.value = true
  try {
    await $fetch('/api/admin/products/static', {
      method: 'PUT',
      body: form,
    })
    original = JSON.parse(JSON.stringify(form))
    showToast('Product saved and site updated successfully!')
  } catch (err: any) {
    const errorMsg = err.data?.statusMessage || err.statusMessage || err.message || 'Failed to save product'
    showToast(errorMsg, 'error')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.back-link {
  display: inline-block;
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
  margin-bottom: 6px;
  transition: color 0.15s;
  font-weight: 600;
}
.back-link:hover { color: #cbd5e1; }

.page-title { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 900; color: #fff; margin: 0; letter-spacing: -0.01em; }
.page-sub { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 500; }
.page-sub code { background: rgba(255, 255, 255, 0.04); padding: 2px 6px; border-radius: 6px; font-size: 11px; color: #cbd5e1; }

.header-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #e61e26, #ff425f);
  border: none;
  border-radius: 12px;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 20px rgba(230, 30, 38, 0.35);
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(230, 30, 38, 0.5); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-secondary {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover:not(:disabled) { background: rgba(255, 255, 255, 0.06); }

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  z-index: 300;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
}
.toast--success { background: #22c55e; color: white; }
.toast--error { background: #ef4444; color: white; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }

/* Loading */
.loading-state { display: flex; flex-direction: column; gap: 16px; }
.field-skeleton {
  height: 120px;
  background: linear-gradient(90deg, rgba(17,16,25,0.4) 25%, rgba(30,29,45,0.4) 50%, rgba(17,16,25,0.4) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Grid layout */
.editor-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 960px) {
  .editor-grid { grid-template-columns: 1fr; }
}

.col-main, .col-side { display: flex; flex-direction: column; gap: 24px; }

/* Cards (Glassmorphic Premium) */
.card {
  background: rgba(13, 12, 22, 0.45);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 26px;
}
.card--info { border-color: rgba(59, 130, 246, 0.2); background: rgba(59, 130, 246, 0.01); }

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 8px;
}
.card-title--info { color: #3b82f6; border-color: rgba(59, 130, 246, 0.1); }

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 8px;
}
.card-head .card-title { margin: 0; border: none; padding: 0; }
.card-head-btns { display: flex; gap: 8px; }

/* Form fields */
.fields { display: flex; flex-direction: column; gap: 18px; }

.field-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; }

.field { display: flex; flex-direction: column; gap: 8px; }

.label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.input {
  width: 100%;
  padding: 12px 16px;
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
.input:focus { border-color: rgba(230, 30, 38, 0.5); box-shadow: 0 0 16px rgba(230, 30, 38, 0.15); background: #0f0e1a; }
.input option { background: #111118; color: #cbd5e1; }

.textarea { resize: vertical; min-height: 100px; }

/* Durations grid */
.dur-grid { display: flex; flex-direction: column; gap: 8px; }
.dur-head {
  display: grid;
  grid-template-columns: 1fr 80px 100px 80px 42px;
  gap: 10px;
  font-size: 11px;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 4px;
}
.dur-row {
  display: grid;
  grid-template-columns: 1fr 80px 100px 80px 42px;
  gap: 10px;
  align-items: center;
}
.dur-input { padding: 10px 12px; }

/* List editor */
.list-editor { display: flex; flex-direction: column; gap: 8px; }

.list-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drag-handle { color: #475569; font-size: 16px; cursor: grab; flex-shrink: 0; }

.list-input { flex: 1; }

.btn-add-row {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ff425f;
  background: rgba(230, 30, 38, 0.03);
  border: 1px dashed rgba(230, 30, 38, 0.3);
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-add-row:hover { background: rgba(230, 30, 38, 0.1); border-color: rgba(230, 30, 38, 0.5); }
.btn-upload { border-color: rgba(34, 197, 94, 0.2); color: #22c55e; background: rgba(34, 197, 94, 0.03); }
.btn-upload:hover { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.5); }

.btn-remove-row {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #475569;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.btn-remove-row:hover { color: #ef4444; border-color: rgba(239, 68, 68, 0.25); background: rgba(239, 68, 68, 0.04); }

.empty-hint { font-size: 13px; color: #475569; margin: 0; font-weight: 500; }

/* Image preview */
.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.preview-thumb {
  width: 68px;
  height: 68px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Info text */
.info-text { font-size: 13px; color: #64748b; line-height: 1.5; margin: 0 0 12px; font-weight: 500; }
.info-text code { background: rgba(255, 255, 255, 0.04); padding: 2px 6px; border-radius: 6px; font-size: 11px; color: #cbd5e1; }
.info-text:last-child { margin: 0; }

.hidden-input { display: none !important; }

/* Spinner */
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
