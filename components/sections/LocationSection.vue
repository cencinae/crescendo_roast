<script setup>
const socials = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/crescendo_roast/' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '#' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: '#' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/56931893121' }
]
</script>

<template>
  <section id="ubicacion" class="py-32 bg-forest-50">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="mb-16 reveal">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-[1px] bg-black"></div>
          <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Encuéntranos</span>
        </div>
        <h2 class="font-display text-6xl md:text-8xl font-medium text-black leading-[0.9] tracking-tight">
          Nuestra<br><span class="italic text-forest-800">ubicación</span><span class="text-ember-500">.</span>
        </h2>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 rounded-[2rem] overflow-hidden border border-black/10 reveal">


            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3253.3028127441225!2d-71.5937891!3d-35.3729449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c70038a8e737%3A0xec6a07b367b87c85!2sCrescendo%20Roast%20Coffe!5e0!3m2!1ses!2scl!4v1793722521056!5m2!1ses!2scl" width="100%" height="680" style="border:0; filter: grayscale(30%) contrast(1.05);" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>


        </div>
        
        <div class="space-y-4 reveal" style="transition-delay: 0.15s">
          <a href="https://maps.app.goo.gl/MjdURATySeRf1QtK7" target="_blank" class="block bg-black text-white rounded-3xl p-8 hover:bg-forest-900 transition-colors group">
            <i class="fa-solid fa-location-dot text-3xl text-ember-400 mb-4"></i>
            <div class="font-display text-2xl mb-2">Cómo llegar</div>
            <div class="text-sm text-white/70 mb-4">Abre Google Maps y navega hasta nuestra cafetería en Talca</div>
            <div class="inline-flex items-center gap-2 text-sm font-medium">
              <span>Abrir mapa</span> <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </div>
          </a>
          
          <div class="bg-white rounded-3xl p-8 border border-black/5">
            <i class="fa-brands fa-whatsapp text-3xl text-forest-700 mb-4"></i>
            <div class="font-display text-2xl text-black mb-2">Pedidos WhatsApp</div>
            <div class="text-sm text-black/60 mb-3">Confirma tu pedido personalmente</div>
            <a href="https://wa.me/56931893121" target="_blank" class="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:gap-3 transition-all">
              <span>Escribir ahora</span> <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          
          <div class="bg-white rounded-3xl p-8 border border-black/5">
            <i class="fa-solid fa-share-nodes text-2xl text-ember-500 mb-4"></i>
            <div class="font-display text-2xl text-black mb-4">Síguenos</div>
            <div class="flex gap-2">
              <a v-for="s in socials" :key="s.name" :href="s.url" class="w-11 h-11 rounded-full bg-black hover:bg-ember-500 text-white flex items-center justify-center transition-colors">
                <i :class="s.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>