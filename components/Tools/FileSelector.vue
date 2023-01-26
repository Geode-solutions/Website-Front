<template>
  <v-file-input :multiple="multiple" :label="label" :accept="accept" :rules="rules"
    @click:clear="props.component_options.click" @changed="get_allowed_objects()" color="primary" chips counter
    show-size />
</template>

<script setup>
const props = defineProps({
  tool_route: { type: String, required: true },
  component_options: { type: Object, required: true }
})

const multiple = props.component_options.multiple
const label = props.component_options.label
const rules = props.component_options.rules
const accept = ref('')

async function get_allowed_files (tool_route) {
  const { data } = await api_fetch(`${tool_route}/allowedfiles`, { method: 'GET' })
  const extensions = data.value.extensions.map((extension) => '.' + extension).join(',')
  accept.value = extensions
}

onMounted(() => {
  get_allowed_files(props.tool_route)
})

</script>