<template>
  <v-card class="card">
    <div v-for="(step, index) in props.stepper_tree.steps" :key="index" class="pa-3">
      <ToolsStep :tool_route="props.tool_route" :step="step" :step_index="index + 1"
        :current_step_index="props.stepper_tree.current_step_index" :chips="step.chips"
        v-model:step.v_model="step.v_model.value" @set_current_step="set_current_step" />
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  tool_route: { type: String, required: true },
  stepper_tree: { type: Object, required: true }
})

function set_current_step (step) {
  if (step <= 3) {
    props.stepper_tree.model_checks = []
  }
  if (step <= 2) {
    props.stepper_tree.geode_object = ''
  }
  if (step <= 1) {
    props.stepper_tree.files = []
  }
  props.stepper_tree.current_step_index = step
}

</script>
