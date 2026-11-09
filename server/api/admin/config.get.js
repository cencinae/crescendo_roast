// server/api/admin/config.get.js
export default defineEventHandler(async () => {
  const filePath = getPublicPath('api/config.json')
  const config = readJsonFile(filePath)
  
  // Si el archivo está vacío o no existe, devuelve la estructura por defecto
  if (!config || Object.keys(config).length === 0) {
    return {
      whatsapp: { number: '56931893121', defaultMessage: 'Hola!', b2bMessage: 'Hola!' },
      shipping: { cost: 2500, freeThreshold: 15000, city: 'Talca', region: 'Región del Maule' },
      bankAccount: { bank: 'Banco Estado', accountType: 'Cuenta Vista', accountNumber: '', rut: '', holder: '' },
      paymentMethods: [
        { id: 'efectivo', label: 'Efectivo', icon: 'fa-solid fa-money-bill-wave', available: true },
        { id: 'tarjeta', label: 'Tarjeta', icon: 'fa-solid fa-credit-card', available: true },
        { id: 'transferencia', label: 'Transferencia', icon: 'fa-solid fa-building-columns', available: true },
        { id: 'link', label: 'Link de Pago', icon: 'fa-solid fa-link', available: false }
      ],
      socials: [
        { name: 'Instagram', icon: 'fa-brands fa-instagram', url: '' },
        { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '' },
        { name: 'TikTok', icon: 'fa-brands fa-tiktok', url: '' },
        { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: '' }
      ]
    }
  }
  
  return config
})