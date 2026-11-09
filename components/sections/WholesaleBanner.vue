<template>
  <section class="wholesale-banner py-8 md:py-10 relative">
    <div class="wholesale-glow bg-ember-500 -top-16 -right-16 w-64 h-64"></div>
    <div class="wholesale-glow bg-forest-500 -bottom-16 -left-16 w-64 h-64 opacity-20"></div>
    <div class="relative max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start md:items-center gap-4 md:gap-6">
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-ember-500/20 border border-ember-400/30 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-mug-saucer text-ember-400 text-xl md:text-2xl"></i>
          </div>
          <div>
            <div class="font-mono text-[9px] tracking-[0.25em] text-ember-400 uppercase font-bold mb-1.5">B2B · Wholesale</div>
            <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.1] tracking-tight mb-1.5">
              ¿Tienes una <span class="italic text-ember-400">cafetería</span><span class="text-ember-500">?</span>
            </h2>
            <p class="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
              Venta mayorista desde <strong class="text-white">3 kg</strong> · Tueste fresco bajo pedido · Envíos en Talca
            </p>
          </div>
        </div>
        <a href="https://wa.me/56931893121?text=Hola%20Crescendo%20Roast!%20Tengo%20una%20cafeter%C3%ADa%20y%20me%20interesa%20la%20venta%20mayorista." target="_blank" 
           class="wholesale-cta bg-ember-500 text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-ember-600 shrink-0 w-full md:w-auto">
          <i class="fa-brands fa-whatsapp"></i> <span>Cotizar ahora</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wholesale-banner { position: relative; overflow: hidden; background: linear-gradient(135deg, #0B2418 0%, #133624 50%, #0B2418 100%); }
.wholesale-banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(251, 146, 60, 0.08) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
.wholesale-glow { position: absolute; width: 500px; height: 500px; border-radius: 50%; filter: blur(120px); opacity: 0.25; pointer-events: none; }
.wholesale-cta { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.wholesale-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(249, 115, 22, 0.35); }
</style>