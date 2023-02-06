<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="set_current_step(2)">
      Cancel
    </v-btn>
  </div>
</template>

<script setup>

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files, input_geode_object } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const loading = ref(false)


async function inspect_file () {
  await upload_file()
  await get_tests_names()
  stepper_tree.current_step_index++
}




async function upload_file () {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function (event) {
      const params = new FormData()
      params.append('file', event.target.result)
      params.append('filename', input_files[0].name)
      params.append('filesize', input_files[0].size)

      loading.value = true
      const { data, error } = await api_fetch(`${tool_route}/uploadfile`, { body: params, method: 'POST' })
      if (data.value !== null) {
        loading.value = false
        resolve(data)
      } else {
        loading.value = false
        reject(error)
      }

    }
    reader.readAsDataURL(input_files[0])
  })
}

async function get_tests_names () {
  const params = new FormData()
  params.append('object', input_geode_object)
  const { data } = await api_fetch(`${tool_route}/testsnames`, { body: params, method: 'POST' })
  stepper_tree.model_checks = data.value.modelChecks
}

</script>

