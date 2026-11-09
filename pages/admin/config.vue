<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth, authToken } = useAdminAuth()
checkAuth()

const loading = ref(true)
const saving = ref(false)
const config = ref(null)

const loadConfig = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/admin/config', {
      headers: { Authorization: `Bearer ${authToken.value}` }
    })
    // Clonamos para evitar mutaciones reactivas prematuras
    config.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    alert('Error al cargar la configuración')
  }
  loading.value = false
}

const saveConfig = async () => {
  saving.value = true
  try {
    await $fetch('/api/admin/config', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: config.value
    })
    alert('✓ Configuración guardada exitosamente')
  } catch (error) {
    alert('Error al guardar: ' + (error.message || 'Desconocido'))
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-4xl text-black">Configuración</h1>
        <p class="text-black/60 mt-2">Gestiona los datos generales de tu tienda</p>
      </div>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-12 border border-black/5 text-center">
      <i class="fa-solid fa-spinner fa-spin text-3xl text-forest-700"></i>
      <p class="text-black/60 mt-4">Cargando configuración...</p>
    </div>

    <form v-else-if="config" @submit.prevent="saveConfig" class="space-y-6">

      <!-- 1. Configuración General -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-globe text-forest-700"></i> Configuración General
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">URL del Sitio Web</label>
            <input 
              v-model="config.siteUrl" 
              type="url" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="https://crescendoroast.cl" 
            />
            <p class="text-xs text-black/50 mt-1">Se usa para generar links de compartir y SEO.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Número de WhatsApp (con código de país)</label>
            <input 
              v-model="config.whatsapp.number" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="56912345678" 
            />
            <p class="text-xs text-black/50 mt-1">Ej: 56931893121 (sin el +)</p>
          </div>
        </div>
      </div>
      
      <!-- 1. WhatsApp -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Mensaje por defecto</label>
            <input v-model="config.whatsapp.defaultMessage" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-black/70 mb-2">Mensaje para empresas (B2B)</label>
            <input v-model="config.whatsapp.b2bMessage" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
        </div>
      </div>

      <!-- 2. Envíos -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-truck text-forest-700"></i> Envíos
        </h2>
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Costo de envío ($)</label>
            <input v-model.number="config.shipping.cost" type="number" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Envío gratis sobre ($)</label>
            <input v-model.number="config.shipping.freeThreshold" type="number" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Ciudad</label>
            <input v-model="config.shipping.city" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Región</label>
            <input v-model="config.shipping.region" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
        </div>
      </div>

      <!-- 3. Cuenta Bancaria -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-building-columns text-forest-700"></i> Cuenta Bancaria (Transferencias)
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Banco</label>
            <input v-model="config.bankAccount.bank" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Tipo de Cuenta</label>
            <input v-model="config.bankAccount.accountType" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">N° de Cuenta</label>
            <input v-model="config.bankAccount.accountNumber" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm font-mono" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">RUT</label>
            <input v-model="config.bankAccount.rut" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm font-mono" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-black/70 mb-2">Titular</label>
            <input v-model="config.bankAccount.holder" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
        </div>
      </div>

      <!-- 4. Métodos de Pago -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-credit-card text-forest-700"></i> Métodos de Pago Disponibles
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(method, idx) in config.paymentMethods" :key="method.id" class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-black/5">
            <input v-model="method.available" type="checkbox" :id="'pay-' + idx" class="w-5 h-5 rounded text-forest-700 focus:ring-forest-700" />
            <label :for="'pay-' + idx" class="flex items-center gap-2 cursor-pointer select-none">
              <i :class="method.icon + ' text-forest-700'"></i>
              <span class="text-sm font-medium text-black">{{ method.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 5. Redes Sociales -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-share-nodes text-forest-700"></i> Redes Sociales
        </h2>
        <div class="space-y-4">
          <div v-for="(social, idx) in config.socials" :key="idx" class="grid md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-3 flex items-center gap-2">
              <i :class="social.icon + ' text-xl text-black/40 w-6 text-center'"></i>
              <span class="text-sm font-medium text-black">{{ social.name }}</span>
            </div>
            <div class="md:col-span-9">
              <input v-model="social.url" type="url" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de Guardar -->
      <div class="flex items-center justify-end gap-3 pt-4">
        <button type="submit" :disabled="saving" class="px-8 py-3 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-colors disabled:opacity-50 inline-flex items-center gap-2">
          <i v-if="saving" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-check"></i>
          {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>

    </form>
  </div>
</template>