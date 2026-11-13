<script setup>
import { useProducts } from '~/composables/useProducts'
import { useModals } from '~/composables/useModals'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { products, loadProducts, selectFormat } = useProducts()
const { addToCart } = useCart()

const product = computed(() => {
  return products.value.find(p => p.slug === route.params.slug)
})

const getCurrentPrice = (p) => {
  if (!p || !p.formats) return '$0'
  const format = p.formats.find(f => f.weight === p.selectedFormat)
  return format ? format.price : '$0'
}

const getCategoryTag = (catId) => {
  const tags = { normal: 'Daily', intermedio: 'Origin', premium: 'Micro-lot' }
  return tags[catId] || 'Café'
}

const isCurrentFormatUnavailable = computed(() => {
  if (!product.value) return false
  const currentFormat = product.value.formats?.find(
    f => f.weight === product.value.selectedFormat
  )
  return currentFormat && currentFormat.available === false
})

// SEO dinámico
useHead(() => ({
  title: product.value?.seo?.title || `${product.value?.name} | Crescendo Roast`,
  meta: [
    { name: 'description', content: product.value?.seo?.description || '' },
    { name: 'keywords', content: product.value?.seo?.keywords || '' },
    // Open Graph para redes sociales
    { property: 'og:title', content: product.value?.seo?.title || product.value?.name },
    { property: 'og:description', content: product.value?.seo?.description || '' },
    { property: 'og:image', content: product.value?.image || '' },
    { property: 'og:type', content: 'product' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: product.value?.seo?.title || product.value?.name },
    { name: 'twitter:description', content: product.value?.seo?.description || '' },
    { name: 'twitter:image', content: product.value?.image || '' }
  ],
  link: [
    { rel: 'canonical', href: `https://tusitio.com/cafes/${route.params.slug}` }
  ]
}))

onMounted(async () => {
  await loadProducts()
})
</script>

