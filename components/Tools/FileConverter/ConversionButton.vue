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
import fileDownload from 'js-file-download'
import { use_cloud_store } from '@/stores/cloud'
import { use_errors_store } from '@/stores/errors'

const cloud_store = use_cloud_store()
const errors_store = use_errors_store()
const { ID } = storeToRefs(cloud_store)

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files,
  input_geode_object,
  input_output_extension } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const loading = ref(false)

async function convert_files () {
  for (let i = 0; i < input_files.length; i++) {

    let reader = new FileReader()
    reader.onload = async function (event) {
      let params = new FormData()

      params.append('object', input_geode_object)
      params.append('file', event.target.result)
      params.append('filename', input_files[i].name)
      params.append('filesize', input_files[i].size)
      params.append('extension', input_output_extension)
      params.append('responseType', 'blob')
      params.append('responseEncoding', 'binary')
      loading.value = true

      const route = `${tool_route}/convertfile`
      await api_fetch(route, {
        onRequest ({ options }) {
          options.method = 'POST'
          options.body = params
        },
        onRequestError ({ error }) {
          errors_store.add_error({ "code": 400, "route": route, 'message': error.message })
          loading.value = false
        },
        onResponse ({ response }) {
          if (response.ok) {
            const new_file_name = response.headers.get('new-file-name')
            fileDownload(response._data, new_file_name)
            loading.value = false
          }
        },
        onResponseError ({ response }) {
          errors_store.add_error({ "code": response.status, "route": route, 'message': response._data.error_message })
          console.log(response)
          loading.value = false
        }
      })
    }
    reader.readAsDataURL(input_files[i])
  }
}

</script>