<template>
    <v-row no-gutters justify="center" align="center">
        <v-col cols="3">
            <label>Isovalue {{ id ? `${id}` : '' }}</label>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="isovalue" class="centered-input" @input="alterIsovalue"></v-text-field>
        </v-col>
    </v-row>
</template>

<script setup>
const inputsStore = useInputStore()
const props = defineProps({
    id: { type: Number, required: true },
})
const { id } = props
const isovalue = ref((id - 1) / 2);
function alterIsovalue() {
    inputsStore.modifyIsovalue(id - 1, isovalue.value)
}
alterIsovalue()
</script>

<style scoped>
.centered-input :deep(input) {
    text-align: center
}
</style>