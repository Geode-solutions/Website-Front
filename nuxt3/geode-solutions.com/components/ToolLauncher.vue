<template>
    <v-container justify="space-around">
        <v-row rows="auto" align-content="center" align="center">
            <v-col v-if="((!captchaValidated) && (this.$config.NODE_ENV === 'production'))" cols="10" align-self="center" align="center">
                <recaptcha class="align-center"/>
                <v-btn @click="SubmitRecaptcha()" color="primary">Start tool</v-btn> 
            </v-col>
            <v-col v-else-if="internalError">
                <InternalError />
            </v-col>
            <v-col v-else-if="underMaintenance">
                <UnderMaintenance />
            </v-col>
            <v-col v-else-if="!cloudRunning">
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
    ...mapState(['captchaValidated', 'cloudRunning', 'internalError', 'underMaintenance']),
  },
  watch: {
    captchaValidated(newValue) {
      if (newValue === true) {
        this.createConnexion()
      }
    },
    cloudRunning(newValue, oldValue) {
      if (newValue === false && oldValue == true) {
        this.$store.commit('setInternalError', true)
      }
    },
  },
  mounted(){
    if(process.client){
        if(this.$config.NODE_ENV !== 'production'){
            this.$store.commit('setCaptchaValidated', true)
        }
    }
  },

  methods: {
    ...mapActions(['createConnexion']),
    async SubmitRecaptcha() {
        try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:', token)
        const response = await this.$axios.post(`${this.$config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
        this.$store.commit('setCaptchaValidated', response.status == 200)
        console.log('this.captchaValidated :', this.captchaValidated)
        await this.$recaptcha.reset()
        } catch (error) {
        console.log('Login error:', error)
        }
    },
  },
}
</script>
