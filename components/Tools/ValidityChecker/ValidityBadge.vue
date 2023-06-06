<template>
  <v-progress-circular v-if="value == null" size="25" color="primary" indeterminate />
  <v-icon v-else-if="value == 'error'" color="error" size="25">
    mdi-alert-circle-outline
  </v-icon>
  <v-icon v-else-if="value == true" color="primary" size="25">
    mdi-check-circle-outline
  </v-icon>
  <v-icon v-else-if="value == false" color="error" size="25">
    mdi-close-circle
  </v-icon>
</template>

<script setup>
const props = defineProps({
  value: { type: undefined, required: true }
})
</script>
