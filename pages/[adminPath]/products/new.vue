<template>
  <div>
    <!-- Header -->
    <div class="page-header">
      <div>
        <NuxtLink :to="`/${adminPath}/products`" class="back-link">← All Products</NuxtLink>
        <h1 class="page-title">{{ form.name || 'Add New Product' }}</h1>
      </div>
      <div class="header-actions">
        <button class="btn-primary" :disabled="saving" @click="createProduct">
          <span v-if="saving" class="spinner" />
          <span v-else>Create Product</span>
        </button>
      </div>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast.show" :class="`toast toast--${toast.type}`">
        {{ toast.message }}
      </div>
    </Transition>

    <!-- Editor form -->
    <div class="editor-grid">

      <!-- ─ Left column ──────────────────────── -->
      <div class="col-main">

        <!-- Basic Info -->
        <div class="card">
          <h2 class="card-title">Basic Information</h2>
          <div class="fields">
            <div class="field">
              <label class="label">Product Name *</label>
              <input v-model="form.name" class="input" placeholder="e.g. iOS Panel Pro" />
            </div>
            <div class="field">
              <label class="label">Description</label>
              <textarea v-model="form.description" class="input textarea" rows="4" placeholder="Describe this product…" />
            </div>
            <div class="field-row">
              <div class="field">
                <label class="label">Category *</label>
                <select v-model="form.category" class="input">
                  <option value="">Select category</option>
                  <option>FF Cheats</option>
                  <option>FF IDs</option>
                  <option>SSM Panel</option>
                  <option>Reseller</option>
                </select>
              </div>
              <div class="field">
                <label class="label">Sub-Category</label>
                <select v-model="form.sub_category" class="input">
                  <option value="">None</option>
                  <option>iOS Panel</option>
                  <option>Android Panel</option>
                  <option>PC Panel</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Badge / Tag</label>
              <input v-model="form.badge" class="input" placeholder="e.g. Best Seller, Rage Mode, Anti-Ban…" />
            </div>
            <div class="field">
              <label class="label">YouTube Demo Video Link</label>
              <input v-model="form.youtube_url" class="input" placeholder="e.g. https://www.youtube.com/watch?v=..." />
            </div>
          </div>
        </div>

        <!-- Pricing & Duration -->
        <div class="card">
          <h2 class="card-title">Pricing & Duration</h2>
          <div class="fields">
            <div class="field-row">
              <div class="field">
                <label class="label">Price (₹) *</label>
                <input v-model.number="form.price" type="number" min="0" class="input" placeholder="299" />
              </div>
              <div class="field">
                <label class="label">Original Price (₹)</label>
                <input v-model.number="form.original_price" type="number" min="0" class="input" placeholder="499" />
              </div>
              <div class="field">
                <label class="label">Duration</label>
                <select v-model="form.duration" class="input">
                  <option value="">None</option>
                  <option value="day">Per Day</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>
          </div>
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

        <!-- Publish settings -->
        <div class="card">
          <h2 class="card-title">Publish Settings</h2>
          <div class="toggle-group">
            <div class="toggle-row">
              <div>
                <div class="toggle-name">Published</div>
                <div class="toggle-sub">Visible to customers on the site</div>
              </div>
              <label class="toggle">
                <input v-model="form.is_published" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
            <div class="toggle-row">
              <div>
                <div class="toggle-name">Featured</div>
                <div class="toggle-sub">Show in featured sections</div>
              </div>
              <label class="toggle">
                <input v-model="form.is_featured" type="checkbox" />
                <span class="slider" />
              </label>
            </div>
          </div>
        </div>

        <!-- Stock status -->
        <div class="card">
          <h2 class="card-title">Stock Status</h2>
          <div class="radio-group">
            <label
              v-for="opt in stockOptions"
              :key="opt.value"
              class="radio-row"
              :class="{ 'radio-row--active': form.stock_status === opt.value }"
            >
              <input v-model="form.stock_status" type="radio" :value="opt.value" />
              <span class="radio-icon">{{ opt.icon }}</span>
              <div>
                <div class="radio-label">{{ opt.label }}</div>
                <div class="radio-sub">{{ opt.sub }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Sort order -->
        <div class="card">
          <h2 class="card-title">Sort Order</h2>
          <input
            v-model.number="form.sort_order"
            type="number"
            min="0"
            class="input"
            placeholder="0"
          />
          <p class="field-hint">Lower numbers appear first</p>
        </div>

        <!-- Thumbnail URL -->
        <div class="card">
          <h2 class="card-title">Thumbnail</h2>
          <div class="upload-field-row">
            <input v-model="form.thumbnail_url" class="input" placeholder="/products/…/thumb.png" />
            <button class="btn-add-row btn-upload-icon" @click="triggerThumbUpload">📤 PC</button>
            <input ref="thumbInput" type="file" accept="image/*" class="hidden-input" @change="handleThumbUpload" />
          </div>
          <div v-if="form.thumbnail_url" class="thumb-preview">
            <img
              :src="form.thumbnail_url"
              alt="Thumbnail"
              class="thumb-img"
              @error="(e) => (e.target as HTMLImageElement).style.display='none'"
            />
          </div>
        </div>

        <!-- Gallery Images -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Gallery Images</h2>
            <div class="card-head-btns">
              <button class="btn-add-row" @click="addImage">+ URL</button>
              <button class="btn-add-row btn-upload" @click="triggerImagesUpload">📤 PC</button>
              <input ref="imagesInput" type="file" accept="image/*" class="hidden-input" @change="handleImagesUpload" />
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

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({ layout: 'admin', middleware: ['admin-guard'] })

const { adminPath } = useAdmin()
const router = useRouter()
const saving = ref(false)
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })

