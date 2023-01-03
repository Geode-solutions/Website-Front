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
            <!-- <CloudWords> -->

            <!-- </CloudWords> -->
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

</script>