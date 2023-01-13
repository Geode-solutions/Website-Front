<template>
  <v-app v-if="!loading">
    <CommonHeader />
    <v-main class="bg-secondary">
      <slot />
    </v-main>
    <!-- <CookieControl v-if="this.$config.NODE_ENV === 'production'"/> -->
    <CommonFooter />
  </v-app>
</template>

<script setup>
const loading = ref(true)
onMounted(() => { loading.value = false })
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

<style>
.v-card__text,
.v-card__title {
  word-break: normal;
  /* maybe !important  */
}
</style>
