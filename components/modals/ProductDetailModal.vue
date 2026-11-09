<script setup>
const { selectedProduct, closeProduct } = useModals()
const { selectFormat } = useProducts()
const { addToCart } = useCart()

// Detecta si el formato actualmente seleccionado está agotado
const isCurrentFormatUnavailable = computed(() => {
  if (!selectedProduct.value) return false
  const currentFormat = selectedProduct.value.formats?.find(
    f => f.weight === selectedProduct.value.selectedFormat
  )
  return currentFormat && currentFormat.available === false
})

// Función segura para obtener el precio actual
const getCurrentPrice = (p) => {
  if (!p || !p.formats) return '$0'
  const format = p.formats.find(f => f.weight === p.selectedFormat)
  return format ? format.price : '$0'
}

// Función segura para obtener la etiqueta de categoría
const getCategoryTag = (catId) => {
  const tags = { normal: 'Clásico', intermedio: 'Selección', premium: 'Exclusivo' }
  return tags[catId] || 'Café'
}
</script>

<template>
  <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto py-12">
    <!-- Overlay de fondo -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm overlay" @click="closeProduct"></div>
    
    <!-- Contenido del Modal -->
    <div class="relative bg-white rounded-[2rem] max-w-5xl w-full modal-pop shadow-2xl my-auto max-h-[95vh] overflow-y-auto">
      <button @click="closeProduct" class="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-black text-lg"></i>
      </button>
      
      <div class="grid md:grid-cols-2">
        <!-- Imagen del producto -->
        <div class="aspect-square relative overflow-hidden rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none img-zoom bg-coffee-100">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full h-full object-cover">
          
          <div class="absolute top-4 left-4 bg-ember-500 text-white rounded-full px-4 py-2 shadow-lg">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-star text-xs"></i>
              <span class="text-sm font-bold font-mono">{{ selectedProduct.score || '85' }} SCA</span>
            </div>
          </div>
          
          <div class="absolute bottom-4 left-4 bg-black/80 backdrop-blur text-white rounded-full px-4 py-1.5">
            <span class="font-mono text-[10px] uppercase tracking-wider font-bold">{{ getCategoryTag(selectedProduct.category) }}</span>
          </div>
        </div>
        
        <!-- Información del producto -->
        <div class="p-8 md:p-10">
          <div class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold mb-2">
            {{ selectedProduct.origin || 'Origen' }} · Café de Especialidad
          </div>
          <h3 class="font-display text-4xl md:text-5xl font-medium text-black mb-2 leading-tight">
            {{ selectedProduct.name }}
          </h3>
          <div class="font-mono text-xs text-black/60 mb-6 uppercase tracking-wider">
            Variedad: {{ selectedProduct.variety || 'No especificada' }}
          </div>
          
          <!-- Perfil Sensorial -->
          <div class="bg-forest-50 rounded-2xl p-6 mb-6 border-l-4 border-forest-700">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-mug-hot text-forest-700"></i>
              <span class="font-mono text-[10px] font-semibold text-forest-800 uppercase tracking-wider">Perfil Sensorial</span>
            </div>
            <p class="text-black/80 leading-relaxed text-sm">
              {{ selectedProduct.fullTastingProfile || selectedProduct.tastingNotes || 'Descripción no disponible.' }}
            </p>
          </div>
          
          <!-- Selector de Formato -->
          <div class="mb-4">
            <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-2">Formato</div>
<!-- Selector de Formato -->
<div class="mb-4">
  <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-2">Formato</div>
  <div class="grid grid-cols-3 gap-2">
    <button 
      v-for="fmt in selectedProduct.formats" 
      :key="fmt.weight"
      @click="fmt.available !== false && selectFormat(selectedProduct.id, fmt.weight)"
      :disabled="fmt.available === false"
      :class="[
        'fmt-btn rounded-xl border px-3 py-3 text-center relative',
        fmt.available === false 
          ? 'border-black/10 bg-black/5 opacity-60 cursor-not-allowed' 
          : (selectedProduct.selectedFormat === fmt.weight ? 'active' : 'border-black/10 bg-white')
      ]"
    >
      <div class="text-sm font-semibold" :class="selectedProduct.selectedFormat === fmt.weight && fmt.available !== false ? 'text-white' : 'text-black'">
        {{ fmt.weight }}
      </div>
      <div 
        class="text-xs font-mono font-medium fmt-price" 
        :class="selectedProduct.selectedFormat === fmt.weight && fmt.available !== false ? 'text-ember-400' : 'text-ember-600'"
      >
        {{ fmt.price }}
      </div>
      <!-- Etiqueta "Agotado" -->
      <div v-if="fmt.available === false" class="absolute inset-0 flex items-center justify-center">
        <span class="bg-red-500/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full rotate-[-8deg]">
          NO DISPONIBLE
        </span>
      </div>
    </button>
  </div>
  <!-- Aviso si el formato seleccionado está agotado -->
  <div v-if="isCurrentFormatUnavailable" class="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
    <i class="fa-solid fa-circle-exclamation"></i>
    <span>El formato seleccionado está agotado. Por favor elige otro.</span>
  </div>
