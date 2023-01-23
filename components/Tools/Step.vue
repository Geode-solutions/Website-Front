<template>
  <v-card class="pa-5 card" elevation="5">
    <v-row align="center">
      <v-col cols="auto">
        <v-icon v-if="props.current_step_index > props.step_index" icon="mdi-check-circle" color="primary" />
        <v-icon v-else :icon="`mdi-numeric-${props.step_index}-circle`" color="grey" />
      </v-col>
      <v-col cols="auto">
        <p class="font-weight-bold">
          {{ props.step.title }}
        </p>
      </v-col>
      <v-col v-if="chips.length && props.step_index > props.current_step_index">
        <v-chip v-for="chip in chips">
          {{ chip }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row v-if="props.step_index == props.current_step_index">
      <component :is="props.step.component.name" :component_options="props.step.component.component_options"
        :tool_name="props.tool_name" />
    </v-row>
  </v-card>
</template>

<script setup>

const chips = ['toto', 'tutu']

const props = defineProps({
  tool_name: { type: String, required: true },
  step: { type: Object, required: true },
  step_index: { type: Number, required: true },
  current_step_index: { type: Number, required: true }
})


</script>

<style>
.card {
  border-radius: 15px;
}
</style>
