// server/middleware/adminAuth.js
export default defineEventHandler((event) => {
  // Solo proteger rutas /api/admin/* (excepto login)
  if (!event.path.startsWith('/api/admin/') || event.path.includes('/login')) {
    return
  }
  
  const authHeader = getHeader(event, 'authorization')
  const config = useRuntimeConfig()
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'No autorizado'
    })
  }
  
  const token = authHeader.substring(7)
  
  // Validar token (en producción verificarías JWT)
  if (!token || token.length < 10) {
    throw createError({
      statusCode: 401,
      message: 'Token inválido'
    })
  }
})