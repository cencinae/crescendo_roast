// composables/useToast.js
export const useToast = () => {
  const toast = useState('toast', () => ({ 
    show: false, 
    msg: '', 
    type: 'success' 
  }))

  const showToast = (options) => {
    // Soporta tanto string como objeto
    if (typeof options === 'string') {
      toast.value = { show: true, msg: options, type: 'success' }
    } else {
      toast.value = { 
        show: true, 
        msg: options.msg || '', 
        type: options.type || 'success' 
      }
    }
    
    setTimeout(() => {
      toast.value.show = false
    }, 3000)
  }

  return { toast, showToast }
}