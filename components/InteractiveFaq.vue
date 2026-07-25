<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeCategory = ref<'all' | 'setup' | 'safety' | 'payment' | 'reseller'>('all')
const openIndex = ref<number | null>(0)

const faqs = [
  {
    category: 'setup',
    question: 'How long does setup take after purchase?',
    answer: 'Setup takes under 5 minutes. As soon as you purchase via WhatsApp, our team sends your license key, secure download link, and step-by-step video guide or 1:1 setup assistance.',
  },
  {
    category: 'safety',
    question: 'Are Aslil Gang Panels safe from anti-cheat bans?',
    answer: 'Yes! Our panels use advanced kernel-level driver injection, anti-detection hooks, and stream-safe OBS masking to keep your main account 100% safe.',
  },
  {
    category: 'setup',
    question: 'Does the PC External Panel work on Windows 11?',
    answer: 'Yes! All PC panels support both Windows 10 and Windows 11 (64-bit). You can keep Windows Virus Protection ON while using our external panel.',
  },
  {
    category: 'setup',
    question: 'Do I need to jailbreak my iPhone to use the iOS Panel?',
    answer: 'No! The iOS Panel works on all iPhone and iPad devices without any jailbreak. Setup takes only 10 minutes.',
  },
  {
    category: 'setup',
    question: 'Does the Phone Panel work on Non-Rooted Android devices?',
    answer: 'Yes! Our mobile panel works seamlessly on both Rooted and Non-Rooted Android phones and tablets with 0% lag.',
  },
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept Google Pay, PhonePe, Paytm, UPI ID, Bank Transfer, and Crypto (USDT). Transactions are verified instantly via WhatsApp.',
  },
  {
    category: 'reseller',
    question: 'How do I start as an Aslil Gang Reseller?',
    answer: 'You can start with as little as 10 panel keys. Contact us on WhatsApp to unlock reseller panel access with credit dashboard tools and direct wholesale pricing.',
  },
]

const filteredFaqs = computed(() => {
  return faqs.filter((faq) => {
    const matchesCategory = activeCategory.value === 'all' || faq.category === activeCategory.value
    const matchesSearch =
      searchQuery.value.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="faq-section" aria-labelledby="faq-title">
    <div class="section-shell">
      <div class="faq-head">
        <div>
          <span class="section-label">HELP &amp; KNOWLEDGE BASE</span>
          <h2 id="faq-title">Frequently Asked Questions</h2>
        </div>
        <div class="faq-search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search questions (e.g. Windows 11, iOS, Anti-ban)..."
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <!-- Categories -->
      <div class="faq-tabs">
        <button
          class="faq-tab"
          :class="{ active: activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          All Questions
        </button>
        <button
          class="faq-tab"
          :class="{ active: activeCategory === 'setup' }"
          @click="activeCategory = 'setup'"
        >
          Setup &amp; Compatibility
        </button>
        <button
          class="faq-tab"
          :class="{ active: activeCategory === 'safety' }"
          @click="activeCategory = 'safety'"
        >
          Anti-Ban &amp; Safety
        </button>
        <button
          class="faq-tab"
          :class="{ active: activeCategory === 'payment' }"
          @click="activeCategory = 'payment'"
        >
          Payments &amp; Delivery
        </button>
        <button
          class="faq-tab"
          :class="{ active: activeCategory === 'reseller' }"
          @click="activeCategory = 'reseller'"
        >
          Reseller Portal
        </button>
      </div>

      <!-- Accordion List -->
      <div class="faq-accordion">
        <div
          v-for="(faq, idx) in filteredFaqs"
          :key="faq.question"
          class="faq-item"
          :class="{ open: openIndex === idx }"
        >
          <button class="faq-question" @click="toggle(idx)">
            <span>{{ faq.question }}</span>
            <span class="faq-icon" aria-hidden="true">{{ openIndex === idx ? '−' : '+' }}</span>
          </button>
          <div v-if="openIndex === idx" class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>

        <div v-if="filteredFaqs.length === 0" class="faq-empty">
          <p>No questions found matching "{{ searchQuery }}".</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  border-top: 1px solid var(--line);
  background: #0b0b0d;
}

.faq-head {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 420px);
  align-items: end;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.faq-head h2 {
  margin: 0.8rem 0 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.faq-search input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  color: var(--white);
  background: #141417;
  font-size: 0.82rem;
  outline: none;
  transition: border-color 180ms ease;
}

.faq-search input:focus {
  border-color: var(--red);
}

.faq-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.faq-tab {
  padding: 0.5rem 1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--gray-lt);
  background: #111113;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 180ms ease;
}

.faq-tab:hover {
  border-color: var(--line-strong);
  color: var(--white);
}

.faq-tab.active {
  border-color: var(--red);
  color: #fff;
  background: var(--red);
}

.faq-accordion {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #111114;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-item:last-child {
  border-bottom: 0;
}

.faq-question {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  border: 0;
  color: var(--white);
  background: transparent;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
  transition: background 180ms ease;
}

.faq-question:hover {
  background: rgba(255, 255, 255, 0.03);
}

.faq-icon {
  color: var(--red);
  font-size: 1.4rem;
}

.faq-answer {
  padding: 0 1.6rem 1.4rem;
}

.faq-answer p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.88rem;
  line-height: 1.7;
}

.faq-empty {
  padding: 3rem;
  color: var(--gray);
  text-align: center;
}

@media (max-width: 800px) {
  .faq-head {
    grid-template-columns: 1fr;
  }
}
</style>
