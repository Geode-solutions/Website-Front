<template>
  <v-row>
    <v-col
      class="text-center text-h6"
      cols="12"
    >
      <h1 :class="display">
        OpenGeode
      </h1>
    </v-col>

    <client-only>
      <Particles
        class="particles-wrapper mb-5"
        style="z-index: 1"
        color="004D40"
        :particle-opacity="0.5"
        :particles-number="80"
        shape-type="circle"
        :particle-size="5"
        lines-color="00897B"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.8"
        :lines-distance="150"
        :move-speed="4"
      />
    </client-only>

    <v-container>
      <v-row class="text-center">
        <v-col>
          <h2 class="text-h4 text-primary my-5">
            Open source framework <br>
            for representing and manipulating geometric models
          </h2>

          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto"
              max-width="500"
              rounded
              :elevation="hover ? 20 : 2"
              href="https://github.com/Geode-solutions/OpenGeode"
              target="_blank"
            >
              <v-card-title
                primary-title
                class="justify-center text-h3"
              >
                Visit GitHub repo
              </v-card-title>
              <v-card-text>
                <v-icon
                  :size="smAndUp ? 180 : 100"
                  color="#000000"
                >
                  mdi-github
                </v-icon>
              </v-card-text>
            </v-card>
          </v-hover>

          <h2
            class="section text-h2 mt-5"
            align="center"
          >
            Key features
          </h2>
          <v-row justify="space-around">
            <v-col
              v-for="card in cards_list"
              :key="card.title"
              cols="11"
              sm="5"
              md="6"
            >
              <v-lazy
                :options="{
                  threshold: 0.5,
                }"
              >
                <v-card height="100%">
                  <v-img
                    :src="card.image"
                    :alt="'Geode-solutions ' + card.title"
                    cover
                  />
                  <v-card-title
                    primary-title
                    class="justify-center text-h4"
                  >
                    {{ card.title }}
                  </v-card-title>
                  <v-card-text
                    align="justify"
                    class="text-body-1"
                  >
                    {{ card.text }}
                  </v-card-text>
                </v-card>
              </v-lazy>
            </v-col>
          </v-row>
          <h2
            class="text-h4 my-5 py-5"
            align="center"
          >
            Interested by OpenGeode features?
            <div class="my-2">
              <CommonContactUsButton />
            </div>
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      style="background-color: white"
    >
      <v-row class="container mx-auto">
        <v-col>
          <h2
            class="section text-h2"
            align="center"
          >
            They use it
          </h2>

          <v-lazy
            :options="{
              threshold: 0.5,
            }"
          >
            <CommonCarrousel :items="users_list" />
          </v-lazy>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script setup>
import Particles from "vue3-particles";
import { useDisplay } from 'vuetify'
import users_list from '@/assets/static/users'
import cards_list from '@/assets/static/cards'

useHead({ titleTemplate: 'OpenGeode - open source framework for geometric models' })

const { smAndUp } = useDisplay()
</script>

<style scoped>
.particles-wrapper {
  width: 100%;
  height: 50vh;
}

.title {
  position: absolute;
  top: 25vh;
  width: 100%;
  height: 50%;
}

.section {
  padding-top: 50px;
  padding-bottom: 50px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
