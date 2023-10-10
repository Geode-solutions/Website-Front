<template>
  <v-container fluid style="background-color: white" class="pa-10">
    <h2 class="section text-h2" align="center">Which applications</h2>
    <v-timeline color>
      <v-timeline-item
        v-for="application in applications"
        :key="application"
        size="30"
        dot-color="primary"
        fill-dot
        class="text-h4 font-weight-light"
      >
        {{ application }}
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
