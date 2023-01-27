<template>
  <v-card class="card">
    <div v-for="(step, index) in steps" :key="index" class="pa-3">
      <ToolsStep :tool_route="tool_route" :step="step" :step_index="index" :current_step_index="current_step_index"
        v-model:model_value="step.v_model" @set_current_step="set_current_step" />
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  tool_route: { type: String, required: true },
  stepper_tree: { type: Object, required: true }
})
const { tool_route, stepper_tree } = props
const { current_step_index, steps } = stepper_tree

watch(props.stepper_tree, (value) => { console.log("stepper_tree", value) })

function set_current_step (step) {
  // if (step < 3) {
  //   props.stepper_tree.model_checks = []
  // }
  // if (step < 2) {
  //   props.stepper_tree.geode_object = ''
  // }
  // if (step < 1) {
  //   props.stepper_tree.files = []
  // }
  props.stepper_tree.current_step_index = step
}

</script>
