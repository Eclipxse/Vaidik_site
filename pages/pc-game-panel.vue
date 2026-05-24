<template>
  <div class="page-layout">
    <PageHeader 
      title="PC GAME PANEL" 
      subtitle="Exclusive game mods for premium PC titles. High performance, zero risk." 
    />
    
    <main class="page-content">
      <div class="products-grid">
        <ProductCard
          v-for="i in 3"
          :key="i"
          category="PC Game"
          name="GTA V Premium Mod Menu"
          price="₹999"
          stockStatus="in-stock"
          features="Recovery, Trolling, Protections"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-layout {
  min-height: 100vh;
}
.page-content {
  padding: 6rem 4vw;
  max-width: 1800px;
  margin: 0 auto;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
</style>
