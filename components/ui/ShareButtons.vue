<script setup>
const props = defineProps({
  productName: { type: String, required: true },
  slug: { type: String, required: true }
})

const { showToast } = useToast()
const { getSiteUrl } = useConfig()

// Construir la URL dinámica usando la variable de entorno
const productUrl = computed(() => `${getSiteUrl()}/cafes/${props.slug}`)

const shareMessage = computed(() => {
  return `¡Mira este café de Crescendo Roast! ${props.productName} - ${productUrl.value}`
})

const shareLinks = computed(() => {
  const encodedUrl = encodeURIComponent(productUrl.value)
  const encodedMessage = encodeURIComponent(shareMessage.value)
  
  return [
    {
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      color: 'hover:bg-[#25D366]',
      url: `https://wa.me/?text=${encodedMessage}`
    },
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      color: 'hover:bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'Twitter',
      icon: 'fa-brands fa-x-twitter',
      color: 'hover:bg-black',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`
    },
    {
      name: 'Telegram',
      icon: 'fa-brands fa-telegram',
      color: 'hover:bg-[#0088cc]',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`
    },
    {
      name: 'Email',
      icon: 'fa-solid fa-envelope',
      color: 'hover:bg-forest-700',
      url: `mailto:?subject=${encodeURIComponent(props.productName)}&body=${encodedMessage}`
    }
  ]
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(productUrl.value)
    showToast({ msg: '✓ Link copiado al portapapeles', type: 'success' })
  } catch (error) {
    const textArea = document.createElement('textarea')
    textArea.value = productUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToast({ msg: '✓ Link copiado al portapapeles', type: 'success' })
  }
}
</script>

<template>
  <div class="bg-forest-50 rounded-2xl p-5 border border-black/5">
    <div class="flex items-center gap-2 mb-4">
      <i class="fa-solid fa-share-nodes text-forest-700"></i>
      <span class="font-mono text-[10px] font-semibold text-forest-800 uppercase tracking-wider">Compartir</span>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <a 
        v-for="social in shareLinks" 
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        :class="['w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-black/70 transition-all hover:text-white hover:border-transparent hover:scale-110', social.color]"
        :title="`Compartir en ${social.name}`"
      >
        <i :class="[social.icon, 'text-lg']"></i>
      </a>
      
      <button 
        @click="copyLink"
        class="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-black/70 transition-all hover:text-white hover:bg-ember-500 hover:border-transparent hover:scale-110"
        title="Copiar link"
      >
        <i class="fa-solid fa-link text-lg"></i>
      </button>
    </div>
  </div>
</template>