<template>
  <v-container style="background-color: white">
    <v-row class="container mx-auto">
      <v-col>
        <!-- <v-lazy :options="{
          threshold: 0.5,
        }"> -->
        <h2
          class="section text-h2"
          align="center"
        >
          Our partners
        </h2>
        <CommonCarrousel :items="partners_list" />
        <!-- </v-lazy> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import partners_list from '@/assets/static/partners'
</script>

<style scoped>
.section {
  padding-top: 0;
  padding-bottom: 50px;
}
</style>



