<script setup lang="ts">
import ResellerCalculator from '~/components/ResellerCalculator.vue'

definePageMeta({ layout: 'default' })

useHead({
  title: 'Reseller Program — Aslil Gang',
  meta: [{
    name: 'description',
    content: 'Review Aslil Gang reseller options and discuss current entry requirements directly.',
  }],
})

const client = useSupabaseClient()
const { ownerNumber } = useWhatsApp()
const contactLink = computed(() => `https://wa.me/${ownerNumber}?text=${encodeURIComponent('Hi! I want to learn about the reseller program.')}`)

const { data: resellerPlans, pending } = await useAsyncData(
  'reseller-plans',
  async () => {
    const { data } = await client
      .from('products')
      .select('*')
      .eq('category', 'Reseller')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data ?? []
  }
)

const steps = [
  { number: '01', title: 'Discuss your market', copy: 'Share your expected volume, platform mix and sales channel.' },
  { number: '02', title: 'Review current terms', copy: 'Confirm the available plan, pricing and operating expectations.' },
  { number: '03', title: 'Start with support', copy: 'Receive access details and a direct point of contact for questions.' },
]
</script>

<template>
  <div class="reseller-page">
    <PageHeader
      eyebrow="Business access / Reseller"
      title="Reseller Program"
      subtitle="A direct path for sellers who want to offer the Aslil Gang catalog. Current requirements and pricing are confirmed in conversation."
    />

    <main class="reseller-main">
      <section class="reseller-intro">
        <div>
          <span class="section-label">Program overview</span>
          <h2>Built around a real sales conversation.</h2>
        </div>
        <p>
          There is no generic sign-up funnel. Start by sharing your audience,
          expected volume and the products you want to carry; the team can then
          explain the current options.
        </p>
      </section>

      <section class="plan-section" aria-labelledby="plans-title">
        <div class="section-rail">
          <span id="plans-title">Available plans</span>
          <small>{{ resellerPlans?.length || 0 }} currently listed</small>
        </div>

        <div v-if="pending" class="plan-grid" aria-busy="true">
          <div v-for="index in 3" :key="index" class="plan-skeleton" />
        </div>

        <div v-else-if="resellerPlans?.length" class="plan-grid">
          <ProductCard
            v-for="(plan, index) in resellerPlans"
            :key="plan.id"
            :to="`/product/${plan.id}`"
            :name="plan.name"
            :description="plan.description"
            category="Reseller access"
            :features="Array.isArray(plan.features) ? plan.features : []"
            :price="Number(plan.price || 0)"
            :duration="plan.duration"
            :thumbnail="plan.thumbnail_url || plan.images?.[0]"
            :stock-status="plan.stock_status || 'active'"
            :featured="index === 0"
          />
        </div>

        <div v-else class="plan-empty">
          <span>AG—RESELLER</span>
          <h3>Plans are confirmed directly.</h3>
          <p>Message the team for current entry requirements and pricing.</p>
          <a :href="contactLink" target="_blank" rel="noopener noreferrer">
            Start the conversation
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section class="reseller-steps" aria-labelledby="steps-title">
        <div class="steps-copy">
          <span class="section-label">How it starts</span>
          <h2 id="steps-title">Three useful steps. No theatre.</h2>
        </div>
        <ol>
          <li v-for="step in steps" :key="step.number">
            <span>{{ step.number }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="calculator-section" aria-labelledby="calculator-title">
        <header>
          <span class="section-label">Planning tool</span>
          <h2 id="calculator-title">Explore a sales scenario.</h2>
          <p>The calculator is an estimate, not a quote. Confirm current reseller terms directly.</p>
        </header>
        <ResellerCalculator />
      </section>

      <section class="reseller-contact">
        <span>Ready to discuss the program?</span>
        <h2>Tell us what you plan to sell.</h2>
        <a :href="contactLink" target="_blank" rel="noopener noreferrer">
          Contact on WhatsApp
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  </div>
</template>

<style scoped>
.reseller-page {
  background: var(--black);
}

.reseller-main {
  width: min(var(--shell), calc(100% - 3rem));
  margin: 0 auto;
  padding: clamp(5rem, 8vw, 8rem) 0;
}

.reseller-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 460px);
  align-items: end;
  gap: clamp(3rem, 8vw, 8rem);
  padding-bottom: clamp(5rem, 8vw, 8rem);
}

