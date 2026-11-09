// server/api/admin/upload.post.js
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  try {
    const items = await readMultipartFormData(event)
    
    if (!items || items.length === 0) {
      throw createError({ statusCode: 400, message: 'No se recibió archivo' })
    }
    
    const file = items[0]
    const fileName = file.filename || 'image.jpg'
    const ext = fileName.split('.').pop()
    
    // Nombre único
    const uniqueName = `${randomUUID()}.${ext}`
    
    // Crear carpeta uploads si no existe
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    
    // Guardar archivo
    const filePath = join(uploadsDir, uniqueName)
    await writeFile(filePath, file.data)
    
    return {
      success: true,
      url: `/uploads/${uniqueName}`,
      filename: uniqueName
    }
  } catch (error) {
    console.error('Error subiendo archivo:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al subir la imagen'
    })
  }
})