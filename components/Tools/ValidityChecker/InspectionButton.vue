<template>
  <div class="pa-0">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
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
    files: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
  })
  const { files, input_geode_object } = props

  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function inspect_file() {
    toggle_loading()
    await upload_files()
    await get_tests_names()
    toggle_loading()
    emit("increment_step")
  }

  function upload_files() {
    return upload_file({
      route: "tools/upload_file",
      files,
    })
  }

  async function get_tests_names() {
    const params = { input_geode_object }
    await api_fetch(
      { schema: InspectionButtonSchema, params },
      {
        response_function: (response) => {
          emit("update_values", { model_checks: response._data.model_checks })
        },
      },
    )
  }
</script>
