<template>
  <v-row class="fill-height" no-gutters>
    <v-navigation-drawer clipped>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-badge v-if="item.badge" :content="item.badge" inline overlap>
              <v-list-item-title v-text="item.title"> </v-list-item-title>
            </v-badge>
            <v-list-item-title v-else v-text="item.title"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-col class="pa-4">
      <nuxt-child />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'GeodeTools',
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/tools/welcome',
      },
      {
        icon: 'mdi-file-replace-outline',
        title: 'File converter',
        to: '/tools/fileconverter',
        badge: 'beta',
      },
      {
        icon: 'mdi-format-list-checks',
        title: 'Validity checker',
        to: '/tools/validitychecker',
        badge: 'soon',
      },
    ],
    miniVariant: true,
  }),
  head() {
    return {
      title: 'Geode-solutions free tools',
    }
  },
}
</script>
