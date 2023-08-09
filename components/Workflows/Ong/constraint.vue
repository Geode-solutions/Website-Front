
<template>
    <v-row>
        <v-col>
            <label :for="`${id}_x`">X_{{ id ? `${id}` : '' }}</label>
            <v-text-field v-model="constraint.x" :id="`${id}_x`" :name="`${id}_x`" @input="alterConstraint"></v-text-field>
        </v-col>
        <v-col>
            <label :for="`${id}_y`">Y_{{ id ? `${id}` : '' }}</label>
            <v-text-field  v-model="constraint.y" :id="`${id}_y`" :name="`${id}_y`" @input="alterConstraint"></v-text-field>
        </v-col>
        <v-col>
            <label :for="`${id}_z`">Z_{{ id ? `${id}` : '' }}</label>
            <v-text-field v-model="constraint.z" :id="`${id}_z`" :name="`${id}_z`" @input="alterConstraint"></v-text-field>
        </v-col>
        <v-col>
            <label :for="`${id}_value`">Value_{{ id ? `${id}` : '' }}</label>
            <v-text-field v-model="constraint.value" :id="`${id}_value`" :name="`${id}_value`" @input="alterConstraint"></v-text-field>
        </v-col>
        <v-col>
            <label :for="`${id}_weight`">Weight_{{ id ? `${id}` : '' }}</label>
            <v-text-field  v-model="constraint.weight" :id="`${id}_weight`" :name="`${id}_weight`" @input="alterConstraint"></v-text-field>
        </v-col>
    </v-row>

</template>


<script setup>
    import {useInputStore} from "@/stores/inputs"
    import { storeToRefs } from 'pinia'

    const inputsStore = useInputStore()    
    const { constraints } = storeToRefs(inputsStore)


    const props = defineProps({
        id: { type: Number, required: true },
    })
    const { id } = props
    const index = ref(id-1)

    const constraint = ref({"x":constraints.value[index.value]["x"], "y":constraints.value[index.value]["y"], "z":constraints.value[index.value]["z"], "value":constraints.value[index.value]["value"], "weight":constraints.value[index.value]["weight"]});

    const alterConstraint = () => {
        inputsStore.modifyConstraint(index.value, constraint)
    }

</script>