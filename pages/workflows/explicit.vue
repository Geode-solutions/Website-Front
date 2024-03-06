<template>
  <v-container>
    <v-col>
      <h1 class="text-h2 py-6" align="center">Explicit modeling</h1>
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
                    Several independant input surfaces with intersections
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:item.2>
            <v-container>
              <v-row>
                <v-col>
                  <v-card
                    rounded="lg"
                    class="my-6 pa-5"
                    color="transparent"
                    align="center"
                  >
                    <h3 class="mb-5">The generated BRep has:</h3>
                    <p>{{ nb_blocks }} Blocks</p>
                    <p>{{ nb_surfaces }} Surfaces</p>
                    <p>{{ nb_lines }} Lines</p>
                    <p>{{ nb_corners }} Corners</p>
                  </v-card>
                  <p class="mb-2 text-medium-emphasis text-body-1">
                    Choose a metric for remeshing the BRep
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

          <template v-slot:item.3>
            <p class="mb-2 text-body-1 text-center">
              Congratulations! <br />
              You just went from a set of intersecting surfaces to a nicely
              meshed, fully conformal BRep, all in a few clicks
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
            Data courtesy of Pellerin et al. (2015). Elements for measuring the
            complexity of 3D structural models: Connectivity and geometry
          </p>
        </v-col>
      </v-container>
    </v-col>
  </v-container>
</template>

<script setup>
  import schemas from "@geode/opengeodeweb-viewer/schemas.json"
  import explicit_json from "./explicit.json"

  const cloud_store = use_cloud_store()
  const { is_running } = storeToRefs(cloud_store)
  const loading = ref(false)
  const toggle_loading = useToggle(loading)
  const nb_corners = ref("-")
  const nb_lines = ref("-")
  const nb_surfaces = ref("-")
  const nb_blocks = ref("-")
  const inputsStore = useInputStore()
  const { metric } = storeToRefs(inputsStore)
  metric.value = 200
  const min_metric = 50
  const max_metric = 500
  const step_metric = 10
  const step = ref(1)
  const items = ["Input data", "Remesh", "Result"]

  const title = "Explicit modeling"
  useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`,
  })

  async function displayBase() {
    return api_fetch(
      { schema: explicit_json.base_data },
      {
        response_function: (response) => {
          viewer_call({
            schema: schemas.opengeodeweb_viewer.reset,
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_1,
              id: response._data.id1,
            },
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.toggle_edge_visibility,
            params: {
              id: response._data.id1,
              visibility: true,
            },
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_2,
              id: response._data.id2,
            },
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.toggle_edge_visibility,
            params: {
              id: response._data.id2,
              visibility: true,
            },
          })
        },
      },
    )
  }

  function getBRepStats() {
    return api_fetch(
      { schema: explicit_json.brep_stats },
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
          nb_corners.value = response._data.nb_corners
          nb_lines.value = response._data.nb_lines
          nb_surfaces.value = response._data.nb_surfaces
          nb_blocks.value = response._data.nb_blocks
        },
      },
    )
  }

  function remesh() {
    const params = {
      metric: metric.value,
    }
    return api_fetch(
      { schema: explicit_json.remesh, params },
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

  async function next() {
    toggle_loading()
    if (step.value == 1) {
      await getBRepStats()
    }
    if (step.value == 2) {
      await remesh()
    }
    step.value++
    toggle_loading()
  }

  function reset() {
    step.value = 1
    displayBase()
  }

  onMounted(() => {
    runFunctionIfCloudRunning(() => {
      displayBase()
    })
  })
</script>
