<template>
  <client-only>
    <v-row justify="left">
      <v-col v-for="(item, i) in items" :key="i" cols="3" md="3">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-card
              nuxt
              hover
              v-on="on"
              elevation="5"
              v-ripple
              :to="item.to"
              contain
            >
              <v-icon size="100" class="justify-center">
                {{ item.icon }}
              </v-icon>
              <v-card-title primary-title class="justify-center text-h4">
                {{ item.title }}
              </v-card-title>
              <v-card-text align="justify" class="text-body-1">
                {{ item.text }}
              </v-card-text>
            </v-card>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </client-only>
</template>



<script>
// var tools = require('../tools.vue')
// import { items } from '../tools.vue'
// console.log(items)
// import items from '../tools'

export default {
  name: 'GeodeTools',
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
    // items: items,
    items: [
      {
        icon: 'mdi-file-replace-outline',
        title: 'File converter',
        to: '/tools/fileconverter',
        text: 'blabla1',
        enabled: true,
      },
      {
        icon: 'mdi-format-list-checks',
        title: 'Validity checker',
        to: '/tools/validitychecker',
        text: 'blabla2',
        enabled: false,
      },
    ],
    miniVariant: true,
  }),
  head() {
    return {
      title: 'Free tools welcome page',
    }
  },
}
</script>
