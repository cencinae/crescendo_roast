<script setup>
const { toast } = useToast()

// Clases dinámicas según el tipo de notificación
const toastClasses = computed(() => {
  const base = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] toast'
  return base
})

const toastBg = computed(() => {
  switch (toast.value.type) {
    case 'error':
      return 'bg-red-600 text-white'
    case 'info':
      return 'bg-forest-900 text-white'
    case 'success':
    default:
      return 'bg-black text-white'
  }
})

const toastIcon = computed(() => {
  switch (toast.value.type) {
    case 'error':
      return 'fa-solid fa-circle-exclamation'
    case 'info':
      return 'fa-solid fa-circle-info'
    case 'success':
    default:
      return 'fa-solid fa-check-circle'
  }
})

const iconColor = computed(() => {
  switch (toast.value.type) {
    case 'error':
      return 'text-white'
    case 'info':
      return 'text-ember-400'
    case 'success':
    default:
      return 'text-ember-400'
  }
})
</script>

<template>
  <div v-if="toast.show" :class="toastClasses">
    <div :class="[toastBg, 'px-8 py-4 rounded-full shadow-2xl flex items-center gap-3']">
      <i :class="[toastIcon, iconColor]"></i>
      <span class="text-sm font-medium">{{ toast.msg }}</span>
    </div>
  </div>
</template>

<style scoped>
.toast {
  animation: toastIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes toastIn {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>