<script setup>
import { useReveal } from '~/composables/useReveal'

useReveal()
</script>

<template>
  <div>
    <LayoutTopMarquee />
    <LayoutTheHeader />
    
    <main>
      <slot />
    </main>
    
    <LayoutTheFooter />

    <!-- Modales globales -->
    <ModalsProductDetailModal />
    <ModalsCartDrawer />
    <ModalsCheckoutModal />
    <ModalsThankYouModal />  <!-- 🆕 -->
    <UiToast />
  </div>
</template>