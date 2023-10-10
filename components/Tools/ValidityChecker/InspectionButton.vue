<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspectFile()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="setCurrentStep(2)"> Cancel </v-btn>
  </div>
</template>

<script setup>
import { useToggle } from "@vueuse/core";

const stepperTree = inject('stepper_tree');
const { files, geodeObject, routePrefix } = stepperTree;
const props = defineProps({
  variableToUpdate: { type: String, required: true },
  variableToIncrement: { type: String, required: true }
});
const { variableToUpdate, variableToIncrement } = props;
const loading = ref(false);
const toggleLoading = useToggle(loading);

async function inspectFile() {
  await uploadFile();
  await getTestsNames();
  stepperTree[variableToIncrement]++;
}

async function uploadFile() {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function (event) {
      const params = {
        file: event.target.result,
        filename: files[0].name,
        filesize: files[0].size
      };
      toggleLoading();
      await apiFetch(explicit_json.remesh, params, {
        request_error_function: () => {
          toggleLoading();
          reject();
        },
        response_function: () => {
          toggleLoading();
          resolve();
        }
      });
    };
    reader.readAsDataURL(files[0]);
  });
}

async function getTestsNames() {
  const params = new FormData();
  params.append("geode_object", geodeObject);
  const route = `${routePrefix}/tests_names`;
  await apiFetch(route, { method: "POST", body: params }, {
    response_function: (response) => {
      stepperTree[variableToUpdate] = response._data.model_checks;
      console.log("variableToUpdate", stepperTree[variableToUpdate]);
    }
  });
}
</script>
