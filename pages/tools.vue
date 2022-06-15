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
      <v-container v-if="!this.reCaptchaValidated">
        <recaptcha />    
      </v-container>
      <v-container v-else>
        <InternalError v-if="internalError && this.reCaptchaValidated" />
        <UnderMaintenance v-else-if="underMaintenance && this.reCaptchaValidated" />
        <nuxt-child v-else keep-alive />
      </v-container>
    </v-col>
  </v-row>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import tools_list from '@/assets/tools_list'
import InternalError from '@/components/InternalError.vue'
import UnderMaintenance from '@/components/UnderMaintenance.vue'

export default {
  name: 'FreeTools',
  components: { InternalError, UnderMaintenance },
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
   
  },
  async mounted() {

     
    if (process.client) {
  try {
    await this.$recaptcha.init()
  } catch (e) {
    console.error(e);
  }


  if (this.$config.NODE_ENV !== 'production'){

  }
  if (!this.reCaptchaValidated) {
      this.createConnexion()
    }
}},
  methods: {
    ...mapActions(['createConnexion']),
    async onSubmit() {
  try {
    const token = await this.$recaptcha.execute('login')
    console.log('ReCaptcha token:', token)
    this.$store.dispatch('setReCaptchaValidated', true)
  } catch (error) {
    console.log('Login error:', error)
  }
},
beforeDestroy() {
  this.$recaptcha.destroy()
}
  },

  computed: {
    ...mapState(['ID', 'internalError', 'reCaptchaValidated', 'underMaintenance']),
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
