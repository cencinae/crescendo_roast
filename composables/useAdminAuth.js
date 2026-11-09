// composables/useAdminAuth.js
export const useAdminAuth = () => {
  const authToken = useState('adminToken', () => null)
  const isAdmin = computed(() => !!authToken.value)

  const login = async (username, password) => {
    try {
      const response = await $fetch('/api/admin/login', {
        method: 'POST',
        body: { username, password }
      })
      
      if (response.success) {
        authToken.value = response.token
        return { success: true }
      }
      
      return { success: false, error: response.error }
    } catch (error) {
      return { success: false, error: 'Error de conexión' }
    }
  }

  const logout = () => {
    authToken.value = null
    navigateTo('/admin/login')
  }

  const checkAuth = () => {
    if (!authToken.value) {
      navigateTo('/admin/login')
    }
  }

  return { authToken, isAdmin, login, logout, checkAuth }
}