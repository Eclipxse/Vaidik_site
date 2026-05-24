<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal" @keydown.esc="closeModal">
    <div class="wa-modal">
      <button class="wa-close" @click="closeModal" aria-label="Close">✕</button>

      <div class="wa-header">
        <div class="wa-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div>
          <p class="wa-pretitle">Contact to Purchase</p>
          <h2 class="wa-title">WhatsApp Us</h2>
        </div>
      </div>

      <div v-if="modalProduct" class="wa-product">
        <span class="wa-product-label">Purchasing:</span>
        <span class="wa-product-name">{{ modalProduct.name }}</span>
      </div>

      <!-- QR Code -->
      <div class="wa-qr-wrap">
        <img :src="qrCodeUrl" :alt="`QR code for ${modalProduct?.name}`" class="wa-qr" width="200" height="200" />
      </div>

      <p class="wa-hint">Scan with your phone camera to open WhatsApp</p>

      <a
        :href="directLink"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-red wa-direct"
      >
        Open WhatsApp Directly →
      </a>

      <p class="wa-number">+{{ ownerNumber }}</p>
    </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isModalOpen, modalProduct, closeModal, buildWhatsAppLink, ownerNumber } = useWhatsApp()

const directLink = computed(() => {
  if (!modalProduct.value) return `https://wa.me/${ownerNumber}`
  return buildWhatsAppLink(modalProduct.value.name, modalProduct.value.category)
})

const qrCodeUrl = computed(() => {
  const url = encodeURIComponent(directLink.value)
  return `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}&choe=UTF-8&chld=M|2`
})

watch(isModalOpen, (open) => {
  if (import.meta.server) return
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.wa-modal {
  position: relative;
  background: #0d0d0d;
  border: 1px solid rgba(230, 30, 38, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 380px;
  width: 92%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 0 0 1px rgba(230,30,38,0.06), 0 40px 80px rgba(0,0,0,0.8);
}

.wa-modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(90deg, transparent, var(--red), transparent);
}

.wa-close {
  position: absolute;
  top: 1rem; right: 1rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5);
  width: 32px; height: 32px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.wa-close:hover {
  background: rgba(230,30,38,0.1);
  border-color: rgba(230,30,38,0.3);
  color: var(--red);
}

.wa-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.wa-icon {
  width: 50px; height: 50px;
  border-radius: 12px;
  background: rgba(37,211,102,0.1);
  border: 1px solid rgba(37,211,102,0.25);
  display: flex; align-items: center; justify-content: center;
  color: #25d366;
  flex-shrink: 0;
}

.wa-pretitle {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--red);
  margin: 0;
}

.wa-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
}

.wa-product {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.875rem;
  background: rgba(230,30,38,0.05);
  border: 1px solid rgba(230,30,38,0.12);
  border-radius: 8px;
}

.wa-product-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  flex-shrink: 0;
}

.wa-product-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--red);
}

.wa-qr-wrap {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
}

.wa-qr {
  display: block;
  image-rendering: pixelated;
}

.wa-hint {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--gray);
  text-align: center;
  margin: 0;
}

.wa-direct {
  width: 100%;
  justify-content: center;
}

.wa-number {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.1em;
  margin: 0;
}
</style>
