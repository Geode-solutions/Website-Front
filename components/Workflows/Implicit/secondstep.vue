<template>
  <v-container>
    <p class="mb-2 text-medium-emphasis text-body-1 text-center">
      Choose and axis and a coordinate on this axis <br>
      an Implicit Cross will be extracted on the plane normal to this axis at
      the given coordinate
    </p>
    <v-select
      v-model="selected_axis"
      :items="axis"
      label="Axis"
      @click="alterAxis"
    />
    <p class="text-medium-emphasis text-body-1">
      Axis coordinate
    </p>
    <v-slider
      v-model="coordinate"
      min="0"
      max="40"
      step="1"
      thumb-label
    />
  </v-container>
</template>

<script setup>
  const inputsStore = useInputStore()
  const selected_axis = ref("X")
  const axis = ["X", "Y", "Z"]
  function alterAxis() {
    if (selected_axis.value == "X") {
      inputsStore.setAxis(0)
    } else if (selected_axis.value == "Y") {
      inputsStore.setAxis(1)
    } else if (selected_axis.value == "Z") {
      inputsStore.setAxis(2)
    }
  }
  alterAxis()
  const { coordinate } = storeToRefs(inputsStore)
  coordinate.value = 13
</script>
