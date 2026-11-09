// server/api/admin/products.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = getPublicPath('api/products.json')
  const products = readJsonFile(filePath)
  
  // Generar ID único (máximo ID + 1)
  const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0
  const newProduct = {
    ...body,
    id: maxId + 1
  }
  
  products.push(newProduct)
  writeJsonFile(filePath, products)
  
  return { success: true, product: newProduct }
})