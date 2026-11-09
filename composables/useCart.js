// composables/useCart.js
export const useCart = () => {
  const cart = useState('cart', () => [])
  const cartOpen = useState('cartOpen', () => false)
  const { showToast } = useToast()

  const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))
  const cartSubtotal = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.priceNum * item.qty), 0)
  )

  const addToCart = (product) => {
    const format = product.formats.find(f => f.weight === product.selectedFormat)
    
    // Validar que el formato esté disponible
    if (format && format.available === false) {
      showToast({ msg: 'Este formato no está disponible', type: 'error' })
      return
    }
    
    const cartItem = { 
      ...product, 
      priceNum: format.priceNum, 
      qty: 1 
    }
    
    // Buscar si ya existe en el carrito (mismo ID, formato y presentación)
    const existingIndex = cart.value.findIndex(i => 
      i.id === cartItem.id && 
      i.selectedFormat === cartItem.selectedFormat && 
      i.selectedPresentation === cartItem.selectedPresentation
    )

    if (existingIndex !== -1) {
      // Ya existe: actualizar cantidad
      cart.value[existingIndex].qty++
      showToast({ 
        msg: `✓ ${product.name} (${product.selectedFormat}) - Cantidad actualizada`, 
        type: 'success' 
      })
    } else {
      // No existe: agregar nuevo item
      cart.value.push(cartItem)
      showToast({ 
        msg: `✓ ${product.name} (${product.selectedFormat}) agregado al carrito`, 
        type: 'success' 
      })
    }
  }

  const updateQty = (id, format, presentation, delta) => {
    const item = cart.value.find(i => 
      i.id === id && i.selectedFormat === format && i.selectedPresentation === presentation
    )
    if (item) {
      item.qty += delta
      if (item.qty <= 0) {
        removeFromCart(id, format, presentation)
      }
    }
  }

  const removeFromCart = (id, format, presentation) => {
    cart.value = cart.value.filter(i => 
      !(i.id === id && i.selectedFormat === format && i.selectedPresentation === presentation)
    )
    showToast({ msg: 'Producto eliminado del carrito', type: 'info' })
  }

  const openCart = () => {
    cartOpen.value = true
    if (process.client) document.body.style.overflow = 'hidden'
  }

  const closeCart = () => {
    cartOpen.value = false
    if (process.client) document.body.style.overflow = ''
  }

  return { 
    cart, cartOpen, cartTotal, cartSubtotal,
    addToCart, updateQty, removeFromCart, openCart, closeCart 
  }
}