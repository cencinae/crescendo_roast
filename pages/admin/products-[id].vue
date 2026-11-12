<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth, authToken } = useAdminAuth()
checkAuth()

const route = useRoute()
const productId = parseInt(route.params.id)

const saving = ref(false)
const loading = ref(true)
const form = ref(null)

const loadProduct = async () => {
  loading.value = true
  try {
    const products = await $fetch('/api/products.json')
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      alert('Producto no encontrado')
      navigateTo('/admin/products')
      return
    }
    
    form.value = JSON.parse(JSON.stringify(product))
  } catch (error) {
    alert('Error al cargar el producto')
  }
  loading.value = false
}

const updatePriceNum = (format) => {
  format.priceNum = parseInt(format.price.replace(/[^0-9]/g, '')) || 0
}

const addFormat = () => {
  form.value.formats.push({ weight: '', price: '', priceNum: 0, available: true })
}

const removeFormat = (index) => {
  form.value.formats.splice(index, 1)
}

const addNote = () => {
  form.value.tastingNotesDetailed.push({ label: '', icon: '' })
}

const removeNote = (index) => {
  form.value.tastingNotesDetailed.splice(index, 1)
}

const saveProduct = async () => {
  if (!form.value.name.trim()) {
    alert('El nombre es obligatorio')
    return
  }
  
  saving.value = true
  
  try {
    await $fetch('/api/admin/products', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: form.value
    })
    
    alert('✓ Producto actualizado')
    navigateTo('/admin/products')
  } catch (error) {
    alert('Error al actualizar: ' + (error.message || 'Desconocido'))
  } finally {
    saving.value = false
  }
}

