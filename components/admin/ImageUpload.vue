<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const uploading = ref(false)
const preview = ref(props.modelValue)
const fileInput = ref(null)

watch(() => props.modelValue, (val) => {
  preview.value = val
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Validar tamaño (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('La imagen no debe superar 5MB')
    return
  }
  
  // Validar tipo
  if (!file.type.startsWith('image/')) {
    alert('Solo se permiten imágenes')
    return
  }
  
  uploading.value = true
  
  try {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      preview.value = response.url
      emit('update:modelValue', response.url)
    }
  } catch (error) {
    alert('Error al subir la imagen')
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}
</script>

<template>
  <div class="space-y-3">
    <label class="block text-xs font-medium text-black/70 mb-2">Imagen del producto</label>
    
    <div 
      @click="triggerFileInput"
      class="relative border-2 border-dashed border-black/10 rounded-2xl overflow-hidden cursor-pointer hover:border-forest-700 transition-colors"
    >
      <!-- Preview -->
      <div v-if="preview" class="aspect-video relative">
        <NuxtImg :src="preview" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <div class="text-white text-center">
            <i class="fa-solid fa-camera text-3xl mb-2"></i>
            <div class="text-sm">Cambiar imagen</div>
          </div>
        </div>
      </div>
      
      <!-- Placeholder -->
      <div v-else class="aspect-video flex flex-col items-center justify-center p-8">
        <div v-if="uploading" class="text-center">
          <i class="fa-solid fa-spinner fa-spin text-3xl text-forest-700 mb-3"></i>
          <p class="text-sm text-black/60">Subiendo imagen...</p>
        </div>
        <div v-else class="text-center">
          <i class="fa-solid fa-cloud-arrow-up text-4xl text-black/30 mb-3"></i>
          <p class="text-sm text-black/60 mb-1">Haz clic para subir una imagen</p>
          <p class="text-xs text-black/40">JPG, PNG o WEBP · Máx 5MB</p>
        </div>
      </div>
    </div>
    
    <input 
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>