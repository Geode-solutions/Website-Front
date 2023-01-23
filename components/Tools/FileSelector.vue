<template>
  <v-file-input :multiple="multiple" :label="label" :accept="accept" :rules="rules"
    @click:clear="props.component_options.click" @input="get_allowed_objects()" color="primary" chips counter
    show-size />
</template>

<script setup>
const props = defineProps({
  tool_name: { type: String, required: true },
  component_options: { type: Object, required: true }
})

const multiple = props.component_options.multiple
const label = props.component_options.label
const rules = props.component_options.rules
const accept = ref('*')
const files = ref([])

async function get_allowed_files (tool_name) {
  const { data } = await api_fetch(`${tool_name}/allowedfiles`)
  const extensions = data.value.extensions.map((extension) => '.' + extension).join(',')
  console.log(extensions)
  accept.value = extensions
}

async function get_allowed_objects (changed_files) {
  this.message = 'File(s) selected'
  if (this.multiple) {
    this.files = changed_files
  } else {
    this.files = [changed_files]
  }

  const params = new FormData()
  params.append('filename', this.files[0].name)
  const data = await api_fetch(`/${tool_name}/allowedobjects`, params)
  this.objects = data.objects
  this.current_step = this.current_step + 1
}

onMounted(() => {
  console.log(props.tool_name)
  get_allowed_files(props.tool_name)
})

</script>