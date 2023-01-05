<template >
  <v-container fluid class="pa-10">
    <v-row class="container mx-auto">
      <v-col>
        <h2 class="section text-h2" align="center">
          Why Geode-solutions
        </h2>
        <v-row justify="center" class="pa-10">
          <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="5" lg="3" class="ma-3">
            <!-- <v-lazy
              :options="{
                threshold: 0.5,
              }"
            > -->
            <v-card class="elevation-5" height="100%" cover>
              <v-img :src="card.image" :alt="`Geode-solutions '${card.title}`" aspect-ratio="2.75"
                gradient="to top right, rgba(255,255,255,.4), rgba(255,255,255,.8)">
                <v-card-title primary-title class="text-h4 justify-center fill-height">
                  {{ card.title }}
                </v-card-title>
              </v-img>
              <v-card-text class="text-body-1 font-weight-medium text-center">
                {{ card.text }}
              </v-card-text>
            </v-card>
            <!-- </v-lazy> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import light from '@/static/index/light.jpg'
import hand from '@/static/index/hand.jpg'
import map_of_the_world from '@/static/index/map-of-the-world.jpg'
import escalator from '@/static/index/31045227201_57b9c73426_b.jpg'
import puzzle from '@/static/index/puzzle.jpg'


const cards = [
  {
    image: light,
    title: 'Fast',
    text: 'Aiming real-time using modern concurrency and GPU-accelerated programming ',
  },
  {
    image: hand,
    title: 'Reinvented UI',
    text: "Dedicated for scientists using today's technologies, offering intuitivity and reactiveness",
  },
  {
    image: map_of_the_world,
    title: 'Cross-platform',
    text: 'Compatible and constinuously tested on Windows, Linux and MacOS',
  },
  {
    image: escalator,
    title: 'Auto update',
    text: 'New features and improvements continuously shipped using automatic updates',
  },
  {
    image: puzzle,
    title: 'Extensible',
    text: 'Free open-source framework and plugin system for modular and custom developments',
  },
]
</script>
