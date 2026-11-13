<script setup>
const { activeCategory, filteredProducts, categories, selectFormat } = useProducts()
const { addToCart } = useCart()
const { openProduct } = useModals()

const getCategoryTag = (catId) => {
  const tags = { normal: 'Clásico', intermedio: 'Selección', premium: 'Exclusivo' }
  return tags[catId] || 'Café'
}

const getCurrentPrice = (product) => {
  const format = product.formats.find(f => f.weight === product.selectedFormat)
  return format ? format.price : '$0'
}

// 🆕 Ordenar productos: new: true primero
const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    if (a.new && !b.new) return -1
    if (!a.new && b.new) return 1
    return 0
  })
})

// 🆕 Limitar productos según dispositivo (3 desktop, 4 móvil)
const displayedProducts = computed(() => {
  // En móvil mostrar 4, en desktop mostrar 3
  // Usamos 4 como máximo y ocultamos el 4º en desktop con CSS
  return sortedProducts.value.slice(0, 4)
})
</script>

<template>
  <section id="categorias" class="py-32 bg-white relative">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <!-- Header de la sección -->
      <div class="mb-16 reveal">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Colección 2026</span>
        </div>
        <h2 class="font-display text-6xl md:text-8xl font-medium text-black leading-[0.9] tracking-tight">
          Nuestros<br><span class="italic text-forest-800">cafés</span><span class="text-ember-500">.</span>
        </h2>
      </div>
      
      <!-- Categorías como badges -->
      <div class="flex flex-wrap items-center gap-2 md:gap-3 mb-12 reveal">
        <button v-for="cat in categories" :key="cat.id" 
                @click="activeCategory = cat.id"
                :class="['cat-badge-pill inline-flex items-center gap-2 md:gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-full border-2 text-sm md:text-base font-medium',
                         activeCategory === cat.id ? 'active' : 'border-black/10 bg-white text-black']">
          <i :class="[cat.icon, 'text-xs md:text-sm', activeCategory === cat.id ? 'text-ember-400' : 'text-forest-700']"></i>
          <span>{{ cat.name }}</span>
        </button>
      </div>
      
      <!-- 🆕 Grid de productos con límite -->
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <div 
          v-for="(product, index) in displayedProducts" 
          :key="product.id"
          :class="[
            'product-card bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-black/5 hover-tilt group cursor-pointer',
            index === 3 ? 'md:hidden' : ''
          ]"
          @click="openProduct(product)"
        >
          <div class="aspect-[4/5] relative overflow-hidden img-zoom">
            
            <NuxtImg 
              :src="product.image" 
              :alt="`Café de especialidad ${product.name} de ${product.origin}`" 
              class="w-full h-full object-cover" 
              width="600"
              height="750"
              format="webp" 
            />
            
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
            
            <button 
              @click.stop="openProduct(product)" 
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white hover:bg-black hover:text-white text-black flex items-center justify-center transition-all shadow-lg opacity-0 group-hover:opacity-100"
            >
              <i class="fa-solid fa-arrow-right text-xs md:text-sm"></i>
            </button>
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
            
            <!-- Formato -->
            <div class="mb-2 md:mb-4">
              <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-1.5 md:mb-2">Formato</div>
              
              <!-- Selector móvil -->
              <div class="md:hidden">
                <select 
                  :value="product.selectedFormat" 
                  @change="selectFormat(product.id, $event.target.value)" 
                  @click.stop 
                  class="custom-select w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs text-black focus:outline-none focus:border-forest-700 cursor-pointer font-medium"
                >
                  <option 
                    v-for="fmt in product.formats" 
                    :key="fmt.weight" 
                    :value="fmt.weight"
                    :disabled="fmt.available === false"
                  >
                    {{ fmt.weight }} · {{ fmt.price }}{{ fmt.available === false ? ' (No disponible)' : '' }}
                  </option>
                </select>
              </div>
              
              <!-- Botones desktop -->
              <div class="hidden md:grid md:grid-cols-3 gap-2">
                <button 
                  v-for="fmt in product.formats" 
                  :key="fmt.weight"
                  @click.stop="fmt.available !== false && selectFormat(product.id, fmt.weight)"
                  :disabled="fmt.available === false"
                  :class="[
                    'fmt-btn rounded-xl border px-2 py-2.5 text-center relative',
                    fmt.available === false 
                      ? 'border-black/10 bg-black/5 opacity-60 cursor-not-allowed' 
                      : (product.selectedFormat === fmt.weight ? 'active' : 'border-black/10 bg-white')
                  ]"
                >
                  <div class="text-xs font-semibold" :class="product.selectedFormat === fmt.weight && fmt.available !== false ? 'text-white' : 'text-black'">
                    {{ fmt.weight }}
                  </div>
                  <div 
                    class="text-[10px] font-mono font-medium fmt-price" 
                    :class="product.selectedFormat === fmt.weight && fmt.available !== false ? 'text-ember-400' : 'text-ember-600'"
                  >
                    {{ fmt.price }}
                  </div>
                  <div v-if="fmt.available === false" class="absolute inset-0 flex items-center justify-center">
                    <span class="bg-red-500/90 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full rotate-[-8deg]">
                      No disponible
                    </span>
                  </div>
                </button>
              </div>
            </div>
            
            <!-- Precio y botón añadir -->
            <div class="flex items-center justify-between pt-2 md:pt-4 border-t border-black/5">
              <div>
                <div class="font-display text-lg md:text-2xl text-black">
                  {{ getCurrentPrice(product) }}
                </div>
              </div>
              <button 
                @click.stop="addToCart(product)" 
                class="bg-black text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center gap-1 md:gap-2 hover:bg-forest-800 transition-colors"
              >
                <i class="fa-solid fa-plus text-[8px] md:text-[10px]"></i>
                <span class="hidden sm:inline">Añadir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Botón para ver todos los cafés -->
      <div class="mt-16 text-center reveal">
        <NuxtLink 
          to="/cafes" 
          class="bg-black text-white px-10 py-4 rounded-full text-sm font-medium inline-flex items-center gap-3 hover:bg-forest-800 transition-colors group"
        >
          <span>Ir a todos nuestros cafés</span>
          <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </NuxtLink>
        <p class="mt-4 font-mono text-xs text-black/50">
          Explora nuestra colección completa con filtros avanzados
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fmt-btn { transition: all 0.3s ease; }
.fmt-btn.active { background: #0B2418; color: #fff; border-color: #0B2418; }
.fmt-btn.active .fmt-price { color: #FB923C; }
.fmt-btn:not(.active):hover { border-color: #2F6B4A; }

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