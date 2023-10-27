<template>
  <v-btn :loading="loading" color="primary" @click="convertFiles()">
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

  async function convertFiles() {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async function (event) {
        let params = {
          geode_object: geode_object,
          file: event.target.result,
          filename: files[i].name,
          filesize: files[i].size,
          extension: output_extension,
          responseType: "blob",
          responseEncoding: "binary",
        }
        toggle_loading()

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
      reader.readAsDataURL(files[i])
    }
  }
</script>
