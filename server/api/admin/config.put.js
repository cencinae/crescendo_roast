// server/api/admin/config.put.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = getPublicPath('api/config.json')
  
  // Validación básica
  if (!body.whatsapp || !body.shipping) {
    throw createError({ statusCode: 400, message: 'Datos de configuración inválidos' })
  }
  
  writeJsonFile(filePath, body)
  
  return { success: true, message: 'Configuración guardada correctamente' }
})