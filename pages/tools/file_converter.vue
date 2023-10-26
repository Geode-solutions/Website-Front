<template>
  <Wrapper :cards_list="cards_list" />
</template>

<script setup>
  import _ from "lodash"

  import Wrapper from "@geode/opengeodeweb-front/components/Wrapper.vue"
  import FileSelector from "@geode/opengeodeweb-front/components/FileSelector.vue"
  import ObjectSelector from "@geode/opengeodeweb-front/components/ObjectSelector.vue"
  import MissingFilesSelector from "@geode/opengeodeweb-front/components/MissingFilesSelector.vue"
  import ExtensionSelector from "@geode/opengeodeweb-front/components/ExtensionSelector.vue"
  import ToolsFileSelectorConversionButton from "@/components/Tools/FileConverter/ConversionButton.vue"

  const cards_list = [
    {
      icon: "mdi-file-check",
      title: "Supported file formats",
      href: "https://docs.geode-solutions.com/guides/formats/",
    },
    {
      icon: "mdi-github",
      title: "OpenGeode GitHub repo",
      href: "https://github.com/Geode-solutions/OpenGeode",
    },
  ]

  const files = ref([])
  const input_geode_object = ref("")
  const additional_files = ref([])
  const output_geode_object = ref("")
  const output_extension = ref("")
  const route_prefix = "tools/file_converter"

  const stepper_tree = reactive({
    current_step_index: ref(0),
    tool_name: "File converter",
    route_prefix: route_prefix,
    files: files,
    input_geode_object: input_geode_object,
    additional_files: additional_files,
    output_geode_object: output_geode_object,
    output_extension: output_extension,
    steps: [
      {
        step_title: "Please select file(s) to convert",
        component: {
          component_name: shallowRef(FileSelector),
          component_options: {
            multiple: true,
          },
        },
        chips: computed(() => {
          return files.value.map((file) => file.name)
        }),
      },

      {
        step_title: "Please confirm the data type",
        component: {
          component_name: shallowRef(ObjectSelector),
          component_options: {
            files: files,
          },
        },
        chips: computed(() => {
          if (input_geode_object.value === "") {
            return []
          } else {
            return [input_geode_object.value]
          }
        }),
      },
      {
        step_title: "Please select additionnal files",
        component: {
          component_name: shallowRef(MissingFilesSelector),
          component_options: {
            multiple: true,
            input_geode_object: input_geode_object,
            files: files,
          },
          skippable: true,
        },
        chips: computed(() => {
          return additional_files.value.map(
            (additional_file) => additional_file.name,
          )
        }),
      },
      {
        step_title: "Select output representation and file format",
        component: {
          component_name: shallowRef(ExtensionSelector),
          component_options: {
            input_geode_object: input_geode_object,
            variable_to_update: "input_crs",
          },
        },
        chips: computed(() => {
          const output_params = computed(() => {
            return [output_geode_object, output_extension]
          })
          if (_.isEmpty(output_params)) {
            return []
          } else {
            const array = []
            for (const property in output_params.value) {
              array.push(output_params.value[property])
            }
            return array
          }
        }),
      },
      {
        step_title: "Convert your file",
        component: {
          component_name: shallowRef(ToolsFileSelectorConversionButton),
          component_options: {
            files: files,
            input_geode_object: input_geode_object,
            output_geode_object: output_geode_object,
            output_extension: output_extension,
          },
        },
        chips: [],
      },
    ],
  })

  provide("stepper_tree", stepper_tree)
</script>
