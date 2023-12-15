<template>
  <v-container fluid style="background-color: white" class="pa-10">
    <h2 class="section text-h2" align="center">Which applications</h2>
    <v-timeline color align="start">
      <v-timeline-item
        v-for="(application, index) in applications"
        :key="application"
        size="20"
        dot-color="primary"
        fill-dot
        class="text-h4 font-weight-light text-wrap"
      >
        <template v-slot:opposite> {{ application }}</template>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup>
  const applications = [
    "Geothermal",
    "Mining",
    "CCUS",
    "OilGas",
    "Geomechanics",
    "Hydrogeology",
    "Urban geology",
  ]
</script>
