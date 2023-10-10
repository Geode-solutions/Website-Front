<template>
  <v-container fluid style="background-color: white" class="pt-0">
    <v-row class="container mx-auto">
      <v-col>
        <h2 class="section text-h2" align="center">Our partners</h2>
        <CommonCarousel :items="partners_list" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import logo_pole_avenia from "~/assets/img/logos/logo-avenia.svg"
  import logo_total_energies from "~/assets/img/logos/logo_totalenergies.png"
  import logo_ring from "~/assets/img/logos/logo_ring.png"
  import logo_georessources from "~/assets/img/logos/logo_georessources.jpg"
  import logo_cnrs from "~/assets/img/logos/logo_cnrs.jpg"
  import logo_université_lorraine from "~/assets/img/logos/logo_UL.png"
  import logo_enerex from "~/assets/img/logos/logo_enerex.png"
  import logo_arxitek from "~/assets/img/logos/logo_arxitek.png"
  import logo_earth_quick from "~/assets/img/logos/logo_earth_quick.jpg"
  import logo_mosart_pme from "~/assets/img/logos/LOGOMOSART-PME.png"

  const partners_list = [
    {
      name: "Pole Avenia",
      logo: logo_pole_avenia,
      url: "https://www.pole-avenia.com",
    },
    {
      name: "TotalEnergies SE",
      logo: logo_total_energies,
      url: "https://totalenergies.com/",
    },
    {
      name: "RING",
      logo: logo_ring,
      url: "https://www.ring-team.org",
    },
    {
      name: "GeoRessources",
      logo: logo_georessources,
      url: "http://georessources.univ-lorraine.fr/",
    },
    {
      name: "CNRS",
      logo: logo_cnrs,
      url: "http://georessources.univ-lorraine.fr/",
    },
    {
      name: "Université de Lorraine",
      logo: logo_université_lorraine,
      url: "http://www.univ-lorraine.fr/",
    },
    {
      name: "ENEREX",
      logo: logo_enerex,
      url: "https://enerex.fr/",
    },
    {
      name: "ARXITEK",
      logo: logo_arxitek,
      url: "https://arxitek.fr/",
    },
    {
      name: "Earth Quick",
      logo: logo_earth_quick,
      url: "https://www.earth-quick.com/",
    },
    {
      name: "MOSART PME",
      logo: logo_mosart_pme,
      url: "https://www.mosart-pme.org/",
    },
  ]
</script>

<style scoped>
  .section {
    padding-top: 0;
    padding-bottom: 50px;
  }
</style>
