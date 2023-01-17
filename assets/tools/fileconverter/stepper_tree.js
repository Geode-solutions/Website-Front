import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsFileSelectorExtensionSelector from '@/components/Tools/FileConverter/ExtensionSelector.vue'
import ToolsFileSelectorConversionButton from '@/components/Tools/FileConverter/ConversionButton.vue'

const stepper_tree = {
  current_step_index: 1,
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
    },
    {
      title: 'Confirm the data type',
      component: {
        name: ToolsObjectSelector,
        component_options: {
          geode_objects: geode_objects
        }
      }
    },
    {
      title: 'Select file format',
      component: {
        name: ToolsFileSelectorExtensionSelector,
        component_options: {

        }
      }
    },
    {
      title: 'Convert your file',
      component: ToolsFileSelectorConversionButton,
      component_options: {
        loading: true
      }
    }
  ]
}

export default stepper_tree