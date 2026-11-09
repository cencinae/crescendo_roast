<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth } = useAdminAuth()
checkAuth()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <!-- Ícono de construcción -->
    <div class="w-24 h-24 bg-forest-50 rounded-full flex items-center justify-center mb-6">
      <i class="fa-solid fa-hammer text-4xl text-forest-700"></i>
    </div>
    
    <!-- Mensaje principal -->
    <h2 class="font-display text-3xl text-black mb-2">Vista en desarrollo</h2>
    <p class="text-black/60 max-w-md mb-2">
      El módulo visual de gestión de pedidos estará disponible próximamente.
    </p>
    <p class="text-black/60 max-w-md text-sm">
      Por ahora, todos los pedidos se guardan automáticamente en el archivo 
      <code class="bg-black/5 px-1.5 py-0.5 rounded text-xs font-mono text-forest-700">server/data/orders.json</code>
    </p>
    
    <!-- Botón de regreso -->
    <NuxtLink to="/admin" class="mt-8 text-sm text-forest-700 hover:text-forest-800 font-medium inline-flex items-center gap-2 transition-colors">
      <i class="fa-solid fa-arrow-left"></i> Volver al dashboard
    </NuxtLink>
  </div>
</template>