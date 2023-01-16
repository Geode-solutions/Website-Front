<template>
  <div v-for="step in stepper.steps">
    
    <ToolsStep :step="step" />
  </div>
</template>

<script setup>
import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import geode_objects from '@/assets/tools/geode_objects'
import { use_tools_store } from '@/stores/tools'
const tools_store = use_tools_store()

const tool = 'validitychecker'
const stepper = {
  current_step: 0,
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory'],
          click: tools_store.get_allowed_objects(tool)
        }
      }
    }
    , {
      title: 'Confirm the data type',
      component: {
        name: ToolsObjectSelector,
        component_options: {
          geode_objects: geode_objects
        }
      }
    },
    // {
    //   title: 'Inspect your file',
    //   component: 'ToolsValidityCheckerInspectionButton'
    // },
    // {
    //   title: 'Inspection results',
    //   component: 'ToolsValidityCheckerResultsPanels'
    // }
  ]
}

</script>