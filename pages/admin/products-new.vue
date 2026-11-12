<script setup>
definePageMeta({ layout: 'admin' })

const { checkAuth, authToken } = useAdminAuth()
checkAuth()

const saving = ref(false)
const form = ref({
  name: '',
  slug: '',
  origin: '',
  category: 'normal',
  variety: '',
  varietyShort: '',
  region: '',
  regionShort: '',
  originDetail: '',
  process: 'Lavado',
  altitude: '',
  altitudeShort: '',
  score: 85,
  reviews: 0,
  new: false,
  status: 'borrador',
  image: '',
  tastingNotes: '',
  fullTastingProfile: '',
  bodyAcidity: '',
  roastDate: '',
  selectedFormat: '250g',
  selectedPresentation: 'En grano',
  formats: [
    { weight: '250g', price: '', priceNum: 0, available: true },
    { weight: '500g', price: '', priceNum: 0, available: true },
    { weight: '1kg', price: '', priceNum: 0, available: true }
  ],
  tastingNotesDetailed: [
    { label: '', icon: '' },
    { label: '', icon: '' },
    { label: '', icon: '' },
    { label: '', icon: '' }
  ],
  seo: {
    title: '',
    description: '',
    keywords: ''
  }
})

// Generar slug automáticamente desde el nombre
watch(() => form.value.name, (newName) => {
  form.value.slug = newName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
})

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

// Actualizar priceNum cuando cambia price
const updatePriceNum = (format) => {
  format.priceNum = parseInt(format.price.replace(/[^0-9]/g, '')) || 0
}

const saveProduct = async () => {
  // Validaciones básicas
  if (!form.value.name.trim()) {
    alert('El nombre es obligatorio')
    return
  }
  if (!form.value.slug.trim()) {
    alert('El slug es obligatorio')
    return
  }
  
  saving.value = true
  
  try {
    await $fetch('/api/admin/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: form.value
    })
    
    alert('✓ Producto creado exitosamente')
    navigateTo('/admin/products')
  } catch (error) {
    alert('Error al crear el producto: ' + (error.message || 'Desconocido'))
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display text-4xl text-black">Nuevo producto</h1>
        <p class="text-black/60 mt-2">Completa la información del café</p>
      </div>
      <NuxtLink to="/admin/products" class="text-sm text-black/60 hover:text-black inline-flex items-center gap-2">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </NuxtLink>
    </div>
    
    <form @submit.prevent="saveProduct" class="space-y-6">
      <!-- Información básica -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-mug-hot text-forest-700"></i> Información básica
        </h2>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Nombre <span class="text-red-500">*</span></label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Colombia Huila" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Slug (URL) <span class="text-red-500">*</span></label>
            <input v-model="form.slug" type="text" required class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm font-mono focus:outline-none focus:border-forest-700" placeholder="colombia-huila" />
            <p class="text-xs text-black/50 mt-1">Se genera automáticamente desde el nombre</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Origen</label>
            <input v-model="form.origin" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Colombia" />
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
            <input v-model="form.variety" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Castillo, Caturra" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Variedad (corto)</label>
            <input v-model="form.varietyShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Castillo" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Región</label>
            <input v-model="form.region" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Huila, Colombia" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Región (corto)</label>
            <input v-model="form.regionShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Huila" />
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
            <input v-model="form.altitude" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: 1700 - 1900 msnm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Altitud (corto)</label>
            <input v-model="form.altitudeShort" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: 1700-1900" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Fecha de tueste</label>
            <input v-model="form.roastDate" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: 15 Oct 2026" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-medium text-black/70 mb-2">Detalle del origen</label>
            <textarea v-model="form.originDetail" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700 resize-none" placeholder="Descripción del origen..."></textarea>
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
            <input v-model="form.tastingNotes" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Ej: Chocolate, avellana, caramelo" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Perfil completo</label>
            <textarea v-model="form.fullTastingProfile" rows="3" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700 resize-none" placeholder="Descripción detallada del perfil..."></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Cuerpo y acidez</label>
            <textarea v-model="form.bodyAcidity" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700 resize-none" placeholder="Descripción del cuerpo y acidez..."></textarea>
          </div>
          
          <!-- Notas detalladas -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-medium text-black/70">Notas detalladas (con emojis)</label>
              <button type="button" @click="addNote" class="text-xs text-forest-700 hover:text-forest-800 inline-flex items-center gap-1">
                <i class="fa-solid fa-plus"></i> Agregar nota
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(note, idx) in form.tastingNotesDetailed" :key="idx" class="flex gap-2">
                <input v-model="note.icon" type="text" class="w-16 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm text-center" placeholder="🍫" />
                <input v-model="note.label" type="text" class="flex-1 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" placeholder="Nombre de la nota" />
                <button type="button" @click="removeNote(idx)" class="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center">
                  <i class="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formatos y precios -->
      <div class="bg-white rounded-2xl p-6 border border-black/5">
        <h2 class="font-display text-xl text-black mb-4 flex items-center gap-2">
          <i class="fa-solid fa-tags text-forest-700"></i> Formatos y precios
        </h2>
        
        <div class="space-y-3">
          <div v-for="(format, idx) in form.formats" :key="idx" class="grid grid-cols-12 gap-2 items-end">
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Peso</label>
              <input v-model="format.weight" type="text" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" placeholder="250g" />
            </div>
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Precio (texto)</label>
              <input v-model="format.price" @input="updatePriceNum(format)" type="text" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" placeholder="$7.500" />
            </div>
            <div class="col-span-3">
              <label class="block text-xs font-medium text-black/70 mb-1">Precio (número)</label>
              <input v-model.number="format.priceNum" type="number" class="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm" placeholder="7500" />
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
          <i class="fa-solid fa-magnifying-glass text-forest-700"></i> SEO (Google)
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Título SEO</label>
            <input v-model="form.seo.title" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="Título para Google" />
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Descripción SEO</label>
            <textarea v-model="form.seo.description" rows="2" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700 resize-none" placeholder="Descripción para Google (máx 160 caracteres)"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-black/70 mb-2">Palabras clave</label>
            <input v-model="form.seo.keywords" type="text" class="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-forest-700" placeholder="café, colombia, huila, especialidad" />
          </div>
        </div>
      </div>
      
      <!-- Botones de acción -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink to="/admin/products" class="px-6 py-3 rounded-xl bg-black/5 hover:bg-black/10 text-black font-medium transition-colors">
          Cancelar
        </NuxtLink>
        <button type="submit" :disabled="saving" class="px-8 py-3 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-colors disabled:opacity-50 inline-flex items-center gap-2">
          <i v-if="saving" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-check"></i>
          {{ saving ? 'Guardando...' : 'Crear producto' }}
        </button>
      </div>
    </form>
  </div>
</template>