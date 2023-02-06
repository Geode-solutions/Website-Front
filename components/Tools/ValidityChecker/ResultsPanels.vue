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
            input_index: index,
            input_model_checks: check.children,
            input_geode_object: input_geode_object,
            input_file_name: input_file_name
          }" @update_result="update_result" />
          <v-container v-else-if="check.value == false">
            Invalid = {{ check.list_invalidities }}
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
const props = defineProps({
  component_options: { type: Object, required: true }
})

const emit = defineEmits(['update_result'])

const {
  input_model_checks,
  input_geode_object,
  input_file_name,
  input_index } = props.component_options

const stepper_tree = inject('stepper_tree')
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
      emit('update_result', input_index, false)
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
    emit('update_result', input_index, true)
  }
},
  { deep: true }
)
onMounted(() => {
  get_tests_results()
  opened_panels.value = Array.from(Array(input_model_checks.length).keys())
})

function update_result (index, value) {
  input_model_checks[index].value = value
}

async function get_tests_results () {
  for (let index = 0; index < input_model_checks.length; index++) {
    const check = input_model_checks[index]
    if (check.is_leaf && check.value == undefined) {

      const params = new FormData()
      params.append('object', input_geode_object)
      params.append('filename', input_file_name)
      params.append('test', check.route)

      try {
        const { data } = await api_fetch(`${tool_route}/inspectfile`, { body: params, method: 'POST' })
        check.value = data.value.Result
        check.list_invalidities = data.value.list_invalidities
      } catch (err) {
        console.log('err : ', err)
        check.value = 'error'
      }
    }
  }
}
</script>
