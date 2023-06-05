<template>
  <v-row class="justify-left">
    <v-col v-for="file_extension in file_extensions" :key="file_extension" cols="2">
      <v-card class="card ma-2" hover elevation="5" @click="set_output_extension(file_extension)">
        <v-card-title align="center">
          {{ file_extension }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const errors_store = use_errors_store()

const props = defineProps({
  component_options: { type: Object, required: true },
})
const { input_geode_object } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const file_extensions = ref([])

onMounted(() => {
  get_output_file_extensions(input_geode_object, tool_route)
})

function disable_loading () {
  loading.value = false
}

async function get_output_file_extensions (input_geode_object, tool_route) {
  const params = new FormData()
  params.append('object', input_geode_object)
  const route = `${tool_route}/output_file_extensions`

  await api_fetch(route, { method: 'POST', body: params },
    {
      'request_error_function': () => { disable_loading() },
      'response_function': (response) => { file_extensions.value = response._data.output_file_extensions },
      'response_error_function': () => { disable_loading() }
    }
  )
}

function set_output_extension (extension) {
  stepper_tree.output_extension = extension
  stepper_tree.current_step_index++
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>