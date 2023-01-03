<template>
  <v-container fluid>
    <v-lazy
      :options="{
        threshold: 0.5,
      }"
    >
      <h2
        class="section text-h2"
        align="center"
      >
        Who we are
      </h2>
      <v-row
        justify="space-around"
        class="container mx-auto"
      >
        <v-col
          v-for="(guy, index) in us"
          :key="index"
          cols="8"
          sm="4"
          class="ma-2"
        >
          <v-card class="elevation-5 text-center">
            <v-avatar
              size="150"
              class="ma-2"
            >
              <!-- :size="$vuetify.breakpoint.mdAndUp ? 200 : 150" -->
              <v-img
                :src="guy.pict"
                :alt="'Geode-solutions ' + guy.name"
              />
            </v-avatar>
            <v-card-title
              primary-title
              class="justify-center text-h5"
            >
              {{ guy.name }}
              <v-btn
                icon
                target="_blank"
                :href="guy.url"
              >
                <v-icon
                  size="24px"
                  color="#0A66C2"
                  icon="mdi-linkedin"
                />
              </v-btn>
              <br>
              {{ guy.job }}
            </v-card-title>
            <v-card-text class="justify-center text-h5 font-italic">
              {{ guy.topic }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-lazy>
  </v-container>
</template>
<script setup>

const us = [
    {
        name: 'Arnaud Botella',
        pict: '~/assets/ArnaudB.jpg',
        job: 'President & co-founder',
        url: 'https://linkedin.com/in/arnaud-botella',
        topic: 'Mesh generation',
    },
    {
        name: 'Pierre Anquez',
        pict: '~/assets/PierreA.jpg',
        job: 'CEO & co-founder',
        url: 'https://linkedin.com/in/pierre-anquez',
        topic: 'Explicit modeling',
    },
    {
        name: 'Melchior Schuh-Senlis',
        pict: '~/assets/Melchior.jpg',
        job: 'Research engineer',
        url: 'https://www.linkedin.com/in/melchior-schuh-senlis-a9573aba',
        topic: 'Implicit modeling',
    },
    {
        name: 'Julien Champagnol',
        pict: '~/assets/Julien.jpg',
        job: 'Cloud developer',
        url: 'https://www.linkedin.com/in/julien-champagnol-90330b17b',
        topic: 'Web and microservices',
    },
]
</script>
