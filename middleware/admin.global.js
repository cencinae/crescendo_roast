export default defineNuxtRouteMiddleware((to) => {
  // Proteger todas las rutas que empiecen con /admin, excepto el login
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    const authToken = useState('adminToken', () => null)
    
    if (!authToken.value) {
      return navigateTo('/admin/login')
    }
  }
})