<template>
  <client-only>
    <v-parallax
      :src="hero_img"
      alt=" Geode-solutions next generation of modeling challenges"
      width="100%"
      class="pa-0"
    >
      <v-card
        class="container"
        width="600"
        style="
              border: 1px solid primary;
              border-radius: 80px 0px;
              background-color: rgba(255, 255, 255, 0.8);
            "
        elevation="5"
      >
        <v-row
          class="d-flex flex-column align-center pa-3"
          align="center"
          align-content="space-around"
        >
          <v-col>
            <img
              src="@/static/logo.svg"
              alt="Geode-solutions logo"
              class="mx-auto"
            >
            <h1 class="text-h2 text-center mb-3 text-primary">
              Geode-solutions
            </h1>
          </v-col>
          <v-col>
            <h2 class="text-h5 text-center text-primary">
              Technology company tackling next generation of modeling
              challenges using advanced meshing
            </h2>
          </v-col>
        </v-row>
      </v-card>
    </v-parallax>
  </client-only>
</template>

<script setup>

import hero_img from "@/static/hero.jpg"
// const window_height = 0
// function get_window_height () {
//   this.window_height = document.documentElement.clientHeight
// }
// onMounted(() => {
//   window.addEventListener('resize', this.get_window_height)
//   this.get_window_height()
// })


</script>

<style>

</style>