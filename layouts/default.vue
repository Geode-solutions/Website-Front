<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
      <v-row class="hidden-sm-and-down px-2">
        <v-btn text active-class="no-active" nuxt to="/">
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
      </v-row>

      <v-expansion-panels
        v-model="menu"
        class="hidden-md-and-up"
        style="position: absolute; top: 0; left: 0;"
        accordion
      >
        <v-expansion-panel class="primary">
          <v-expansion-panel-header>
            <v-row align="center">
              <v-col class="px-2" cols="1">
                <v-icon large>
                  $vuetify.icons.logo
                </v-icon>
              </v-col>
              <v-col class="title mx-2">
                {{ name }}
              </v-col>
            </v-row>
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

    <v-main class="secondary">
      <nuxt />
    </v-main>

    <v-footer padless>
      <v-card text tile dark class="primary flex">
        <v-row align="center">
          <v-col cols="auto">
            <v-card-text class="ml-2">
              <v-btn
                v-for="icon in icons"
                :key="icon.icon"
                icon
                target="_blank"
                :href="icon.url"
                class="mr-4"
              >
                <v-icon size="24px">
                  {{ icon.icon }}
                </v-icon>
              </v-btn>
            </v-card-text>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="text-right">
            <v-card-text>
              <v-btn small class="pa-0 ma-0" text href="/legalNotice">
                Legal notice
              </v-btn>
              |
              <v-btn small class="pa-0 ma-0" text href="/credits">
                Credits
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" class="px-1">
          <v-col cols="auto">
            <v-card-text>
              Copyright &copy; 2019 - {{ date }} — {{ name }} SAS. All rights reserved.
            </v-card-text>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="text-right">
            <v-btn target="_blank" text href="https://nuxtjs.org/">
              <img
                width="120px"
                src="https://nuxtjs.org/logos/built-with-nuxt-white.svg"
              >
            </v-btn>
          </v-col>
        </v-row>
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
        { title: 'Expertize', to: '/expertize' },
        { title: 'Software', to: '/software' },
        { title: 'Services', to: '/services' }
      ],
      icons: [
        { icon: 'fab fa-github', url: 'https://github.com/Geode-solutions' },
        { icon: 'fab fa-twitter', url: 'https://twitter.com/GeodeSolutions' },
        {
          icon: 'fab fa-linkedin',
          url: 'https://linkedin.com/company/geode-solutions'
        },
        {
          icon: 'fab fa-slack',
          url: 'https://slackin-opengeode.herokuapp.com'
        },
        {
          icon: 'fab fa-youtube',
          url: 'https://www.youtube.com/channel/UCkzmIOpr3H8I8kDLCGZBiXA'
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
.v-btn--active.no-active::before {                                                                             
  opacity: 0 !important;
}
</style>

<style>
.v-card__text, .v-card__title {
    word-break: normal; /* maybe !important  */
  }
</style>