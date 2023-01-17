<template>
  <v-card class="pa-5 card" elevation="5">

    <v-row align="center">
      <v-col cols="auto">
        <v-icon v-if="props.current_step_index > props.step_index" icon="mdi-check-circle" color="primary" />
        <v-icon v-else :icon="`mdi-numeric-${props.step_index}-circle`" color="grey" />
      </v-col>
      <v-col cols="auto">
        <b>
          {{ props.step.title }}
        </b>
      </v-col>
      <v-col>
        <v-chip v-if="props.step_index > props.current_step_index">
          {{ props.step.title }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <component :is="props.step.component.name" :component_options="props.step.component.component_options" />
    </v-row>
  </v-card>
</template>

<script setup>

const props = defineProps({
  step: { type: Object, required: true },
  step_index: { type: Number, required: true },
  current_step_index: { type: Number, required: true }
})

onMounted(() => {
  console.log('step_index', props.step_index)
  console.log('current_step_index', props.current_step_index)
})

</script>
