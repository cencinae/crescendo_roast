// server/api/admin/hero.put.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = getPublicPath('api/hero.json')
  
  // Obtener datos anteriores para eliminar imagen vieja si cambió
  const oldHero = readJsonFile(filePath)
  const oldImage = oldHero?.image
  const newImage = body.image
  
  // Si la imagen cambió y era local, eliminar la anterior
  if (oldImage && newImage && oldImage !== newImage) {
    const deleteResult = deleteImageFile(oldImage)
    if (deleteResult.success) {
      console.log(`✓ Imagen hero anterior eliminada: ${deleteResult.deleted}`)
    }
  }
  
  writeJsonFile(filePath, body)
  
  return { success: true, message: 'Hero actualizado correctamente' }
})