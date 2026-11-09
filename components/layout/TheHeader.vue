<script setup>
const { openCart } = useModals()
const { cartTotal } = useCart()
const mobileMenu = ref(false)
const scrolled = ref(false)
const route = useRoute()

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 50 })
})

// Genera los links dinámicamente según la ruta actual
const navItems = computed(() => {
  const isHome = route.path === '/'
  const prefix = isHome ? '#' : '/#'
  
  return [
    { id: 'inicio', label: 'Inicio', href: `${prefix}inicio` },
    { id: 'categorias', label: 'Cafés', href: `${prefix}categorias` },
    { id: 'horarios', label: 'Horarios', href: `${prefix}horarios` },
    { id: 'ubicacion', label: 'Ubicación', href: `${prefix}ubicacion` }
  ]
})
</script>

<template>
  <nav :class="['fixed top-0 w-full z-40 transition-all duration-500 bg-white', scrolled ? 'shadow-md' : '']" :style="{ top: scrolled ? '0' : '36px' }">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <NuxtImg src="/logo.png" alt="Crescendo Roast" class="h-20 w-auto hover:rotate-[-8deg] hover:scale-105 transition-transform duration-500" />
      </NuxtLink>
      
      <div class="hidden lg:flex items-center gap-10">
        <a 
          v-for="item in navItems" 
          :key="item.id" 
          :href="item.href"
          class="text-sm font-medium text-black hover:text-forest-700 transition-colors relative group"
        >
          {{ item.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-forest-700 group-hover:w-full transition-all duration-500"></span>
        </a>
      </div>
      
      <div class="flex items-center gap-3">
        <button @click="openCart" class="relative bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium inline-flex items-center gap-2 hover:bg-forest-800 transition-colors">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span class="hidden sm:inline">Pedido</span>
          <span v-if="cartTotal > 0" class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ember-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center font-mono">
            {{ cartTotal }}
          </span>
        </button>
        <button @click="mobileMenu = !mobileMenu" class="lg:hidden text-black text-xl w-10 h-10 flex items-center justify-center">
          <i :class="mobileMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
        </button>
      </div>
    </div>
    
    <div v-if="mobileMenu" class="lg:hidden bg-white border-t border-black/5 shadow-lg">
      <div class="px-6 py-6 space-y-4">
        <a 
          v-for="item in navItems" 
          :key="item.id" 
          :href="item.href" 
          @click="mobileMenu = false"
          class="block text-black font-medium py-2 text-lg"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>