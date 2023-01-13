<template>
  <v-file-input
    :multiple="props.multiple"
    :label="props.label"
    :accept="props.accept"
    :rules="props.rules"
    color="#3b3b3b"
    chips
    show-size
    @click:clear="props.click"
    @change="props.change"
  />
</template>

<script setup>

const props = defineProps({
  multiple: { type: Boolean, required: true },
  label: { type: String, required: true },
  accept: { type: String, required: true },
  rules: { type: String, required: true },
  click: { type: Function, required: true },
  change: { type: Function, required: true }
})

</script>