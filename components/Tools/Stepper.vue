<template>
  <v-card class="card">
    <div v-for="(step, index) in steps" :key="index" class="pa-0" >
      <div v-if="(step.component.display_step)" class="pa-3" >
        <ToolsStep :step_index="index" />
      </div>
    </div>
  </v-card>
</template>

<script setup>
const stepper_tree = inject('stepper_tree')
const { steps } = stepper_tree
</script>
