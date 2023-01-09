<template>
  <v-container
    fluid
    style="background-color: white"
  >
    <v-row class="container mx-auto">
      <v-col>
        <h2
          class="section text-h2"
          align="center"
        >
          Which applications
        </h2>
        <v-timeline
          color
          class="pa-10"
        >
          <v-timeline-item
            v-for="(application, index) in applications"
            :key="index"
            size="30"
            dot-color="primary"
            fill-dot
            class="text-h4 font-weight-light"
          >
            {{ application.name }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const applications = [
  {
    name: '`Geo${&shy;}thermal`'
  },
  {
    name: 'Mining'
  },
  {
    name: 'CCUS'
  },
  {
    name: 'Oil&shy;Gas'
  },
  {
    name: 'Geo&shy;mecha&shy;nics'
  },
  {
    name: 'Hydro&shy;geology'
  },
  {
    name: 'Urban geology'
  }
]


</script>
