export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],

  app: {
    head: {
      title: 'Crescendo Roast · Café de Especialidad en Talca',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' 
        },
        // 🆕 Favicon
        { 
          rel: 'icon', 
          type: 'image/png', 
          href: '/favicon.png' 
        },
        // 🆕 Favicon para Apple (iPhone/iPad)
        {
          rel: 'apple-touch-icon',
          href: '/favicon.png'
        }
      ],
    }
  },

  googleFonts: {
    families: {
      'Fraunces': [300, 400, 500, 600, 700, 800, 900],
      'Inter': [300, 400, 500, 600, 700],
      'JetBrains+Mono': [400, 500, 600],
      'Great+Vibes': true,
      'Homemade+Apple': true,
      'Playfair+Display': [400, 600]
    }
  },

  runtimeConfig: {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminToken: process.env.ADMIN_TOKEN,
    public: {
      //siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },

  sitemap: {
       hostname: process.env.SITE_URL || 'http://localhost:3000'
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  }
})