<template>
  <v-container fluid style="background-color: white">
    <v-row class="container mx-auto">
      <v-col>
        <h2 class="section text-h2" align="center">
          They support us
        </h2>
        <CommonCarrousel :items="supports_list" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import supports_list from '@/assets/static/supports'
</script>

<style>
.section {
  padding-top: 0;
  padding-bottom: 50px;
}
</style>
