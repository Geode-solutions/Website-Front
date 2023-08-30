<template>
    <v-row>
        <v-col>
            <label>X</label>
            <v-text-field v-model="constraint.x" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col>
            <label>Y</label>
            <v-text-field v-model="constraint.y" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col>
            <label>Z</label>
            <v-text-field v-model="constraint.z" disabled class="centered-input"></v-text-field>
        </v-col>
        <v-col>
            <label>Value</label>
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
function alterConstraint() {
    inputsStore.modifyConstraint(index.value, constraint)
}
</script>

<style scoped>
.centered-input :deep(input) {
    text-align: center
}
</style>