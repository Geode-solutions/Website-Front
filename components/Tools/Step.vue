<template>
  <v-card class="pa-5 card" elevation="5">
    <v-row align="center" @click="parent_set_current_step(props.step_index)">
      <v-col cols="auto">
        <v-icon v-if="props.current_step_index > props.step_index" icon="mdi-check-circle" color="grey" />
        <v-icon v-else-if="props.current_step_index == props.step_index"
          :icon="`mdi-numeric-${props.step_index}-circle`" color="primary" />
        <v-icon v-else :icon="`mdi-numeric-${props.step_index}-circle`" color="grey" />
      </v-col>
      <v-col cols="auto">
        <p class="font-weight-bold">
          {{ props.step.title }}
        </p>
      </v-col>
      <v-col v-if="props.chips.length && props.current_step_index > props.step_index">
        <v-chip v-for="chip in props.chips">
          {{ chip }}
        </v-chip>
      </v-col>
    </v-row>
    <Transition name="slide-fade">
      <v-row v-if="props.step_index == props.current_step_index">
        <component :is="props.step.component.name" :component_options="props.step.component.component_options"
          v-model="props.model_value" :tool_route="props.tool_route" />
      </v-row>
    </Transition>
  </v-card>
</template>

<script setup>

const props = defineProps({
  tool_route: { type: String, required: true },
  step: { type: Object, required: true },
  step_index: { type: Number, required: true },
  current_step_index: { type: Number, required: true },
  chips: { type: Array, required: true },
  model_value: { type: Object, required: false }
})

const emit = defineEmits({
  e: 'set_current_step', step: Number
})

function parent_set_current_step (step) {
  // window.alert(step)

  emit("set_current_step", step);
}

</script>

<style>
.card {
  border-radius: 15px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
