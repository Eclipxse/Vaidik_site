// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],

  css: ['~/assets/css/main.css'],

  supabase: {
    url: process.env.SUPABASE_URL ?? 'https://vwlitjdvvhfngsoomucj.supabase.co',
    key: process.env.SUPABASE_KEY ?? 'sb_publishable_kqyTPmDW68ovwyF7ipnMtA_x-bixhV4',
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/*'],
    },
  },

  app: {
    head: {
      title: 'ASLIL GANG PANEL — India\'s No.1 Free Fire Panel',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium Free Fire cheats, account IDs, SSM Panel subscriptions and reseller plans. Best prices, instant support via WhatsApp.' },
        { name: 'theme-color', content: '#E61E26' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/products/favicon/logo/image.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    // Server-only keys (never exposed to client)
    adminSecret: process.env.ADMIN_SECRET_PATH || 'admin-x7k2',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || 'change-me-in-production',

    // Public keys (exposed to client)
    public: {
      ownerWhatsapp: process.env.NUXT_PUBLIC_OWNER_WHATSAPP || '917874883702',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      adminPath: process.env.ADMIN_SECRET_PATH || 'admin-x7k2',
    },
  },

  compatibilityDate: '2025-05-22',

  experimental: {
    // Suppress the "#app-manifest" Vite resolution error in Nuxt 3.21 dev mode
    appManifest: false,
  },
})
