<template>
  <v-card class="pa-5 card" elevation="5">
    <v-row align="center" @click="parent_set_current_step(step_index)">
      <v-col cols="auto">
        <v-icon v-if="current_step_index > step_index" icon="mdi-check-circle" color="grey" />
        <v-icon v-else-if="current_step_index == step_index" :icon="`mdi-numeric-${step_index + 1}-circle`"
          color="primary" />
        <v-icon v-else :icon="`mdi-numeric-${step_index + 1}-circle`" color="grey" />
      </v-col>
      <v-col cols="auto">
        <p class="font-weight-bold">
          {{ step_title }}
        </p>
      </v-col>
      <v-col v-if="chips.length && current_step_index >= step_index">
        <v-chip v-for="chip in chips">
          {{ chip }}
        </v-chip>
      </v-col>
    </v-row>
    <Transition name="slide-fade">
      <v-row v-if="step_index == current_step_index">
        <component :is="component_name" :component_options="component_options" v-model:step_model="value"
          :tool_route="tool_route" />
      </v-row>
    </Transition>
  </v-card>
</template>

<script setup>
import { useVModel } from "@vueuse/core"

const props = defineProps({
  current_step_index: { type: Number, required: true },
  step_index: { type: Number, required: true },
  tool_route: { type: String, required: true },
  step: { type: Object, required: true },
  model_value: { required: false }
})

const { current_step_index, step_index, tool_route, step, model_value } = props
const { component, step_title } = step
const { component_options, component_name } = component

const chips = ref([])

const emit = defineEmits([
  'set_current_step',
  'update:model_value'
])

const value = useVModel(props, "model_value", emit)
watch(value, (value, old) => {
  console.log(value, old)
  chips.value = value.map(file => file.name)
  parent_set_current_step(props.step_index + 1)
})

function parent_set_current_step (step) {
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
