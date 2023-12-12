<template>
  <Wrapper
    :cards_list="cards_list"
    :stepper_tree="stepper_tree"
    :versions_schema="versions_schema"
  />
</template>

<script setup>
  import FileSelector from "@geode/opengeodeweb-front/components/FileSelector.vue"
  import ObjectSelector from "@geode/opengeodeweb-front/components/ObjectSelector.vue"
  import MissingFilesSelector from "@geode/opengeodeweb-front/components/MissingFilesSelector.vue"
  import ToolsValidityCheckerInspectionButton from "@/components/Tools/ValidityChecker/InspectionButton.vue"
  import ToolsValidityCheckerResultsPanels from "@/components/Tools/ValidityChecker/ResultsPanels.vue"

  import versions_schema from "@/components/Tools/ValidityChecker/PackagesVersions.json"

  const cards_list = [
    {
      icon: "mdi-file-check",
      title: "Supported file formats",
      href: "https://docs.geode-solutions.com/guides/formats/",
    },
    {
      icon: "mdi-github",
      title: "OpenGeode-Inspector GitHub repo",
      href: "https://github.com/Geode-solutions/OpenGeode-Inspector",
    },
  ]

  const files = ref([])
  const input_geode_object = ref("")
  const additional_files = ref([])
  const model_checks = ref([])
  const route_prefix = "tools/validity_checker"
  const key = "inspector"

  const stepper_tree = reactive({
    current_step_index: ref(0),
    tool_name: "Validity checker",
    route_prefix: route_prefix,
    files: files,
    input_geode_object: input_geode_object,
    model_checks: model_checks,
    key: key,
    steps: [
      {
        step_title: "Please select a file to check",
        component: {
          component_name: shallowRef(FileSelector),
          component_options: {
            multiple: false,
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
            filenames: computed(() => {
              return files.value.map((file) => file.name)
            }),
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
            filenames: computed(() => {
              return files.value.map((file) => file.name)
            }),
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
        step_title: "Inspect your file",
        component: {
          component_name: shallowRef(ToolsValidityCheckerInspectionButton),
          component_options: {
            files: files,
            input_geode_object: input_geode_object,
          },
        },
        chips: [],
      },
      {
        step_title: "Inspection results",
        component: {
          component_name: shallowRef(ToolsValidityCheckerResultsPanels),
          component_options: {
            model_checks,
            input_geode_object,
            filename: computed(() => {
              return files.value[0].name
            }),
            input_index_array: [],
          },
        },
        chips: [],
      },
    ],
  })

  provide("stepper_tree", stepper_tree)
</script>
