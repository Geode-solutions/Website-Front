<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <ToolsHeader tool_name="File converter" :cards_list="cards_list" />
      </v-col>
      <!-- <v-col>
        <ToolsLauncher />
      </v-col> -->
      <!-- v-if="cloud_store.is_cloud_running -->
      <v-col class="pb-5">

        <ToolsStepper :stepper_tree="stepper_tree" />
        <!-- <v-stepper-step step="4" @click="current_step = 4"> -->
        Convert your file
        <!-- </v-stepper-step> -->
        <!-- <v-stepper-content step="4"> -->
        <v-btn :loading="loading" color="primary" @click="convert_file(files)">
          Convert
          <template #loader>
            <v-progress-circular indeterminate size="20" color="white" width="3" />
          </template>
        </v-btn>
        <v-btn variant="text" @click="current_step = 3">
          Cancel
        </v-btn>
        <!-- </v-stepper-content> -->
        <!-- </v-stepper> -->
      </v-col>
      <v-col v-if="cloud_store.is_cloud_running">
        <ToolsPackagesVersions :packages_versions="packages_versions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// import fileDownload from 'js-file-download'
import cards_list from '@/assets/tools/fileconverter/cards'
import stepper_tree from '@/assets/tools/fileconverter/stepper_tree'

import { use_cloud_store } from '@/stores/cloud'
import { use_tools_store } from '@/stores/tools'
const cloud_store = use_cloud_store()
const tools_store = use_tools_store()

onActivated(() => {
  if (cloud_store.is_cloud_running === true) {
    tools_store.get_allowed_files(tool_route)
    tools_store.get_packages_versions(tool_route)
  }
})


async function get_output_file_extensions (object, tool_route) {
  const params = new FormData()
  params.append('object', object)
  this.GeodeObject = object

  const data = await this.$axios.$post(`${this.ID}/${tool_route}/outputfileextensions`, params)
  this.file_extensions = data.outputfileextensions
  this.current_step = this.current_step + 1
}
function set_file_format (extension) {
  this.extension = extension
  this.current_step = 4
}

</script>

