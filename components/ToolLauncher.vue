<template>
    <v-container justify="space-around">
        <v-row rows="auto" align-content="center" align="center">
            <v-col v-if="((!is_captcha_validated) && (this.$config.NODE_ENV === 'production'))" cols="10" align-self="center" align="center">
                <recaptcha class="align-center"/>
                <v-btn @click="SubmitRecaptcha()" color="primary">Start tool</v-btn> 
            </v-col>
            <v-col v-else-if="internal_error">
                <InternalError />
            </v-col>
            <v-col v-else-if="is_under_maintenance">
                <UnderMaintenance />
            </v-col>
            <v-col v-else-if="!is_cloud_running">
                <CloudLoading />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CloudLoading from '@/components/CloudLoading.vue'
import InternalError from '@/components/InternalError.vue'
import UnderMaintenance from '@/components/UnderMaintenance.vue'

export default {
  name: 'FileConverter',
  components: { CloudLoading, InternalError, UnderMaintenance },
  computed: {
    ...mapState(['is_captcha_validated', 'is_cloud_running', 'internal_error', 'is_under_maintenance']),
  },
  watch: {
    is_captcha_validated(newValue) {
      if (newValue === true) {
        this.create_connexion()
      }
    },
    is_cloud_running(newValue, oldValue) {
      if (newValue === false && oldValue == true) {
        this.$store.commit('set_internal_error', true)
      }
    },
  },
  mounted(){
    if(process.client){
        if(this.$config.NODE_ENV !== 'production'){
            this.$store.commit('set_is_captcha_validated', true)
        }
    }
  },

  methods: {
    ...mapActions(['create_connexion']),
    async SubmitRecaptcha() {
        try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:', token)
        const response = await this.$axios.post(`${this.$config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
        this.$store.commit('set_is_captcha_validated', response.status == 200)
        console.log('this.is_captcha_validated :', this.is_captcha_validated)
        await this.$recaptcha.reset()
        } catch (error) {
        console.log('Login error:', error)
        }
    },
  },
}
</script>
