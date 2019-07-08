<template>
  <v-app>
    <v-toolbar dark
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
        <v-toolbar-side-icon>
        <v-icon large>$vuetify.icons.logo</v-icon>
        </v-toolbar-side-icon>
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
      height="auto"
      app
    >
      <v-card
        flat
        tile
        dark
        class="primary flex text-xs-center"
      >
        <v-card-text class="pa-1" d> 
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            icon
            target="_blank"
            :href="icon.url"
          >
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </v-card-text>  
        <v-divider></v-divider>  
        <v-card-text>
          Copyright &copy; {{ date }} — {{ name }}. All rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Geode-solutions',
        items: [
          { title: 'OpenGeode', to: '/open-geode' },
          { title: 'Products', to: '/extensions' },
          { title: 'About us', to: '/about' }
          
        ],
        icons: [
          { icon: 'fab fa-github', url: 'https://github.com/Geode-solutions' },
          { icon: 'fab fa-twitter', url: 'https://twitter.com/Geode-solutions' },
          { icon: 'fab fa-youtube', url: 'https://youtube.com/Geode-solutions' },
          { icon: 'fab fa-linkedin', url: 'https://linkedin.com/Geode-solutions' },
          { icon: 'fas fa-envelope', url: 'mailto:contact@geode-solutions.com' }
        ],
        date: new Date().getFullYear()
      }
    }
  }
</script>

<style scoped> *{ text-transform: none !important; } </style>