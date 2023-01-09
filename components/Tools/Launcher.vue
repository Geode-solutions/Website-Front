<template>
  <v-container justify="space-around">
    <v-row rows="auto" align-content="center" align="center">
      <v-col v-if="((!is_captcha_validated) && ($config.NODE_ENV === 'production'))" cols="10" align-self="center"
        align="center">
        <recaptcha class="align-center" />
        <v-btn color="primary" @click="submit_recaptcha()">
          Start tool
        </v-btn>
      </v-col>
      <v-col v-else-if="internal_error">
        <ToolsErrorsInternalError />
      </v-col>
      <v-col v-else-if="is_under_maintenance">
        <ToolsErrorsUnderMaintenance />
      </v-col>
      <v-col v-else-if="!is_cloud_running">
        <ToolsLoading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useIndexStore } from '../stores/index'
const index_store = useIndexStore()
watch: {
  is_captcha_validated(newValue) {
    if (newValue === true) {
      this.create_connexion()
    }
  },
  is_cloud_running(newValue, oldValue) {
    if (newValue === false && oldValue == true) {
      index_store.$patch({ internal_error: true })
    }
  },
},
onMounted(() => {
  if (process.client) {
    if (this.$config.NODE_ENV !== 'production') {
      index_store.$patch({ is_captcha_validated: true })
    }
  }
},

async function submit_recaptcha() {
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
}


</script>
