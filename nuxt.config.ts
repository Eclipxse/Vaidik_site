// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

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
      title: 'Aslil Gang — Panels, Player IDs and Setup Support',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Explore PC, Android and iOS products, player IDs and reseller access with direct WhatsApp support.',
        },
        { name: 'theme-color', content: '#0a0a0b' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/products/favicon/logo/image.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    adminSecret: process.env.ADMIN_SECRET_PATH || 'admin-x7k2',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || 'change-me-in-production',

    public: {
      ownerWhatsapp: process.env.NUXT_PUBLIC_OWNER_WHATSAPP || '917874883702',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      adminPath: process.env.ADMIN_SECRET_PATH || 'admin-x7k2',
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    },
  },

  compatibilityDate: '2025-05-22',

  experimental: {
    appManifest: false,
  },
})
