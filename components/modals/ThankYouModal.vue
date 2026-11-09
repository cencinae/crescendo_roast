<script setup>
const { thankYouOpen, lastOrderNumber, closeThankYou } = useModals()
const { config } = useConfig()

const whatsappNumber = computed(() => config.value?.whatsapp?.number || '56931893121')
const whatsappLink = computed(() => `https://wa.me/${whatsappNumber.value}`)
</script>

<template>
  <div v-if="thankYouOpen" class="fixed inset-0 z-[70] flex items-center justify-center p-4">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm overlay" @click="closeThankYou"></div>
    
    <!-- Modal compacto -->
    <div class="relative bg-white rounded-3xl max-w-sm w-full modal-pop shadow-2xl overflow-hidden">
      <!-- Header compacto -->
      <div class="relative bg-gradient-to-br from-forest-900 to-forest-950 px-6 pt-8 pb-10 text-center overflow-hidden">
        <div class="absolute inset-0 dot-pattern-light opacity-20"></div>
        <div class="absolute -top-16 -right-16 w-40 h-40 bg-ember-500 rounded-full blur-3xl opacity-20"></div>
        
        <!-- Ícono compacto -->
        <div class="relative mx-auto w-16 h-16 rounded-full bg-ember-500 flex items-center justify-center mb-4 shadow-xl">
          <i class="fa-solid fa-check text-white text-2xl"></i>
          <div class="absolute inset-0 rounded-full bg-ember-500 animate-ping opacity-20"></div>
        </div>
        
        <h3 class="relative font-display text-2xl md:text-3xl font-medium text-white leading-tight mb-1">
          ¡Gracias por tu <span class="italic text-ember-400">preferencia</span>!
        </h3>
        <p class="relative text-white/60 text-xs">Pedido recibido correctamente</p>
      </div>
      
      <!-- Contenido compacto -->
      <div class="px-6 py-5 -mt-5 relative">
        <!-- Número de pedido -->
        <div class="bg-white rounded-xl shadow-lg border border-black/5 px-4 py-3 mb-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-receipt text-forest-700"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-mono text-[9px] text-black/50 uppercase tracking-wider">N° de pedido</div>
            <div class="font-display text-lg text-black font-semibold tracking-wide truncate">
              {{ lastOrderNumber }}
            </div>
          </div>
        </div>
        
        <!-- Mensaje compacto -->
        <p class="text-black/70 text-sm leading-relaxed text-center mb-4">
          Pronto nos contactaremos por <strong class="text-black">WhatsApp</strong> para confirmar tu pedido.
        </p>
        
        <!-- Botones compactos -->
        <div class="space-y-2">
          <a 
            :href="whatsappLink" 
            target="_blank"
            class="w-full bg-[#25D366] text-white py-2.5 rounded-full text-xs font-medium inline-flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-colors"
          >
            <i class="fa-brands fa-whatsapp"></i>
            <span>Contactar por WhatsApp</span>
          </a>
          
          <button 
            @click="closeThankYou" 
            class="w-full bg-black/5 text-black py-2.5 rounded-full text-xs font-medium inline-flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  animation: overlayIn 0.3s ease-out;
}

.modal-pop {
  animation: modalPop 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>