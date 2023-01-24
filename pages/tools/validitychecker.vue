<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <ToolsHeader tool_name="Validity checker" :cards_list="cards_list" />
      </v-col>
      <v-col>
        <ToolsLauncher />
      </v-col>
      <v-col v-if="is_cloud_running" class="pb-3">
        <ToolsStepper :tool_name="stepper_tree.tool_name" :stepper_tree="stepper_tree" />
      </v-col>
      <v-col v-if="is_cloud_running">
        <ToolsPackagesVersions :tool_name="stepper_tree.tool_name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import cards_list from '@/assets/tools/validitychecker/cards'
import stepper_tree from '@/assets/tools/validitychecker/stepper_tree'

import { use_cloud_store } from '@/stores/cloud'
import { storeToRefs } from 'pinia'
const cloud_store = use_cloud_store()
const { is_cloud_running } = storeToRefs(cloud_store)


</script>
