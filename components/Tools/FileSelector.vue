<template>
  <v-file-input :multiple="multiple" :label="label" :accept="accept" :rules="rules"
    @click:clear="props.component_options.click" @change="props.component_options.change" color="primary" chips counter
    show-size />
</template>

<script setup>

const props = defineProps({
  component_options: { type: Object, required: true }
})

const multiple = props.component_options.multiple
const label = props.component_options.label
const accept = props.component_options.accept
const rules = props.component_options.rules

</script>