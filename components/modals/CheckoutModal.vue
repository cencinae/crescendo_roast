<script setup>
const { checkoutOpen, closeCheckout } = useModals()
const { cart, cartSubtotal } = useCart()
const { form, errors, shippingCost, totalPrice, submit } = useCheckout()
const { getPaymentMethods, getBankAccount } = useConfig()

const paymentMethods = computed(() => getPaymentMethods())
const bankAccount = computed(() => getBankAccount())
</script>

<template>
  <div v-if="checkoutOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto py-8">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeCheckout"></div>
    <div class="relative bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl my-auto max-h-[95vh] overflow-y-auto">
      <button @click="closeCheckout" class="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center">
        <i class="fa-solid fa-xmark text-black"></i>
      </button>
      
      <div class="p-8 md:p-10">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-[1px] bg-black"></div>
            <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Finalizar pedido</span>
          </div>
          <h3 class="font-display text-4xl font-medium text-black leading-tight">Completa tus <span class="italic text-forest-800">datos</span><span class="text-ember-500">.</span></h3>
        </div>
        
        <form @submit.prevent="submit" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-black/70 mb-2">Nombre <span class="text-red-500">*</span></label>
              <input v-model="form.nombre" type="text" :class="['form-input w-full px-4 py-3 rounded-xl text-sm bg-white', errors.nombre ? 'error' : '']" placeholder="Tu nombre completo">
              <p v-if="errors.nombre" class="text-xs text-red-500 mt-1">{{ errors.nombre }}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-black/70 mb-2">Celular <span class="text-red-500">*</span></label>
              <input v-model="form.celular" type="tel" :class="['form-input w-full px-4 py-3 rounded-xl text-sm bg-white', errors.celular ? 'error' : '']" placeholder="+56 9 1234 5678">
              <p v-if="errors.celular" class="text-xs text-red-500 mt-1">{{ errors.celular }}</p>
            </div>
          </div>
          
          <div>
            <h4 class="font-display text-xl text-black mb-4">Tipo de entrega</h4>
            <div class="grid grid-cols-2 gap-3">
              <div @click="form.tipoEntrega = 'retiro'" :class="['delivery-option rounded-2xl border-2 p-5 flex items-center gap-4', form.tipoEntrega === 'retiro' ? 'active' : 'border-black/10 bg-white']">
                <div class="opt-icon w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center transition-colors"><i class="fa-solid fa-store text-lg"></i></div>
                <div><div class="font-semibold text-sm text-black">Retiro en local</div><div class="text-xs text-black/60 mt-0.5">Sin costo</div></div>
              </div>
              <div @click="form.tipoEntrega = 'delivery'" :class="['delivery-option rounded-2xl border-2 p-5 flex items-center gap-4', form.tipoEntrega === 'delivery' ? 'active' : 'border-black/10 bg-white']">
                <div class="opt-icon w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center transition-colors"><i class="fa-solid fa-truck-fast text-lg"></i></div>
                <div><div class="font-semibold text-sm text-black">Delivery</div><div class="text-xs text-black/60 mt-0.5">Envío en Talca</div></div>
              </div>
            </div>
          </div>
          
          <div v-if="form.tipoEntrega === 'delivery'" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-black/70 mb-2">Dirección <span class="text-red-500">*</span></label>
              <input v-model="form.direccion" type="text" :class="['form-input w-full px-4 py-3 rounded-xl text-sm bg-white', errors.direccion ? 'error' : '']" placeholder="Calle y número">
              <p v-if="errors.direccion" class="text-xs text-red-500 mt-1">{{ errors.direccion }}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-black/70 mb-2">Número <span class="text-red-500">*</span></label>
                <input v-model="form.numeroCasa" type="text" :class="['form-input w-full px-4 py-3 rounded-xl text-sm bg-white', errors.numeroCasa ? 'error' : '']" placeholder="Ej: 1234">
                <p v-if="errors.numeroCasa" class="text-xs text-red-500 mt-1">{{ errors.numeroCasa }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-black/70 mb-2">Referencia</label>
                <input v-model="form.referencia" type="text" class="form-input w-full px-4 py-3 rounded-xl text-sm bg-white" placeholder="Opcional">
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-display text-xl text-black mb-4">Forma de pago</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                v-for="pay in paymentMethods" 
                :key="pay.id" 
                @click="pay.available !== false && (form.formaPago = pay.id)"
                :disabled="pay.available === false"
                :class="[
                  'payment-option rounded-2xl border-2 p-4 text-center relative',
                  pay.available === false 
                    ? 'border-black/10 bg-black/5 opacity-60 cursor-not-allowed' 
                    : (form.formaPago === pay.id ? 'active' : 'border-black/10 bg-white')
                ]"
              >
                <div class="pay-icon w-12 h-12 mx-auto rounded-xl bg-black/5 flex items-center justify-center mb-2 transition-colors">
                  <i :class="[pay.icon, 'text-lg']"></i>
                </div>
                <div class="text-xs font-semibold text-black">{{ pay.label }}</div>
                <div v-if="pay.available === false" class="absolute inset-0 flex items-center justify-center">
                  <span class="bg-red-500/90 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full rotate-[-8deg]">
                    No disponible
                  </span>
                </div>
              </div>
            </div>
            <p v-if="errors.formaPago" class="text-xs text-red-500 mt-2">{{ errors.formaPago }}</p>
          </div>
          
          <div v-if="form.formaPago === 'efectivo'" class="bg-ember-400/10 rounded-2xl p-5">
            <label class="block text-xs font-medium text-black/70 mb-2">¿Con cuánto vas a pagar? <span class="text-red-500">*</span></label>
            <input v-model="form.montoEfectivo" type="number" :class="['form-input w-full px-4 py-3 rounded-xl text-sm bg-white', errors.montoEfectivo ? 'error' : '']" placeholder="Ej: 20000">
            <p v-if="errors.montoEfectivo" class="text-xs text-red-500 mt-1">{{ errors.montoEfectivo }}</p>
          </div>
          
          <div v-if="form.formaPago === 'transferencia' && bankAccount" class="bg-forest-50 rounded-2xl p-5">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-building-columns text-forest-700"></i>
              <span class="font-mono text-[10px] font-semibold text-forest-800 uppercase tracking-wider">Datos bancarios</span>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-2 border-b border-black/5">
                <span class="text-black/60">Banco</span>
                <span class="font-semibold text-black">{{ bankAccount.bank }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-black/5">
                <span class="text-black/60">Tipo cuenta</span>
                <span class="font-semibold text-black">{{ bankAccount.accountType }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-black/5">
                <span class="text-black/60">N° cuenta</span>
                <span class="font-mono font-semibold text-black">{{ bankAccount.accountNumber }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-black/5">
                <span class="text-black/60">RUT</span>
                <span class="font-mono font-semibold text-black">{{ bankAccount.rut }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-black/60">Titular</span>
                <span class="font-semibold text-black">{{ bankAccount.holder }}</span>
              </div>
            </div>
            <p class="text-xs text-black/60 mt-3">
              <i class="fa-solid fa-circle-info mr-1"></i>
              Envía el comprobante por WhatsApp junto con tu pedido
            </p>
          </div>
          
          <div class="bg-black/5 rounded-2xl p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="font-display text-lg text-black">Resumen</span>
            </div>
            <div class="space-y-1.5 mb-3">
              <div v-for="item in cart" :key="item.id" class="flex justify-between text-sm">
                <span class="text-black/70 truncate pr-4">{{ item.qty }}× {{ item.name }} ({{ item.selectedFormat }})</span>
                <span class="font-mono text-black font-medium">${{ (item.priceNum * item.qty).toLocaleString('es-CL') }}</span>
              </div>
            </div>
            <div class="pt-3 border-t border-black/10 space-y-1">
              <div class="flex justify-between text-sm"><span class="text-black/60">Subtotal</span><span class="font-mono">${{ cartSubtotal.toLocaleString('es-CL') }}</span></div>
              <div class="flex justify-between text-sm"><span class="text-black/60">Envío</span><span class="font-mono">{{ form.tipoEntrega === 'retiro' ? 'GRATIS' : (shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-CL')}`) }}</span></div>
              <div class="flex justify-between font-display text-xl text-black pt-2"><span>Total</span><span>${{ totalPrice.toLocaleString('es-CL') }}</span></div>
            </div>
          </div>
          
          <button type="submit" class="w-full bg-[#25D366] text-white py-4 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-colors shadow-lg">
            <i class="fa-brands fa-whatsapp text-lg"></i> Enviar pedido por WhatsApp
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input { transition: all 0.3s ease; border: 1.5px solid rgba(0,0,0,0.1); }
.form-input:focus { border-color: #1B4A31; outline: none; box-shadow: 0 0 0 3px rgba(27, 74, 49, 0.1); }
.form-input.error { border-color: #EF4444; }
.delivery-option, .payment-option { transition: all 0.3s ease; cursor: pointer; }
.delivery-option.active, .payment-option.active { border-color: #1B4A31; background: #F4F9F5; }
.delivery-option.active .opt-icon, .payment-option.active .pay-icon { background: #1B4A31; color: #fff; }
</style>