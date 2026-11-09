// composables/useProducts.js
export const useProducts = () => {
  const products = useState('products', () => [])
  const activeCategory = useState('activeCategory', () => 'normal')

  const loadProducts = async () => {
    if (products.value.length > 0) return
    try {
      const { data } = await useFetch('/api/products.json')
      if (data.value) {
        products.value = data.value
      }
    } catch (error) {
      console.error('Error cargando productos:', error)
    }
  }

  const filteredProducts = computed(() => 
    products.value.filter(p => p.category === activeCategory.value)
  )

  const selectFormat = (productId, weight) => {
    // Actualizar en el array principal de productos
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.selectedFormat = weight
    }
    
    // Actualizar también en el modal si está abierto
    const { selectedProduct } = useModals()
    if (selectedProduct.value && selectedProduct.value.id === productId) {
      selectedProduct.value.selectedFormat = weight
    }
  }

  const categories = [
    { id: 'normal', name: 'Café Tradicional', tag: 'Clásico', icon: 'fa-solid fa-mug-hot' },
    { id: 'intermedio', name: 'Café Especial', tag: 'Selección', icon: 'fa-solid fa-seedling' },
    { id: 'premium', name: 'Café Exótico', tag: 'Exclusivo', icon: 'fa-solid fa-crown' }
  ]

  return { 
    products, 
    activeCategory, 
    filteredProducts, 
    categories,
    selectFormat, 
    loadProducts 
  }
}