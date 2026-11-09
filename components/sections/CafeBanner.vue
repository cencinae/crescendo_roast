<template>
  <section class="relative py-0 overflow-hidden">
    <div class="relative h-[500px] md:h-[600px] img-zoom">
      <NuxtImg src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80" alt="Cafetería" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <div class="max-w-2xl reveal">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-[1px] bg-ember-400"></div>
              <span class="font-mono text-[10px] tracking-[0.2em] text-ember-400 uppercase font-semibold">Nuestra Cafetería</span>
            </div>
            <h2 class="font-display text-5xl md:text-7xl font-medium text-white leading-[0.95] tracking-tight mb-6">
              Café de especialidad<br><span class="italic text-ember-400">en tu casa</span><span class="text-ember-500">.</span>
            </h2>
            <p class="text-white/80 text-lg mb-8 max-w-lg leading-relaxed font-light">
              Visítanos en Talca o recibe tu café recién tostado directamente en tu puerta. Tueste artesanal, origen trazado y la mejor experiencia.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#ubicacion" class="bg-ember-500 text-white px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-ember-600 transition-colors">
                <i class="fa-solid fa-location-dot"></i> <span>Cómo llegar</span>
              </a>
              <a href="#categorias" class="border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                <span>Ver catálogo</span> <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>