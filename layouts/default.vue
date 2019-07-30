<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
      <v-btn text active-class="" nuxt to="/">
        <v-app-bar-nav-icon>
          <v-icon large>
            $vuetify.icons.logo
          </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Geode-solutions</v-toolbar-title>
      </v-btn>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-for="(item, i) in items" :key="i" text nuxt :to="item.to">
          <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content class="secondary">
      <!-- <v-container fluid> -->
      <nuxt />
      <!-- </v-container> -->
    </v-content>

    <v-footer padless>
      <v-card text tile dark class="primary flex">
        <v-layout align-center>
          <v-card-text class="pa-1">
            <v-btn
              v-for="icon in icons"
              :key="icon.icon"
              icon
              target="_blank"
              :href="icon.url"
            >
              <v-icon size="24px">
                {{ icon.icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-spacer />
          <v-card-text>
            <v-flex text-right>
              <v-btn small class="pa-0 ma-0" text href="/legalNotice">
                Legal notice
              </v-btn>
              |
              <v-btn small class="pa-0 ma-0" text href="/credits">
                Credits
              </v-btn>
            </v-flex>
          </v-card-text>
        </v-layout>
        <v-divider />
        <v-layout row align-center>
          <v-flex>
            <v-card-text>
              Copyright &copy; {{ date }} — {{ name }}. All rights reserved.
            </v-card-text>
          </v-flex>
          <v-spacer />
          <v-flex text-right>
            <v-btn target="_blank" text href="https://nuxtjs.org/">
              <img
                width="120px"
                src="https://nuxtjs.org/logos/built-with-nuxt-white.svg"
              >
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: 'Geode-solutions SAS',
      items: [
        { title: 'OpenGeode', to: '/open-geode' },
        // { title: 'Products', to: '/extensions' },
        // { title: 'About us', to: '/about' }
      ],
      icons: [
        { icon: 'fab fa-github', url: 'https://github.com/Geode-solutions' },
        { icon: 'fab fa-twitter', url: 'https://twitter.com/Geode-solutions' },
        // { icon: 'fab fa-youtube', url: 'https://youtube.com/Geode-solutions' },
        {
          icon: 'fab fa-linkedin',
          url: 'https://linkedin.com/Geode-solutions'
        },
        {
          icon: 'fab fa-slack',
          url: 'https://slackin-opengeode.herokuapp.com'
        },
        { icon: 'fas fa-envelope', url: 'mailto:contact@geode-solutions.com' }
      ],
      date: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
* {
  text-transform: none !important;
}
.v-btn {
  min-width: 0;
}
</style>
