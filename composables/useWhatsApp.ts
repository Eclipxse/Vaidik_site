// composables/useWhatsApp.ts
// Manages WhatsApp modal state and link generation

const isModalOpen = ref(false)
const modalProduct = ref<{ name: string; category: string } | null>(null)

export function useWhatsApp() {
  const config = useRuntimeConfig()
  const ownerNumber = config.public.ownerWhatsapp as string

  // Check if device is mobile (server-safe)
  const isMobile = computed(() => {
    if (import.meta.server) return false
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  })

  /**
   * Build a WhatsApp wa.me deep link with pre-filled message
   */
  function buildWhatsAppLink(productName: string, category: string): string {
    const message = encodeURIComponent(
      `Hi! I'm interested in buying:\n\n📦 *${productName}*\n🏷️ Category: ${category}\n\nPlease share price & availability. Thank you!`
    )
    return `https://wa.me/${ownerNumber}?text=${message}`
  }

  /**
   * Triggered by "Buy Now" button on a product card.
   * - Mobile: opens WhatsApp deep link directly
   * - Desktop: shows QR modal
   */
  function handleBuyNow(productName: string, category: string) {
    window.open(buildWhatsAppLink(productName, category), '_blank', 'noopener,noreferrer')
  }

  function closeModal() {
    isModalOpen.value = false
    setTimeout(() => { modalProduct.value = null }, 300)
  }

  return {
    isModalOpen: readonly(isModalOpen),
    modalProduct: readonly(modalProduct),
    handleBuyNow,
    closeModal,
    buildWhatsAppLink,
    ownerNumber,
  }
}
