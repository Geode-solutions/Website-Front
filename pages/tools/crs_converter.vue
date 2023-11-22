<template>
  <Wrapper
    :cards_list="cards_list"
    :stepper_tree="stepper_tree"
    :versions_schema="versions_schema"
  />
</template>

<script setup>
  import _ from "lodash"

  import FileSelector from "@geode/opengeodeweb-front/components/FileSelector.vue"
  import MissingFilesSelector from "@geode/opengeodeweb-front/components/MissingFilesSelector.vue"
  import ObjectSelector from "@geode/opengeodeweb-front/components/ObjectSelector.vue"
  import CrsSelector from "@geode/opengeodeweb-front/components/CrsSelector.vue"
  import ExtensionSelector from "@geode/opengeodeweb-front/components/ExtensionSelector.vue"
  import ToolsCrsSelectorConversionButton from "@/components/Tools/CrsConverter/ConversionButton.vue"

  import versions_schema from "@/components/Tools/CrsConverter/PackagesVersions.json"

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
  const input_crs = ref({})
  const output_crs = ref({})
  const output_geode_object = ref("")
  const output_extension = ref("")
  const route_prefix = "tools/crs_converter"
  const key = "crs"

  const stepper_tree = reactive({
    current_step_index: ref(0),
    tool_name: "CRS converter",
    route_prefix: route_prefix,
    files: files,
    input_geode_object: input_geode_object,
    input_crs: input_crs,
    output_crs: output_crs,
    output_geode_object: output_geode_object,
    output_extension: output_extension,
    key: key,
    steps: [
      {
        step_title: "Please select a file to convert",
        component: {
          component_name: shallowRef(FileSelector),
          component_options: {
            multiple: true,
            key: key,
            route: "tools/upload_file",
          },
        },
        chips: computed(() => {
          return files.value.map((file) => file.name)
        }),
      },
      {
        step_title: "Confirm the data type",
        component: {
          component_name: shallowRef(ObjectSelector),
          component_options: {
            files: files,
            key: key,
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
            route: "tools/upload_file",
          },
        },
        chips: computed(() => {
          return additional_files.value.map(
            (additional_file) => additional_file.name,
          )
        }),
      },
      {
        step_title: "Select an input coordinate reference system",
        component: {
          component_name: shallowRef(CrsSelector),
          component_options: {
            input_geode_object: input_geode_object,
            key_to_update: "input_crs",
          },
        },
        chips: computed(() => {
          return Object.values(input_crs.value)
        }),
      },
      {
        step_title: "Select an output coordinate reference system",
        component: {
          component_name: shallowRef(CrsSelector),
          component_options: {
            input_geode_object: input_geode_object,
            key_to_update: "output_crs",
          },
        },
        chips: computed(() => {
          return Object.values(output_crs.value)
        }),
      },
      {
        step_title: "Select output representation and file format",
        component: {
          component_name: shallowRef(ExtensionSelector),
          component_options: {
            input_geode_object: input_geode_object,
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
              if (output_params.value[property].value !== "") {
                array.push(output_params.value[property].value)
              }
            }
            return array
          }
        }),
      },
      {
        step_title: "Convert your file",
        component: {
          component_name: shallowRef(ToolsCrsSelectorConversionButton),
          component_options: {
            files,
            input_geode_object,
            input_crs,
            output_crs,
            output_geode_object,
            output_extension,
          },
        },
        chips: [],
      },
    ],
  })

  provide("stepper_tree", stepper_tree)
</script>
