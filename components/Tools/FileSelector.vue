<template>
  <v-file-input v-model="value" :multiple="multiple" :label="label" :accept="accept"
    :rules="[(value) => !!value || 'The file is mandatory']" @click:clear="component_options.click" color="primary"
    chips counter show-size />
</template>

<script setup>
import { useVModel } from "@vueuse/core"

const props = defineProps({
  component_options: { type: Object, required: true },
  step_model: { required: false },
  tool_route: { type: String, required: true }
})

const { component_options, step_model, tool_route } = props
const { multiple, label } = component_options

const emit = defineEmits(['update:step_model'])
const value = useVModel(props, "step_model", emit)
const accept = ref('')

async function get_allowed_files (tool_route) {
  const { data } = await api_fetch(`${tool_route}/allowedfiles`, { method: 'GET' })
  const extensions = data.value.extensions.map((extension) => '.' + extension).join(',')
  accept.value = extensions
}

onMounted(() => {
  get_allowed_files(tool_route)
})

</script>