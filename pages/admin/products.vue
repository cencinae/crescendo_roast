<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth, authToken } = useAdminAuth()
checkAuth()

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const filterCategory = ref('all')

const loadProducts = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/products.json')
    products.value = data || []
  } catch (error) {
    console.error('Error:', error)
  }
  loading.value = false
}

const getCategoryName = (catId) => {
  const names = { 
    normal: 'Café Tradicional', 
    intermedio: 'Café Especial', 
    premium: 'Café Exótico' 
  }
  return names[catId] || catId
}

const deleteProduct = async (id) => {
  if (!confirm('¿Eliminar este producto?')) return
  
  try {
    await $fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: { id }
    })
    await loadProducts()
  } catch (error) {
    alert('Error al eliminar')
  }
}

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       p.origin.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = filterCategory.value === 'all' || p.category === filterCategory.value
    return matchSearch && matchCategory
  })
})

onMounted(loadProducts)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-4xl text-black">Productos</h1>
        <p class="text-black/60 mt-2">Gestiona tu catálogo de cafés</p>
      </div>
      <NuxtLink to="/admin/products-new" class="bg-forest-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-forest-800 transition-colors inline-flex items-center gap-2">
        <i class="fa-solid fa-plus"></i> Nuevo producto
      </NuxtLink>
    </div>
    
    <!-- Filtros -->
    <div class="bg-white rounded-2xl p-4 border border-black/5 mb-6 flex flex-col md:flex-row gap-3">
      <div class="flex-1 relative">
        <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-black/40"></i>
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nombre u origen..."
          class="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700"
        />
      </div>
      <select v-model="filterCategory" class="px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700">
        <option value="all">Todas las categorías</option>
        <option value="normal">Café Tradicional</option>
        <option value="intermedio">Café Especial</option>
        <option value="premium">Café Exótico</option>
      </select>
    </div>
    
    <!-- Lista -->
    <div class="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div v-if="loading" class="p-12 text-center">
        <i class="fa-solid fa-spinner fa-spin text-3xl text-forest-700"></i>
      </div>
      
      <div v-else-if="filteredProducts.length === 0" class="p-12 text-center">
        <i class="fa-solid fa-mug-empty text-5xl text-black/20 mb-4"></i>
        <p class="text-black/60">No se encontraron productos</p>
      </div>
      
      <table v-else class="w-full">
        <thead class="bg-gray-50 border-b border-black/5">
          <tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-black/60 uppercase">Producto</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-black/60 uppercase">Categoría</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-black/60 uppercase">Precio</th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-black/60 uppercase">SCA</th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-black/60 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-black/5">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <NuxtImg :src="product.image" class="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div class="font-medium text-black">{{ product.name }}</div>
                  <div class="text-xs text-black/60">{{ product.origin }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-forest-50 text-forest-700">
                {{ getCategoryName(product.category) }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-black">{{ product.formats[0]?.price }}</td>
            <td class="px-6 py-4 text-sm text-black font-mono">{{ product.score }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink :to="`/admin/products-${product.id}`" class="w-9 h-9 rounded-lg bg-forest-50 hover:bg-forest-100 flex items-center justify-center text-forest-700 transition-colors">
                  <i class="fa-solid fa-pen text-sm"></i>
                </NuxtLink>
                <button @click="deleteProduct(product.id)" class="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors">
                  <i class="fa-solid fa-trash text-sm"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>