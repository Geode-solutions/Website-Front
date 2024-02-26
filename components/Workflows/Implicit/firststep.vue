<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          max-height="30em"
          rounded="lg"
          class="pa-3 text-center overflow-auto"
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
            :key="n"
            :id="n"
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
            icon="mdi-minus"
            @click="decrementISO"
          ></v-btn>
          {{ nb_isovalues }}
          <v-btn
            class="ma-1"
            size="x-small"
            icon="mdi-plus"
            @click="incrementISO"
          ></v-btn>
          <br />
          <WorkflowsImplicitIsovalue v-for="n in nb_isovalues" :id="n" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import schemas from "@geode/opengeodeweb-front/utils/schemas.json"
  import implicit_json from "@/pages/workflows/implicit.json"

  const inputsStore = useInputStore()
  const nb_constraints = ref(0)
  const nb_isovalues = ref(3)

  const props = defineProps({
    reset: { type: Boolean, required: true },
  })
  const { reset } = toRefs(props)
  watch(reset, (reset) => {
    if (reset) {
      nb_constraints.value = 0
      nb_isovalues.value = 3
      getConstraints()
    }
  })

  async function getConstraints() {
    viewer_call({ schema: schemas.opengeodeweb_viewer.reset })
    await api_fetch(
      { schema: implicit_json.step_0 },
      {
        response_function: async (response) => {
          const autofilled_constrains = JSON.parse(response._data.constraints)
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
          await viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_points,
              id: response._data.points,
            },
          })
          console.log("END points")
          viewer_call({
            schema: schemas.opengeodeweb_viewer.point_size,
            params: { id: response._data.points, size: 10.0 },
          })
          await viewer_call({
            schema: schemas.opengeodeweb_viewer.create_object_pipeline,
            params: {
              file_name: response._data.viewable_box,
              id: response._data.box,
            },
          })
          viewer_call({
            schema: schemas.opengeodeweb_viewer.set_vertex_attribute,
            params: {
              id: response._data.points,
              name: "geode_implicit_value",
            },
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

  onMounted(() => {
    runFunctionIfCloudRunning(() => {
      getConstraints()
    })
  })
</script>
