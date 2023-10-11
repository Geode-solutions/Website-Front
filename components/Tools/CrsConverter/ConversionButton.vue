<template>
  <v-btn :loading="loading" color="primary" @click="convert_files()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step = 3"> Cancel </v-btn>
</template>

<script setup>
  import { useToggle } from "@vueuse/core"
  import fileDownload from "js-file-download"

  const stepper_tree = inject("stepper_tree")
  const {
    files,
    geode_object,
    input_crs,
    output_crs,
    output_extension,
    route_prefix,
  } = stepper_tree

  const loading = ref(false)

  const toggle_loading = useToggle(loading)

async function convert_files() {
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader()
    reader.onload = async function (event) {
      let params = {
        geode_object: geode_object,
        file: event.target.result,
        filename: files[i].name,
        filesize: files[i].size,
        input_crs_authority: input_crs['authority'], 
        input_crs_code: input_crs['code'],  
        output_crs_authority: output_crs['authority'],
        output_crs_code: output_crs['code'],
        output_crs_name: output_crs['name'],
        extension: output_extension,
        responseType: 'blob',
        responseEncoding: 'binary'
      }}
      toggle_loading()

      await api_fetch(ConversionButton_json.remesh, params,
        {
          'request_error_function': () => { toggle_loading() },
          'response_function': (response) => {
            const new_file_name = response.headers.get('new-file-name')
            fileDownload(response._data, new_file_name)
            toggle_loading()
          },
        }
      )
      reader.readAsDataURL(files[i])
    }
  }
</script>
