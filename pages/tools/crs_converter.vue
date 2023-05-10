<template>
  <ToolsWrapper :cards_list="cards_list" />
</template>

<script setup>
import geode_objects from '@/assets/geode_objects'
import ToolsFileSelector from '@/components/Tools/FileSelector.vue'
import ToolsObjectSelector from '@/components/Tools/ObjectSelector.vue'
import ToolsCrsConverterCrsSelector from '@/components/Tools/CrsConverter/CrsSelector.vue'
import ToolsExtensionSelector from '@/components/Tools/ExtensionSelector.vue'
import ToolsCrsSelectorConversionButton from '@/components/Tools/CrsConverter/ConversionButton.vue'

const cards_list = [
  {
    icon: 'mdi-file-check',
    title: 'Supported file formats',
    href: 'https://docs.geode-solutions.com/formats/',
  },
  {
    icon: 'mdi-github',
    title: 'OpenGeode GitHub repo',
    href: 'https://github.com/Geode-solutions/OpenGeode',
  },
]

const files = ref([])
const geode_object = ref('')
const input_crs = ref({})
const output_crs = ref({})
const output_extension = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'CRS converter',
  tool_route: 'crs_converter',
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
      step_title: 'Select an input coordinate reference system',
      component: {
        component_name: shallowRef(ToolsCrsConverterCrsSelector),
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
      step_title: 'Select an output coordinate reference system',
      component: {
        component_name: shallowRef(ToolsCrsConverterCrsSelector),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_output_extension: output_extension,
        }
      },
      chips: []
    },
    {
      step_title: 'Select file format',
      component: {
        component_name: shallowRef(ToolsExtensionSelector),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_output_extension: output_extension,
        }
      },
      chips: []
    },
    {
      step_title: 'Convert your file',
      component: {
        component_name: shallowRef(ToolsCrsSelectorConversionButton),
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

provide('stepper_tree', stepper_tree)
</script>

