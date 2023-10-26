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
  import fileDownload from "js-file-download"

  const stepper_tree = inject("stepper_tree")
  const { route_prefix } = stepper_tree

  const props = defineProps({
    files: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
    input_crs: { type: Object, required: true },
    output_crs: { type: Object, required: true },
    output_geode_object: { type: String, required: true },
    output_extension: { type: String, required: true },
  })

  const {
    files,
    input_geode_object,
    input_crs,
    output_crs,
    output_geode_object,
    output_extension,
  } = props

  const loading = ref(false)

  const toggle_loading = useToggle(loading)

  async function convert_files() {
    toggle_loading()
    for (let i = 0; i < files.length; i++) {
      let params = new FormData()

      params.append("input_geode_object", input_geode_object)
      params.append("filename", files[i].name)
      params.append("input_crs_authority", input_crs["authority"])
      params.append("input_crs_code", input_crs["code"])
      params.append("input_crs_name", input_crs["name"])
      params.append("output_crs_authority", output_crs["authority"])
      params.append("output_crs_code", output_crs["code"])
      params.append("output_crs_name", output_crs["name"])
      params.append("output_geode_object", output_geode_object)
      params.append("output_extension", output_extension)
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
    toggle_loading()
  }
</script>

<style scoped>
  .v-btn {
    text-transform: unset !important;
  }
</style>
