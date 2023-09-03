<template>
    <v-row no-gutters justify="space-around">
        <v-col cols="2">
            <v-text-field v-model="constraint.x" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="constraint.y" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="constraint.z" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="constraint.value" class="centered-input" @input="alterConstraint"></v-text-field>
        </v-col>
    </v-row>
</template>

<script setup>
const inputsStore = useInputStore()
const { constraints } = storeToRefs(inputsStore)
const props = defineProps({
    id: { type: Number, required: true },
})
const index = ref(props.id - 1)
console.log(constraints)
const constraint = ref({
    "x": constraints.value[index.value]["x"],
    "y": constraints.value[index.value]["y"],
    "z": constraints.value[index.value]["z"],
    "value": constraints.value[index.value]["value"]
});
async function alterConstraint() {
    inputsStore.modifyConstraint(index.value, constraint)
    const params = new FormData();
    params.append('point', index.value);
    params.append('value', constraint.value.value);
    await api_fetch('workflows/implicit/update_value', { method: 'POST', body: params },
        {
            'response_function': (response) => {
                console.log("update_toto", response)
                viewer_store.update_toto({ "id": response._data.points })
                console.log("update_value end")
            },
        }
    )
}
</script>

<style scoped>
.centered-input :deep(input) {
    text-align: center
}
</style>