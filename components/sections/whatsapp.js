export const WHATSAPP_NUMBER = '56931893121'

export const buildWhatsappUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const defaultMessage = 'Hola Crescendo Roast! Quiero hacer un pedido.'
export const b2bMessage = 'Hola Crescendo Roast! Tengo una cafetería y me interesa la venta mayorista.'