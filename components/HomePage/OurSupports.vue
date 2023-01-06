<template>
  <v-container fluid style="background-color: white">
    <v-row class="container mx-auto">
      <v-col>
        <!-- <v-lazy :options="{
          threshold: 0.5,
        }"> -->
        <h2 class="section text-h2" align="center">
          They support us
        </h2>
        <Carousel wrap-around :items-to-show="nb_supports">
          <!-- <div v-for="(supporter, index) in supporters" :key="index">
        </div> -->
          <Slide v-for="(supporter, index) in supporters" :key="index" class="logo">
            <a :href="supporter.url" target="_blank">

              <img width="80%" height="100%" :scr="supporter.logo" class="carousel__item" />
              <!-- <div class="carousel__item"></div> -->
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
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import logo_helioparc from '@/static/hero.jpg'
// import logo_helioparc from '@/static/logos/logo_helioparc.svg'
import logo_banquiz from '@/static/logos/logo_banquiz.svg'
import logo_naos from '@/static/logos/logo_NAOS.svg'
import logo_region from '@/static/logos/logo_region.svg'
import logo_geoliens from '@/static/logos/logo_geoliens.svg'

const supporters = [
  {
    name: 'Helioparc',
    logo: '@/static/logos/logo_helioparc.svg',
    url: 'https://www.helioparc.fr',
  },
  {
    name: 'LaBanquiz',
    logo: logo_banquiz,
    url: 'https://labanquiz.com',
  },
  {
    name: 'NAOS',
    logo: logo_naos,
    url: 'https://naos-cluster.com',
  },
  {
    name: 'Nouvelle-Aquitaine',
    logo: logo_region,
    url: 'https://www.nouvelle-aquitaine.fr',
  },
  {
    name: 'Geoliens',
    logo: logo_geoliens,
    url: 'https://www.geoliens.org',
  }
]

const { name } = useDisplay()
const nb_supports = computed(() => {
  switch (name.value) {
    case 'xs': return 1
    case 'sm': return 2
    default: return 3
  }
})

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

