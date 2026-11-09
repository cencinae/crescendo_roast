// server/api/admin/products.delete.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = getPublicPath('api/products.json')
  const products = readJsonFile(filePath)
  
  // 🆕 Buscar el producto antes de eliminarlo para obtener su imagen
  const productToDelete = products.find(p => p.id === body.id)
  
  // 🆕 Eliminar la imagen del servidor si existe
  if (productToDelete && productToDelete.image) {
    const deleteResult = deleteImageFile(productToDelete.image)
    if (deleteResult.success) {
      console.log(`✓ Imagen eliminada: ${deleteResult.deleted}`)
    }
  }
  
  // Eliminar el producto del JSON
  const filtered = products.filter(p => p.id !== body.id)
  writeJsonFile(filePath, filtered)
  
  return { success: true }
})