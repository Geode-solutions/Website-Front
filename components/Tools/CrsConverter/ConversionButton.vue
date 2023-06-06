<template>
  <v-btn :loading="loading" color="primary" @click="convert_files()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step = 3">
    Cancel
  </v-btn>
</template>
  
<script setup>
import { useToggle } from '@vueuse/core'
import fileDownload from 'js-file-download'

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files,
  input_geode_object,
  input_crs,
  output_crs,
  input_output_extension } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const loading = ref(false)

const toggle_loading = useToggle(loading)

async function convert_files () {
  for (let i = 0; i < input_files.length; i++) {

    let reader = new FileReader()
    reader.onload = async function (event) {
      let params = new FormData()

      params.append('geode_object', input_geode_object)
      params.append('file', event.target.result)
      params.append('filename', input_files[i].name)
      params.append('filesize', input_files[i].size)
      params.append('input_crs_authority', input_crs['authority'])
      params.append('input_crs_code', input_crs['code'])
      params.append('input_crs_name', input_crs['name'])
      params.append('output_crs_authority', output_crs['authority'])
      params.append('output_crs_code', output_crs['code'])
      params.append('output_crs_name', output_crs['name'])
      params.append('extension', input_output_extension)
      params.append('responseType', 'blob')
      params.append('responseEncoding', 'binary')
      toggle_loading()

      const route = `${tool_route}/convert_file`
      await api_fetch(route, { method: 'POST', body: params },
        {
          'request_error_function': () => { toggle_loading() },
          'response_function': (response) => {
            const new_file_name = response.headers.get('new-file-name')
            fileDownload(response._data, new_file_name)
            toggle_loading()
          },
          'response_error_function': () => { toggle_loading() }
        }
      )
    }
    reader.readAsDataURL(input_files[i])
  }
}

</script>