import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsFileSelectorExtensionSelector from '@/components/Tools/FileConverter/ExtensionSelector.vue'
import ToolsFileSelectorConversionButton from '@/components/Tools/FileConverter/ConversionButton.vue'

const current_step_index = ref(1)
const files = ref([])
const geode_object = ref('')
const output_extension = ref('')

const stepper_tree = {
  current_step_index: current_step_index,
  tool_name: 'File converter',
  tool_route: 'fileconverter',
  output_extension: output_extension,
  geode_object: geode_object,
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory']
        }
      },
      v_model: files,
      chips: files
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