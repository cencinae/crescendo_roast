import { onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export const useReveal = () => {
  const route = useRoute()
  let observer = null

  const initObserver = () => {
    if (!process.client) return
    
    // Limpiar el observer anterior
    if (observer) {
      observer.disconnect()
    }

    // Crear el nuevo observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Margen para activar un poco antes
    })

    // Esperar a que Vue termine de renderizar y el scroll al hash se complete
    nextTick(() => {
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
          if (!el.classList.contains('visible')) {
            observer.observe(el)
          }
        })
      }, 150) // Delay para que el scroll al hash termine
    })
  }

  onMounted(() => {
    initObserver()
  })

  // Observar cambios en la ruta COMPLETA (path + hash)
  watch(() => route.fullPath, () => {
    initObserver()
  })

  // También observar cuando el usuario hace scroll manualmente
  onMounted(() => {
    if (!process.client) return
    
    let scrollTimeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Re-inicializar observer al hacer scroll para capturar elementos que entran al viewport
        if (observer) {
          document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            observer.observe(el)
          })
        }
      }, 100)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}