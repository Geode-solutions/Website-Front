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
        const response = await api_fetch(`/${tool_route}/convertfile`, { body: params, method: 'POST', responseType: 'blob' }, {
          onResponse ({ request, response, options }) {
            // Process the response data
            console.log(response)
            return response._data
          },
        })
        // console.log(response)
        let new_file_name = response.data.value.headers['new-file-name']
        fileDownload(response.data, new_file_name)
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