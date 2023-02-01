<template>
  <v-container
    fluid
    style="background-color: white"
    class="pb-0"
  >
    <v-row class="container mx-auto">
      <v-col>
        <h2
          class="section text-h2"
          align="center"
        >
          They support us
        </h2>
        <CommonCarousel :items="supports_list" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import logo_helioparc from '~/assets/img/logos/logo_helioparc.svg'
import logo_banquiz from '~/assets/img/logos/logo_banquiz.png'
import logo_naos from '~/assets/img/logos/logo_NAOS.png'
import logo_region from '~/assets/img/logos/logo_region.png'
import logo_geoliens from '~/assets/img/logos/logo_geoliens.png'

const supports_list = [
  {
    name: 'Helioparc',
    logo: logo_helioparc,
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
</script>

<style>
.section {
  padding-top: 0;
  padding-bottom: 50px;
}
</style>
