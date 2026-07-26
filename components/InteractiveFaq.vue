<script setup lang="ts">
const openIndex = ref<number | null>(0)

const faqs = [
  {
    question: 'How do I know which panel fits my device?',
    answer: 'Choose the closest platform collection, then message the team with your device model and operating system. Compatibility can be confirmed before you order.',
  },
  {
    question: 'What happens after I place an order?',
    answer: 'Delivery and setup details are shared directly through WhatsApp. The team can guide you through the product-specific installation steps.',
  },
  {
    question: 'Can any panel guarantee that an account will never be banned?',
    answer: 'No third-party game tool can honestly guarantee zero risk. Review the current product notes, use an alternate account where appropriate, and confirm the latest status with support before purchasing.',
  },
  {
    question: 'Which payment options are available?',
    answer: 'Available payment methods are confirmed during the WhatsApp order conversation, along with the final price and delivery details.',
  },
  {
    question: 'Is reseller access available?',
    answer: 'Yes. The reseller section explains the program, and the team can confirm current entry requirements and pricing directly.',
  },
]

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="faq-section" aria-labelledby="faq-title">
    <div class="section-shell faq-layout">
      <header class="faq-head">
        <span class="section-label">Before you order</span>
        <h2 id="faq-title">Clear answers.<br />No hard sell.</h2>
        <p>
          The useful details, kept short. If your setup is unusual, ask the team
          before making a purchase.
        </p>
      </header>

      <div class="faq-accordion">
        <article
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button
            class="faq-question"
            type="button"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            @click="toggle(index)"
          >
            <small>{{ String(index + 1).padStart(2, '0') }}</small>
            <span>{{ faq.question }}</span>
            <i aria-hidden="true">{{ openIndex === index ? '−' : '+' }}</i>
          </button>
          <Transition name="answer">
            <div
              v-if="openIndex === index"
              :id="`faq-answer-${index}`"
              class="faq-answer"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </Transition>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: clamp(6rem, 10vw, 10rem) 0;
  border-top: 1px solid var(--line);
  background:
    radial-gradient(circle at 12% 28%, rgba(135, 6, 18, 0.08), transparent 26rem),
    #08080a;
}

.faq-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.62fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(3rem, 8vw, 8rem);
}

.faq-head {
  position: sticky;
  top: 8rem;
}

.faq-head h2 {
  margin: 1rem 0 0;
  font-size: clamp(4rem, 7vw, 7.2rem);
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.faq-head p {
  max-width: 430px;
  margin: 1.4rem 0 0;
  color: var(--gray-lt);
  font-size: 0.88rem;
  line-height: 1.72;
}

.faq-accordion {
  overflow: hidden;
  border-top: 1px solid var(--line-strong);
  border-right: 1px solid var(--line);
  border-left: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(14, 14, 17, 0.72);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-question {
  display: grid;
  width: 100%;
  grid-template-columns: 2.2rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.2rem;
  border: 0;
  color: var(--white);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.faq-question small {
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.faq-question span {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.faq-question i {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--gray-lt);
  font-size: 1rem;
  font-style: normal;
  transition: border-color 180ms ease, color 180ms ease;
}

.faq-question:hover i,
.faq-item.open .faq-question i {
  border-color: var(--red);
  color: var(--red-bright);
}

.faq-answer {
  overflow: hidden;
}

.faq-answer p {
  max-width: 720px;
  margin: 0;
  padding: 0 4rem 1.7rem 4.4rem;
  color: var(--gray-lt);
  font-size: 0.87rem;
  line-height: 1.75;
}

.answer-enter-active,
.answer-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.answer-enter-from,
.answer-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@media (max-width: 820px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }

  .faq-head {
    position: static;
  }
}

@media (max-width: 560px) {
  .faq-question {
    grid-template-columns: 1.6rem minmax(0, 1fr) auto;
    gap: 0.7rem;
  }

  .faq-answer p {
    padding-left: 2.3rem;
  }
}
</style>
