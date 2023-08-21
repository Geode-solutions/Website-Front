<template>
    <v-container>
        <label class="text-medium-emphasis text-body-2">Metric</label>
        <v-text-field v-model="metric" id="metric" name="metric" @input="alterMetric"></v-text-field>
    </v-container>
</template>

<script setup>
    const inputsStore = useInputStore()
    const metric = ref();
    const alterMetric = () => {
        inputsStore.setMetric(metric)
    }
</script>

