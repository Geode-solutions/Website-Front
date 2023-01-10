<template>
  <v-footer rounded>
    <v-card text rounded="0" dark class="bg-primary flex">
      <v-row align="center" class="mr-0">
        <v-col cols="auto">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon.icon" icon target="_blank" color="primary" variant="flat"
              rel="noopener" :href="icon.url" class="mr-4">
              <v-icon size="30" :icon="icon.icon" />
            </v-btn>
          </v-card-text>
        </v-col>
        <v-spacer />
        <v-col cols="auto" class="text-right">
          <v-card-text>
            <v-btn size="small" class="pa-0 ma-0" variant="text" href="/legalNotice">
              Legal notice
            </v-btn>
            |
            <v-btn size="small" class="pa-0 ma-0" variant="text" href="/credits">
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
          <v-btn target="_blank" rel="noopener" variant="text" href="https://js.org/">
            <img alt=" logo" height="40px" width="120px" src="@/static/nuxt.svg">
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script setup>
const icons = [
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
]
const date = new Date().getFullYear()
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>