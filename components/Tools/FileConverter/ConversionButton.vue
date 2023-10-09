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
  const { files, geode_object, route_prefix, output_extension } = stepper_tree

  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function convert_files() {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async function (event) {
        let params = new FormData()

        params.append("geode_object", geode_object)
        params.append("file", event.target.result)
        params.append("filename", files[i].name)
        params.append("filesize", files[i].size)
        params.append("extension", output_extension)
        params.append("responseType", "blob")
        params.append("responseEncoding", "binary")
        toggle_loading()

        await api_fetch(
          `${route_prefix}/convert_file`,
          { method: "POST", body: params },
          {
            request_error_function: () => {
              toggle_loading()
            },
            response_function: (response) => {
              const new_file_name = response.headers.get("new-file-name")
              fileDownload(response._data, new_file_name)
              toggle_loading()
            },
            response_error_function: () => {
              toggle_loading()
            },
          },
        )
      }
      reader.readAsDataURL(files[i])
    }
  }
</script>
