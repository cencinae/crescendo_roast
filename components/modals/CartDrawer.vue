<script setup>
const { cart, cartOpen, cartTotal, cartSubtotal, updateQty, removeFromCart, closeCart } = useCart()
const { openCheckout } = useModals()
const { config } = useConfig()

const shippingCost = computed(() => {
  const cost = config.value?.shipping?.cost || 2500
  const threshold = config.value?.shipping?.freeThreshold || 15000
  return cartSubtotal.value >= threshold ? 0 : cost
})

const freeShippingThreshold = computed(() => {
  return config.value?.shipping?.freeThreshold || 15000
})

const totalPrice = computed(() => cartSubtotal.value + shippingCost.value)
</script>

<template>
  <div v-if="cartOpen" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeCart"></div>
    <div class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
      <div class="p-8 border-b border-black/10 flex items-center justify-between">
        <div>
          <h3 class="font-display text-3xl text-black">Tu pedido</h3>
          <div class="font-mono text-xs text-black/50 mt-1">{{ cartTotal }} {{ cartTotal === 1 ? 'item' : 'items' }}</div>
        </div>
        <button @click="closeCart" class="w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-black"></i>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto p-8">
        <div v-if="cart.length === 0" class="text-center py-20">
          <i class="fa-solid fa-bag-shopping text-6xl text-black/20 mb-4"></i>
          <p class="text-black/60 mb-6">Tu pedido está vacío</p>
          <button @click="closeCart" class="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-forest-800 transition-colors">Explorar cafés</button>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="item in cart" :key="item.id + '-' + item.selectedFormat + '-' + item.selectedPresentation" class="flex gap-4 bg-forest-50 rounded-2xl p-4">
            <NuxtImg :src="item.image" :alt="item.name" class="w-20 h-24 rounded-xl object-cover" />
            <div class="flex-1 min-w-0">
              <div class="font-display text-lg text-black truncate">{{ item.name }}</div>
              <div class="font-mono text-[10px] text-black/50 mt-0.5">{{ item.selectedFormat }} · {{ item.selectedPresentation }}</div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-1 bg-white rounded-full p-1">
                  <button @click="updateQty(item.id, item.selectedFormat, item.selectedPresentation, -1)" class="qty-btn w-7 h-7 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white">
                    <i class="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span class="text-sm font-semibold text-black w-6 text-center font-mono">{{ item.qty }}</span>
                  <button @click="updateQty(item.id, item.selectedFormat, item.selectedPresentation, 1)" class="qty-btn w-7 h-7 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white">
                    <i class="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
                <div class="font-display text-lg text-black">${{ (item.priceNum * item.qty).toLocaleString('es-CL') }}</div>
              </div>
            </div>
            <button @click="removeFromCart(item.id, item.selectedFormat, item.selectedPresentation)" class="text-black/40 hover:text-red-500 transition-colors self-start">
              <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="cart.length > 0" class="p-6 border-t border-black/10 bg-forest-50">
        <!-- Resumen compacto -->
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm text-black/60">
            <span>Subtotal</span>
            <span class="font-mono">${{ cartSubtotal.toLocaleString('es-CL') }}</span>
          </div>
          <div class="flex justify-between text-sm text-black/60">
            <span>Envío en Talca</span>
            <span :class="shippingCost === 0 ? 'text-forest-700 font-semibold' : ''" class="font-mono">
              {{ shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-CL')}` }}
            </span>
          </div>
          <div class="flex justify-between font-display text-xl text-black pt-2 border-t border-black/10">
            <span>Total</span>
            <span>${{ totalPrice.toLocaleString('es-CL') }}</span>
          </div>
        </div>
        
        <!-- Mensajes combinados en una sola caja compacta -->
        <div class="mb-4 bg-white/50 border border-black/5 rounded-lg px-3 py-2.5">
          <div class="flex items-start gap-2 text-xs text-black/70">
            <i class="fa-solid fa-gift text-ember-600 mt-0.5 shrink-0"></i>
            <div class="leading-snug">
              Envío gratis en Talca sobre ${{ freeShippingThreshold.toLocaleString('es-CL') }}. Otras regiones por confirmar.
            </div>
          </div>
        </div>
        
        <!-- Botón más compacto -->
        <button @click="openCheckout" class="bg-[#25D366] text-white w-full py-3 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-colors">
          <i class="fa-brands fa-whatsapp"></i> Continuar con el pedido
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qty-btn { transition: all 0.2s; }
</style>