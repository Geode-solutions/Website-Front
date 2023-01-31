import { computed, ref, reactive, shallowRef } from 'vue'
import geode_objects from '@/assets/tools/geode_objects'

import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsFileSelectorExtensionSelector from '@/components/Tools/FileConverter/ExtensionSelector.vue'
import ToolsFileSelectorConversionButton from '@/components/Tools/FileConverter/ConversionButton.vue'

const files = ref([])
// const chips_files = computed(() => { return files.value.map((file) => file.name) })
const geode_object = ref('')
const output_extension = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'File converter',
  tool_route: 'fileconverter',
  files: files,
  geode_object: geode_object,
  output_extension: output_extension,
  steps: [
    {
      step_title: 'Please select a file to convert',
      component: {
        component_name: shallowRef(ToolsFileSelector),
        component_options: {
          multiple: true,
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
      step_title: 'Select file format',
      component: {
        component_name: shallowRef(ToolsFileSelectorExtensionSelector),
        component_options: {
          input_geode_object: geode_object
        }
      },
      chips: computed(() => {
        if (output_extension.value === '') {
          return []
        } else {
          return [output_extension.value]
        }
      })
    },
    {
      step_title: 'Convert your file',
      component: {
        component_name: shallowRef(ToolsFileSelectorConversionButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_output_extension: output_extension,
        }
      },
      chips: []
    }
  ]
})

export default stepper_tree