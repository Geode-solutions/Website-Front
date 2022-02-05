<template>
  <v-row class="fill-height" no-gutters>
    <v-navigation-drawer
      clipped
      permanent
      :mini-variant="mini"
      :expand-on-hover="mini"
    >
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
  }),

  head() {
    return {
      title: 'Geode-solutions free tools',
    }
  },
  computed: {
    mini() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return true
        case 'lg':
          return false
        case 'xl':
          return false
      }
    },
  },
}
</script>