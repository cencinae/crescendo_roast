<script setup>
const { isAdmin, logout } = useAdminAuth()

const menuItems = [
  { label: 'Dashboard', icon: 'fa-solid fa-chart-line', to: '/admin' },
  { label: 'Hero', icon: 'fa-solid fa-image', to: '/admin/hero' },          // 🆕
  { label: 'Productos', icon: 'fa-solid fa-mug-hot', to: '/admin/products' },
  { label: 'Configuración', icon: 'fa-solid fa-gear', to: '/admin/config' },
  { label: 'Pedidos', icon: 'fa-solid fa-receipt', to: '/admin/orders' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 bottom-0 w-64 bg-forest-900 text-white flex flex-col">
      <!-- Logo -->
      <div class="p-6 border-b border-white/10">
        <div class="flex items-center gap-3">
          <NuxtImg src="/logo.png" alt="Crescendo Roast" class="h-12 w-auto" />
          <div>
            <div class="font-display text-lg">Admin</div>
            <div class="text-xs text-white/60">Panel de gestión</div>
          </div>
        </div>
      </div>
      
      <!-- Menú -->
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors"
          active-class="bg-ember-500 text-white"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
      
      <!-- Footer -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center gap-3 px-4 py-2 mb-2">
          <div class="w-8 h-8 rounded-full bg-ember-500 flex items-center justify-center">
            <i class="fa-solid fa-user text-sm"></i>
          </div>
          <div class="text-sm">
            <div class="font-medium">Administrador</div>
            <div class="text-xs text-white/60">Online</div>
          </div>
        </div>
        <div class="flex gap-2">
          <NuxtLink to="/" class="flex-1 text-center px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs transition-colors">
            <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> Ver sitio
          </NuxtLink>
          <button @click="logout" class="flex-1 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs transition-colors">
            <i class="fa-solid fa-right-from-bracket mr-1"></i> Salir
          </button>
        </div>
      </div>
    </aside>
    
    <!-- Contenido principal -->
    <main class="ml-64 p-8">
      <slot />
    </main>
  </div>
</template>