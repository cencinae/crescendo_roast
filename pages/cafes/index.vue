<!-- pages/cafes/index.vue -->
<script setup>
import { useProducts } from '~/composables/useProducts'

const { products, loadProducts } = useProducts()
const activeCategory = ref('all')
const searchQuery = ref('')

useHead({
  title: 'Todos los Cafés de Especialidad - Crescendo Roast Talca',
  meta: [
    { name: 'description', content: 'Explora nuestra colección completa de cafés de especialidad. Desde blends accesibles hasta micro-lotes exclusivos. Envíos en Talca y regiones.' }
  ]
})

onMounted(() => {
  loadProducts()
})

const categories = [
  { id: 'all', name: 'Todos', icon: 'fa-solid fa-mug-saucer' },
  { id: 'normal', name: 'Café Tradicional', icon: 'fa-solid fa-mug-hot' },
  { id: 'intermedio', name: 'Café Especial', icon: 'fa-solid fa-seedling' },
  { id: 'premium', name: 'Café Exótico', icon: 'fa-solid fa-crown' }
]

const filteredProducts = computed(() => {
  let filtered = products.value
  
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.origin.toLowerCase().includes(query) ||
      p.tastingNotes.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const getCategoryTag = (catId) => {
  const tags = { normal: 'Daily', intermedio: 'Origin', premium: 'Micro-lot' }
  return tags[catId] || 'Café'
}
</script>

<template>
  <div class="min-h-screen bg-white pt-32 pb-20">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Colección Completa</span>
        </div>
        <h1 class="font-display text-6xl md:text-8xl font-medium text-black leading-[0.9] tracking-tight mb-6">
          Todos nuestros<br>
          <span class="italic text-forest-800">cafés</span><span class="text-ember-500">.</span>
        </h1>
        <p class="text-lg text-black/70 max-w-2xl">
          Explora nuestra selección completa de cafés de especialidad. Desde blends accesibles hasta micro-lotes exclusivos.
        </p>
      </div>

      <!-- Filtros -->
      <div class="mb-8 space-y-4">
        <!-- Categorías -->
        <div class="flex flex-wrap items-center gap-2 md:gap-3">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'cat-badge-pill inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full border-2 text-sm md:text-base font-medium',
              activeCategory === cat.id ? 'active' : 'border-black/10 bg-white text-black'
            ]"
          >
            <i :class="[cat.icon, 'text-xs md:text-sm', activeCategory === cat.id ? 'text-ember-400' : 'text-forest-700']"></i>
            <span>{{ cat.name }}</span>
          </button>
        </div>

        <!-- Búsqueda -->
        <div class="relative max-w-md">
          <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-black/40"></i>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre, origen o notas..."
            class="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700"
          />
        </div>
      </div>

      <!-- Resultados -->
      <div class="mb-6">
        <p class="font-mono text-xs text-black/50">
          {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados' }}
        </p>
      </div>

      <!-- Grid de productos -->
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <NuxtLink 
          v-for="product in filteredProducts" 
          :key="product.id"
          :to="`/cafes/${product.slug}`"
          class="product-card bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-black/5 hover-tilt group"
        >
          <div class="aspect-[4/5] relative overflow-hidden img-zoom">
            <NuxtImg :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            
            <div class="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1 md:gap-2">
              <span class="bg-black text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider font-mono">
                {{ getCategoryTag(product.category) }}
              </span>
              <div v-if="product.new" class="bg-ember-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider font-mono">
                <i class="fa-solid fa-bolt mr-0.5 md:mr-1"></i>Nuevo
              </div>
            </div>
            
            <div class="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full px-2 py-1 md:px-3 md:py-1.5 shadow-lg">
              <div class="flex items-center gap-0.5 md:gap-1">
                <i class="fa-solid fa-star text-ember-500 text-[9px] md:text-xs"></i>
                <span class="text-[10px] md:text-xs font-bold text-black font-mono">{{ product.score }}</span>
              </div>
            </div>
          </div>
          
          <div class="p-3 md:p-6">
            <div class="flex items-center justify-between mb-1.5 md:mb-3">
              <span class="font-mono text-[9px] md:text-[10px] tracking-[0.15em] text-forest-700 uppercase font-semibold">
                {{ product.origin }}
              </span>
            </div>
            <h3 class="font-display text-base md:text-2xl text-black mb-1 md:mb-2 leading-tight line-clamp-2">
              {{ product.name }}
            </h3>
            <p class="text-xs md:text-sm text-black/60 mb-3 md:mb-5 line-clamp-1 md:line-clamp-2">
              {{ product.tastingNotes }}
            </p>
            
            <div class="flex items-center justify-between pt-2 md:pt-4 border-t border-black/5">
              <div>
                <div class="font-display text-lg md:text-2xl text-black">
                  {{ product.formats[0].price }}
                </div>
                <div class="font-mono text-[8px] md:text-[9px] text-black/50 uppercase tracking-wider">
                  Desde {{ product.formats[0].weight }}
                </div>
              </div>
              <div class="bg-black text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center gap-1 md:gap-2 group-hover:bg-forest-800 transition-colors">
                <span>Ver más</span>
                <i class="fa-solid fa-arrow-right text-[8px] md:text-[10px]"></i>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="text-center py-20">
        <i class="fa-solid fa-mug-empty text-6xl text-black/20 mb-4"></i>
        <p class="text-black/60">No se encontraron productos con esos filtros.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat-badge-pill {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.cat-badge-pill.active {
  background: #0B2418;
  color: #fff;
  border-color: #0B2418;
  box-shadow: 0 4px 14px rgba(11, 36, 24, 0.25);
}
.cat-badge-pill:not(.active):hover {
  border-color: #0B2418;
  transform: translateY(-2px);
}
</style>