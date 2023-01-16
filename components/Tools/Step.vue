<template>
  <component :is="props.step.component.name" :component_options="props.step.component.component_options" />
</template>

<script setup>

const props = defineProps({
  step: { type: Object, required: true }
})

onMounted(() => {
  console.log('step', props.step)
})

</script>