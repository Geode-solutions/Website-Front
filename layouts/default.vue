<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
      <v-layout class="hidden-sm-and-down">
        <v-btn text active-class="" nuxt to="/">
          <v-app-bar-nav-icon>
            <v-icon large>
              $vuetify.icons.logo
            </v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title>{{ name }}</v-toolbar-title>
        </v-btn>
        <v-spacer />
        <v-toolbar-items>
          <v-btn v-for="(item, i) in items" :key="i" text nuxt :to="item.to">
            <span>{{ item.title }}</span>
          </v-btn>
        </v-toolbar-items>
      </v-layout>

      <v-expansion-panels
        v-model="menu"
        class="hidden-md-and-up"
        style="position: absolute; top: 0; left: 0;"
        accordion
      >
        <v-expansion-panel class="primary" style="width: 99%;">
          <v-expansion-panel-header>
            <v-layout row align-center>
              <v-flex class="px-2" xs1>
                <v-icon large>
                  $vuetify.icons.logo
                </v-icon>
              </v-flex>
              <v-flex class="title mx-2">
                {{ name }}
              </v-flex>
              <v-spacer />
            </v-layout>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list color="primary" subheader>
              <v-list-item text nuxt to="/" @click="menu = false">
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item v-for="(item, i) in items" :key="i" text nuxt 
                           :to="item.to" @click="menu = false"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
              Copyright &copy; {{ date }} — {{ name }} SAS. All rights reserved.
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
      name: 'Geode-solutions',
      menu: false,
      items: [
        { title: 'OpenGeode', to: '/opengeode' },
        // { title: 'Products', to: '/extensions' },
        // { title: 'About us', to: '/about' }
      ],
      icons: [
        { icon: 'fab fa-github', url: 'https://github.com/Geode-solutions' },
        { icon: 'fab fa-twitter', url: 'https://twitter.com/GeodeSolutions' },
        // { icon: 'fab fa-youtube', url: 'https://youtube.com/Geode-solutions' },
        {
          icon: 'fab fa-linkedin',
          url: 'https://linkedin.com/company/geode-solutions'
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
