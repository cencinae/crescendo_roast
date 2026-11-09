<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth } = useAdminAuth()
checkAuth()

const stats = ref({
  products: 0,
  orders: 0,
  totalRevenue: 0
})

onMounted(async () => {
  try {
    const [products, orders] = await Promise.all([
      $fetch('/api/products.json'),
      $fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${useState('adminToken').value}` }
      }).catch(() => [])
    ])
    
    stats.value.products = products?.length || 0
    stats.value.orders = orders?.length || 0
    stats.value.totalRevenue = orders?.reduce((sum, o) => sum + (o.totals?.total || 0), 0) || 0
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
  }
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-4xl text-black">Dashboard</h1>
      <p class="text-black/60 mt-2">Resumen general de tu tienda</p>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center">
            <i class="fa-solid fa-mug-hot text-forest-700 text-xl"></i>
          </div>
          <div>
            <div class="text-sm text-black/60">Productos</div>
            <div class="font-display text-3xl text-black">{{ stats.products }}</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-ember-400/10 flex items-center justify-center">
            <i class="fa-solid fa-receipt text-ember-600 text-xl"></i>
          </div>
          <div>
            <div class="text-sm text-black/60">Pedidos</div>
            <div class="font-display text-3xl text-black">{{ stats.orders }}</div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-coffee-100 flex items-center justify-center">
            <i class="fa-solid fa-coins text-coffee-700 text-xl"></i>
          </div>
          <div>
            <div class="text-sm text-black/60">Ventas totales</div>
            <div class="font-display text-3xl text-black">${{ stats.totalRevenue.toLocaleString('es-CL') }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Accesos rápidos -->
    <div class="bg-white rounded-2xl p-6 border border-black/5">
      <h2 class="font-display text-xl text-black mb-4">Accesos rápidos</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink to="/admin/products" class="p-4 rounded-xl bg-forest-50 hover:bg-forest-100 transition-colors text-center">
          <i class="fa-solid fa-plus text-forest-700 text-2xl mb-2"></i>
          <div class="text-sm font-medium text-black">Nuevo producto</div>
        </NuxtLink>
        <NuxtLink to="/admin/products" class="p-4 rounded-xl bg-ember-400/10 hover:bg-ember-400/20 transition-colors text-center">
          <i class="fa-solid fa-list text-ember-600 text-2xl mb-2"></i>
          <div class="text-sm font-medium text-black">Ver productos</div>
        </NuxtLink>
        <NuxtLink to="/admin/config" class="p-4 rounded-xl bg-coffee-100 hover:bg-coffee-200 transition-colors text-center">
          <i class="fa-solid fa-gear text-coffee-700 text-2xl mb-2"></i>
          <div class="text-sm font-medium text-black">Configuración</div>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="p-4 rounded-xl bg-black hover:bg-black/80 transition-colors text-center">
          <i class="fa-solid fa-arrow-up-right-from-square text-white text-2xl mb-2"></i>
          <div class="text-sm font-medium text-white">Ver sitio</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>