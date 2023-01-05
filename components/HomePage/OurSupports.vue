<template>
  <v-container
    fluid
    style="background-color: white"
  >
    <v-row class="container mx-auto">
      <v-col>
        <!-- <v-lazy :options="{
          threshold: 0.5,
        }"> -->
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
            <a
              :href="supporter.url"
              target="_blank"
            >
              <!-- <img width="80%" :scr="partner.logo" /> -->
              <div class="carousel__item">{{ supporter.name }}</div>
            </a>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <!-- </v-lazy> -->
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
    logo: '@/static/logos/logo_helioparc.svg',
    url: 'http://www.helioparc.fr',
  },
  {
    name: 'LaBanquiz',
    logo: '@/static/logos/logo_banquiz.png',
    url: 'https://labanquiz.com',
  },
  {
    name: 'NAOS',
    logo: '@/static/logos/logo_NAOS.png',
    url: 'https://naos-cluster.com',
  },
  {
    name: 'Nouvelle-Aquitaine',
    logo: '@/static/logos/logo_region.png',
    url: 'https://www.nouvelle-aquitaine.fr',
  },
  {
    name: 'Geoliens',
    logo: '@/static/logos/logo_geoliens.png',
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
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>

