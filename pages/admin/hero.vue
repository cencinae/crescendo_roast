<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth, authToken } = useAdminAuth()
checkAuth()

const loading = ref(true)
const saving = ref(false)
const hero = ref(null)

const loadHero = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/admin/hero', {
      headers: { Authorization: `Bearer ${authToken.value}` }
    })
    hero.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    alert('Error al cargar el hero')
  }
  loading.value = false
}

const saveHero = async () => {
  saving.value = true
  try {
    await $fetch('/api/admin/hero', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: hero.value
    })
    alert('✓ Hero actualizado correctamente')
  } catch (error) {
    alert('Error al guardar: ' + (error.message || 'Desconocido'))
  } finally {
    saving.value = false
  }
}

onMounted(loadHero)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-4xl text-black">Hero de Inicio</h1>
        <p class="text-black/60 mt-2">Personaliza la sección principal de tu sitio</p>
      </div>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-12 border border-black/5 text-center">
      <i class="fa-solid fa-spinner fa-spin text-3xl text-forest-700"></i>
      <p class="text-black/60 mt-4">Cargando...</p>
    </div>

    <form v-else-if="hero" @submit.prevent="saveHero" class="space-y-6">
      
      <!-- Descripción principal -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-align-left text-forest-700"></i> Descripción principal
        </h2>
        <label class="block text-xs font-medium text-black/70 mb-2">
          Texto descriptivo (puedes usar HTML como <code class="bg-black/5 px-1 rounded">&lt;strong&gt;</code>)
        </label>
        <textarea 
          v-model="hero.description" 
          rows="4" 
          class="w-full px-4 py-3 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700 resize-none font-mono"
          placeholder="Granos seleccionados de las mejores fincas..."
        ></textarea>
        <p class="text-xs text-black/50 mt-2">
          💡 Ejemplo: <code class="bg-black/5 px-1 rounded">Granos seleccionados... &lt;strong class="text-black"&gt;Envíos en Talca&lt;/strong&gt;</code>
        </p>
      </div>

      <!-- Imagen principal -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-image text-forest-700"></i> Imagen principal
        </h2>
        <AdminImageUpload v-model="hero.image" />
      </div>

      <!-- Badge "Recién tostado" -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-tag text-forest-700"></i> Badge "Recién tostado"
        </h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Etiqueta</label>
            <input 
              v-model="hero.badge.label" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="Recién tostado" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">País</label>
            <input 
              v-model="hero.badge.country" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="Bolivia" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Productor</label>
            <input 
              v-model="hero.badge.producer" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="Ronald Chambi" 
            />
          </div>
        </div>
      </div>

      <!-- Puntaje SCA -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-award text-forest-700"></i> Puntaje SCA
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Valor</label>
            <input 
              v-model.number="hero.score.value" 
              type="number" 
              min="0" 
              max="100"
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="86" 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Sufijo (texto pequeño)</label>
            <input 
              v-model="hero.score.suffix" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="SCA" 
            />
          </div>
        </div>
      </div>

      <!-- Vista previa -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-eye text-forest-700"></i> Vista previa
        </h2>
        <div class="bg-forest-50 rounded-xl p-6 flex items-center gap-6">
          <div class="w-24 h-24 rounded-full bg-ember-500 text-white flex flex-col items-center justify-center shrink-0">
            <div class="font-display text-2xl leading-none">{{ hero.score.value }}</div>
            <div class="font-mono text-[8px] uppercase tracking-wider mt-1">{{ hero.score.suffix }}</div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 rounded-full bg-forest-500"></div>
              <span class="font-mono text-[10px] text-forest-700 uppercase font-semibold">{{ hero.badge.label }}</span>
            </div>
            <div class="font-display text-xl text-black">{{ hero.badge.country }}</div>
            <div class="text-sm text-black/60">{{ hero.badge.producer }}</div>
          </div>
        </div>
      </div>

      <!-- Botón guardar -->
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