<template>
  <div v-if="product" class="min-h-screen bg-white pt-32 pb-20">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <!-- Breadcrumb -->
      <div class="mb-8 flex items-center gap-2 text-sm">
        <NuxtLink to="/" class="text-black/60 hover:text-black">Inicio</NuxtLink>
        <i class="fa-solid fa-chevron-right text-xs text-black/40"></i>
        <NuxtLink to="/cafes" class="text-black/60 hover:text-black">Cafés</NuxtLink>
        <i class="fa-solid fa-chevron-right text-xs text-black/40"></i>
        <span class="text-black font-medium">{{ product.name }}</span>
      </div>

      <!-- Contenido principal -->
      <div class="grid md:grid-cols-2 gap-12 mb-16">
        <!-- Imagen -->
        <div class="aspect-square relative overflow-hidden rounded-[2rem] img-zoom bg-coffee-100">
          <NuxtImg :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
          
          <div class="absolute top-4 left-4 bg-ember-500 text-white rounded-full px-4 py-2 shadow-lg">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-star text-xs"></i>
              <span class="text-sm font-bold font-mono">{{ product.score }} SCA</span>
            </div>
          </div>
          
          <div class="absolute bottom-4 left-4 bg-black/80 backdrop-blur text-white rounded-full px-4 py-1.5">
            <span class="font-mono text-[10px] uppercase tracking-wider font-bold">{{ getCategoryTag(product.category) }}</span>
          </div>
        </div>

        <!-- Información -->
        <div>
          <div class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold mb-2">
            {{ product.origin }} · Café de Especialidad
          </div>
          <h1 class="font-display text-5xl md:text-6xl font-medium text-black mb-4 leading-tight">
            {{ product.name }}
          </h1>
          <div class="font-mono text-sm text-black/60 mb-6 uppercase tracking-wider">
            Variedad: {{ product.variety }}
          </div>
          
          <!-- Perfil Sensorial -->
          <div class="bg-forest-50 rounded-2xl p-6 mb-6 border-l-4 border-forest-700">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-mug-hot text-forest-700"></i>
              <span class="font-mono text-[10px] font-semibold text-forest-800 uppercase tracking-wider">Perfil Sensorial</span>
            </div>
            <p class="text-black/80 leading-relaxed">{{ product.fullTastingProfile }}</p>
          </div>

          <!-- Selector de Formato -->
          <div class="mb-4">
            <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-2">Formato</div>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="fmt in product.formats" 
                :key="fmt.weight"
                @click="fmt.available !== false && selectFormat(product.id, fmt.weight)"
                :disabled="fmt.available === false"
                :class="[
                  'fmt-btn rounded-xl border px-3 py-3 text-center relative',
                  fmt.available === false 
                    ? 'border-black/10 bg-black/5 opacity-60 cursor-not-allowed' 
                    : (product.selectedFormat === fmt.weight ? 'active' : 'border-black/10 bg-white')
                ]"
              >
                <div class="text-sm font-semibold" :class="product.selectedFormat === fmt.weight && fmt.available !== false ? 'text-white' : 'text-black'">
                  {{ fmt.weight }}
                </div>
                <div 
                  class="text-xs font-mono font-medium fmt-price" 
                  :class="product.selectedFormat === fmt.weight && fmt.available !== false ? 'text-ember-400' : 'text-ember-600'"
                >
                  {{ fmt.price }}
                </div>
                <div v-if="fmt.available === false" class="absolute inset-0 flex items-center justify-center">
                  <span class="bg-red-500/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full rotate-[-8deg]">
                    No disponible
                  </span>
                </div>
              </button>
            </div>
            <div v-if="isCurrentFormatUnavailable" class="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <i class="fa-solid fa-circle-exclamation"></i>
              <span>El formato seleccionado está agotado. Por favor elige otro.</span>
            </div>
          </div>

          <!-- Selector de Presentación -->
          <div class="mb-6">
            <div class="font-mono text-[9px] tracking-[0.15em] text-black/50 uppercase font-semibold mb-2">Presentación</div>
            <select 
              v-model="product.selectedPresentation" 
              class="custom-select w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-forest-700 cursor-pointer"
            >
              <option value="En grano">En grano</option>
              <option value="Molido espresso">Molido espresso</option>
              <option value="Molido filtro">Molido filtro</option>
              <option value="Molido prensa francesa">Molido prensa francesa</option>
            </select>
          </div>

          <!-- Precio y Botón -->
          <div class="flex items-center justify-between mb-6 pt-6 border-t border-black/10">
            <div>
              <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider">Precio</div>
              <div class="font-display text-4xl text-black">{{ getCurrentPrice(product) }}</div>
            </div>
            <button 
              @click="addToCart(product)" 
              :disabled="isCurrentFormatUnavailable"
              :class="[
                'px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 transition-colors',
                isCurrentFormatUnavailable 
                  ? 'bg-black/30 text-white/50 cursor-not-allowed' 
                  : 'bg-forest-900 text-white hover:bg-black'
              ]"
            >
              <i class="fa-solid fa-plus"></i> 
              {{ isCurrentFormatUnavailable ? 'No disponible' : 'Añadir al pedido' }}
            </button>
          </div>

          <!-- Nota WhatsApp -->
          <div class="mb-2 bg-ember-400/10 border border-ember-400/30 rounded-2xl p-4 flex items-start gap-3">
            <i class="fa-brands fa-whatsapp text-ember-600 text-xl mt-0.5"></i>
            <div class="text-xs text-black/80 leading-relaxed">
              <strong class="text-black">Pedido por WhatsApp.</strong> Al finalizar tu carrito, completas un breve formulario y enviamos tu pedido para confirmación. Envíos en Talca y regiones.
            </div>
          </div>

          <UiShareButtons 
            v-if="product"
            :product-name="product.name" 
            :slug="product.slug" 
          />

        </div>
      </div>

      <!-- Ficha Técnica -->
      <div class="border-t border-black/10 pt-12">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Ficha Técnica</span>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-10">
          <!-- Columna izquierda -->
          <div class="space-y-3">
            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-forest-50">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-location-dot text-forest-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Origen y Región</div>
                <div class="text-sm text-black font-semibold">{{ product.region }}</div>
                <div class="text-xs text-black/60 mt-1 leading-relaxed">{{ product.originDetail }}</div>
              </div>
            </div>

            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-coffee-100">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-leaf text-coffee-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Variedad</div>
                <div class="text-sm text-black font-semibold">{{ product.variety }}</div>
              </div>
            </div>

            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-ember-400/10">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-flask text-ember-600"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Proceso</div>
                <div class="text-sm text-black font-semibold">{{ product.process }}</div>
              </div>
            </div>

            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-forest-50">
              <div class="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-mountain text-forest-700"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider font-semibold mb-1">Altitud</div>
                <div class="text-sm text-black font-semibold">{{ product.altitude }}</div>
              </div>
            </div>

            <div class="info-card rounded-2xl p-4 flex items-start gap-4 bg-black text-white">
              <div class="w-11 h-11 rounded-full bg-ember-500 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-award text-white"></i>
              </div>
              <div>
                <div class="font-mono text-[9px] text-white/50 uppercase tracking-wider font-semibold mb-1">Puntaje SCA</div>
                <div class="text-sm font-semibold">{{ product.score }} puntos</div>
                <div class="text-xs text-ember-400 mt-1 font-semibold">Café de especialidad</div>
              </div>
            </div>
          </div>

          <!-- Columna derecha -->
          <div>
            <div class="bg-coffee-100/50 rounded-3xl p-6 mb-6">
              <div class="flex items-center gap-2 mb-4">
                <i class="fa-solid fa-wine-glass text-coffee-700"></i>
                <span class="font-mono text-[10px] font-semibold text-coffee-800 uppercase tracking-wider">Notas de Cata</span>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="(note, index) in product.tastingNotesDetailed" 
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
              <p class="text-sm text-black/80 leading-relaxed">{{ product.bodyAcidity }}</p>
            </div>
          </div>
        </div>

        <!-- Detalles rápidos -->
        <div class="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mb-8"></div>

        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Detalles Rápidos</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-map-location-dot text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Origen</div>
            <div class="text-xs font-semibold text-black">{{ product.origin }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-map text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Región</div>
            <div class="text-xs font-semibold text-black">{{ product.regionShort }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-mountain-sun text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Altitud</div>
            <div class="text-xs font-semibold text-black">{{ product.altitudeShort }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-seedling text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Variedad</div>
            <div class="text-xs font-semibold text-black">{{ product.varietyShort }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-flask-vial text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Proceso</div>
            <div class="text-xs font-semibold text-black">{{ product.process }}</div>
          </div>
          <div class="text-center p-4 rounded-2xl bg-black/5">
            <i class="fa-solid fa-calendar text-2xl text-forest-700 mb-2"></i>
            <div class="font-mono text-[8px] text-black/50 uppercase tracking-wider mb-1">Tueste</div>
            <div class="text-xs font-semibold text-black">{{ product.roastDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 si no existe el producto -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <i class="fa-solid fa-mug-empty text-6xl text-black/20 mb-4"></i>
      <h2 class="font-display text-3xl text-black mb-2">Producto no encontrado</h2>
      <p class="text-black/60 mb-6">El café que buscas no existe o ha sido removido.</p>
      <NuxtLink to="/cafes" class="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-forest-800 transition-colors">
        Ver todos los cafés
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.fmt-btn { transition: all 0.3s ease; }
.fmt-btn.active { background: #0B2418; color: #fff; border-color: #0B2418; }
.fmt-btn.active .fmt-price { color: #FB923C; }
.fmt-btn:not(.active):hover:not(:disabled) { border-color: #2F6B4A; }

.note-chip { transition: all 0.3s ease; }
.note-chip:hover { transform: translateY(-2px); }
</style>