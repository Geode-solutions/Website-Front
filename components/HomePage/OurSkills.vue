<template>
  <v-container fluid style="background-color: white" class="pa-10">
    <h2 class="section text-h2" align="center">
      What are our skills
    </h2>
    <v-row justify="space-around" class="container mx-auto">
      <v-col>
        <client-only>
          <CloudWords :data="skills" :font-size-mapper="fontSizeMapper" />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const skills = [
  { text: 'C++', value: 5 },
  { text: 'DevOps', value: 4 },
  { text: 'Meshing', value: 5 },
  { text: 'Python', value: 2 },
  { text: 'Algorithms', value: 3 },
  { text: 'Computational geometry', value: 4 },
  { text: 'Geomodeling', value: 2 },
  { text: 'Unstructured meshes', value: 3 },
  { text: 'BoundaryRepresentation', value: 2 },
  { text: 'Model editing', value: 4 },
  { text: 'Mesh repair', value: 2 },
  { text: 'Model repair', value: 5 },
  { text: 'Continuous integration', value: 2 },
  { text: 'Continuous deployment', value: 2 },
  { text: 'Software engineering', value: 4 },
  { text: 'Robustness', value: 3 },
  { text: 'JavaScript', value: 2 },
  { text: 'Web technologies', value: 2 },
  { text: 'Visualization', value: 2 },
]
const fontSizeMapper = word => word.value * 10
</script>