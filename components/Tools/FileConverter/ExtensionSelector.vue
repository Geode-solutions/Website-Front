<template>
  <v-row align="center">
    <v-col cols="auto">
      Select file format
    </v-col>
    <v-col>
      <v-chip v-if="extension">
        {{ extension }}
      </v-chip>
    </v-col>
  </v-row>
  <v-row v-if="file_extensions.length" class="flex-column">
    <v-col>
      <v-row class="justify-left">
        <v-col v-for="file_extension in file_extensions" :key="file_extension" cols="2">
          <v-card class=" card ma-2" hover @click="set_file_format(file_extension)">
            <v-card-title class="justify-center">
              {{ file_extension }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
const file_extensions = ref([])
const extension = ref('')


async function get_output_file_extensions (object, tool_route) {
  const params = new FormData()
  params.append('object', object)
  const { data } = await api_fetch(`${tool_route}/outputfileextensions`, params, { method: 'POST' })
  file_extensions = data.value.outputfileextensions
  this.current_step = this.current_step + 1
}
</script>