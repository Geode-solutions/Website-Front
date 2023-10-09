<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          max-height="30em"
          rounded="lg"
          class="pa-3 text-center overflow-auto"
          elevation="3"
        >
          <p class="mb-2 text-medium-emphasis text-body-1">
            Choose the value to set on the data points for the implicit function
            computation
          </p>
          <p v-if="nb_constraints == 0">Getting data. Please wait...</p>
          <v-row no-gutters>
            <v-col>
              <p>X</p>
            </v-col>
            <v-col>
              <p>Y</p>
            </v-col>
            <v-col>
              <p>Z</p>
            </v-col>
            <v-col>
              <p>Value</p>
            </v-col>
          </v-row>
          <WorkflowsImplicitConstraint
            v-for="n in nb_constraints"
            :id="n"
            :key="n"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          max-height="30em"
          rounded="lg"
          width="100%"
          class="overflow-auto pa-3 text-center"
          elevation="5"
        >
          <p class="mb-2 text-medium-emphasis text-body-1">
            Choose the isovalues to explicit on the model after the implicit
            function computation
          </p>
          <p class="mb-2 text-medium-emphasis text-body-1">
            Number of isovalues
          </p>
          <v-btn
            class="ma-1"
            size="x-small"
            elevation="5"
            icon="mdi-minus"
            @click="decrementISO"
          />
          {{ nb_isovalues }}
          <v-btn
            class="ma-1"
            size="x-small"
            elevation="5"
            icon="mdi-plus"
            @click="incrementISO"
          />
          <br />
          <WorkflowsImplicitIsovalue v-for="n in nb_isovalues" :id="n" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const inputsStore = useInputStore()
  const cloud_store = use_cloud_store()
  const { is_cloud_running } = storeToRefs(cloud_store)
  const viewer_store = use_viewer_store()
  const websocket_store = use_websocket_store()
  const { is_client_created } = storeToRefs(websocket_store)
  const nb_constraints = ref(0)
  const nb_isovalues = ref(3)

  const props = defineProps({
    reset: { type: Boolean, required: true },
  })
  const { reset } = toRefs(props)
  watch(reset, (reset) => {
    if (reset) {
      console.log("reset")
      nb_constraints.value = 0
      nb_isovalues.value = 3
      getConstraints()
    }
  })

  const cloud_socket_ready = computed(() => {
    return is_cloud_running.value && is_client_created.value
  })

  onMounted(() => {
    if (cloud_socket_ready.value) {
      getConstraints()
    } else {
      watch(cloud_socket_ready, () => {
        getConstraints()
      })
    }
  })

  async function getConstraints() {
    console.log("getConstraints")
    viewer_store.reset()
    await api_fetch(
      "workflows/implicit/step0",
      { method: "POST" },
      {
        response_function: (response) => {
          console.log("coucou", response)
          const autofilled_constrains = JSON.parse(response._data.constraints)
          console.log(autofilled_constrains)
          for (let i = 0; i < autofilled_constrains.length; i++) {
            const constraint = autofilled_constrains[i]
            const x = {
              x: constraint[0],
              y: constraint[1],
              z: constraint[2],
              value: constraint[3],
            }
            nb_constraints.value++
            inputsStore.addConstraint(x)
          }
          viewer_store.reset()
          viewer_store.create_object_pipeline({
            file_name: response._data.viewable_points,
            id: response._data.points,
          })
          viewer_store.point_size({ id: response._data.points, size: 10 })
          viewer_store.create_object_pipeline({
            file_name: response._data.viewable_box,
            id: response._data.box,
          })
          viewer_store.set_vertex_attribute({
            id: response._data.points,
            name: "geode_implicit_value",
          })
        },
      },
    )
  }

  function incrementISO() {
    if (nb_isovalues.value < 10) {
      nb_isovalues.value++
      inputsStore.addIsovalue(0)
    }
  }
  function decrementISO() {
    if (nb_isovalues.value > 0) {
      nb_isovalues.value--
      inputsStore.popIsovalue()
    }
  }
</script>
