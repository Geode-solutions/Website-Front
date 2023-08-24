<template>
    <v-container>
        <label class="text-medium-emphasis text-body-2">Axis</label>
        <v-text-field v-model="axis" id="axis" name="axis" @input="alterAxis"></v-text-field>

        <label class="text-medium-emphasis text-body-2">Direction</label>
        <v-text-field v-model="direction" id="direction" name="direction" @input="alterDirection"></v-text-field>
    </v-container>
</template>

<script setup>

    const inputsStore = useInputStore()

    const axis = ref();
    const direction = ref();

    const alterAxis = () => {
        inputsStore.setAxis(axis)
    }

    const alterDirection = () => {
        inputsStore.setDirection(direction)
    }
</script>

