<template>
  <v-file-input v-model="files" :multiple="multiple" :label="label" :accept="accept"
    :rules="[(value) => !!value || 'The file is mandatory']" color="primary" chips counter show-size
    @click:clear="stepper_tree.files = []" />
</template>

<script setup>
import { use_errors_store } from '@/stores/errors'
const errors_store = use_errors_store()

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { multiple, label } = props.component_options

const accept = ref('')
const files = ref([])

watch(files, (value) => {
  stepper_tree.files = value
  stepper_tree.current_step_index++
})

async function get_allowed_files (tool_route) {
  const route = `${tool_route}/allowedfiles`
  await api_fetch(route, {
    method: 'GET', async onResponse ({ response }) {
      console.log(response)
      const extensions = response._data.extensions.map((extension) => '.' + extension).join(',')
      accept.value = extensions
    },
    onResponseError ({ response, error }) {
      errors_store.add_error({ "code": response.status, "route": route, 'message': response._data.error_message })
      console.log(error)
      console.log(response)
    }
  })
}

onMounted(async () => {
  await get_allowed_files(tool_route)
})

</script>