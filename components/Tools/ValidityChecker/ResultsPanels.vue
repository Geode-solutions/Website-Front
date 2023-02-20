<template>
  <v-container class="pa-2">
    <v-expansion-panels v-model="opened_panels" multiple elevation="5">
      <v-expansion-panel v-for="(check, index) in input_model_checks" :key="index" class="card">
        <v-expansion-panel-title>
          <v-row align="center">
            <v-col cols="auto">
              <ToolsValidityBadge :value="check.value" />
            </v-col>
            <v-col>
              {{ check.sentence }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ToolsValidityCheckerResultsPanels v-if="!check.is_leaf" :component_options="{
            input_model_checks: check.children,
            input_geode_object: input_geode_object,
            input_file_name: input_file_name
          }" :input_index_array="temp_input_file_name.concat[index]" />
          <v-container v-else-if="check.value == false">
            Invalid = {{ check.list_invalidities }}
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
const stepper_tree = inject('stepper_tree')

const props = defineProps({
  component_options: { type: Object, required: true },
  input_index_array: { type: Array, required: false, default: [0] },
})

const {
  input_model_checks,
  input_geode_object,
  input_file_name } = props.component_options

console.log('input_model_checks', input_model_checks)

const { input_index_array } = props
const temp_input_index_array = input_index_array
console.log('temp_input_index_array', temp_input_index_array)
const { tool_route } = stepper_tree
const opened_panels = ref([])

watch(input_model_checks, () => {
  let nb_results = 0
  for (let index = 0; index < input_model_checks.length; index++) {
    const current_check = input_model_checks[index]
    if (current_check.value == null) {
      continue
    }
    if (current_check.value != true) {
      update_result(stepper_tree.model_checks, input_index_array, false)
      return
    } else if (current_check.value == true) {
      let index_of_index = opened_panels.value.indexOf(index)
      if (index_of_index > -1) { // only splice array when item is found
        opened_panels.value.splice(index_of_index, 1)
      }
    }
    nb_results++
  }
  if (nb_results == input_model_checks.length) {
    update_result(stepper_tree.model_checks, input_index_array, true)
  }
},
  { deep: true }
)
onMounted(() => {
  get_tests_results()
  opened_panels.value = Array.from(Array(input_model_checks.length).keys())
})

function update_result (model_checks, input_index_array, value, list_invalidities = []) {
  const index = input_index_array[0]
  // console.log(index)
  model_checks[index].value = value
  if (model_checks[index].is_leaf) {
    model_checks[index].list_invalidities = list_invalidities
  }
  input_index_array.shift()
  console.log(input_index_array)
  if (input_index_array.length) {

    update_result(model_checks.children, input_index_array, value, list_invalidities)
  }
}

async function get_tests_results () {
  for (let index = 0; index < input_model_checks.length; index++) {
    const check = input_model_checks[index]
    if (check.is_leaf && check.value == undefined) {
      console.log('là', index, input_model_checks.length)
      console.log('input_index_array', input_index_array)
      const params = new FormData()
      params.append('object', input_geode_object)
      params.append('filename', input_file_name)
      params.append('test', check.route)
      console.log('cici')
      const { data, error } = await api_fetch(`${tool_route}/inspectfile`, {
        body: params, method: 'POST',
        onResponse ({ request, response, options }) {
          // Process the response data
          console.log('response', response)
          console.log('input_index_array', input_index_array)
          update_result(stepper_tree.model_checks, input_index_array, data.value.Result, data.value.list_invalidities)
        },
        onResponseError ({ request, response, options }) {
          // Handle the response errors
          // update_result (stepper_tree.model_checks, input_index_array, 'error')
        }
      })
    }
  }
}
</script>
