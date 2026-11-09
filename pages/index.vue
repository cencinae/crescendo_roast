<script setup>
import { useProducts } from '~/composables/useProducts'
import { useConfig } from '~/composables/useConfig'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// 1. SEO Básico y Redes Sociales (Open Graph / Twitter)
useHead({
  title: 'Crescendo Roast · Café de Especialidad Tostado en Talca',
  meta: [
    { name: 'description', content: 'Café de especialidad tostado artesanalmente en pequeños lotes en Talca. Envíos a domicilio y a todo Chile. Descubre nuestros orígenes exclusivos y perfiles de cata únicos.' },
    { name: 'keywords', content: 'café de especialidad, café talca, crescendo roast, café en grano, café tostado artesanal, envíos de café chile, café de origen' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Crescendo Roast' },
    
    // Open Graph (Facebook, WhatsApp, LinkedIn)
    { property: 'og:title', content: 'Crescendo Roast · Café de Especialidad en Talca' },
    { property: 'og:description', content: 'Café de especialidad tostado artesanalmente. Envíos en Talca y regiones. ¡Pide el tuyo por WhatsApp!' },
    { property: 'og:image', content: `${siteUrl}/letras.jpeg` }, // Asegúrate de que esta imagen exista en /public
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'es_CL' },
    
    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Crescendo Roast · Café de Especialidad' },
    { name: 'twitter:description', content: 'Café de especialidad tostado artesanalmente en Talca.' },
    { name: 'twitter:image', content: `${siteUrl}/letras.jpeg` }
  ],
  link: [
    // 2. URL Canónica (Evita penalizaciones por contenido duplicado)
    { rel: 'canonical', href: siteUrl },
    
    // 3. Preload de imagen crítica (Mejora el LCP - Core Web Vitals)
    // Cambia '/letras.jpeg' por la ruta real de tu imagen hero si es diferente
    { rel: 'preload', as: 'image', href: '/letras.jpeg' } 
  ],
  
  // 4. Datos Estructurados (JSON-LD) para Google (Local Business)
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CafeOrCoffeeShop',
        name: 'Crescendo Roast',
        image: `${siteUrl}/logo.png`,
        url: siteUrl,
        telephone: '+56931893121',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Talca',
          addressRegion: 'Región del Maule',
          addressCountry: 'CL'
        },
        sameAs: [
          'https://www.instagram.com/crescendo_roast/'
          // Agrega aquí Facebook, TikTok, etc.
        ]
      })
    }
  ]
})

const { loadProducts } = useProducts()
const { loadConfig } = useConfig()

onMounted(async () => {
  await Promise.all([
    loadProducts(),
    loadConfig()
  ])
})
</script>

<template>
  <div>
    <!-- Asegúrate de que tu HeroSection tenga un <h1> semántico -->
    <SectionsHeroSection />
    <SectionsCafeBanner />
    <SectionsCategoriesSection />
    <SectionsWholesaleBanner />
    <SectionsHowToOrder />
    <SectionsScheduleSection />
    <SectionsLocationSection />
    <SectionsNewsletterSection />
  </div>
</template>