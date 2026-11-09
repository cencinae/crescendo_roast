<template>
  <div class="bg-forest-950 text-white py-2.5 overflow-hidden">
    <div class="marquee-track whitespace-nowrap">
      <div class="flex items-center gap-8 px-4">
        <template v-for="i in 2" :key="i">
          <span class="flex items-center gap-2 text-xs font-mono"><span class="w-1.5 h-1.5 rounded-full bg-ember-400"></span>ENVÍOS A OTRAS REGIONES VIA BLUE EXPRESS</span>
          <span class="text-white/30">✦</span>
          <span class="flex items-center gap-2 text-xs font-mono"><span class="w-1.5 h-1.5 rounded-full bg-ember-400"></span>PEDIDOS POR WHATSAPP</span>
          <span class="text-white/30">✦</span>
          <span class="flex items-center gap-2 text-xs font-mono"><span class="w-1.5 h-1.5 rounded-full bg-ember-400"></span>TUESTE FRESCO CADA SEMANA</span>
          <span class="text-white/30">✦</span>
          <span class="flex items-center gap-2 text-xs font-mono"><span class="w-1.5 h-1.5 rounded-full bg-ember-400"></span>+86 PUNTOS SCA</span>
          <span class="text-white/30">✦</span>
        </template>
      </div>
    </div>
  </div>
</template>