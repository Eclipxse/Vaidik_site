import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

  // Native scrolling is faster and more predictable on touch devices.
  if (prefersReducedMotion || isTouchDevice) {
    nuxtApp.provide('lenis', null)
    return
  }

  const lenis = new Lenis({
    duration: 0.95,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    anchors: true,
    autoResize: true,
  })

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  nuxtApp.provide('lenis', lenis)

  // Handle route changes to reset scroll
  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
  })
})
