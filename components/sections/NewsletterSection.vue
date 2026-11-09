<script setup>
const socials = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/crescendo_roast/' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '#' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: '#' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/56931893121' }
]
</script>

<template>
  <section class="py-32 bg-black text-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-forest-800 rounded-full blur-3xl opacity-30"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-ember-500 rounded-full blur-3xl opacity-20"></div>
    <div class="relative max-w-4xl mx-auto px-6 text-center reveal">
      <div class="flex items-center justify-center gap-3 mb-6">
        <div class="w-10 h-[1px] bg-ember-400"></div>
        <i class="fa-solid fa-envelope-open-text text-ember-400 text-xl"></i>
        <div class="w-10 h-[1px] bg-ember-400"></div>
      </div>
      <h3 class="font-display text-5xl md:text-7xl font-medium mb-6 leading-[0.95]">
        Únete a<br><span class="font-script text-ember-400">Crescendo roast</span><span class="text-ember-500">.</span>
      </h3>
      <div class="flex gap-5 justify-center">
        <a v-for="s in socials" :key="s.name" :href="s.url" class="w-20 h-20 rounded-full bg-white/10 hover:bg-ember-500 text-white flex items-center justify-center transition-all">
          <i :class="[s.icon, 'fa-lg']"></i>
        </a>
      </div>
    </div>
  </section>
</template>