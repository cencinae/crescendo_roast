// composables/useProducts.js
export const useProducts = () => {
  const products = useState('products', () => [])
  const activeCategory = useState('activeCategory', () => 'all')

  const loadProducts = async () => {
    try {
      const { data } = await useFetch('/api/products.json')
      if (data.value) {
        products.value = data.value.filter(p => {
          if (!p.status) return true // Retrocompatibilidad
          return p.status === 'publicado'
        }).map(p => {
          // 🆕 CRÍTICO: Asegurar que cada producto tenga un formato seleccionado por defecto
          if (!p.selectedFormat) {
            const primerDisponible = p.formats.find(f => f.available !== false)
            p.selectedFormat = primerDisponible ? primerDisponible.weight : (p.formats[0]?.weight || '')
          }
          return p
        })
      }
    } catch (error) {
      console.error('Error cargando productos:', error)
    }
  }

  // 🆕 CRÍTICO: Actualizar directamente la propiedad del objeto para que la reactividad funcione
  const selectFormat = (productId, weight) => {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.selectedFormat = weight
    }
  }

  // Productos filtrados por categoría
  const filteredProducts = computed(() => {
    if (activeCategory.value === 'all') return products.value
    return products.value.filter(p => p.category === activeCategory.value)
  })

  const categories = [
    { id: 'all', name: 'Todos', icon: 'fa-solid fa-mug-saucer' },
    { id: 'normal', name: 'Café Tradicional', icon: 'fa-solid fa-mug-hot' },
    { id: 'intermedio', name: 'Café Especial', icon: 'fa-solid fa-seedling' },
    { id: 'premium', name: 'Café Exótico', icon: 'fa-solid fa-crown' }
  ]

  return {
    products,
    activeCategory,
    filteredProducts,
    categories,
    loadProducts,
    selectFormat
  }
}