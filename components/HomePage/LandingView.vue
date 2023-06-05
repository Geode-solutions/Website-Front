<template>
  <v-parallax :src="hero_img" alt="Geode-solutions next generation of modeling challenges">
    <v-row class="fill-height" align="center" justify="center">
      <v-col class="text-center justify-center" cols="auto">
        <v-card width="600" style="
              border: 1px solid primary;
              border-radius: 80px 0px;
              background-color: rgba(255, 255, 255, 0.8);
            " elevation="5">
          <v-img :src="logo" alt="Geode-solutions logo" width="50%" class="mx-auto" />
          <h1 class="text-h2 text-center mb-3 text-primary">
            Geode-solutions
          </h1>
          <h2 class="text-h5 text-center text-primary pb-3">
            Technology company tackling next generation of modeling
            challenges using advanced meshing
          </h2>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script setup>
import logo from '@/assets/img/logo.svg'
import hero_img from "@/assets/img/hero.jpg"
</script>
