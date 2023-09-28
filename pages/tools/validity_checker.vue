<template>
  <Wrapper :site_key="site_key" :cards_list="cards_list" :stepper_tree="stepper_tree" />
</template>

<script setup>
import Wrapper from '@geode/opengeodeweb-front/components/Wrapper.vue'
import FileSelector from '@geode/opengeodeweb-front/components/FileSelector.vue'
import ObjectSelector from '@geode/opengeodeweb-front/components/ObjectSelector.vue'
import ToolsValidityCheckerInspectionButton from '@/components/Tools/ValidityChecker/InspectionButton.vue'
import ToolsValidityCheckerResultsPanels from '@/components/Tools/ValidityChecker/ResultsPanels.vue'


const cards_list = [
  {
    icon: 'mdi-file-check',
    title: 'Supported file formats',
    href: 'https://docs.geode-solutions.com/guides/formats/',
  },
  {
    icon: 'mdi-github',
    title: 'OpenGeode-Inspector GitHub repo',
    href: 'https://github.com/Geode-solutions/OpenGeode-Inspector',
  },
]
const site_key = useRuntimeConfig().public.SITE_KEY

const files = ref([])
const geode_object = ref('')
const model_checks = ref([])
const route_prefix = 'tools/validity_checker'

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'Validity checker',
  route_prefix: route_prefix,
  files: files,
  geode_object: geode_object,
  model_checks: model_checks,
  steps: [
    {
      step_title: 'Please select a file to check',
      component: {
        component_name: shallowRef(FileSelector),
        component_options: {
          multiple: false,
          label: 'Please select a file',
          variable_to_update: 'files',
          variable_to_increment: 'current_step_index'
        },
      },
      chips: computed(() => { return files.value.map((file) => file.name) })
    },
    {
      step_title: 'Confirm the data type',
      component: {
        component_name: shallowRef(ObjectSelector),
        component_options: {
          variable_to_update: 'geode_object',
          variable_to_increment: 'current_step_index'
        },
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
          variable_to_update: 'model_checks',
          variable_to_increment: 'current_step_index'
        },
      },
      chips: []
    },
    {
      step_title: 'Inspection results',
      component: {
        component_name: shallowRef(ToolsValidityCheckerResultsPanels),
        component_options: {
          input_model_checks: model_checks,
          input_geode_object: geode_object,
          input_file_name: computed(() => { return files.value.map((file) => file.name) }),
          input_index_array: [],
        },
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)
</script>
