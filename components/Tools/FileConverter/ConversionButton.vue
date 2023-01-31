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
const cloud_store = use_cloud_store()
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
  console.log(input_files)
  console.log(input_geode_object)
  console.log(input_output_extension)

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

      try {
        const config = useRuntimeConfig()
        const response = await $fetch.raw(`${config.API_URL}/${ID.value}/${tool_route}/convertfile`, { body: params, method: 'POST', responseType: 'blob' })
        console.log(response)
        const new_file_name = response.headers.get('new-file-name')
        fileDownload(response._data, new_file_name)
        loading.value = false
      } catch (err) {
        console.log(err)
        loading.value = false
      }
    }
    reader.readAsDataURL(input_files[i])
  }
}

</script>