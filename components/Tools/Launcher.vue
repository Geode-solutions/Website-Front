<template>
  <v-container justify="space-around">
    <v-row rows="auto" align-content="center" align="center">
      <v-col v-if="!is_captcha_validated" cols="10" align-self="center" align="center">
        <vue-recaptcha sitekey="6Lce72wgAAAAAOXrHyDxRQBhk6NDTD80MrXOlgbC" :loadRecaptchaScript="true"
          @expired="is_captcha_validated = false" @verify="submit_recaptcha" />
        <v-btn color="primary">
          Start tool
        </v-btn>
      </v-col>
      <v-col v-if="!is_cloud_running">
        <ToolsLoading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { use_cloud_store } from '@/stores/cloud'
import { storeToRefs } from 'pinia'
import { VueRecaptcha } from "vue-recaptcha";

const cloud_store = use_cloud_store()
const { is_cloud_running, is_captcha_validated } = storeToRefs(cloud_store)

watch(() => cloud_store.is_captcha_validated, (value) => {
  if (value === true) {
    cloud_store.create_connexion()
  }
})
watch(() => is_cloud_running, (value, oldValue) => {
  if (value === false && oldValue == true) {
    cloud_store.$patch({ internal_error: true })
  }
})

onMounted(() => {
  const config = useRuntimeConfig()
  if (process.client) {
    if (config.public.NODE_ENV !== 'production') {
      // console.log('is_captcha_validated', is_captcha_validated)
      // cloud_store.$patch({ is_captcha_validated: true })
      // console.log('is_captcha_validated', is_captcha_validated)
    }
  }
})

async function submit_recaptcha() {
  try {
    const config = useRuntimeConfig()
    const token = await this.$recaptcha.getResponse()
    // console.log('ReCaptcha token:', token)
    const response = await this.$axios.post(`${config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
    $patch({ is_captcha_validated: response.status == 200 })
    // console.log('is_captcha_validated :', is_captcha_validated)
    await this.$recaptcha.reset()
  } catch (error) {
    // console.log('Login error:', error)
  }
}


</script>
