<template>
    <v-container>
        <label class="text-medium-emphasis text-body-1">Metric</label>
        <v-slider v-model="metric" min="0.5" max="10" step="0.5" thumb-label></v-slider>
    </v-container>
</template>

<script setup>
const inputsStore = useInputStore()
const { metric } = storeToRefs(inputsStore)
metric.value = 2;
</script>

