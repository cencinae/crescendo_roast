<script setup>
const { hero, loadHero } = useHero()

const stats = [
  { value: '86+', label: 'Puntaje SCA', suffix: '' },
  { value: '12', label: 'Orígenes', suffix: '' },
  { value: 'Talca', label: 'Envíos locales', suffix: '' }
]

onMounted(() => {
  loadHero()
})
</script>

<template>
  <section id="inicio" class="min-h-screen pt-32 pb-20 relative overflow-hidden">
    <div class="absolute top-40 right-10 w-32 h-32 dot-pattern opacity-40"></div>
    <div class="absolute bottom-20 left-10 w-24 h-24 dot-pattern opacity-30"></div>
    
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="grid lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 reveal">
          
          <h1 class="sr-only">Crescendo Roast - Café de Especialidad Tostado en Talca</h1>

          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-[1px] bg-black"></div>
            <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Specialty Coffee · Talca, Chile</span>
          </div>
          
          <NuxtImg src="/letras.jpeg" alt="Crescendo Roast" class="w-full max-w-md lg:max-w-md mb-8" />
          
          <!-- 🆕 Descripción dinámica -->
          <p 
            v-if="hero"
            class="text-lg text-black/70 max-w-2xl mb-10 leading-relaxed font-light"
            v-html="hero.description"
          ></p>
          
          <div class="flex flex-wrap gap-4">
            <a href="#categorias" class="bg-black text-white px-8 py-4 rounded-full text-sm font-medium inline-flex items-center gap-3 hover:bg-forest-800 transition-colors">
              <span>Ver cafés</span> <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#ubicacion" class="border border-black/20 text-black px-8 py-4 rounded-full text-sm font-medium inline-flex items-center gap-3 hover:bg-black hover:text-white transition-all">
              <i class="fa-solid fa-location-dot"></i> <span>Visítanos</span>
            </a>
          </div>
          
          <div class="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-black/10">
            <div v-for="stat in stats" :key="stat.label">
              <div class="font-display text-5xl text-black">{{ stat.value }}<span class="text-ember-500">{{ stat.suffix }}</span></div>
              <div class="font-mono text-[10px] text-black/50 uppercase tracking-wider mt-2">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-5 reveal" style="transition-delay: 0.15s">
          <div v-if="hero" class="relative">
            <!-- 🆕 Imagen dinámica -->
            <div class="aspect-[4/5] rounded-[2rem] overflow-hidden img-zoom relative bg-coffee-100">
              <NuxtImg :src="hero.image" alt="Café de especialidad" class="w-full h-full object-cover" width="800" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            <!-- 🆕 Badge dinámico -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-black/5 max-w-[220px]">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 rounded-full bg-forest-500 animate-pulse"></div>
                <span class="font-mono text-[9px] text-forest-700 uppercase tracking-wider font-semibold">
                  {{ hero.badge.label }}
                </span>
              </div>
              <div class="font-display text-lg text-black">{{ hero.badge.country }}</div>
              <div class="text-xs text-black/60 mt-1">{{ hero.badge.producer }}</div>
            </div>
            
            <!-- 🆕 Score dinámico -->
            <div class="absolute -top-4 -right-4 bg-ember-500 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-2xl">
              <div class="font-display text-3xl leading-none">{{ hero.score.value }}</div>
              <div class="font-mono text-[9px] uppercase tracking-wider mt-1">{{ hero.score.suffix }}</div>
            </div>
          </div>
          
          <!-- Placeholder mientras carga -->
          <div v-else class="aspect-[4/5] rounded-[2rem] bg-coffee-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
</template>