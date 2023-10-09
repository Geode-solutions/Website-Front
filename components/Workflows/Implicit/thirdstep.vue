<template>
  <v-container>
    <p class="mb-2 text-medium-emphasis text-body-1 text-center">
      Give a metric for remeshing the extracted Section
    </p>
    <v-slider v-model="metric" min="0.5" max="10" step="0.5" thumb-label />
  </v-container>
</template>

<script setup>
  const inputsStore = useInputStore()
  const { metric } = storeToRefs(inputsStore)
  metric.value = 2
</script>