.reseller-intro h2,
.steps-copy h2,
.calculator-section header h2,
.reseller-contact h2 {
  margin: 1rem 0 0;
  font-size: clamp(3.8rem, 7vw, 7.2rem);
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.reseller-intro > p,
.calculator-section header p {
  margin: 0;
  color: var(--gray-lt);
  font-size: 0.88rem;
  line-height: 1.75;
}

.section-rail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line-strong);
  color: var(--gray);
  font-family: var(--font-mono);
  font-size: 0.49rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-rail span {
  color: var(--red-bright);
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

.plan-skeleton {
  min-height: 460px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #101012;
}

.plan-empty {
  padding: clamp(3rem, 7vw, 6rem);
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 45, 45, 0.08), transparent 38%),
    #101012;
  text-align: center;
}

.plan-empty > span {
  color: var(--red-bright);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.plan-empty h3 {
  margin: 1rem 0 0;
  font-size: clamp(2rem, 4vw, 4rem);
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.plan-empty p {
  margin: 0.8rem 0 0;
  color: var(--gray);
}

.plan-empty a {
  display: inline-flex;
  gap: 0.6rem;
  margin-top: 1.5rem;
  color: var(--white);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.plan-empty a span {
  color: var(--red-bright);
}

.reseller-steps,
.calculator-section {
  display: grid;
  grid-template-columns: minmax(280px, 0.65fr) minmax(0, 1fr);
  gap: clamp(3rem, 8vw, 8rem);
  padding: clamp(6rem, 10vw, 10rem) 0;
  border-top: 1px solid var(--line);
}

.reseller-steps ol {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-strong);
  list-style: none;
}

.reseller-steps li {
  display: grid;
  grid-template-columns: 2.8rem 1fr;
  gap: 1rem;
  padding: 1.7rem 0;
  border-bottom: 1px solid var(--line);
}

.reseller-steps li > span {
  padding-top: 0.2rem;
  color: var(--red-bright);
  font-family: var(--font-mono);
  font-size: 0.49rem;
  font-weight: 600;
}

.reseller-steps h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.reseller-steps p {
  margin: 0.55rem 0 0;
  color: var(--gray);
  font-size: 0.8rem;
  line-height: 1.65;
}

.calculator-section {
  align-items: start;
}

.calculator-section header {
  position: sticky;
  top: 8rem;
}

.calculator-section header p {
  margin-top: 1.2rem;
}

.reseller-contact {
  overflow: hidden;
  padding: clamp(4rem, 8vw, 7rem);
  border: 1px solid var(--line);
  border-radius: 28px;
  color: var(--white);
  background:
    radial-gradient(circle at 80% 50%, rgba(255, 80, 70, 0.18), transparent 30%),
    linear-gradient(120deg, #560710, #a40c19);
}

.reseller-contact > span {
  color: rgba(255, 255, 255, 0.62);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.reseller-contact h2 {
  max-width: 850px;
}

.reseller-contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2rem;
  padding: 0.9rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 999px;
  color: #171312;
  background: var(--white);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .reseller-intro,
  .reseller-steps,
  .calculator-section {
    grid-template-columns: 1fr;
  }

  .plan-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .calculator-section header {
    position: static;
  }
}

@media (max-width: 620px) {
  .reseller-main {
    width: min(100% - 2rem, 1280px);
  }

  .plan-grid {
    grid-template-columns: 1fr;
  }

  .reseller-contact {
    padding: 3rem 1.4rem;
  }
}
</style>
