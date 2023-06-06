<template>
  <div class='pa-5'>
    <v-btn :loading='loading' color='primary' @click='inspect_file()'>
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size='20' color='white' width='3' />
      </template>
    </v-btn>
    <v-btn variant='text' @click='set_current_step(2)'>
      Cancel
    </v-btn>
  </div>
</template>

<script setup>
import { useToggle } from '@vueuse/core'

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files, input_geode_object } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const loading = ref(false)
const toggle_loading = useToggle(loading)

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

      toggle_loading()
      const route = `${tool_route}/upload_file`

      await api_fetch(route, { method: 'POST', body: params },
        {
          'request_error_function': () => {
            toggle_loading()
          },
          'response_function': () => {
            toggle_loading()
            resolve()
          },
          'response_error_function': () => {
            toggle_loading()
            reject()
          }
        }
      )
    }
    reader.readAsDataURL(input_files[0])
  })
}

async function get_tests_names () {
  const params = new FormData()
  params.append('geode_object', input_geode_object)
  const route = `${tool_route}/tests_names`

  await api_fetch(route, { method: 'POST', body: params },
    {
      'response_function': (response) => { stepper_tree.model_checks = response._data.model_checks }
    })
}

</script>

