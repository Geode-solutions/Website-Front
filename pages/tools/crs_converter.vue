<template>
  <Wrapper :site_key="site_key" :cards_list="cards_list" />
</template>

<script setup>
import geode_objects from '@/assets/geode_objects'
import Wrapper from '@geode/opengeodeweb-front/components/Wrapper.vue'
import FileSelector from '@geode/opengeodeweb-front/components/FileSelector.vue'
import ObjectSelector from '@geode/opengeodeweb-front/components/ObjectSelector.vue'
import CrsSelector from '@geode/opengeodeweb-front/components/CrsSelector.vue'
import ExtensionSelector from '@geode/opengeodeweb-front/components/ExtensionSelector.vue'
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
const site_key = useRuntimeConfig().public.SITE_KEY

const files = ref([])
const geode_object = ref('')
const input_crs = ref({})
const output_crs = ref({})
const output_extension = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'CRS converter',
  route_prefix: 'tools/crs_converter',
  files: files,
  geode_object: geode_object,
  input_crs: input_crs,
  output_crs: output_crs,
  output_extension: output_extension,
  steps: [
    {
      step_title: 'Please select a file to convert',
      component: {
        component_name: shallowRef(FileSelector),
        component_options: {
          multiple: true,
          label: 'Please select a file'
        }, display_step: true,
        skippable: false
      },
      chips: computed(() => { return files.value.map((file) => file.name) })
    },
    {
      step_title: 'Confirm the data type',
      component: {
        component_name: shallowRef(ObjectSelector),
        component_options: {
          geode_objects: geode_objects,
          input_files: files
        }, display_step: true,
        skippable: false
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
        component_name: shallowRef(CrsSelector),
        component_options: {
          input_geode_object: geode_object,
          crs_key: 'input_crs'
        }, display_step: true,
        skippable: false
      },
      chips: computed(() => {
        return Object.values(input_crs.value)
      })
    },
    {
      step_title: 'Select an output coordinate reference system',
      component: {
        component_name: shallowRef(CrsSelector),
        component_options: {
          input_geode_object: geode_object,
          crs_key: 'output_crs'
        }, display_step: true,
        skippable: false
      },
      chips: computed(() => {
        return Object.values(output_crs.value)
      })
    },
    {
      step_title: 'Select file format',
      component: {
        component_name: shallowRef(ExtensionSelector),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_output_extension: output_extension,
        }, display_step: true,
        skippable: false
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
        component_name: shallowRef(ToolsCrsSelectorConversionButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_crs: input_crs,
          output_crs: output_crs,
          input_output_extension: output_extension,
        }, display_step: true,
        skippable: false
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)
</script>

