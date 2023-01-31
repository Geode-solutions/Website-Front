<template>
  <v-container>
    <v-expansion-panels v-model="opened_panels" multiple>
      <v-expansion-panel v-for="(check) in props.model_checks" :key="index" class="card" :title="check.sentence">
        <ToolsValidityBadge :value="check.value" />
        <ToolsValidityCheckerResultsPanels v-if="!check.is_leaf" :index="index" :model_checks="check.children"
          :object="object" :filename="filename" @update_result="update_result" />
        <v-container v-else-if="check.value == false" class="pt-6">
          Invalid = {{ check.list_invalidities }}
        </v-container>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
const props = defineProps({
  component_options: { type: Object, required: true }
})

const {
  input_model_checks,
  input_geode_object,
  input_file_name,
  index } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const opened_panels = ref([])

const display = computed(() => {
  let values = new Array()
  for (let i = 0; i < input_file_name.length; i++) {
    if (!input_file_name[i].is_leaf) {
      values.push(i)
    }
  }
  return values
})

watch(() => input_model_checks, () => {
  let nb_results = 0
  for (let index = 0; index < input_model_checks.length; index++) {
    const current_check = input_model_checks[index]
    if (current_check.value == null) {
      continue
    }
    if (current_check.value != true) {
      this.$emit('update_result', this.index, false)
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
    this.$emit('update_result', index, true)
  }
},
  { deep: true }
)
onCreated(() => {
  get_tests_results()
  opened_panels.value = Array.from(Array(input_model_checks.length).keys())
})

function update_result (index, value) {
  input_model_checks[index].value = value
}

async function get_tests_results () {
  for (let index = 0; index < props.model_checks.length; index++) {
    const check = props.model_checks[index]
    if (check.is_leaf) {
      const params = new FormData()
      params.append('object', input_geode_object)
      params.append('filename', input_file_name)
      params.append('test', check.route)

      try {
        const { data } = await api_fetch(`${tool_route}/inspectfile`, { body: params, method: 'POST' })
        check.value = data.value.Result
        check.list_invalidities = data.list_invalidities
      } catch (err) {
        check.value = 'error'
      }
    }
  }
}
</script>
