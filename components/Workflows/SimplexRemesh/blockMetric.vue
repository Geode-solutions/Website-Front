<template>
    <v-row class="w-100">
        <p class="font-italic my-6 mr-5">{{ id ? `${id}` : '' }} :</p>
        <v-text-field v-model="metric" :id="`${num}_metric`" @input="alterBlockMetric" class="mt-2"></v-text-field>
    </v-row>
</template>

<script setup>
    import { storeToRefs } from 'pinia'

    const props = defineProps({
        id: { type: String, required: true },
        num: { type: Number, required: true },
    })
    const { id, num } = props
    const inputsStore = useInputStore()
    const { globalMetric, blockMetrics } = storeToRefs(inputsStore)
    const metric = ref()
    const alterBlockMetric = () => {
        inputsStore.setBlockMetric(metric, id)
    }

    if (blockMetrics.value.hasOwnProperty(id)) {
        metric.value = blockMetrics.value[id]
    } else {
        metric.value = globalMetric.value[0]._rawValue
    }
</script>
