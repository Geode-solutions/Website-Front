<template>
  <v-container fluid style="background-color: white" class="pt-0">
    <v-row class="container mx-auto">
      <v-col>
        <h2 class="section text-h2" align="center">
          Our partners
        </h2>
        <CommonCarousel :items="partners_list" />
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



