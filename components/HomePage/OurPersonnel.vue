<template>
  <v-container fluid>
    <v-lazy :options="{
      threshold: 0.5,
    }">
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
        v-for="(guy, index) in us_list"
        :key="index"
        cols="8"
        sm="4"
        class="ma-2"
      >
        <v-card class="elevation-5 text-center">
          <v-avatar
            :size="mdAndUp ? 200 : 150"
            class="ma-2"
          >
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
              variant="flat"
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
import us_list from '@/assets/static/us'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
</script>
