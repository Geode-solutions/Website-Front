<template>
  <v-container fluid>
    <h2 class="section text-h2" align="center">Who we are</h2>
    <v-row justify="center" class="mx-auto">
      <v-col v-for="(guy, index) in us_list" :key="index" cols="12" md="4">
        <v-card
          class="text-center size-card marges"
          :class="{ 'size-card-md': mdAndUp }"
        >
          <v-avatar :size="mdAndUp ? 200 : 150" class="ma-2">
            <v-img :src="guy.pict" :alt="'Geode-solutions ' + guy.name" />
          </v-avatar>
          <v-card-title primary-title class="justify-center text-h5">
            {{ guy.name }}
            <v-btn icon target="_blank" :href="guy.url" variant="flat">
              <v-icon size="3.5vh" color="#0A66C2" icon="mdi-linkedin" />
            </v-btn>
            <br />
            <v-card-text class="text-center text-h5 text-wrap">
              {{ guy.job }}
            </v-card-text>
            <v-card-text class="justify-center text-h5 font-italic">
              {{ guy.topic }}
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  .size-card {
    max-width: 500px;
  }

  .size-card-md {
    max-width: 100%;
  }

  .marges {
    margin: 40px;
  }

  @media screen and (max-width: 600px) {
    .marges {
      margin: 0;
    }
  }
</style>

<script setup>
  import ArnaudB from "@/assets/img/AB.png"
  import PierreA from "@/assets/img/PA.png"
  import MelchiorS from "@/assets/img/MSS.jpg"
  import JulienC from "@/assets/img/JC.png"
  import FrancoisB from "@/assets/img/FB.jpg"
  import TaoS from "@/assets/img/TS.png"
  import BenjaminP from "@/assets/img/BP.png"
  import BenoitT from "@/assets/img/BT.png"
  import { useDisplay } from "vuetify"
  const { mdAndUp } = useDisplay()

  const us_list = [
    {
      name: "Arnaud Botella",
      pict: ArnaudB,
      job: "President & Co-founder",
      url: "https://linkedin.com/in/arnaud-botella",
      topic: "Mesh generation",
    },
    {
      name: "Pierre Anquez",
      pict: PierreA,
      job: "CEO & Co-founder",
      url: "https://linkedin.com/in/pierre-anquez",
      topic: "Explicit modeling",
    },
    {
      name: "Melchior Schuh-Senlis",
      pict: MelchiorS,
      job: "Research Engineer",
      url: "https://www.linkedin.com/in/melchior-schuh-senlis-a9573aba",
      topic: "Implicit modeling",
    },
    {
      name: "Julien Champagnol",
      pict: JulienC,
      job: "DevOps",
      url: "https://www.linkedin.com/in/julien-champagnol-90330b17b",
      topic: "Web and microservices",
    },
    {
      name: "François Bonneau",
      pict: FrancoisB,
      job: "Researcher & Business Developer",
      url: "https://www.linkedin.com/in/francois-bonneau-27288071/",
      topic: "Numerical simulation",
    },
    {
      name: "Benjamin Pinet",
      pict: BenjaminP,
      job: "C++ Developer",
      // url: "https://www.linkedin.com/in/",
      topic: "Core framework",
    },
    {
      name: "Tao Schiro",
      pict: TaoS,
      job: "Web FullStack Developer",
      url: "https://www.linkedin.com/in/tao-schiro-07aa8027b/",
      topic: "Web and microservices",
    },
    {
      name: "Benoit Thebault",
      pict: BenoitT,
      job: "C++ Developer",
      url: "https://www.linkedin.com/in/benoit-thebault-ensg/",
      topic: "Core framework",
    },
  ]
</script>
