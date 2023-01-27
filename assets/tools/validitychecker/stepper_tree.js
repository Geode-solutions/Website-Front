import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsValidityCheckerInspectionButton from '@/components/Tools/ValidityChecker/InspectionButton.vue'
import ToolsValidityCheckerResultsPanels from '@/components/Tools/ValidityChecker/ResultsPanels.vue'

const files = ref([])
const geode_object = ref('')
const model_checks = ref([])

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'Validity checker',
  tool_route: 'validitychecker',
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        component_name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file'
        }
      },
      v_model: files
    },
    {
      title: 'Confirm the data type',
      component: {
        component_name: ToolsObjectSelector,
        component_options: {
          geode_objects: geode_objects,
          input_files: files
        }
      },
      v_model: geode_object
    },
    {
      title: 'Inspect your file',
      component: {
        component_name: ToolsValidityCheckerInspectionButton,
        component_options: {
          input_files: files,
          input_geode_object: geode_object
        }
      },
      v_model: model_checks
    },
    {
      title: 'Inspection results',
      component: {
        component_name: ToolsValidityCheckerResultsPanels,
        component_options: {
          input_model_checks: model_checks
        }
      }
    }
  ]
})

export default stepper_tree