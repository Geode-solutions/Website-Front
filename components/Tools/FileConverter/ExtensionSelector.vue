<template>
  <v-row class="justify-left">
    <v-col v-for="file_extension in file_extensions" cols="2">
      <v-card class="card ma-2" hover elevation="5" @click="chips = file_extension">
        <!-- @click="set_file_format(file_extension)" -->
        <v-card-title align="center">
          {{ file_extension }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  tool_route: { type: String, required: true }
})
const geode_object = 'BRep'

onMounted(() => {
  get_output_file_extensions(geode_object, props.tool_route)

})

const file_extensions = ref([])
const extension = ref('')

async function get_output_file_extensions (geode_object, tool_route) {
  const params = new FormData()
  params.append('object', geode_object)

  const data = await api_fetch(`${tool_route}/outputfileextensions`, { body: params, method: 'POST' })
  console.log(data)
  file_extensions.value = data.outputfileextensions
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>