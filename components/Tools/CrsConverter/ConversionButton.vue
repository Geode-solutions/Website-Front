<template>
  <v-btn :loading="loading" color="primary" @click="wrapper()">
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
  import schema from "@/components/Tools/CrsConverter/ConversionButton.json"

  const stepper_tree = inject("stepper_tree")
  const { files, geode_object, input_crs, output_crs, output_extension } =
    stepper_tree
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
    for (let i = 0; i < files.length; i++) {
      const params = {
        geode_object: geode_object,
        filename: files[i].name,
        input_crs_authority: input_crs["authority"],
        input_crs_code: input_crs["code"],
        input_crs_name: input_crs["name"],
        output_crs_authority: output_crs["authority"],
        output_crs_code: output_crs["code"],
        output_crs_name: output_crs["name"],
        extension: output_extension,
        responseType: "blob",
        responseEncoding: "binary",
      }

      await api_fetch(
        { schema, params },
        {
          response_function: (response) => {
            const new_file_name = response.headers.get("new-file-name")
            fileDownload(response._data, new_file_name)
          },
        },
      )
    }
  }
</script>
