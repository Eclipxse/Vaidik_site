# ⚡ ASLIL GANG PANEL

### *Premium Game Panel Marketplace & Cheat Dashboard*

Welcome to the **ASLIL GANG PANEL** repository. This is a state-of-the-art, high-performance web application designed for selling game panels, cheats, and gaming accounts (such as Free Fire IDs). Built with modern technologies, it features an immersive cyberpunk/glassmorphism design, highly optimized performance, fluid micro-interactions, and a secure administration panel.

---

## 🚀 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3, Vite-powered, SSR/SSG-ready)
- **Styling**: Vanilla CSS (Premium tailor-made design system) & [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) (GreenSock Animation Platform) for high-performance cinematic animations
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL database, authentication, real-time sync)
- **Deployment**: Highly scalable static hosting with serverless database queries

---

## ✨ Features

### 🛒 Immersive Marketplace UI
- **Cyberpunk Theme**: Sleek dark-mode layout with custom glassmorphism, tailored glowing cards, and harmonious curated colors.
- **Interactive Showcases**: GSAP-driven stagger animations, interactive image galleries, and embedded YouTube demo players.
- **Dynamic Pricing Cards**: Duration selection cards (1 Day, 10 Days, 30 Days, Lifetime) with live price updates and real-time inventory tracking.

### 💬 Seamless Checkout
- **Instant WhatsApp Integration**: Customers are routed dynamically to WhatsApp with a pre-formatted message detailing their purchase selection (Product name, selected duration, exact price) for rapid transaction processing.
- **Telegram Demos**: Instant side-by-side access to YouTube videos and Telegram channels to watch cheats in action before making a purchase.

### 🛡️ Admin Dashboard & Control Panel
- **Product Management**: Real-time CRUD panel to add, edit, or delete listings directly from the browser.
- **Database Synchronization**: Dynamic database engine powered by Supabase keeps listings in sync instantly across all user screens.
- **Static & Dynamic Hybrids**: Combines ultra-fast static catalog pages with fully customizable dynamic routes from database queries.

---

## 📂 Project Structure

```bash
vaidik_site/
├── .env.example       # Example environment variables
├── app.vue            # Root Nuxt entrypoint
├── assets/            # Global stylesheets and static assets
├── components/        # Reusable Vue components (Header, Footer, Cards)
├── composables/       # Dynamic hooks (useProducts, useWhatsApp, useSupabase)
├── layouts/           # Page shell wrappers
├── middleware/        # Route guards for security
├── nuxt.config.ts     # Main Nuxt system config
├── pages/             # App routing tree
│   ├── index.vue      # Home Landing page
│   ├── pc-panel.vue   # PC Hacks Showcase
│   ├── reseller.vue   # Reseller panel card
│   ├── product/       # Dynamic Supabase products
│   │   └── [id].vue
│   └── products/      # Static pre-configured products
│       └── [slug].vue
├── public/            # Static assets (logos, screenshots, banners)
└── server/            # Nuxt serverless functions
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory and populate it with your API keys and parameters:

```env
# Supabase Core Integration
NUXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NUXT_PUBLIC_SUPABASE_KEY="your-supabase-anon-key"

# WhatsApp Business Router
NUXT_PUBLIC_WHATSAPP_NUMBER="919999999999" # Number with country code, without +
```

---

## 💻 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Eclipxse/Vaidik_site.git
cd Vaidik_site
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🤝 Contribution Guidelines

We welcome pull requests to enhance the panel. Please make sure that:
1. CSS styles follow the tailored variables system in `index.css`.
2. Micro-interactions and animations use `GSAP` to maintain optimal frame rates.
3. Code changes do not break mobile responsiveness.
