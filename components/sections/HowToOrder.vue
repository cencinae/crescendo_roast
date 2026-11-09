<script setup>
const steps = [
  { title: 'Elige tu café', desc: 'Explora nuestras 3 categorías y selecciona formato, presentación y cantidad.' },
  { title: 'Añade al pedido', desc: 'Arma tu carrito con los cafés que quieras. Sin pago online, sin compromiso.' },
  { title: 'Completa tus datos', desc: 'Nombre, celular, tipo de entrega y forma de pago en un breve formulario.' },
  { title: 'Enviamos por WhatsApp', desc: 'Te contactamos para confirmar, coordinar pago y entrega en Talca.' }
]
</script>

<template>
  <section class="py-24 bg-forest-50">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="text-center mb-16 reveal">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Cómo pedir</span>
          <div class="w-10 h-[1px] bg-black"></div>
        </div>
        <h2 class="font-display text-5xl md:text-6xl font-medium text-black leading-[0.95] tracking-tight mb-4">
          Pedidos por <span class="italic text-forest-800">WhatsApp</span><span class="text-ember-500">.</span>
        </h2>
      </div>
      
      <div class="grid md:grid-cols-4 gap-6">
        <div v-for="(step, idx) in steps" :key="idx" class="reveal bg-white rounded-3xl p-8 border border-black/5 hover-tilt" :style="{transitionDelay: idx * 0.1 + 's'}">
          <div class="w-14 h-14 rounded-2xl bg-forest-900 text-white flex items-center justify-center mb-6 font-display text-2xl">0{{ idx + 1 }}</div>
          <h3 class="font-display text-xl text-black mb-2">{{ step.title }}</h3>
          <p class="text-sm text-black/70 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
      
      <div class="mt-12 bg-forest-900 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 reveal">
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-2xl bg-ember-500 flex items-center justify-center shrink-0"><i class="fa-brands fa-whatsapp text-3xl text-white"></i></div>
          <div>
            <div class="font-display text-2xl mb-1">Confirma tu pedido por WhatsApp</div>
            <div class="text-white/70 text-sm">Envíos en Talca · Tueste fresco bajo pedido</div>
          </div>
        </div>
        <a href="https://wa.me/56931893121" target="_blank" class="bg-white text-forest-900 px-7 py-3.5 rounded-full font-medium inline-flex items-center gap-2 hover:bg-ember-400 transition-colors shrink-0">
          <i class="fa-brands fa-whatsapp"></i> <span>Escribir ahora</span>
        </a>
      </div>
    </div>
  </section>
</template>