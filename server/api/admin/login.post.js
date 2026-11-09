// server/api/admin/login.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  const { username, password } = body
  
  // Si no hay variables de entorno, usa estos valores por defecto para pruebas
  const validUser = config.adminUsername || 'admin'
  const validPass = config.adminPassword || 'Crescendo2026!'
  
  if (username === validUser && password === validPass) {
    // Generar token simple
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
    
    return {
      success: true,
      token,
      user: { username }
    }
  }
  
  return {
    success: false,
    error: 'Credenciales inválidas'
  }
})