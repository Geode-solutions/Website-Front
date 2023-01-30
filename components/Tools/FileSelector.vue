<template>
  <v-file-input v-model="stepper_tree.files" :multiple="multiple" :label="label" :accept="accept"
    :rules="[(value) => !!value || 'The file is mandatory']" @click:clear="stepper_tree.files = []" color="primary"
    chips counter show-size />
</template>

<script setup>
const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { multiple, label } = props.component_options

const accept = ref('')

watch(stepper_tree.files, (value) => {
  console.log(value)
})

async function get_allowed_files (tool_route) {
  const { data } = await api_fetch(`${tool_route}/allowedfiles`, { method: 'GET' })
  const extensions = data.value.extensions.map((extension) => '.' + extension).join(',')
  accept.value = extensions
}

onMounted(() => {
  get_allowed_files(tool_route)
})

</script>