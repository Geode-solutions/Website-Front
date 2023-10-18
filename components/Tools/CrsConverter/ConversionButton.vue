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
    toggle_loading()
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async function (event) {
        let params = new FormData()

        params.append("geode_object", geode_object)
        params.append("filename", files[i].name)
        params.append("input_crs_authority", input_crs["authority"])
        params.append("input_crs_code", input_crs["code"])
        params.append("input_crs_name", input_crs["name"])
        params.append("output_crs_authority", output_crs["authority"])
        params.append("output_crs_code", output_crs["code"])
        params.append("output_crs_name", output_crs["name"])
        params.append("extension", output_extension)
        params.append("responseType", "blob")
        params.append("responseEncoding", "binary")

        await api_fetch(
          `${route_prefix}/convert_file`,
          { method: "POST", body: params },
          {
            response_function: (response) => {
              const new_file_name = response.headers.get("new-file-name")
              fileDownload(response._data, new_file_name)
            },
          },
        )
      }
      reader.readAsDataURL(files[i])
    }
    toggle_loading()
  }
</script>
