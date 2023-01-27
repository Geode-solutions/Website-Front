<template>
  <v-btn :loading="loading" color="primary" @click="convert_file(files)">
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
const props = defineProps({
  tool_route: { type: String, required: true },
  component_options: { type: Object, required: true }
})
const { component_options, tool_route } = props
const { input_files,
  input_geode_object,
  input_output_extension } = component_options

const loading = ref(false)

async function convert_file () {
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
        const { data } = await api_fetch(`/${tool_route}/convertfile`, { body: params, method: 'POST', responseType: 'blob' })
        let new_file_name = data.value.headers['new-file-name']
        fileDownload(response.data, new_file_name)
        loading.value = false
      } catch (err) {
        console.log(err)
        loading.value = false
      }
    }
    reader.readAsDataURL(files[i])
  }
}

</script>