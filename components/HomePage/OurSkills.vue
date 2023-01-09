<template>
  <v-container
    fluid
    style="background-color: white"
  >
    <h2
      class="section text-h2"
      align="center"
    >
      What are our skills
    </h2>
    <v-row
      justify="space-around"
      class="container mx-auto"
    >
      <v-col>
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
        >
          <client-only>
            <CloudWords :data="skills">
              -->
            </CloudWords>
            <!-- <vue-word-cloud
                  style="height: 480px; width: 100%"
                  spacing="0.4"
                  :words="skills"
                  :color="getColor"
                  font-family="Roboto"
                /> -->
          </client-only>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const skills = [
  ['C++', 5],
  ['DevOps', 4],
  ['Meshing', 5],
  ['Python', 2],
  ['Algorithms', 3],
  ['Computational geometry', 4],
  ['Geomodeling', 2],
  ['Unstructured meshes', 3],
  ['BoundaryRepresentation', 2],
  ['Model editing', 4],
  ['Mesh repair', 2],
  ['Model repair', 5],
  ['Continuous integration', 2],
  ['Continuous deployment', 2],
  ['Software engineering', 4],
  ['Robustness', 3],
  ['JavaScript', 2],
  ['Web technologies', 2],
  ['Visualization', 2],
]
</script>