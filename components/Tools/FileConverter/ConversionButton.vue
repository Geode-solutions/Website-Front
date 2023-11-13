<template>
  <v-btn :loading="loading" color="primary" @click="wrapper()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step_index = 3"> Cancel </v-btn>
</template>

<script setup>
  import fileDownload from "js-file-download"
  import schema from "@/components/Tools/FileConverter/ConversionButton.json"

  const props = defineProps({
    files: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
    output_geode_object: { type: String, required: true },
    output_extension: { type: String, required: true },
  })
  const { files, input_geode_object, output_geode_object, output_extension } =
    props

  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function wrapper() {
    toggle_loading()
    await upload_files()
    convert_files()
    toggle_loading()
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
      const params = {
        input_geode_object: input_geode_object,
        filename: files[i].name,
        output_geode_object: output_geode_object,
        output_extension: output_extension,
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
