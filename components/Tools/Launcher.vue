<template>
  <v-container justify="space-around">
    <v-row rows="auto" align-content="center" align="center">
      <v-col v-if="((!cloud_store.is_captcha_validated) && ($config.NODE_ENV === 'production'))" cols="10"
        align-self="center" align="center">
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
import { use_cloud_store } from '@/stores/cloud'
const cloud_store = use_cloud_store()

watch(() => cloud_store.is_captcha_validated, (value) => {
  if (value === true) {
    console.log(value)
    cloud_store.create_connexion()
  }
})
watch(() => cloud_store.is_cloud_running, (value, oldValue) => {
  if (value === false && oldValue == true) {
    cloud_store.$patch({ internal_error: true })
  }
})

onMounted(() => {
  const config = useRuntimeConfig()
  if (process.client) {
    if (config.public.NODE_ENV !== 'production') {
      console.log('test')
      cloud_store.$patch({ is_captcha_validated: true })
      console.log('cloud_store.is_captcha_validated', cloud_store.is_captcha_validated)
    }
  }
})

async function submit_recaptcha () {
  try {
    const token = await this.$recaptcha.getResponse()
    console.log('ReCaptcha token:', token)
    const response = await this.$axios.post(`${$config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
    cloud_store.$patch({ is_captcha_validated: response.status == 200 })
    console.log('is_captcha_validated :', cloud_store.is_captcha_validated)
    await this.$recaptcha.reset()
  } catch (error) {
    console.log('Login error:', error)
  }
}


</script>
