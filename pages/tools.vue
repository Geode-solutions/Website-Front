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
          v-for="(tool, i) in tools"
          :key="i"
          :to="tool.to"
          router
          exact
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ tool.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-badge v-if="tool.badge" :content="tool.badge" inline overlap>
              <v-list-item-title v-text="tool.title" />
            </v-badge>
            <v-list-item-title v-else v-text="tool.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-col class="pa-4">
      <nuxt-child keep-alive />
    </v-col>
  </v-row>
</template>

<script>
import tools_list from '@/assets/tools_list'

export default {
  name: 'FreeTools',
  data() {
    return {
      tools: tools_list,
    }
  },
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
        default:
          return false
      }
    },
  },
}
</script>
