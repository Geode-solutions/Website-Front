<template>
  <component :is="props.component.name" />
</template>

<script setup>

const props = defineProps({
  title: { type: String, required: true },
  component: { type: Object, required: true }
})

</script>