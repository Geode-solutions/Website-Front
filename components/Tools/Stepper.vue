<template>
  <v-card class="card">

    <div v-for="(step, index) in props.stepper_tree.steps" :key="index" class="pa-5">
      <ToolsStep :step="step" :step_index="index + 1" :current_step_index="props.stepper_tree.current_step_index" />
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  stepper_tree: { type: Object, required: true }
})

</script>
