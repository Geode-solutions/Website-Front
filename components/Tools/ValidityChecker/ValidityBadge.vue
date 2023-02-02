<template>
  <v-progress-circular v-if="value == null" size="20" color="primary" indeterminate class="pr-3" />
  <v-icon v-else-if="value == 'error'" color="error" class="pr-3">
    mdi-alert-circle-outline
  </v-icon>
  <v-icon v-else-if="value == true" color="primary" class="pr-3">
    mdi-check-circle-outline
  </v-icon>
  <v-icon v-else-if="value == false" color="error" class="pr-3">
    mdi-close-circle
  </v-icon>
</template>

<script setup>
const props = defineProps({
  value: { type: undefined, required: true }
})
</script>
