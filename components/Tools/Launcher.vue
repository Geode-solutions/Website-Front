<template>
  <v-container justify="space-around">
    <v-row rows="auto" align-content="center" align="center">
      <v-col v-if="((!is_captcha_validated) && ($config.NODE_ENV === 'production'))" cols="10" align-self="center"
        align="center">
        <!-- <recaptcha class="align-center" /> -->
        <v-btn color="primary" @click="submit_recaptcha()">
          Start tool
        </v-btn>
      </v-col>
      <v-col v-else-if="cloud_store.internal_error">
        <ToolsErrorsInternalError />
      </v-col>
      <v-col v-else-if="cloud_store.is_under_maintenance">
        <ToolsErrorsUnderMaintenance />
      </v-col>
      <v-col v-else-if="!cloud_store.is_cloud_running">
        <ToolsLoading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCloudStore } from '@/stores/cloud'
const cloud_store = useCloudStore()

watch(() => cloud_store.is_captcha_validated, (value) => {
  if (value === true) {
    cloud_store.create_connexion()
  }
})
watch(() => cloud_store.is_cloud_running, (value, oldValue) => {
  if (value === false && oldValue == true) {
    cloud_store.$patch({ internal_error: true })
  }
})

onMounted(() => {
  if (process.client) {
    if (this.$config.NODE_ENV !== 'production') {
      cloud_store.$patch({ is_captcha_validated: true })
    }
  }
})

async function submit_recaptcha () {
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
