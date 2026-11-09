// server/api/admin/products.put.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = getPublicPath('api/products.json')
  const products = readJsonFile(filePath)
  
  const index = products.findIndex(p => p.id === body.id)
  if (index === -1) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
  
  // 🆕 Obtener la imagen anterior
  const oldProduct = products[index]
  const oldImage = oldProduct.image
  const newImage = body.image
  
  // 🆕 Si la imagen cambió Y la anterior era local, eliminarla
  if (oldImage && newImage && oldImage !== newImage) {
    const deleteResult = deleteImageFile(oldImage)
    if (deleteResult.success) {
      console.log(`✓ Imagen anterior eliminada: ${deleteResult.deleted}`)
    }
  }
  
  // Actualizar el producto
  products[index] = { ...oldProduct, ...body }
  writeJsonFile(filePath, products)
  
  return { success: true, product: products[index] }
})