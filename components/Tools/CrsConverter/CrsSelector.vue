<template>
  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
  <v-data-table v-model="selected_crs" :v-model:items-per-page="10" :headers="headers" :items="crs_list" item-value="name"
    class="elevation-1" density='compact' fixed-header select-strategy='single' show-select :search="search"
    :loading="data_table_loading" loading-text="Loading... Please wait"></v-data-table>
</template>

<script setup>
import { useToggle } from '@vueuse/core'

const props = defineProps({
  component_options: { type: Object, required: true },
})

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const search = ref('')
const data_table_loading = ref(true)
const crs_list = ref([])
const selected_crs = ref([])
const toggle_loading = useToggle(data_table_loading)

watch(selected_crs, (new_value) => {
  console.log('selected_crs', new_value)
})

async function get_crs_table () {
  const route = `${tool_route}/geographic_coordinate_systems`
  toggle_loading()
  await api_fetch(route, { method: 'GET' },
    {
      'request_error_function': toggle_loading(),
      'response_function': (response) => { crs_list.value = response._data.crs_list },
      'response_error_function': toggle_loading()
    }
  )
}

const headers = [
  {
    title: 'Authority',
    align: 'start',
    sortable: true,
    key: 'authority',

  },
  { title: 'Code', align: 'end', key: 'code' },
  { title: 'Name', align: 'end', key: 'name' }
]


onMounted(() => {
  get_crs_table()
})

</script>