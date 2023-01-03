<template>
  <v-container
    fluid
    style="background-color: white"
  >
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
            They support us
          </h2>
          <Carousel
            wrap-around
            :items-to-show="nb_partners"
          >
            <Slide
              v-for="(supporter, index) in supporters"
              :key="index"
              class="logo"
            >
              {{ supporter }}
              <!-- <a :href="supporter.url" target="_blank">
                                <v-img
                                    width="80%"
                                    :src="supporter.logo"
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


const supporters = [
  {
    name: 'Helioparc',
    logo: 'logo_helioparc.svg',
    url: 'http://www.helioparc.fr',
  },
  {
    name: 'LaBanquiz',
    logo: 'logo_banquiz.png',
    url: 'https://labanquiz.com',
  },
  {
    name: 'NAOS',
    logo: 'logo_NAOS.png',
    url: 'https://naos-cluster.com',
  },
  {
    name: 'Nouvelle-Aquitaine',
    logo: 'logo_region.png',
    url: 'https://www.nouvelle-aquitaine.fr',
  },
  {
    name: 'Geoliens',
    logo: 'logo_geoliens.png',
    url: 'https://www.geoliens.org',
  }
]
// computed: {
const nb_partners = 3
  // nb_partners() {
  //           // switch (this.$vuetify.breakpoint.name) {
  //           //     case 'xs':
  //           //     return 1
  //           //     case 'sm':
  //           //     return 2
  //           //     default:
  //           //     return 3
  //           // }
  //           return 3
  //       },
  //   },
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

