<template>
  <v-container fluid class="pa-10">
    <h2 class="section text-h2" align="center">Why Geode-solutions</h2>
    <v-row justify="center" class="pa-10">
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="5"
        lg="3"
        class="ma-3"
      >
        <v-card>
          <v-img
            class="align-center"
            :src="card.image"
            :alt="`Geode-solutions '${card.title}`"
            aspect-ratio="2.75"
            gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)"
            cover
          >
            <v-card-title class="text-h4 text-center" v-text="card.title" />
          </v-img>
          <v-card-text
            class="text-body-1 font-weight-medium text-center"
            v-text="card.text"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import light from "@/assets/img/index/light.jpg"
  import hand from "@/assets/img/index/hand.jpg"
  import map_of_the_world from "@/assets/img/index/map-of-the-world.jpg"
  import escalator from "@/assets/img/index/31045227201_57b9c73426_b.jpg"
  import puzzle from "@/assets/img/index/puzzle.jpg"

  const cards = [
    {
      image: light,
      title: "Fast",
      text: "Aiming real-time using modern concurrency and GPU-accelerated programming ",
    },
    {
      image: hand,
      title: "Reinvented UI",
      text: "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness",
    },
    {
      image: map_of_the_world,
      title: "Cross-platform",
      text: "Compatible and constinuously tested on Windows, Linux and MacOS",
    },
    {
      image: escalator,
      title: "Auto update",
      text: "New features and improvements continuously shipped using automatic updates",
    },
    {
      image: puzzle,
      title: "Extensible",
      text: "Free open-source framework and plugin system for modular and custom developments",
    },
  ]
</script>
