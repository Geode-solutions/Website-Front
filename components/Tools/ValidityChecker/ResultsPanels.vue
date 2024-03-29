<template>
  <v-container class="pa-2">
    <v-expansion-panels v-model="opened_panels" multiple elevation="5">
      <v-expansion-panel
        v-for="(check, index) in model_checks"
        :key="index"
        class="card"
      >
        <v-expansion-panel-title>
          <v-row align="center">
            <v-col cols="auto">
              <ToolsValidityCheckerValidityBadge :value="check.value" />
            </v-col>
            <v-col>
              {{ check.sentence }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ToolsValidityCheckerResultsPanels
            v-if="!check.is_leaf"
            v-bind="{
              model_checks: check.children,
              input_geode_object,
              filename,
              input_index_array: update_array(index),
            }"
          />
          <v-container v-else-if="check.value == false">
            Invalid = {{ check.list_invalidities }}
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
  import schema from "@/components/Tools/ValidityChecker/ResultsPanels.json"

  const emit = defineEmits([
    "update_values",
    "increment_step",
    "decrement_step",
  ])

  const stepper_tree = inject("stepper_tree")

  const props = defineProps({
    model_checks: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
    filename: { type: String, required: true },
    input_index_array: { type: Array, required: false, default: [] },
  })
  const { model_checks, input_geode_object, filename, input_index_array } =
    props
  const opened_panels = ref([])

  watch(
    model_checks,
    () => {
      let nb_results = 0
      for (let index = 0; index < model_checks.length; index++) {
        const current_check = model_checks[index]
        if (current_check.value == null) {
          continue
        }
        if (current_check.value != true) {
          update_result(stepper_tree.model_checks, input_index_array, false)
          return
        }
        let index_of_index = opened_panels.value.indexOf(index)
        if (index_of_index > -1) {
          opened_panels.value.splice(index_of_index, 1)
        }
        nb_results++
      }
      if (nb_results == model_checks.length) {
        update_result(stepper_tree.model_checks, input_index_array, true)
      }
    },
    { deep: true },
  )
  onMounted(() => {
    get_tests_results()
    opened_panels.value = Array.from(Array(model_checks.length).keys())
  })

  function update_array(index) {
    const array = input_index_array.concat(index)
    return array
  }

  function update_result(
    model_checks,
    index_array,
    value,
    list_invalidities = [],
  ) {
    if (!index_array.length) {
      return
    }
    if (index_array.length == 1) {
      const index = index_array[0]
      model_checks[index].value = value
      if (model_checks[index].is_leaf) {
        model_checks[index].list_invalidities = list_invalidities
      }
    } else {
      const new_index_array = index_array.slice(1)
      update_result(
        model_checks[index_array[0]].children,
        new_index_array,
        value,
        list_invalidities,
      )
    }
  }

  async function get_tests_results() {
    for (let index = 0; index < model_checks.length; index++) {
      const check = model_checks[index]
      if (check.is_leaf && check.value == undefined) {
        const children_array = input_index_array.concat(index)
        get_test_result(
          input_geode_object,
          filename,
          check.route,
          children_array,
        )
      }
    }
  }

  async function get_test_result(
    input_geode_object,
    filename,
    test,
    children_array,
  ) {
    const params = {
      input_geode_object,
      filename,
      test,
    }
    await api_fetch(
      { schema, params },
      {
        response_error_function: () => {
          update_result(stepper_tree.model_checks, children_array, "error")
        },
        response_function: (response) => {
          update_result(
            stepper_tree.model_checks,
            children_array,
            response._data.result,
            response._data.list_invalidities,
          )
        },
        response_error_function: () => {
          update_result(stepper_tree.model_checks, children_array, "error")
        },
      },
    )
  }
</script>
