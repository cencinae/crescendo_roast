// server/api/admin/hero.get.js
export default defineEventHandler(async () => {
  const filePath = getPublicPath('api/hero.json')
  const hero = readJsonFile(filePath)
  
  // Si está vacío, devuelve estructura por defecto
  if (!hero || Object.keys(hero).length === 0) {
    return {
      description: '',
      image: '/cafe.jpg',
      badge: { label: '', country: '', producer: '' },
      score: { value: 0, suffix: 'SCA' }
    }
  }
  
  return hero
})