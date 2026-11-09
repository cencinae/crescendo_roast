// composables/useModals.js
export const useModals = () => {
  const selectedProduct = useState('selectedProduct', () => null)
  const cartOpen = useState('cartOpen', () => false)
  const checkoutOpen = useState('checkoutOpen', () => false)
  const thankYouOpen = useState('thankYouOpen', () => false) // 🆕
  const lastOrderNumber = useState('lastOrderNumber', () => null) // 🆕 Guarda el último pedido

  const openProduct = (product) => {
    selectedProduct.value = JSON.parse(JSON.stringify(product))
    if (process.client) document.body.style.overflow = 'hidden'
  }

  const closeProduct = () => {
    selectedProduct.value = null
    if (process.client) document.body.style.overflow = ''
  }

  const openCart = () => {
    cartOpen.value = true
    if (process.client) document.body.style.overflow = 'hidden'
  }

  const closeCart = () => {
    cartOpen.value = false
    if (process.client) document.body.style.overflow = ''
  }

  const openCheckout = () => {
    cartOpen.value = false
    checkoutOpen.value = true
  }

  const closeCheckout = () => {
    checkoutOpen.value = false
    if (process.client) document.body.style.overflow = ''
  }

  // 🆕 Funciones para el modal de agradecimiento
  const openThankYou = (orderNumber) => {
    lastOrderNumber.value = orderNumber
    thankYouOpen.value = true
    if (process.client) document.body.style.overflow = 'hidden'
  }

  const closeThankYou = () => {
    thankYouOpen.value = false
    lastOrderNumber.value = null
    if (process.client) document.body.style.overflow = ''
  }

  return { 
    selectedProduct, cartOpen, checkoutOpen, thankYouOpen, lastOrderNumber,
    openProduct, closeProduct, 
    openCart, closeCart, 
    openCheckout, closeCheckout,
    openThankYou, closeThankYou // 🆕
  }
}