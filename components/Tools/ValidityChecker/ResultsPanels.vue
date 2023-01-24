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
const opened_panels = ref([])

const props = defineProps({
  model_checks: { type: Array, required: true },
  object: { type: String, required: true },
  filename: { type: String, required: true },
  index: { type: Number, required: true, default: 0 }
})

const display = computed(() => {
  let values = new Array()
  for (let i = 0; i < props.model_checks.length; i++) {
    if (!props.model_checks[i].is_leaf) {
      values.push(i)
    }
  }
  return values
})

watch(() => props.model_checks, () => {
  let nb_results = 0
  for (let index = 0; index < this.model_checks.length; index++) {
    const current_check = this.model_checks[index]
    if (current_check.value == null) {
      continue
    }
    if (current_check.value != true) {
      this.$emit('update_result', this.index, false)
      return
    } else if (current_check.value == true) {
      // console.log('index :', index)
      let index_of_index = this.opened_panels.indexOf(index)
      // console.log('this.opened_panels :', this.opened_panels)
      // console.log('index_of_index :', index_of_index)
      if (index_of_index > -1) { // only splice array when item is found
        this.opened_panels.splice(index_of_index, 1)
      }
    }
    nb_results++
  }
  if (nb_results == props.model_checks.length) {
    this.$emit('update_result', this.index, true)
  }
},
  { deep: true }
)
onCreated(() => {
  get_tests_results()
  opened_panels.value = Array.from(Array(props.model_checks.length).keys())
})

function update_result (index, value) {
  this.model_checks[index].value = value
}



async function get_tests_results () {
  for (let index = 0; index < props.model_checks.length; index++) {
    const check = props.model_checks[index]
    if (check.is_leaf) {
      const params = new FormData()
      params.append('object', this.object)
      params.append('filename', this.filename)
      params.append('test', check.route)

      try {
        const response = await useFetch(`${config.public.BASE_URL}/${ID}/validitychecker/inspectfile`, { method: 'POST' }, params)
        check.value = response.data.Result
        check.list_invalidities = response.data.list_invalidities
      } catch (err) {
        check.value = 'error'
      }
    }
  }
}
</script>
