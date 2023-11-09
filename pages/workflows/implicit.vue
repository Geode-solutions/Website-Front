<template>
  <v-container>
    <v-col>
      <h1 class="text-h2 py-6" align="center">Implicit modeling</h1>
    </v-col>
    <v-col v-if="!cloud_store.is_running">
      <Launcher />
    </v-col>
    <v-col v-else>
      <v-container class="w-75">
        <v-stepper v-model="step" hide-actions :items="items">
          <template v-slot:item.1>
            <WorkflowsImplicitFirststep :reset="reset_first_step" />
          </template>

          <template v-slot:item.2>
            <WorkflowsImplicitSecondstep />
          </template>

          <template v-slot:item.3>
            <WorkflowsImplicitThirdstep />
          </template>

          <template v-slot:item.4>
            <p class="mb-2 text-body-1 text-center">
              Congratulations! <br />
              You just went from a 3D data point set to a nicely meshed fully
              valid Cross Section, all in a few clicks
            </p>
          </template>
          <v-container>
            <v-row class="mx-5">
              <v-col cols="auto">
                <v-btn :disabled="step == 1" @click="reset">reset</v-btn>
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-btn
                  :disabled="step == items.length"
                  :loading="loading"
                  @click="next"
                  >next</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-stepper>
        <v-col style="height: 600px; width: 100%">
          <RemoteRenderingView />
        </v-col>
      </v-container>
    </v-col>
  </v-container>
</template>

<script setup>
  import implicit_json from "./implicit.json"
  import { useToggle } from "@vueuse/core"

  const cloud_store = use_cloud_store()
  const inputsStore = useInputStore()
  const viewer_store = use_viewer_store()
  const { constraints, isovalues, axis, coordinate, metric } =
    storeToRefs(inputsStore)
  const loading = ref(false)
  const toggle_loading = useToggle(loading)
  const step = ref(1)
  const items = ["Select data", "Extract section", "Remesh", "Result"]

  const title = "Implicit"
  useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`,
  })

  const reset_first_step = ref(false)
  function reset() {
    step.value = 1
    reset_first_step.value = true
  }

  async function sendStepOne() {
    const params = {
      isovalues: JSON.stringify(isovalues.value),
    }
    await api_fetch(
      { schema: implicit_json.step_1, params },
      {
        response_function: (response) => {
          viewer_store.reset()
          viewer_store.create_object_pipeline({
            file_name: response._data.viewable_file_name,
            id: response._data.id,
          })
          viewer_store.set_vertex_attribute({
            id: response._data.id,
            name: "geode_implicit_attribute",
          })
        },
      },
    )
  }

  async function sendStepTwo() {
    const params = {
      axis: axis.value,
      coordinate: coordinate.value,
    }
    await api_fetch(
      { schema: implicit_json.step_2, params },
      {
        response_function: (response) => {
          viewer_store.reset()
          viewer_store.create_object_pipeline({
            file_name: response._data.viewable_file_name,
            id: response._data.id,
          })
          viewer_store.set_vertex_attribute({
            id: response._data.id,
            name: "geode_implicit_attribute",
          })
        },
      },
    )
  }

  async function sendStepThree() {
    const params = {
      metric: metric.value,
    }
    await api_fetch(
      { schema: implicit_json.step_3, params },
      {
        response_function: (response) => {
          viewer_store.reset()
          viewer_store.create_object_pipeline({
            file_name: response._data.viewable_file_name,
            id: response._data.id,
          })
          viewer_store.toggle_edge_visibility({
            id: response._data.id,
            visibility: true,
          })
        },
      },
    )
  }

  async function next() {
    toggle_loading()
    if (step.value == 1) {
      await sendStepOne()
    } else if (step.value == 2) {
      await sendStepTwo()
    } else if (step.value == 3) {
      await sendStepThree()
    }
    step.value++
    reset_first_step.value = false
    toggle_loading()
  }
</script>
