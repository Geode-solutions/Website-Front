<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="decrement_current_step()">Cancel</v-btn>
  </div>
</template>

<script setup>
  import InspectionButtonSchema from "@/components/Tools/ValidityChecker/InspectionButton.json"

  const props = defineProps({
    files: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
  })
  const { files, input_geode_object } = props

  const stepper_tree = inject("stepper_tree")
  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function inspect_file() {
    toggle_loading()
    await upload_files()
    await get_tests_names()
    toggle_loading()
    stepper_tree["current_step_index"]++
  }

  function decrement_current_step() {
    stepper_tree["current_step_index"]--
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
          stepper_tree["model_checks"] = response._data.model_checks
        },
      },
    )
  }
</script>

<style scoped>
  .card {
    border-radius: 15px;
  }

  .v-btn {
    text-transform: unset !important;
  }
</style>
