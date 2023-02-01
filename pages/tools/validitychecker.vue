<template>
  <ToolsWrapper :cards_list="cards_list" :stepper_tree="stepper_tree" />
</template>

<script setup>
import geode_objects from '@/assets/geode_objects'
import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsValidityCheckerInspectionButton from '@/components/Tools/ValidityChecker/InspectionButton.vue'
import ToolsValidityCheckerResultsPanels from '@/components/Tools/ValidityChecker/ResultsPanels.vue'

const cards_list = [
  {
    icon: 'mdi-file-check',
    title: 'Supported file formats',
    href: 'https://docs.geode-solutions.com/formats/',
  },
  {
    icon: 'mdi-github',
    title: 'OpenGeode-Inspector GitHub repo',
    href: 'https://github.com/Geode-solutions/OpenGeode-Inspector',
  },
]

const files = ref([])
const geode_object = ref('')
const model_checks = ref([])

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'Validity checker',
  tool_route: 'validitychecker',
  files: files,
  geode_object: geode_object,
  model_checks: model_checks,
  steps: [
    {
      step_title: 'Please select a file to check',
      component: {
        component_name: shallowRef(ToolsFileSelector),
        component_options: {
          multiple: false,
          label: 'Please select a file'
        }
      },
      chips: computed(() => { return files.value.map((file) => file.name) })
    },
    {
      step_title: 'Confirm the data type',
      component: {
        component_name: shallowRef(ToolsObjectSelector),
        component_options: {
          geode_objects: geode_objects,
          input_files: files
        }
      },
      chips: computed(() => {
        if (geode_object.value === '') {
          return []
        } else {
          return [geode_object.value]
        }
      })
    },
    {
      step_title: 'Inspect your file',
      component: {
        component_name: shallowRef(ToolsValidityCheckerInspectionButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object
        }
      },
      chips: []
    },
    {
      step_title: 'Inspection results',
      component: {
        component_name: shallowRef(ToolsValidityCheckerResultsPanels),
        component_options: {
          input_model_checks: model_checks
        }
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)
</script>
