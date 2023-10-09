<template>
  <v-row
    no-gutters
    justify="space-around"
  >
    <v-col cols="2">
      <v-text-field
        v-model="constraint.x"
        disabled
        class="centered-input"
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="constraint.y"
        disabled
        class="centered-input"
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="constraint.z"
        disabled
        class="centered-input"
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model="constraint.value"
        class="centered-input"
        @update:model-value="alterConstraint"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  const inputsStore = useInputStore()
  const { constraints } = storeToRefs(inputsStore)
  const viewer_store = use_viewer_store()
  const props = defineProps({
    id: { type: Number, required: true },
  })
  const index = ref(props.id - 1)
  const constraint = ref({
    x: constraints.value[index.value]["x"],
    y: constraints.value[index.value]["y"],
    z: constraints.value[index.value]["z"],
    value: constraints.value[index.value]["value"],
  })
  async function alterConstraint() {
    if (isNaN(constraint.value.value)) {
      return
    }
    inputsStore.modifyConstraint(index.value, constraint)
    const params = new FormData()
    params.append("point", index.value)
    params.append("value", constraint.value.value)
    await api_fetch(
      "workflows/implicit/update_value",
      { method: "POST", body: params },
      {
        response_function: (response) => {
          viewer_store.update_data({ id: response._data.points })
        },
      },
    )
  }
</script>

<style scoped>
  .centered-input :deep(input) {
    text-align: center;
  }
</style>
