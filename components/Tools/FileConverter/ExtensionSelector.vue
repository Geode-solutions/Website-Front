<template>
  <v-row class="justify-left">
    <v-col v-for="file_extension in file_extensions" cols="2">
      <v-card class="card ma-2" hover elevation="5" @click="set_output_extension(file_extension)">
        <!-- @click="set_file_format(file_extension)" -->
        <v-card-title align="center">
          {{ file_extension }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree


onMounted(() => {
  get_output_file_extensions(geode_object, props.tool_route)

})

const file_extensions = ref([])

async function get_output_file_extensions (geode_object, tool_route) {
  const params = new FormData()
  params.append('object', geode_object)

  const data = await api_fetch(`${tool_route}/outputfileextensions`, { body: params, method: 'POST' })
  console.log(data)
  file_extensions.value = data.outputfileextensions
}

function set_output_extension (extension) {
  stepper_tree.output_extension = extension
  stepper_tree.current_step_index = stepper_tree.current_step_index + 1
}

</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>