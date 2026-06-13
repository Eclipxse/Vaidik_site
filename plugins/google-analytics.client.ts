export default defineNuxtPlugin((nuxtApp) => {
  const measurementId = useRuntimeConfig().public.googleAnalyticsId
  if (!measurementId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })

  nuxtApp.hook('page:finish', () => {
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    })
  })
})

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
