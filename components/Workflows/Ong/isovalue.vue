
<template>

    <label :for="`${id}_isovalue`">Isovalue_{{ id ? `${id}` : '' }}</label>
    <v-text-field v-model="isovalue" :id="`${id}_isovalue`" :name="`${id}_isovalue`" @input="alterIsovalue"></v-text-field>

</template>

<script setup>
    import {useInputStore} from "@/stores/inputs"
    import { storeToRefs } from 'pinia'

    const inputsStore = useInputStore()

    const props = defineProps({
        id: { type: Number, required: true },
    })
    const { id } = props

    const isovalue = ref();

    const alterIsovalue = () => {
        inputsStore.modifyIsovalue(id-1, isovalue)
    }
</script>
