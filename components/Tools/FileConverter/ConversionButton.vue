<template>
  <v-btn :loading="loading" color="primary" @click="convert_files()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="$emit('decrement_step')"> Cancel </v-btn>
</template>

<script setup>
  import fileDownload from "js-file-download"
  import schema from "@/components/Tools/FileConverter/ConversionButton.json"

  const emit = defineEmits([
    "update_values",
    "increment_step",
    "decrement_step",
  ])

  const props = defineProps({
    filenames: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
    output_geode_object: { type: String, required: true },
    output_extension: { type: String, required: true },
  })

  const {
    filenames,
    input_geode_object,
    output_geode_object,
    output_extension,
  } = props

  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  function convert_files() {
    toggle_loading()
    for (const filename of filenames) {
      const params = {
        input_geode_object,
        filename,
        output_geode_object,
        output_extension,
        responseType: "blob",
        responseEncoding: "binary",
      }

      api_fetch(
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