onMounted(loadProduct)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-4xl text-black">Editar producto</h1>
        <p class="text-black/60 mt-2">Modifica la información del café</p>
      </div>
      <NuxtLink to="/admin/products" class="text-sm text-black/60 hover:text-black inline-flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </NuxtLink>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl p-12 border border-black/5 text-center">
      <i class="fa-solid fa-spinner fa-spin text-3xl text-forest-700"></i>
      <p class="text-black/60 mt-4">Cargando producto...</p>
    </div>
    
    <!-- Formulario -->
    <form v-else-if="form" @submit.prevent="saveProduct" class="space-y-6">
      <!-- Información básica -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-mug-hot text-forest-700"></i> Información básica
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Nombre <span class="text-red-500">*</span></label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Slug</label>
            <input v-model="form.slug" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm font-mono focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Origen</label>
            <input v-model="form.origin" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Categoría</label>
            <select v-model="form.category" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700">
              <option value="normal">Café Tradicional</option>
              <option value="intermedio">Café Especial</option>
              <option value="premium">Café Exótico</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Puntaje SCA</label>
            <input v-model.number="form.score" type="number" min="80" max="100" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" />
          </div>

          <div class="flex items-center gap-2 pt-6">
            <input v-model="form.new" type="checkbox" id="isNew" class="w-4 h-4 rounded" />
            <label for="isNew" class="text-sm text-black/70">Marcar como nuevo</label>
          </div>
        </div>
      </div>
          
          <!-- 🆕 Selector de Estado -->
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-black/70 mb-2">Estado del producto</label>
            <div class="grid grid-cols-2 gap-3">
              <label 
                :class="[
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  form.status === 'borrador' 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-black/10 bg-white hover:border-black/20'
                ]"
              >
                <input v-model="form.status" type="radio" value="borrador" class="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-file-pen text-amber-600"></i>
                  <div>
                    <div class="text-sm font-semibold text-black">Borrador</div>
                    <div class="text-xs text-black/50">No visible en el sitio</div>
                  </div>
                </div>
              </label>
              
              <label 
                :class="[
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  form.status === 'publicado' 
                    ? 'border-forest-700 bg-forest-50' 
                    : 'border-black/10 bg-white hover:border-black/20'
                ]"
              >
                <input v-model="form.status" type="radio" value="publicado" class="w-4 h-4 text-forest-700 focus:ring-forest-700" />
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-circle-check text-forest-700"></i>
                  <div>
                    <div class="text-sm font-semibold text-black">Publicado</div>
                    <div class="text-xs text-black/50">Visible en el sitio web</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
               
      <!-- Imagen -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-image text-forest-700"></i> Imagen
        </h2>
        <AdminImageUpload v-model="form.image" />
      </div>
      
      <!-- Origen y proceso -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-location-dot text-forest-700"></i> Origen y proceso
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Variedad</label>
            <input v-model="form.variety" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Variedad (corto)</label>
            <input v-model="form.varietyShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Región</label>
            <input v-model="form.region" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Región (corto)</label>
            <input v-model="form.regionShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Proceso</label>
            <input 
              v-model="form.process" 
              type="text" 
              class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" 
              placeholder="Ej: Lavado, Natural, Honey, Anaeróbico..." 
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Altitud</label>
            <input v-model="form.altitude" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Altitud (corto)</label>
            <input v-model="form.altitudeShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Fecha de tueste</label>
            <input v-model="form.roastDate" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-black/70 mb-2">Detalle del origen</label>
            <textarea v-model="form.originDetail" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm resize-none"></textarea>
          </div>
        </div>
      </div>
      
      <!-- Perfil sensorial -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-wine-glass text-forest-700"></i> Perfil sensorial
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Notas de cata (resumen)</label>
            <input v-model="form.tastingNotes" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Perfil completo</label>
            <textarea v-model="form.fullTastingProfile" rows="3" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm resize-none"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Cuerpo y acidez</label>
            <textarea v-model="form.bodyAcidity" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm resize-none"></textarea>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-medium text-black/70">Notas detalladas</label>
              <button type="button" @click="addNote" class="text-xs text-forest-700 hover:text-forest-800 inline-flex items-center gap-1">
                <i class="fa-solid fa-plus"></i> Agregar
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(note, idx) in form.tastingNotesDetailed" :key="idx" class="flex gap-2">
                <input v-model="note.icon" type="text" class="w-16 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm text-center" />
                <input v-model="note.label" type="text" class="flex-1 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" />
                <button type="button" @click="removeNote(idx)" class="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                  <i class="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formatos -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-tags text-forest-700"></i> Formatos y precios
        </h2>
        <div class="space-y-3">
          <div v-for="(format, idx) in form.formats" :key="idx" class="grid grid-cols-12 gap-2 items-end">
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Peso</label>
              <input v-model="format.weight" type="text" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" />
            </div>
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Precio (texto)</label>
              <input v-model="format.price" @input="updatePriceNum(format)" type="text" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" />
            </div>
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Precio (número)</label>
              <input v-model.number="format.priceNum" type="number" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" />
            </div>
            <div class="col-span-2 flex items-center gap-2 pb-1">
              <input v-model="format.available" type="checkbox" :id="'avail-' + idx" class="w-4 h-4" />
              <label :for="'avail-' + idx" class="text-xs text-black/70">Disponible</label>
            </div>
            <div class="col-span-1">
              <button type="button" @click="removeFormat(idx)" class="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </div>
          <button type="button" @click="addFormat" class="text-sm text-forest-700 hover:text-forest-800 inline-flex items-center gap-1 mt-2">
            <i class="fa-solid fa-plus"></i> Agregar formato
          </button>
        </div>
      </div>
      
      <!-- SEO -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-magnifying-glass text-forest-700"></i> SEO
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Título SEO</label>
            <input v-model="form.seo.title" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Descripción SEO</label>
            <textarea v-model="form.seo.description" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm resize-none"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Palabras clave</label>
            <input v-model="form.seo.keywords" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm" />
          </div>
        </div>
      </div>
      
      <!-- Botones -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/admin/products" class="px-6 py-3 rounded-xl bg-black/5 hover:bg-black/10 text-black font-medium transition-colors">
          Cancelar
        </NuxtLink>
        <button type="submit" :disabled="saving" class="px-8 py-3 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-colors disabled:opacity-50 inline-flex items-center gap-2">
          <i v-if="saving" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-check"></i>
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </form>
  </div>
</template>