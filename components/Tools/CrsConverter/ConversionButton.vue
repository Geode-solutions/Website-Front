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
  import schema from "@/components/Tools/CrsConverter/ConversionButton.json"

  const stepper_tree = inject("stepper_tree")
  const { files, geode_object, input_crs, output_crs, output_extension } =
    stepper_tree

  const loading = ref(false)

  const toggle_loading = useToggle(loading)

  async function convert_files() {
    for (let i = 0; i < files.length; i++) {
      const params = {
        geode_object: geode_object,
        filename: files[i].name,
        input_crs_authority: input_crs["authority"],
        input_crs_code: input_crs["code"],
        output_crs_authority: output_crs["authority"],
        output_crs_code: output_crs["code"],
        output_crs_name: output_crs["name"],
        extension: output_extension,
        responseType: "blob",
        responseEncoding: "binary",
      }

      toggle_loading()

      await api_fetch(
        { schema, params },
        {
          request_error_function: () => {},
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
