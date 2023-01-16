<template>
  <v-card class="pa-5">

    <v-row align="center">
      <v-col cols="auto">
        {{ props.step.title }}
      </v-col>
      <v-col>
        <v-chip v-if="props.step.title">
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
  step: { type: Object, required: true }
})

onMounted(() => {
  console.log('step', props.step)
})

</script>