<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="section text-h2" align="center">
          What we do
        </h2>
        <v-row justify="space-around">
          <v-col v-for="card in masterCards" :key="card.title" cols="12" md="6">
            <v-hover v-slot="{ hover }">
              <!-- <v-lazy
                :options="{
                  threshold: 0.5,
                }"
              > -->
              <v-card dark height="500" :elevation="hover ? 20 : 2" :img="card.image" :to="card.url" class="d-flex">
                <v-img :src="card.image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)">
                  <v-row class="flex-column" no-gutters style="height: 100%">
                    <v-spacer />
                    <v-col cols="auto">
                      <v-card-title class="text-h4" align="end">
                        {{ card.title }}
                      </v-card-title>
                    </v-col>
                    <v-col cols="auto">
                      <v-card-text align="justify" class="text-body-1">
                        {{ card.text }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
              <!-- </v-lazy> -->
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import web from "@/static/index/cobweb.jpg"
import nut from "@/static/index/nut.jpg"
import screw from "@/static/index/screw.jpg"
import road from "@/static/index/road.jpg"
import tailoring from "@/static/index/tailoring.jpg"



const masterCards = [
  {
    title: 'Advanced meshing',
    image: web,
    text: 'Our reliable and pratical solutions for meshing combine innovative technologies across industrial fields.\
          It brings robustness and high industrial quality meshes on deeply complex models.\
          Available in proprietary OpenGeode extension.',
    url: '/expertise',
  },
  {
    title: 'Modeling',
    image: nut,
    text: 'Technologies to generate an explicit model from given surfaces or an implicit model from given points.\
          We take advantage of our strong meshing expertise to ensure robustness and model requirements for meshing and simulation applications.\
          Available in proprietary OpenGeode extension.',
    url: '/expertise',
  },
  {
    title: 'Model repair',
    image: screw,
    text: 'Useful and handy tools to check, verify and fix surface-based models.\
        These tools are customizable and can target model watertighness or geometric simplification.\
        Available in proprietary OpenGeode extensions.',
    url: '/expertise',
  },
  {
    title: 'OpenGeode framework',
    image: road,
    text: 'Open source framework for representing and manipulating models.\
          It is designed from the ground up to support any geometrical and geosciences application requiring a discretized model.\
          The framework is easy to use with readable API and Python scriptability.',
    url: '/opengeode',
  },
  {
    title: 'Custom-tailored services',
    image: tailoring,
    text: 'We deliver custom-tailored services to address your specific needs and challenges. \
          Our experts can provide training, support and software development on a wide range of applications from geometry and software to geosciences.',
    url: '/services',
  },
]

</script>