</div>
          </div>
          
          <!-- Selector de Presentación -->
          <div class="mb-6">
            <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-2">Presentación</div>
            <select 
              v-model="selectedProduct.selectedPresentation" 
              class="custom-select w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-forest-700 cursor-pointer"
            >
              <option value="En grano">En grano</option>
              <option value="Molido espresso">Molido espresso</option>
              <option value="Molido filtro">Molido filtro</option>
              <option value="Molido prensa francesa">Molido prensa francesa</option>
            </select>
          </div>
          
          <!-- Precio y Botón de Añadir -->
          <div class="flex items-center justify-between mb-4 pt-6 border-t border-black/10">
            <div>
              <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider">Precio</div>
              <div class="font-display text-3xl text-black">{{ getCurrentPrice(selectedProduct) }}</div>
            </div>
            <button 
              @click="addToCart(selectedProduct)" 
              class="bg-forest-900 text-white px-6 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-black transition-colors"
            >
              <i class="fa-solid fa-plus"></i> Añadir al pedido
            </button>
          </div>
          
          <!-- Nota de WhatsApp -->
          <div class="mb-2 bg-ember-400/10 border border-ember-400/30 rounded-2xl p-4 flex items-start gap-3">
            <i class="fa-brands fa-whatsapp text-ember-600 text-xl mt-0.5"></i>
            <div class="text-xs text-black/80 leading-relaxed">
              <strong class="text-black">Pedido por WhatsApp.</strong> Al finalizar tu carrito, completas un breve formulario y enviamos tu pedido para confirmación. Envíos en Talca y regiones.
            </div>
          </div>

          <!-- 🆕 Botones de compartir (con v-if para evitar error) -->
          <UiShareButtons 
            v-if="selectedProduct"
            :product-name="selectedProduct.name" 
            :slug="selectedProduct.slug" 
          />

        </div>
      </div>
      
      <!-- Ficha Técnica Detallada -->
      <div class="p-8 md:p-10 border-t border-black/10 bg-white">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Ficha Técnica</span>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 mb-10">
          <!-- Columna Izquierda: Datos -->
          <div class="space-y-3">
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-forest-50">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-location-dot text-forest-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Origen y Región</div>
                <div class="text-sm text-black font-semibold">{{ selectedProduct.region || selectedProduct.origin }}</div>
                <div class="text-xs text-black/60 mt-1 leading-relaxed">{{ selectedProduct.originDetail || 'Detalle no disponible' }}</div>
              </div>
            </div>
            
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-coffee-100">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-leaf text-coffee-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Variedad</div>
                <div class="text-sm text-black font-semibold">{{ selectedProduct.variety }}</div>
              </div>
            </div>
            
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-ember-400/10">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-flask text-ember-600"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Proceso</div>
                <div class="text-sm text-black font-semibold">{{ selectedProduct.process }}</div>
              </div>
            </div>
            
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-forest-50">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-mountain text-forest-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Altitud</div>
                <div class="text-sm text-black font-semibold">{{ selectedProduct.altitude }}</div>
              </div>
            </div>
            
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-black text-white">
              <div class="w-11 h-11 rounded-full bg-ember-500 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-award text-white"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-white/50 uppercase tracking-wider font-semibold mb-1">Puntaje SCA</div>
                <div class="text-sm font-semibold">{{ selectedProduct.score }} puntos</div>
                <div class="text-xs text-ember-400 mt-1 font-semibold">Café de especialidad</div>
              </div>
            </div>
          </div>
          
          <!-- Columna Derecha: Notas de Cata y Cuerpo -->
          <div>
            <div class="bg-coffee-100/50 rounded-3xl p-6 mb-6">
              <div class="flex items-center gap-2 mb-4">
                <i class="fa-solid fa-wine-glass text-coffee-700"></i>
                <span class="font-mono text-[10px] font-semibold text-coffee-800 uppercase tracking-wider">Notas de Cata</span>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="(note, index) in selectedProduct.tastingNotesDetailed" 
                  :key="index"
                  class="note-chip bg-white rounded-2xl p-4 flex items-center gap-3 border border-black/5"
                >
                  <div class="text-2xl">{{ note.icon }}</div>
                  <div class="text-xs font-semibold text-black">{{ note.label }}</div>
                </div>
              </div>
            </div>
            
            <div class="bg-forest-50 rounded-3xl p-6">
              <div class="flex items-center gap-2 mb-3">
                <i class="fa-solid fa-droplet text-forest-700"></i>
                <span class="font-mono text-[10px] font-semibold text-forest-800 uppercase tracking-wider">Cuerpo y Acidez</span>
              </div>
              <p class="text-sm text-black/80 leading-relaxed">
                {{ selectedProduct.bodyAcidity || 'Información no disponible.' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Resumen rápido inferior -->
        <div class="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mb-8"></div>
        
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Detalles Rápidos</span>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-map-location-dot text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Origen</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.origin }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-map text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Región</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.regionShort || selectedProduct.region }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-mountain-sun text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Altitud</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.altitudeShort || selectedProduct.altitude }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-seedling text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Variedad</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.varietyShort || selectedProduct.variety }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-flask-vial text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Proceso</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.process }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-calendar text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Tueste</div>
            <div class="text-xs font-semibold text-black">{{ selectedProduct.roastDate }}</div>
          </div>
        </div>
        
        <div class="text-center mt-8 pt-6 border-t border-black/10">
          <p class="font-display text-xl italic text-forest-800">
            <i class="fa-solid fa-leaf text-forest-700 mr-2"></i>
            Crecemos con pasión, tostamos con propósito.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fmt-btn { transition: all 0.3s ease; }
.fmt-btn.active { background: #0B2418; color: #fff; border-color: #0B2418; }
.fmt-btn.active .fmt-price { color: #FB923C; }
.fmt-btn:not(.active):hover { border-color: #2F6B4A; }

.note-chip { transition: all 0.3s ease; }
.note-chip:hover { transform: translateY(-2px); }
</style>