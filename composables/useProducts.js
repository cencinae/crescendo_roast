// composables/useProducts.js
export const useProducts = () => {
  const products = useState('products', () => [])
  const activeCategory = useState('activeCategory', () => 'all')
  const selectedFormats = useState('selectedFormats', () => ({}))

  const loadProducts = async () => {
    try {
      const { data } = await useFetch('/api/products.json')
      if (data.value) {
        // 🆕 Filtrar solo productos publicados (o sin status = publicado por defecto)
        products.value = data.value.filter(p => {
          if (!p.status) return true // Retrocompatibilidad
          return p.status === 'publicado'
        })
      }
    } catch (error) {
      console.error('Error cargando productos:', error)
    }
  }

  const selectFormat = (productId, weight) => {
    selectedFormats.value[productId] = weight
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
    selectedFormats,
    filteredProducts,
    categories,
    loadProducts,
    selectFormat
  }
}