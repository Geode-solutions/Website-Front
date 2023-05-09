<template>
  <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
    class="elevation-1"></v-data-table>
</template>


<script setup>


const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

async function get_crs_table () {
  const route = `${tool_route}/crs`
  await api_fetch(route, { method: 'POST', body: params },
    {
      'request_error_function': disable_loading, response_function, 'response_error_function': disable_loading
    }
  )
}

</script>