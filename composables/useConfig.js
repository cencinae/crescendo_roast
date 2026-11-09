// composables/useConfig.js
export const useConfig = () => {
  const config = useState('config', () => null)

  const loadConfig = async () => {
    if (config.value) return config.value
    try {
      const { data } = await useFetch('/api/config.json')
      if (data.value) config.value = data.value
    } catch (error) {
      console.error('Error cargando configuración:', error)
    }
    return config.value
  }

  // 🆕 Nuevos helpers
  const getSiteUrl = () => config.value?.siteUrl || 'https://crescendoroast.cl'
  const getWhatsAppNumber = () => config.value?.whatsapp?.number || '56931893121'
  
  const getWhatsAppLink = (message) => {
    const msg = message || config.value?.whatsapp?.defaultMessage || ''
    return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(msg)}`
  }

  const getShippingCost = (subtotal) => {
    const cost = config.value?.shipping?.cost || 2500
    const threshold = config.value?.shipping?.freeThreshold || 15000
    return subtotal >= threshold ? 0 : cost
  }

  const getPaymentMethods = () => config.value?.paymentMethods || []
  const getAvailablePaymentMethods = () => getPaymentMethods().filter(m => m.available !== false)
  const getSocials = () => config.value?.socials || []
  const getBankAccount = () => config.value?.bankAccount || null

  return {
    config,
    loadConfig,
    getSiteUrl,          // 🆕
    getWhatsAppNumber,   // 🆕
    getWhatsAppLink,
    getShippingCost,
    getPaymentMethods,
    getAvailablePaymentMethods,
    getSocials,
    getBankAccount
  }
}