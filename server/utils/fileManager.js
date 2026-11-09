// server/utils/fileManager.js
import fs from 'fs'
import path from 'path'

export const readJsonFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return []
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error leyendo archivo:', error)
    return []
  }
}

export const writeJsonFile = (filePath, data) => {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export const getPublicPath = (relativePath) => {
  return path.join(process.cwd(), 'public', relativePath)
}

// 🆕 Función para eliminar archivos del servidor
export const deleteImageFile = (imageUrl) => {
  try {
    // Solo eliminar archivos que estén en /uploads/ (no URLs externas)
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) {
      return { success: false, reason: 'No es un archivo local' }
    }
    
    // Convertir URL a ruta absoluta del sistema
    const fileName = imageUrl.replace('/uploads/', '')
    
    // Seguridad: evitar path traversal (que alguien intente borrar archivos fuera de /uploads/)
    if (fileName.includes('..') || fileName.includes('/')) {
      return { success: false, reason: 'Ruta inválida' }
    }
    
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)
    
    // Verificar que el archivo existe antes de eliminarlo
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return { success: true, deleted: filePath }
    }
    
    return { success: false, reason: 'Archivo no existe' }
  } catch (error) {
    console.error('Error eliminando imagen:', error)
    return { success: false, reason: error.message }
  }
}