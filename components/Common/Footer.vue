<template>
  <!-- <v-footer class="bg-primary pa-0 d-flex flex-column">
    <v-row>
      <div class="d-flex h-80 w-100 align-center px-4">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="30"></v-btn>
        <v-spacer />
        <v-btn size="small" class="pa-2 ma-0" variant="plain" href="/legalNotice">
          Legal notice
        </v-btn>
        |
        <v-btn size="small" class="pa-2 ma-0" variant="plain" href="/credits">
          Credits
        </v-btn>
      </div>
    </v-row>
    <v-row>

      <div class="px-4 py-2 w-100">
        <p class="text-caption">
          Copyright &copy; 2019 - {{ date }} — {{ name }} SAS. All rights
          reserved.
        </p>

        <v-spacer />
        <v-btn target="_blank" rel="noopener" variant="text" href="https://js.org/">
          <img alt="logo" height="40px" width="120px" src="@/static/nuxt.svg">
        </v-btn>
      </div>
    </v-row>
  </v-footer> -->
</template>

<script setup>
const icons = [
  { icon: 'mdi-github', url: 'https://github.com/Geode-solutions' },
  { icon: 'mdi-twitter', url: 'https://twitter.com/GeodeSolutions' },
  { icon: 'mdi-linkedin', url: 'https://linkedin.com/company/geode-solutions' },
  { icon: 'mdi-slack', url: 'https://slackin-opengeode.herokuapp.com' },
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