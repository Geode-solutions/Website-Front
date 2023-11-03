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
  // import explicit_json from "/explicit.json"
  // import InspectionButtonSchema from "@/components/Tools/ValidityChecker/InspectionButton.json"
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
    await uploadFile()
    await getTestsNames()
    stepper_tree[variable_to_increment]++
  }

  async function uploadFile() {
    toggle_loading()
    const params = {
      file: files[0],
    }
    await upload_file({ route: "tools/upload_file", params })
    toggle_loading()
  }
  async function getTestsNames() {
    const params = { geode_object: geode_object }
    await api_fetch(
      { schema: InspectionButtonSchema, params },
      {
        response_function: (response) => {
          console.log("model_checks", response._data.model_checks)
          stepper_tree[variable_to_update] = response._data.model_checks
          console.log("variable_to_update", variable_to_update)
          console.log(
            "stepper_tree[variable_to_update]",
            stepper_tree[variable_to_update],
          )
        },
      },
    )
  }
  async function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        resolve(event.target.result)
      }
      reader.onerror = function () {
        reject(new Error("Error reading file"))
      }
      reader.readAsDataURL(file)
    })
  }
</script>

<style scoped>
  .card {
    border-radius: 15px;
  }
</style>
