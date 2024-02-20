<template>
  <v-row no-gutters justify="space-around">
    <v-col cols="2">
      <v-text-field v-model="constraint.x" disabled class="centered-input" />
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="constraint.y" disabled class="centered-input" />
    </v-col>
    <v-col cols="2">
      <v-text-field v-model="constraint.z" disabled class="centered-input" />
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
  import implicit_json from "@/pages/workflows/implicit.json"

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
    const params = {
      points: index.value,
      value: constraint.value,
    }
    await api_fetch(
      { schema: implicit_json.update_value, params },
      {
        response_function: (response) => {
          viewer_call({
            schema: schemas.opengeodeweb_viewer.update_data,
            params: {
              id: response._data.points,
            },
          })
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
