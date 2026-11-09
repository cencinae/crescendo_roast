// composables/useHero.js
export const useHero = () => {
  const hero = useState('hero', () => null)

  const loadHero = async () => {
    if (hero.value) return hero.value
    
    try {
      const { data } = await useFetch('/api/hero.json')
      if (data.value) {
        hero.value = data.value
      }
    } catch (error) {
      console.error('Error cargando hero:', error)
    }
    
    return hero.value
  }

  return { hero, loadHero }
}