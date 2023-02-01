<template>
  <v-app-bar color="primary">
    <v-row class="hidden-sm-and-down px-2">
      <v-btn
        variant="text"
        to="/"
      >
        <GeodeLogo />
        {{ name }}
      </v-btn>
      <v-spacer />
      <v-btn
        v-for="(menu, i) in menus"
        :key="i"
        variant="text"
        :to="menu.to"
      >
        {{ menu.title }}
      </v-btn>
    </v-row>

    <v-expansion-panels
      v-model="toggle_menu"
      class="hidden-md-and-up"
      style="position: absolute; top: 0; left: 0"
      accordion
    >
      <!-- <v-expansion-panel class="primary"> -->
      <v-expansion-panel
        class="bg-primary"
        :title="name"
      >
        <v-row align="center">
          <v-col
            class="px-2"
            cols="1"
          >
            <v-icon
              size="large"
              icon="mdi-vuetify"
            />
          </v-col>
          <v-col class="text-h6 mx-2">
            {{ name }}
          </v-col>
        </v-row>
      </v-expansion-panel>

      <v-expansion-panel-text>
        <v-list color="primary">
          <v-list-item
            text
            to="/"
            @click="toggle_menu = false"
          >
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(menu, i) in menus"
            :key="i"
            text
            :to="menu.to"
            @click="toggle_menu = false"
          >
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panels>
  </v-app-bar>
</template>


<script setup>
const name = 'Geode-solutions'
const toggle_menu = ref(false)
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