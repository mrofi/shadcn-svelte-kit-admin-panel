<script lang="ts">
  import Background from "./background.svelte";
</script>

<div class="min-h-screen">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold">Roket</div>
        <div class="flex items-center space-x-6">
          <div class="space-x-6">
            <a href="#home" class="hover:text-primary">{('nav.home')}</a>
            <a href="#about" class="hover:text-primary">{('nav.about')}</a>
            <a href="#services" class="hover:text-primary">{('nav.services')}</a>
            <a href="#contact" class="hover:text-primary">{('nav.contact')}</a>
          </div>
          <button 
            class="ml-4 px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
            on:click={() => alert('hi')}
          >
            {'en' === 'en' ? 'ID' : 'EN'}
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="pt-32 pb-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          {('hero.title')}
        </h1>
        <p class="text-xl mb-8 text-muted-foreground">
          {('hero.subtitle')}
        </p>
        <button class="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
          {('hero.cta')}
        </button>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{('services.title')}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each ['webDev', 'mobileDev', 'uiDesign', 'consulting'] as service}
          <div class="bg-card p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 class="text-xl font-semibold mb-4">{(`services.${service}`)}</h3>
          </div>
        {/each}
        }
      </div>
    </div>
  </section>
</div>