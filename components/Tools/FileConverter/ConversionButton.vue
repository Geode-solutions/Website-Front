<template>
  <v-btn :loading="loading" color="primary" @click="wrapper()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="currentStep = 3"> Cancel </v-btn>
</template>

<script setup>
  import { useToggle } from "@vueuse/core"
  import fileDownload from "js-file-download"
  import schema from "@/components/Tools/FileConverter/ConversionButton.json"

  const stepper_tree = inject("stepper_tree")
  const { files, geode_object, output_extension } = stepper_tree
  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function wrapper() {
    await upload_files()
    convert_files()
  }

  function upload_files() {
    return upload_file({
      route: "tools/upload_file",
      files,
    })
  }

  async function convert_files() {
    toggle_loading()
    for (let i = 0; i < files.length; i++) {
      let params = {
        geode_object: geode_object,
        filename: files[i].name,
        extension: output_extension,
        responseType: "blob",
        responseEncoding: "binary",
      }
      await api_fetch(
        { schema, params },
        {
          requestErrorFunction: () => {},
          response_function: (response) => {
            const new_file_name = response.headers.get("new-file-name")
            fileDownload(response._data, new_file_name)
          },
        },
      )
    }
    toggle_loading()
  }
</script>
