<template>
  <v-app v-if="!loading" style="contain:layout">
    <CommonHeader />
    <v-main class="bg-secondary">
      <slot />
    </v-main>
    <CookieControl v-if="config.NODE_ENV === 'production'" />
    <CommonFooter />
  </v-app>
</template>

<script setup>
import { useToggle } from '@vueuse/core'
const config = useRuntimeConfig()
const loading = ref(true)
onMounted(() => { useToggle(loading) })
</script>

<style scoped>
* {
  text-transform: none !important;
}

.v-btn {
  min-width: 0;
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>