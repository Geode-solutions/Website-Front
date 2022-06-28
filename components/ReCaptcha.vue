<template>
    <v-container>
        <v-row rows="auto" align-content="center" align="center">
            <v-col v-if="((!captchaValidated) && (this.$config.NODE_ENV === 'production'))" cols="12" align-self="center" align="center">
                <recaptcha class="align-center"/>
                <v-btn @click="SubmitRecaptcha()" color="primary">Submit</v-btn> 
            </v-col>
            <v-col v-else-if="internalError" cols="12" align-self="center" align="center">
                <InternalError />
            </v-col>
            <v-col v-else-if="underMaintenance" cols="12" align-self="center" align="center">
                <UnderMaintenance />
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
    ...mapState(['internalError', 'captchaValidated', 'underMaintenance']),
  },
  watch: {
    captchaValidated(newValue) {
      if (newValue === true) {
        this.createConnexion()
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
        const response = await this.$axios.post(
            `${this.$config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`
        )
        console.log('response :', response)
        if (response.status == 200) {
            this.$store.commit('setCaptchaValidated', true)
        } else {
            this.$store.commit('setCaptchaValidated', false)
        }
        console.log('this.captchaValidated :', this.captchaValidated)
        await this.$recaptcha.reset()
        } catch (error) {
        console.log('Login error:', error)
        }
    },
  },
}
</script>
