<template>
  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
  <v-data-table :v-model:items-per-page="10" :headers="headers" :items="crs_list" item-value="name" class="elevation-1"
    density='compact' fixed-header single_select show-select :search="search" :loading="loading"
    loading-text="Loading... Please wait"></v-data-table>
</template>


<script setup>
import { useToggle } from '@vueuse/core'

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

async function get_crs_table () {
  const route = `${tool_route}/geographic_coordinate_systems`
  useToggle(loading)
  await api_fetch(route, { method: 'GET' },
    {
      'request_error_function': useToggle(loading),
      'response_function': (response) => { crs_list.value = response._data.crs_list },
      'response_error_function': useToggle(loading)
    }
  )
}

const search = ref('')
const loading = ref(true)
const crs_list = ref([])

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
  console.log('toto')
  get_crs_table()
})

</script>