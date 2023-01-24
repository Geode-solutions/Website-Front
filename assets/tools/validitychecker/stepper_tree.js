import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsValidityCheckerInspectionButton from '@/components/Tools/ValidityChecker/InspectionButton.vue'
import ToolsValidityCheckerResultsPanels from '@/components/Tools/ValidityChecker/ResultsPanels.vue'

const files = ref(['tototo'])
const geode_object = ref('')
const current_step_index = ref(2)
const model_checks = ref([])

const stepper_tree = reactive({
  current_step_index: current_step_index,
  tool_name: 'validitychecker',
  model_checks: model_checks,
  geode_object: geode_object,
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory'],
        }
      },
      chips: files
      // model_value: { files: this.files }
    },
    {
      title: 'Confirm the data type',
      component: {
        name: ToolsObjectSelector,
        component_options: {
          geode_objects: geode_objects,

        }
      }, chips: [geode_object]
    },
    {
      title: 'Inspect your file',
      component: {
        name: ToolsValidityCheckerInspectionButton,
        component_options: {

        }
      },
      chips: []
    },
    {
      title: 'Inspection results',
      component: {
        name: ToolsValidityCheckerResultsPanels,
        component_options: {
          model_checks: []
        }
      },
      chips: []
    }
  ]
})

export default stepper_tree