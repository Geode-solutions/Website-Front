<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspectFile()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="setCurrentStep(2)"> Cancel </v-btn>
  </div>
</template>

<script setup>
  import { useToggle } from "@vueuse/core"
  import InspectionButtonSchema from "@/components/Tools/ValidityChecker/InspectionButton.json"

  const stepper_tree = inject("stepper_tree")
  const { files, geode_object } = stepper_tree
  const props = defineProps({
    variable_to_update: { type: String, required: true },
    variable_to_increment: { type: String, required: true },
  })
  const { variable_to_update, variable_to_increment } = props
  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function inspectFile() {
    toggle_loading()
    await upload_files()
    await get_tests_names()
    toggle_loading()
    stepper_tree[variable_to_increment]++
  }

  function upload_files() {
    return upload_file({
      route: "tools/upload_file",
      files,
    })
  }

  async function get_tests_names() {
    const params = { geode_object: geode_object }
    await api_fetch(
      { schema: InspectionButtonSchema, params },
      {
        response_function: (response) => {
          stepper_tree[variable_to_update] = response._data.model_checks
        },
      },
    )
  }
</script>

<style scoped>
  .card {
    border-radius: 15px;
  }
</style>
