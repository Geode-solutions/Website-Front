import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsValidityCheckerInspectionButton from '@/components/Tools/ValidityChecker/InspectionButton.vue'
import ToolsValidityCheckerResultsPanels from '@/components/Tools/ValidityChecker/ResultsPanels.vue'

const stepper_tree = {
  current_step_index: 1,
  tool_name: 'validitychecker',
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory']
          // click: tools_store.get_allowed_objects(tool)
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
    {
      title: 'Inspect your file',
      component: {
        name: ToolsValidityCheckerInspectionButton,
        component_options: {

        }
      }
    },
    {
      title: 'Inspection results',
      component: ToolsValidityCheckerResultsPanels,
      component_options: {
        model_checks: []
      }
    }
  ]
}

export default stepper_tree