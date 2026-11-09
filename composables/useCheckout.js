// composables/useCheckout.js
export const useCheckout = () => {
  const { cart, cartSubtotal } = useCart()
  const { closeCheckout, closeCart, openThankYou } = useModals() // 🆕 openThankYou
  const { showToast } = useToast()
  const { config, getWhatsAppNumber } = useConfig() 

  const form = ref({
    nombre: '', celular: '', tipoEntrega: 'retiro', direccion: '', numeroCasa: '',
    referencia: '', formaPago: '', montoEfectivo: '', aclaraciones: ''
  })
  const errors = ref({})

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36)
    return timestamp.slice(-5).toUpperCase()
  }

  const shippingCost = computed(() => {
    if (form.value.tipoEntrega === 'retiro') return 0
    const cost = config.value?.shipping?.cost || 2500
    const threshold = config.value?.shipping?.freeThreshold || 15000
    return cartSubtotal.value >= threshold ? 0 : cost
  })

  const totalPrice = computed(() => cartSubtotal.value + shippingCost.value)

  const validate = () => {
    errors.value = {}
    if (!form.value.nombre.trim()) errors.value.nombre = 'Obligatorio'
    if (!form.value.celular.trim()) errors.value.celular = 'Obligatorio'
    if (form.value.tipoEntrega === 'delivery') {
      if (!form.value.direccion.trim()) errors.value.direccion = 'Obligatorio'
      if (!form.value.numeroCasa.trim()) errors.value.numeroCasa = 'Obligatorio'
    }
    if (!form.value.formaPago) errors.value.formaPago = 'Selecciona una forma de pago'
    if (form.value.formaPago === 'efectivo' && (!form.value.montoEfectivo || Number(form.value.montoEfectivo) < totalPrice.value)) {
      errors.value.montoEfectivo = `Monto debe ser al menos $${totalPrice.value.toLocaleString('es-CL')}`
    }
    return Object.keys(errors.value).length === 0
  }

  const submit = async () => {
    if (!validate()) {
      showToast({ msg: 'Completa los campos obligatorios', type: 'error' })
      return
    }

    const orderNumber = generateOrderNumber()
    const paymentLabels = { efectivo: 'Efectivo', tarjeta: 'Tarjeta', transferencia: 'Transferencia', link: 'Link de Pago' }
    
    // Construir mensaje de WhatsApp
    let msg = `¡Hola Crescendo Roast! ☕\n\n`
    msg += `*📋 NUEVO PEDIDO*\n`
    msg += `*N° de pedido:* ${orderNumber}\n`
    msg += `━━━━━━━━━━━━━━━━━━\n\n`
    msg += `*👤 DATOS*\nNombre: ${form.value.nombre}\nCelular: ${form.value.celular}\n\n`
    msg += `*🚚 ENTREGA*\nTipo: ${form.value.tipoEntrega === 'retiro' ? 'Retiro en local' : 'Delivery'}\n`
    if (form.value.tipoEntrega === 'delivery') {
      msg += `Dirección: ${form.value.direccion} ${form.value.numeroCasa}\n`
      if (form.value.referencia) msg += `Ref: ${form.value.referencia}\n`
    }
    msg += `\n*💳 PAGO*\n${paymentLabels[form.value.formaPago]}\n`
    if (form.value.formaPago === 'efectivo') msg += `Paga con: $${Number(form.value.montoEfectivo).toLocaleString('es-CL')}\n`
    
    msg += `\n*🛒 PRODUCTOS*\n`
    cart.value.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.selectedFormat} - ${item.selectedPresentation}) x${item.qty} = $${(item.priceNum * item.qty).toLocaleString('es-CL')}\n`
    })
    
    msg += `\n━━━━━━━━━━━━━━━━━━\n*Subtotal:* $${cartSubtotal.value.toLocaleString('es-CL')}\n`
    msg += `*Envío:* ${shippingCost.value === 0 ? 'GRATIS' : `$${shippingCost.value.toLocaleString('es-CL')}`}\n`
    msg += `*TOTAL:* $${totalPrice.value.toLocaleString('es-CL')}\n`
    if (form.value.aclaraciones) msg += `\n*ACLARACIONES:* ${form.value.aclaraciones}`
    msg += `\n\n¡Quedo atento a la confirmación!`

    // Guardar log del pedido
    const orderData = {
      orderNumber,
      date: new Date().toISOString(),
      customer: {
        nombre: form.value.nombre,
        celular: form.value.celular
      },
      delivery: {
        type: form.value.tipoEntrega,
        address: form.value.tipoEntrega === 'delivery' ? {
          direccion: form.value.direccion,
          numeroCasa: form.value.numeroCasa,
          referencia: form.value.referencia
        } : null
      },
      payment: {
        method: form.value.formaPago,
        amount: form.value.formaPago === 'efectivo' ? Number(form.value.montoEfectivo) : null
      },
      items: cart.value.map(item => ({
        id: item.id,
        name: item.name,
        format: item.selectedFormat,
        presentation: item.selectedPresentation,
        qty: item.qty,
        unitPrice: item.priceNum,
        subtotal: item.priceNum * item.qty
      })),
      totals: {
        subtotal: cartSubtotal.value,
        shipping: shippingCost.value,
        total: totalPrice.value
      },
      notes: form.value.aclaraciones || null
    }

    try {
      await $fetch('/api/log-order', {
        method: 'POST',
        body: orderData
      })
    } catch (error) {
      console.error('Error guardando log del pedido:', error)
    }

    // Abrir WhatsApp
    const whatsappNumber = getWhatsAppNumber()
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
    
    // Limpiar formulario y carrito
    cart.value = []
    form.value = { nombre: '', celular: '', tipoEntrega: 'retiro', direccion: '', numeroCasa: '', referencia: '', formaPago: '', montoEfectivo: '', aclaraciones: '' }
    closeCheckout()
    closeCart()
    
    // 🆕 Mostrar modal de agradecimiento
    openThankYou(orderNumber)
  }

  return { form, errors, shippingCost, totalPrice, validate, submit }
}