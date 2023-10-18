<template>
  <v-app style="contain: layout">
    <CommonHeader />
    <v-main class="bg-secondary">
      <slot />
    </v-main>
    <CookieControl v-if="public_config.NODE_ENV === 'production'" />
    <CommonFooter />
  </v-app>
</template>

<script setup>
  const public_config = useRuntimeConfig().public
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
