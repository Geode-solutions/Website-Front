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
import { useToggle } from "@vueuse/core";
import fileDownload from "js-file-download";

const { files, geodeObject, routePrefix, outputExtension } = stepperTree;
const loading = ref(false);
const toggleLoading = useToggle(loading);

async function convertFiles() {
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.onload = async function (event) {
      let params = {
        geodeObject: geodeObject,
        file: event.target.result,
        filename: files[i].name,
        filesize: files[i].size,
        extension: outputExtension,
        responseType: 'blob',
        responseEncoding: 'binary'
      };
      toggleLoading();

      await apiFetch(ConversionButton_json.remesh, params, {
        requestErrorFunction: () => {
          toggleLoading();
        },
      });
    };
    reader.readAsDataURL(files[i]);
  }
}
</script>
