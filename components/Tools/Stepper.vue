<template>
  <ToolsStep v-for="step in stepper.steps" />
</template>

<script setup>
import geode_objects from '@/assets/tools/geode_objects'

const stepper = {
  current_step: 0,
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        name: 'ToolsFileSelector',
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory'],
          click: tools_store.get_allowed_objects(tool)
        }
      }
    },
    {
      title: 'Confirm the data type',
      component: {
        name: 'ToolsObjectSelector',
        component_options: {
          geode_objects: geode_objects
        }
      }
    },
    {
      title: 'Inspect your file',
      component: 'ToolsValidityCheckerInspectionButton'
    },
    {
      title: 'Inspection results',
      component: 'ToolsValidityCheckerResultsPanels'
    }
  ]
}

</script>