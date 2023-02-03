<template>
  <v-app-bar color="primary" extension-height="100px" floating>
    <v-row class="px-2">
      <v-btn variant="text" to="/" :active="false">
        <GeodeLogo />
        {{ company_name }}
      </v-btn>
      <v-spacer />
      <v-btn v-for="(menu, i) in menus" :key="i" variant="text" :to="menu.to">
        {{ menu.title }}
      </v-btn>
    </v-row>
  </v-app-bar>
</template>

<script setup>
const company_name = 'Geode-solutions'
const menus = [
  { title: 'OpenGeode', to: '/opengeode' },
  { title: 'Expertise', to: '/expertise' },
  { title: 'Software', to: '/software' },
  { title: 'Services', to: '/services' },
  { title: 'Free tools', to: '/tools' },
]

</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>