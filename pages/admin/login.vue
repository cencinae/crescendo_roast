<script setup>
definePageMeta({ layout: false })

const { login } = useAdminAuth()

const form = ref({ username: '', password: '' })
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  const result = await login(form.value.username, form.value.password)
  
  if (result.success) {
    navigateTo('/admin')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-forest-900 to-forest-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtImg src="/logo.png" alt="Crescendo Roast" class="h-24 w-auto mx-auto mb-4" />
        <h1 class="font-display text-3xl text-white">Panel Administrativo</h1>
        <p class="text-white/60 text-sm mt-2">Ingresa tus credenciales</p>
      </div>
      
      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="bg-white rounded-2xl p-8 shadow-2xl">
        <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
          <i class="fa-solid fa-circle-exclamation"></i>
          {{ error }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Usuario</label>
            <div class="relative">
              <i class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-black/40"></i>
              <input 
                v-model="form.username"
                type="text"
                required
                class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700"
                placeholder="admin"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Contraseña</label>
            <div class="relative">
              <i class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-black/40"></i>
              <input 
                v-model="form.password"
                type="password"
                required
                class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="w-full mt-6 bg-forest-900 text-white py-3 rounded-xl font-medium hover:bg-forest-800 transition-colors disabled:opacity-50"
        >
          <span v-if="loading">Ingresando...</span>
          <span v-else>Ingresar al panel</span>
        </button>
        
        <div class="mt-6 pt-6 border-t border-black/5 text-center">
          <NuxtLink to="/" class="text-xs text-black/60 hover:text-black">
            ← Volver al sitio web
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>