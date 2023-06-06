<template>
  <v-footer class="bg-primary flex-column pa-5" absolute app :order="0">
    <v-row style="width:100%">
      <v-col cols="auto">
        <v-btn v-for="icon in icons" :key="icon" class="px-5" :icon="icon.icon" :href="icon.url" target="_blank"
          variant="plain" size="30" />
      </v-col>
      <v-spacer />
      <v-col align="right">
        <v-btn size="small" class="pa-2 ma-0" variant="plain" href="/legalNotice">
          Legal notice
        </v-btn>
        |
        <v-btn size="small" class="pa-2 ma-0" variant="plain" href="/credits">
          Credits
        </v-btn>
      </v-col>
    </v-row>
    <v-row style="width:100%">
      <v-col cols="auto">
        <p class="text-caption">
          Copyright &copy; 2019 - {{ date }} — Geode-solutions SAS. All rights
          reserved.
        </p>
      </v-col>
      <v-spacer />
      <v-col align="right">
        <v-btn target="_blank" rel="noopener" variant="text" href="https://nuxt.com/">
          <v-img alt="logo" width="120px" :src="NuxtLogo" />
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import NuxtLogo from "@/assets/img/nuxt.svg"

const icons = [
  { icon: 'mdi-github', url: 'https://github.com/Geode-solutions' },
  { icon: 'mdi-twitter', url: 'https://twitter.com/GeodeSolutions' },
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/company/geode-solutions' },
  { icon: 'mdi-slack', url: 'https://opengeode-slack-invite.herokuapp.com' },
  { icon: 'mdi-youtube', url: 'https://www.youtube.com/channel/UCkzmIOpr3H8I8kDLCGZBiXA' },
  { icon: 'mdi-email', url: 'mailto:contact@geode-solutions.com' },
]
const date = new Date().getFullYear()
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
