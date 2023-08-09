
<template>
    <v-row class="w-100">
        <p class="font-italic my-6 mr-5">{{ id ? `${id}` : '' }} :</p>
        <v-text-field v-model="metric" :id="`${num}_metric`" @input="alterSurfaceMetric" class="mt-2"></v-text-field>
    </v-row>

</template>

<script setup>
    import {useInputStore} from "@/stores/inputs"
    import { storeToRefs } from 'pinia'

    const inputsStore = useInputStore()
    const { globalMetric, surfaceMetrics } = storeToRefs(inputsStore)

    const props = defineProps({
        id: { type: String, required: true },
        num: { type: Number, required: true },
    })
    const { id, num } = props

    const metric = ref()

    if (surfaceMetrics.value.hasOwnProperty(id)) {
        metric.value = surfaceMetrics.value[id]
    } else {
        metric.value = globalMetric.value[0]._rawValue
    }

    

    const alterSurfaceMetric = () => {
        inputsStore.setSurfaceMetric(metric, id)
    }
</script>
