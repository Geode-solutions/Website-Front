<template>
    <v-container>
        <label class="text-medium-emphasis text-body-1">Metric</label>
        <v-slider v-model="metric" min="1" max="10" step="1" thumb-label @input="alterMetric"></v-slider>
    </v-container>
</template>

<script setup>
const inputsStore = useInputStore()
const metric = ref(10);
function alterMetric() {
    inputsStore.setMetric(metric.value)
}
alterMetric()
</script>