const thumbInput = ref<HTMLInputElement | null>(null)
const imagesInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  name: '',
  description: '',
  category: '',
  sub_category: '',
  badge: '',
  price: null as number | null,
  original_price: null as number | null,
  duration: '',
  thumbnail_url: '',
  stock_status: 'active',
  is_published: true,
  is_featured: false,
  sort_order: 0,
  features: [] as string[],
  support: [] as string[],
  images: [] as string[],
  youtube_url: '',
})

interface ListItem { id: string; value: string }
const featuresList = ref<ListItem[]>([])
const supportList = ref<ListItem[]>([])
const imagesList = ref<ListItem[]>([])

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => { toast.show = false }, 3500)
}

function addFeature() { featuresList.value.push({ id: `feat-${Date.now()}-${Math.random()}`, value: '' }) }
function removeFeature(index: number) { featuresList.value.splice(index, 1) }

function addSupport() { supportList.value.push({ id: `supp-${Date.now()}-${Math.random()}`, value: '' }) }
function removeSupport(index: number) { supportList.value.splice(index, 1) }

function addImage() { imagesList.value.push({ id: `img-${Date.now()}-${Math.random()}`, value: '' }) }
function removeImage(index: number) { imagesList.value.splice(index, 1) }

function triggerThumbUpload() { thumbInput.value?.click() }
function triggerImagesUpload() { imagesInput.value?.click() }

async function handleThumbUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  showToast('Uploading thumbnail...', 'success')
  try {
    const res = await $fetch<{ path: string }>('/api/admin/upload', { method: 'POST', body: formData })
    form.thumbnail_url = res.path
    showToast('Thumbnail uploaded successfully!')
  } catch (err: any) { showToast(err.statusMessage || 'Failed to upload thumbnail', 'error') } finally { target.value = '' }
}

async function handleImagesUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  showToast('Uploading gallery image...', 'success')
  try {
    const res = await $fetch<{ path: string }>('/api/admin/upload', { method: 'POST', body: formData })
    imagesList.value.push({ id: `img-${Date.now()}-${Math.random()}`, value: res.path })
    showToast('Gallery image uploaded successfully!')
  } catch (err: any) { showToast(err.statusMessage || 'Failed to upload gallery image', 'error') } finally { target.value = '' }
}

async function createProduct() {
  form.features = featuresList.value.map(x => x.value).filter(Boolean)
  form.support = supportList.value.map(x => x.value).filter(Boolean)
  form.images = imagesList.value.map(x => x.value).filter(Boolean)
  if (!form.name || !form.category) { showToast('Name and Category are required', 'error'); return }
  saving.value = true
  try {
    const newProduct = await $fetch<{ id: string }>('/api/admin/products/create', {
      method: 'POST',
      body: { ...form, sub_category: form.sub_category || null, original_price: form.original_price || null, duration: form.duration || null, thumbnail_url: form.thumbnail_url || null, youtube_url: form.youtube_url || null }
    })
    await router.push(`/${adminPath}/products/${newProduct.id}`)
  } catch (err: any) {
    const errorMsg = err.data?.statusMessage || err.message || 'Failed to create product'
    showToast(`Failed to create product: ${errorMsg}`, 'error')
    saving.value = false
  }
}

const stockOptions = [
  { value: 'active', icon: '✅', label: 'Active', sub: 'Available for purchase' },
  { value: 'limited', icon: '⚠️', label: 'Limited', sub: 'Low stock warning' },
  { value: 'out', icon: '🚫', label: 'Out of Stock', sub: 'Not available' },
]
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

.field-hint { font-size: 11px; color: #475569; margin: 4px 0 0; font-weight: 500; }

.upload-field-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.btn-upload-icon {
  border-color: rgba(34, 197, 94, 0.2) !important;
  color: #22c55e !important;
  background: rgba(34, 197, 94, 0.03) !important;
  white-space: nowrap;
}
.btn-upload-icon:hover {
  background: rgba(34, 197, 94, 0.1) !important;
  border-color: rgba(34, 197, 94, 0.5) !important;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}

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

/* Publish toggles */
.toggle-group { display: flex; flex-direction: column; gap: 18px; }

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toggle-name { font-size: 14px; color: #fff; font-weight: 600; }
.toggle-sub { font-size: 11px; color: #64748b; margin-top: 2px; font-weight: 500; }

.toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.slider {
  width: 42px; height: 22px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  position: relative;
  transition: background 0.2s;
}
.slider::after {
  content: '';
  position: absolute;
  width: 16px; height: 16px;
  background: white;
  border-radius: 50%;
  top: 2px; left: 2px;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.toggle input:checked + .slider { background: #22c55e; border-color: rgba(34, 197, 94, 0.4); }
.toggle input:checked + .slider::after { transform: translateX(20px); }

/* Radio group */
.radio-group { display: flex; flex-direction: column; gap: 10px; }

.radio-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.01);
}

.radio-row:hover { background: rgba(255, 255, 255, 0.02); border-color: rgba(255, 255, 255, 0.08); }

.radio-row--active {
  background: rgba(230, 30, 38, 0.05);
  border-color: rgba(230, 30, 38, 0.2);
}

.radio-row input { accent-color: #e61e26; }
.radio-icon { font-size: 18px; }
.radio-label { font-size: 13px; color: #fff; font-weight: 600; }
.radio-sub { font-size: 11px; color: #64748b; font-weight: 500; }

/* Thumbnail preview */
.thumb-preview { margin-top: 14px; }
.thumb-img { width: 100%; max-height: 150px; object-fit: cover; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.06); }

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
