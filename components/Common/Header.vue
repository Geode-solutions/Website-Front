<template>
  <v-app-bar color="primary">
    <v-row class="px-2">
      <v-col>
        <v-btn variant="text" to="/" :active="false">
          <GeodeLogo />
          {{ company_name }}
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn class="hidden-sm-and-down" v-for="(menu, i) in menus" :key="i" variant="text" :to="menu.to">
          {{ menu.title }}
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="hidden-md-and-up" icon="mdi-menu" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(menu, i) in menus" :key="i" :value="index" :to="menu.to">
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
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