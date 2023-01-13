<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="text-h2 my-5 py-5"
          align="center"
        >
          Custom-tailored services
        </h1>
        <h2
          class="text-h4 my-5 pb-5"
          align="center"
        >
          <CommonContactUsButton />
        </h2>

        <v-card
          v-for="(service, index) in services_list"
          :key="index"
          style="margin-bottom: 40px"
        >
          <v-row
            align="center"
            justify="space-around"
          >
            <v-col
              :order-sm="(index + 1) % 2"
              cols="12"
              sm="5"
            >
              <v-card-text>
                <v-img
                  :src="service.image"
                  :alt="'Geode-solutions ' + service.title"
                  cover
                />
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="7"
            >
              <v-card flat>
                <v-card-title
                  primary-title
                  class="justify-center text-h4"
                >
                  {{ service.title }}
                </v-card-title>
                <v-card-text
                  align="justify"
                  class="text-h6"
                >
                  {{ service.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <h2
          class="text-h4 my-5 py-5"
          align="center"
        >
          Let us know how we can help!
          <div class="my-2">
            <CommonContactUsButton />
          </div>
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import services_list from '@/assets/static/services'

useHead({ titleTemplate: 'Geode-solutions custom-tailored services' })
</script>
