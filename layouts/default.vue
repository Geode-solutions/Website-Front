<template>
  <v-app>
    <v-toolbar
      color="primary"
      fixed
      app
    >
      <v-btn
        flat
        active-class=""
        nuxt
        to="/"
      >
        <v-toolbar-title>Geode-solutions</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          nuxt
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
        >
            <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="primary"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { title: 'OpenGeode', to: '/open-geode' },
          { title: 'About us', to: '/about' },
          { title: 'Contact', to: '/contact' }
        ]
      }
    }
  }
</script>

<style scoped> *{ text-transform: none !important; } </style>