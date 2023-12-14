<template>
  <v-parallax
    :src="hero_img"
    alt="Geode-solutions next generation of modeling challenges"
  >
    <v-row class="screensize" align="center" justify="center">
      <v-col
        class="text-center justify-center"
        xs="12"
        sm="10"
        md="8"
        lg="6"
        xl="4"
      >
        <v-card
          width="100%"
          style="
            border: 1px solid primary;
            border-radius: 80px 0px;
            background-color: rgba(255, 255, 255, 0.8);
          "
        >
          <v-img
            :src="logo"
            alt="Geode-solutions logo"
            width="40%"
            class="mx-auto"
          />
          <h1
            class="font-style text-center mb-3 text-primary xs12 sm12 md12 lg12 xl12 headline"
            style="white-space: nowrap"
          >
            Geode-solutions
          </h1>
          <h2 class="text-h5 text-center text-primary pb-3">
            Technology company tackling next generation of modeling challenges
            using advanced meshing
          </h2>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<style scoped>
  .screensize {
    height: 80%;
  }

  .font-style {
    font-size: 2.75rem;
    font-weight: 300;
    line-height: 3.75rem;
    letter-spacing: -0.0083333333em;
    font-family: "Roboto", sans-serif;
    text-transform: none;
  }
</style>

<script setup>
  import logo from "@/assets/img/logo.svg"
  import hero_img from "@/assets/img/hero.jpg"
</script>
