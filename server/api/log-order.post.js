// server/api/log-order.post.js
import { readBody } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Ruta del archivo JSON de logs
    const dataDir = path.join(process.cwd(), 'server', 'data')
    const ordersFile = path.join(dataDir, 'orders.json')
    
    // Crear carpeta si no existe
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Leer pedidos existentes o crear array vacío
    let orders = []
    if (fs.existsSync(ordersFile)) {
      const content = fs.readFileSync(ordersFile, 'utf-8')
      try {
        orders = JSON.parse(content)
        if (!Array.isArray(orders)) orders = []
      } catch (e) {
        orders = []
      }
    }
    
    // Agregar nuevo pedido al inicio (más recientes primero)
    orders.unshift(body)
    
    // Escribir archivo
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf-8')
    
    return {
      success: true,
      message: 'Pedido registrado',
      orderNumber: body.orderNumber
    }
  } catch (error) {
    console.error('Error en log-order:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al registrar el pedido'
    })
  }
})