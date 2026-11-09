// server/api/admin/products.get.js
export default defineEventHandler(async () => {
  const filePath = getPublicPath('api/products.json')
  const products = readJsonFile(filePath)
  return products
})