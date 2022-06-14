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
      
      <!-- <InternalError v-if="internalError" /> -->
      <!-- <UnderMaintenance v-else-if="underMaintenance" /> -->
      <!-- <nuxt-child v-else keep-alive /> -->
      <vue-recaptcha ref="recaptcha" sitekey="6LdkPmcgAAAAACztl3JOdKJJXaQcNRllOFsP-mK6">
        
      </vue-recaptcha>
      <v-btn @click="onEvent">Click me</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tools_list from '@/assets/tools_list'
import { VueRecaptcha } from 'vue-recaptcha';

import InternalError from '@/components/InternalError.vue'
import UnderMaintenance from '@/components/UnderMaintenance.vue'

export default {
  name: 'FreeTools',
  components: { InternalError, UnderMaintenance, VueRecaptcha },
  // VueRecaptcha },
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
  created() {
    if (process.client) {
      this.createConnexion()
    }
    // this.$refs.recaptcha.execute();
  },
  methods: {
    ...mapActions(['createConnexion']),
    onEvent() {
        // when you need a reCAPTCHA challenge
      this.$refs.recaptcha.execute();
    }
  },

  computed: {
    ...mapState(['ID', 'internalError', 'underMaintenance']),
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
