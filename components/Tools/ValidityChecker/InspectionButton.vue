<template>
  <div class="pa-0">
    <v-btn :loading="loading" color="primary" @click="get_tests_names()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="emit('decrement_step')">Cancel</v-btn>
  </div>
</template>

<script setup>
  import InspectionButtonSchema from "@/components/Tools/ValidityChecker/InspectionButton.json"

  const emit = defineEmits([
    "update_values",
    "increment_step",
    "decrement_step",
  ])
  const props = defineProps({
    input_geode_object: { type: String, required: true },
  })
  const { input_geode_object } = props

  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function get_tests_names() {
    toggle_loading()
    const params = { input_geode_object }
    await api_fetch(
      { schema: InspectionButtonSchema, params },
      {
        response_function: (response) => {
          emit("update_values", { model_checks: response._data.model_checks })
          emit("increment_step")
        },
      },
    )
    toggle_loading()
  }
</script>
