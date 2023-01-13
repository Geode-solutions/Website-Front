<template>
  <component v-bind:is="props.component.name"></component>
</template>

<script setup>

const props = defineProps({
  title: { type: String, required: true },
  component: { type: Object, required: true }
})

</script>