<template>
  <v-card class="card">
    <div v-for="(step, index) in steps" :key="index" class="pa-3">
      <ToolsStep :step_index="index" />
    </div>
  </v-card>
</template>

<script setup>
const stepper_tree = inject('stepper_tree')
const { steps } = stepper_tree

function set_current_step (step) {
  current_step_index.value = step
}

onMounted(() => {
  console.log('Stepper :', stepper_tree)
})

</script>
