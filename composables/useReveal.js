import { onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export const useReveal = () => {
  const route = useRoute()
  let observer = null

  const initObserver = () => {
    if (!process.client) return
    
    // 1. Limpiar el observer anterior para evitar duplicados en producción
    if (observer) {
      observer.disconnect()
    }

    // 2. Crear el nuevo observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Dejar de observar este elemento específico para ahorrar rendimiento
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    // 3. nextTick garantiza que Vue ya terminó de pintar el nuevo DOM de la ruta
    nextTick(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('visible')) {
          observer.observe(el)
        }
      })
    })
  }

  // Ejecutar al montar el componente
  onMounted(() => {
    initObserver()
  })

  // Volver a ejecutar CADA VEZ que cambia la ruta (ej: clic en el logo)
  watch(() => route.path, () => {
    initObserver()
  })

  // Limpiar al salir del componente para evitar fugas de memoria
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}