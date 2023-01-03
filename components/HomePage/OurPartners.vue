<template>
  <v-container>
    <v-row class="container mx-auto">
      <v-col>
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
        >
          <h2
            class="section text-h2"
            align="center"
          >
            Our partners
          </h2>
          <Carousel
            wrap-around
            :items-to-show="nb_partners"
          >
            <Slide
              v-for="(partner, index) in partners"
              :key="index"
              class="logo"
            >
              {{ partner }}
              <!-- <a :href="partner.url" target="_blank">
                            <v-img
                                width="80%"
                                :src="partner.logo"
                            >
                            </v-img>
                        </a> -->
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const partners = [
  {
    name: 'Pole Avenia',
    logo: '../assets/logos/logo-avenia.svg',
    url: 'https://www.pole-avenia.com',
  },
  {
    name: 'TotalEnergies SE',
    logo: '../assets/logos/logo_totalenergies.png',
    url: 'https://totalenergies.com/',
  },
  {
    name: 'RING',
    logo: '../assets/logos/logo_ring.png',
    url: 'https://www.ring-team.org',
  },
  {
    name: 'GeoRessources',
    logo: '../assets/logos/logo_georessources.jpg',
    url: 'http://georessources.univ-lorraine.fr/',
  },
  {
    name: 'CNRS',
    logo: '../assets/logos/logo_cnrs.jpg',
    url: 'http://georessources.univ-lorraine.fr/',
  },
  {
    name: 'Université de Lorraine',
    logo: '../assets/logos/logo_UL.png',
    url: 'http://www.univ-lorraine.fr/',
  },
  {
    name: 'ENEREX',
    logo: '../assets/logos/logo_enerex.png',
    url: 'https://enerex.fr/',
  },
  {
    name: 'ARXITEK',
    logo: '../assets/logos/logo_arxitek.png',
    url: 'https://arxitek.fr/',
  },
  {
    name: 'Earth Quick',
    logo: '../assets/logos/logo_earth_quick.jpg',
    url: 'https://www.earth-quick.com/',
  },
  {
    name: 'MOSART PME',
    logo: '../assets/logos/LOGOMOSART-PME.png',
    url: 'https://www.mosart-pme.org/',
  },
]
const nb_partners = 3
        // nb_partners () {
        //     // switch (this.$vuetify.breakpoint.name) {
        //     //     case 'xs':
        //     //     return 1
        //     //     case 'sm':
        //     //     return 2
        //     //     default:
        //     //     return 3
        //     // }
        //     return 3
        // }
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

