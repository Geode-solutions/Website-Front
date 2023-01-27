import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsFileSelectorExtensionSelector from '@/components/Tools/FileConverter/ExtensionSelector.vue'
import ToolsFileSelectorConversionButton from '@/components/Tools/FileConverter/ConversionButton.vue'

const files = ref([])
const geode_object = ref('')
const output_extension = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'File converter',
  tool_route: 'fileconverter',
  steps: [
    {
      title: 'Please select a file to check',
      component: {
        component_name: ToolsFileSelector,
        component_options: {
          multiple: true,
          label: 'Please select a file',
          accept: [(value) => !!value || 'The file is mandatory']
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
      title: 'Select file format',
      component: {
        component_name: ToolsFileSelectorExtensionSelector,
        component_options: {
          input_geode_object: geode_object
        }
      }
    },
    {
      title: 'Convert your file',
      component: {
        component_name: ToolsFileSelectorConversionButton,
        component_options: {
        }
      }
    }
  ]
})

export default stepper_tree