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
            input_index_array: input_index_array.push(index),
            input_model_checks: check.children,
            input_geode_object: input_geode_object,
            input_file_name: input_file_name
          }" />
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
  component_options: { type: Object, required: true }
})

// const emit = defineEmits(['update_result'])

const {
  input_model_checks,
  input_geode_object,
  input_file_name,
  input_index_array } = props.component_options
console.log(input_index_array)

const { tool_route } = stepper_tree

const opened_panels = ref([])

const display = computed(() => {
  let values = new Array()
  for (let i = 0; i < input_model_checks.length; i++) {
    if (!input_model_checks[i].is_leaf) {
      values.push(i)
    }
  }
  return values
})

watch(input_model_checks, () => {
  let nb_results = 0
  for (let index = 0; index < input_model_checks.length; index++) {
    const current_check = input_model_checks[index]
    if (current_check.value == null) {
      continue
    }
    if (current_check.value != true) {
      // emit('update_result', input_index_array, false)
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
    // emit('update_result', input_index_array, true)
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
  model_checks[index].value = value
  if (model_checks[index].is_leaf) {
    model_checks[index].list_invalidities = list_invalidities
  }
  update_result(model_checks.children, input_index_array.shift(), value, list_invalidities)
}

async function get_tests_results () {
  for (let index = 0; index < input_model_checks.length; index++) {
    const check = input_model_checks[index]
    if (check.is_leaf && check.value == undefined) {

      const params = new FormData()
      params.append('object', input_geode_object)
      params.append('filename', input_file_name)
      params.append('test', check.route)
      // if (check.route == 'intersecting_surfaces_elements') {
      const { data, error } = await api_fetch(`${tool_route}/inspectfile`, { body: params, method: 'POST' })
      if (data) {
        // check.list_invalidities = data.value.list_invalidities
        update_result(stepper_tree.model_checks, input_index_array, data.value.Result, list_invalidities)
      } else if (error) {
        console.log('err : ', err)
        update_result(stepper_tree.model_checks, input_index_array, 'error')

      }
      // }
    }
  }
}
</script>
