<template>
  <v-container>
    <v-col>
      <h1 class="text-h2 py-6" align="center">Simplex remesh</h1>
    </v-col>
    <v-col v-if="!is_running">
      <Launcher />
    </v-col>
    <v-col v-else>
      <v-container class="w-75">
        <v-stepper v-model="step" hide-actions :items="items">
          <template v-slot:item.1>
            <v-container>
              <v-row>
                <v-col>
                  <p class="mb-2 text-medium-emphasis text-body-1">
                    Choose the metric to apply to the blocks
                  </p>
                  <v-slider
                    v-model="metric"
                    :min="min_metric"
                    :max="max_metric"
                    :step="step_metric"
                    thumb-label
                  ></v-slider>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:item.2>
            <v-container>
              <v-row>
                <v-col>
                  <p class="mb-2 text-medium-emphasis text-body-1">
                    Choose the metric to apply to the faults
                  </p>
                  <v-slider
                    v-model="faults_metric"
                    :min="min_metric"
                    :max="max_metric"
                    :step="step_metric"
                    thumb-label
                  ></v-slider>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:item.3>
            <p class="mb-2 text-body-1 text-center">
              Congratulations! <br />
              You just generated a tetrahedral mesh with a heterogeneous metric,
              all in a few clicks
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
        <v-col style="height: 600px">
          <RemoteRenderingView />
        </v-col>
        <v-col>
          <p class="text-body-2 text-center">
            Data courtesy of Caumon et al. (2009). Surface-Based 3D Modeling of
            Geological Structures
          </p>
        </v-col>
      </v-container>
    </v-col>
  </v-container>
</template>

<script setup>
  import schemas from "@geode/opengeodeweb-viewer/schemas.json"
  import simplex_json from "./simplex.json"

  const cloud_store = use_cloud_store()
  const { is_running } = storeToRefs(cloud_store)
  const loading = ref(false)
  const toggle_loading = useToggle(loading)
  const inputsStore = useInputStore()
  const { metric, faults_metric } = storeToRefs(inputsStore)
  metric.value = 200
  faults_metric.value = 50
  const min_metric = 10
  const max_metric = 300
  const step_metric = 10
  const step = ref(1)
  const items = ["Set blocks metric", "Set faults metric", "Result"]

  const title = "Tetrahedral meshing"
  useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`,
  })

  function reset() {
    step.value = 1
    initialize()
  }

  async function initialize() {
    viewer_call({
      schema: schemas.opengeodeweb_viewer.reset,
    })
    toggle_loading()
    await api_fetch(
      { schema: simplex_json.initialize },
      {
        response_function: (response) => {
          viewer_call({
            schema: schemas.opengeodeweb_viewer.reset,
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_file_name,
              id: response._data.id,
            },
          })
        },
      },
    )
    toggle_loading()
  }

  async function sendMetrics() {
    const params = {
      metric: metric.value,
      faults_metric: faults_metric.value,
    }
    await api_fetch(
      { schema: simplex_json.remesh, params },
      {
        response_function: (response) => {
          viewer_call({
            schema: schemas.opengeodeweb_viewer.reset,
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_file_name,
              id: response._data.id,
            },
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.toggle_edge_visibility,
            params: {
              id: response._data.id,
              visibility: true,
            },
          })
        },
      },
    )
  }

  function next() {
    toggle_loading()
    if (step.value == 2) {
      sendMetrics()
    }
    step.value++
    toggle_loading()
  }

  onMounted(() => {
    runFunctionIfCloudRunning(() => {
      initialize()
    })
  })
</script>
