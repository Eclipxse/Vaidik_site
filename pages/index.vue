<template>
  <div class="home">
    <HeroSection />

    <!-- ── MARQUEE TICKER ─────────────────────────── -->
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="n in 3" :key="n" class="marquee-set">
          <span v-for="item in marqueeItems" :key="item" class="marquee-item">
            <span class="marquee-dot">◆</span>{{ item }}
          </span>
        </span>
      </div>
    </div>

    <!-- ── CATEGORIES ──────────────────────────────── -->
    <section class="sect" id="arsenal" aria-labelledby="cats-heading">
      <div class="sect-inner">
        <div class="sect-head reveal-up">
          <span class="sect-eyebrow">What We Offer</span>
          <h2 id="cats-heading" class="sect-title">
            Choose Your<br />
            <span class="text-red">Arsenal.</span>
          </h2>
        </div>

        <div class="cats-grid">
          <NuxtLink
            v-for="(cat, i) in categories"
            :key="cat.id"
            :to="cat.to"
            class="cat-card reveal-card"
            :id="`cat-${cat.id}`"
            :style="{ '--delay': `${i * 0.08}s` }"
          >
            <span class="cat-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="cat-body">
              <h3 class="cat-name">{{ cat.name }}</h3>
              <p class="cat-desc">{{ cat.desc }}</p>
            </div>
            <span class="cat-arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- ── CTA BANNER ──────────────────────────────── -->
    <section class="cta-band" aria-labelledby="cta-heading">
      <div class="cta-glow" aria-hidden="true" />
      <div class="cta-inner">
        <div class="cta-badge reveal-up">🔥 Limited Slots Available</div>
        <h2 id="cta-heading" class="cta-title reveal-up">
          Ready To<br />
          <span class="text-red">Dominate?</span>
        </h2>
        <p class="cta-sub reveal-up">
          Connect directly on WhatsApp for instant purchase &amp; support.
        </p>
        <a
          :href="`https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to buy a Free Fire product.')}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-green cta-btn reveal-up"
          id="main-wa-cta"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Connect on WhatsApp
        </a>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'ASLIL GANG PANEL — India\'s No.1 Free Fire Panel',
  meta: [
    { name: 'description', content: "India's most exclusive Free Fire panel. Premium cheats, accounts & subscriptions. Instant delivery. Impeccable service." },
  ],
})

const { ownerNumber } = useWhatsApp()

const marqueeItems = [
  'Undetected Panels', 'Auto Headshot', 'No Recoil', 'Silent Aim',
  'Instant Delivery', 'Premium IDs', 'Anti-Ban', 'ESP Hack',
  '24/7 Support', 'PC & Mobile', 'India No.1', 'Free Fire Pro',
]


const categories = [
  { id: 'ios',     to: '/cheats/ios',     name: 'iOS Panel',      desc: 'Undetected panel for iPhone & iPad with full features.' },
  { id: 'android', to: '/cheats/android', name: 'Android Panel',  desc: 'Lightweight, powerful cheat for any Android device.'    },
  { id: 'pc',      to: '/pc-panel',       name: 'PC Panel',       desc: 'Elite bypasses and modifications for PC players.'       },
  { id: 'ssm',     to: '/ssm-panel',      name: 'SSM Panel',      desc: 'Social media & gaming boosts — instant results.'        },
  { id: 'ids',     to: '/free-fire-ids',  name: 'Premium IDs',    desc: 'High-rank accounts loaded with exclusive skins.'        },
  { id: 'resell',  to: '/reseller',       name: 'Reseller Plan',  desc: 'Start your own business with wholesale pricing.'        },
]

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) return

  // ── Section headings ──
  $gsap.utils.toArray('.reveal-up').forEach((el: any) => {
    $gsap.fromTo(el,
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  })

  // ── Cards (use CSS var --delay for stagger) ──
  $gsap.utils.toArray('.reveal-card').forEach((el: any) => {
    const delay = parseFloat((el as HTMLElement).style.getPropertyValue('--delay') || '0')
    $gsap.fromTo(el,
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    )
  })

  // ── CTA band text with bigger stagger ──
  $gsap.fromTo('.cta-badge, .cta-title, .cta-sub, .cta-btn',
    { opacity: 0, y: 35 },
    {
      opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-band', start: 'top 80%', once: true },
    }
  )
})
</script>

<style scoped>
.home { background: transparent; }

/* ── Sections ── */
.sect { padding: 8rem 0; position: relative; }

.sect:nth-child(odd) {
  background: rgba(255, 255, 255, 0.015);
}

.sect-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.sect-head { margin-bottom: 4rem; }

.flex-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.sect-eyebrow {
  display: block;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 1rem;
}

.sect-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0;
}

.text-red {
  color: var(--red);
  background: linear-gradient(135deg, #ff4040, #cc0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Categories Grid ── */
.cats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
}

@media (min-width: 640px)  { .cats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .cats-grid { grid-template-columns: repeat(3, 1fr); } }

.cat-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem 2rem;
  background: rgba(255,255,255,0.02);
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.04);
  transition: background 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cat-card::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.cat-card:hover {
  background: rgba(230, 30, 38, 0.05);
  border-color: rgba(230, 30, 38, 0.2);
}

.cat-card:hover::before { transform: scaleX(1); }

.cat-num {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.1em;
}

.cat-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.cat-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.5;
  margin: 0;
}

.cat-arrow {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.2);
  transition: color 0.3s ease, transform 0.3s ease;
  align-self: flex-end;
}

.cat-card:hover .cat-arrow {
  color: var(--red);
  transform: translateX(4px);
}


/* ── CTA Band ── */
.cta-band {
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(160,8,8,0.35) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
}

.cta-sub {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--gray);
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

/* ── Reveal states (GSAP will animate to visible) ── */
.reveal-up {
  opacity: 0;
  transform: translateY(48px);
}

.reveal-card {
  opacity: 0;
  transform: translateY(60px) scale(0.96);
}

/* ── Marquee ── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(230,30,38,0.05);
  padding: 0.9rem 0;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.marquee-track {
  display: inline-flex;
  animation: marquee-scroll 30s linear infinite;
  will-change: transform;
}

.marquee-wrap:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

.marquee-set {
  display: inline-flex;
  align-items: center;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 2rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  transition: color 0.3s ease;
}

.marquee-item:hover { color: rgba(255,255,255,0.9); }

.marquee-dot {
  font-size: 0.45rem;
  color: var(--red);
  opacity: 0.8;
}

/* ── Category card ghost number ── */
.cat-bg-num {
  position: absolute;
  top: -0.5rem; right: 0.75rem;
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  color: rgba(255,255,255,0.03);
  pointer-events: none;
  transition: color 0.35s ease;
  user-select: none;
}

.cat-card:hover .cat-bg-num {
  color: rgba(230,30,38,0.06);
}


/* ── CTA badge ── */
.cta-badge {
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  background: rgba(230,30,38,0.12);
  border: 1px solid rgba(230,30,38,0.3);
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255,100,100,0.9);
  margin-bottom: 1.5rem;
  opacity: 0;
}

/* CTA btn override */
.cta-btn {
  font-size: 0.95rem;
  padding: 1rem 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  opacity: 0;
}
</style>
