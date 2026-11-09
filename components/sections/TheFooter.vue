<script setup>
const socials = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/crescendo_roast/' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '#' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: '#' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/56931893121' }
]
</script>

<template>
  <footer class="bg-black text-white pt-20 pb-8">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="font-script text-[18vw] leading-[0.85] text-white/15 tracking-tighter mb-20 overflow-hidden">
        Crescendo<span class="text-ember-500/20">.</span>
      </div>
      
      <div class="grid md:grid-cols-4 gap-12 mb-16">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <NuxtImg src="/logo.png" alt="Crescendo Roast" class="h-20 w-auto" />
          </div>
          <p class="text-white/60 max-w-md leading-relaxed mb-6">
            Café de especialidad tostado con pasión. Envíos en Talca, Chile. Pedidos confirmados por WhatsApp.
          </p>
          <div class="flex items-center gap-2 mb-6 px-4 py-2.5 bg-forest-900/50 rounded-full w-fit">
            <i class="fa-solid fa-truck-fast text-ember-400"></i>
            <span class="font-mono text-xs text-white/80">Envíos en Talca · Región del Maule</span>
          </div>
          <div class="flex gap-2">
            <a v-for="s in socials" :key="s.name" :href="s.url" class="w-11 h-11 rounded-full bg-white/10 hover:bg-ember-500 text-white flex items-center justify-center transition-all">
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h4 class="font-mono text-[10px] tracking-[0.2em] text-ember-400 mb-6 uppercase">Tienda</h4>
          <ul class="space-y-3">
            <li><a href="#categorias" class="text-white/70 hover:text-ember-400 transition-colors">Café Normal</a></li>
            <li><a href="#categorias" class="text-white/70 hover:text-ember-400 transition-colors">Café Intermedio</a></li>
            <li><a href="#categorias" class="text-white/70 hover:text-ember-400 transition-colors">Café Premium</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-mono text-[10px] tracking-[0.2em] text-ember-400 mb-6 uppercase">Visítanos</h4>
          <ul class="space-y-3">
            <li><a href="#horarios" class="text-white/70 hover:text-ember-400 transition-colors">Horarios</a></li>
            <li><a href="#ubicacion" class="text-white/70 hover:text-ember-400 transition-colors">Ubicación</a></li>
            <li><a href="https://wa.me/56931893121" target="_blank" class="text-white/70 hover:text-ember-400 transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="font-mono text-xs text-white/40">© 2026 Crescendo Roast · Talca, Chile</div>
        <div class="font-display text-xl italic text-ember-400">Hecho con amor y café</div>
      </div>
    </div>
  </footer>
</template>