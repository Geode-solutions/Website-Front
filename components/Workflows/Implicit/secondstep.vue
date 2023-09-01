<template>
    <v-container>
        <v-select v-model="selected_axis" :items="axis" label="Axis" @click="alterAxis"></v-select>
        <label class="text-medium-emphasis text-body-1">Axis coordinate</label>
        <v-slider v-model="coordinate" min="0" max="40" step="1" thumb-label @input="alterCoordinate"></v-slider>
    </v-container>
</template>

<script setup>
const inputsStore = useInputStore()
const selected_axis = ref("X");
const axis = ["X", "Y", "Z"];
function alterAxis() {
    if (selected_axis.value == "X") {
        inputsStore.setAxis(0)
    }
    else if (selected_axis.value == "Y") {
        inputsStore.setAxis(1)
    }
    else if (selected_axis.value == "Z") {
        inputsStore.setAxis(2)
    }
}
alterAxis()
const coordinate = ref(13);
function alterCoordinate() {
    inputsStore.setCoordinate(coordinate.value)
}
alterCoordinate()
</script>

