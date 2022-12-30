<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
      <v-row class="hidden-sm-and-down px-2">
        <v-btn text active-class="no-active" nuxt to="/">
          <v-app-bar-nav-icon>
            <v-icon size= "large" icon="mdi-vuetify">
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
        style="position: absolute; top: 0; left: 0"
        accordion
      >
        <v-expansion-panel class="primary">
            <v-expansion-panel-title>
              <v-row align="center">
              <v-col class="px-2" cols="1">
                <v-icon size="large" icon="mdi-vuetify">
                </v-icon>
              </v-col>
              <v-col class="text-h6 mx-2">
                {{ name }}
              </v-col>
            </v-row>
            </v-expansion-panel-title>
            


            <v-list color="primary" subheader>
              <v-list-item text nuxt to="/" @click="menu = false">
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                text
                nuxt
                :to="item.to"
                @click="menu = false"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-app-bar>

    <v-main class="secondary">
      <nuxt />
    </v-main>

    <!-- <CookieControl v-if="this.$config.NODE_ENV === 'production'"/> -->

    <v-footer padless>
      <v-card text tile dark class="primary flex">
        <v-row align="center" class="mr-0">
          <v-col cols="auto">
            <v-card-text>
              <v-btn
                v-for="icon in icons"
                :key="icon.icon"
                icon
                target="_blank"
                rel="noopener"
                :href="icon.url"
                class="mr-4"
              >
                <v-icon size="28px">
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
        <v-row align="center" class="px-1 mb-0 pt-1">
          <v-col cols="auto">
            <v-card-text>
              Copyright &copy; 2019 - {{ date }} — {{ name }} SAS. All rights
              reserved.
            </v-card-text>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="text-right">
            <v-btn
              target="_blank"
              rel="noopener"
              text
              href="https://nuxtjs.org/"
            >
              <img
                alt="nuxt logo"
                height="40px"
                width="120px"
                src="@/assets/nuxt.svg"
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
  name: 'GeodeLayout',
  data() {
    return {
      name: 'Geode-solutions',
      menu: false,
      items: [
        { title: 'OpenGeode', to: '/opengeode' },
        { title: 'Expertise', to: '/expertise' },
        { title: 'Software', to: '/software' },
        { title: 'Services', to: '/services' },
        { title: 'Free tools', to: '/tools' },
      ],
      icons: [
        { icon: 'mdi-github', url: 'https://github.com/Geode-solutions' },
        { icon: 'mdi-twitter', url: 'https://twitter.com/GeodeSolutions' },
        {
          icon: 'mdi-linkedin',
          url: 'https://linkedin.com/company/geode-solutions',
        },
        {
          icon: 'mdi-slack',
          url: 'https://slackin-opengeode.herokuapp.com',
        },
        {
          icon: 'mdi-youtube',
          url: 'https://www.youtube.com/channel/UCkzmIOpr3H8I8kDLCGZBiXA',
        },
        { icon: 'mdi-email', url: 'mailto:contact@geode-solutions.com' },
      ],
      date: new Date().getFullYear(),
    }
  },
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
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
