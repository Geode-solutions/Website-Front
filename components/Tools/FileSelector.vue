<template>
  <v-file-input :multiple="props.component_options.multiple" :label="props.component_options.label"
    :accept="props.component_options.accept" :rules="props.component_options.rules"
    @click:clear="props.component_options.click" @change="props.component_options.change" color="#3b3b3b" chips
    show-size />
</template>

<script setup>

const props = defineProps({
  component_options: { type: Object, required: true }
})

</script>