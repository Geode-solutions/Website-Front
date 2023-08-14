<template>
  <v-container justify="space-around">
    <v-row align-content="center" align="center">
      <v-col v-if="!is_captcha_validated" cols="12" align-self="center" align="center">
        <h4 class="pb-3">
          Please complete the recaptcha to launch the tool
        </h4>
        <vue-recaptcha ref="recaptcha" sitekey="6Lce72wgAAAAAOXrHyDxRQBhk6NDTD80MrXOlgbC" :loadRecaptchaScript="true"
          @expired="is_captcha_validated = false" @verify="submit_recaptcha" align-self="center" />
      </v-col>
      <v-col v-if="!is_cloud_running && is_connexion_launched">
        <ToolsLoading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { VueRecaptcha } from "vue-recaptcha";
import { use_cloud_store } from '~/.nuxt/imports';
const cloud_store = use_cloud_store()
const { is_cloud_running, is_captcha_validated, is_connexion_launched } = storeToRefs(cloud_store)

watch(is_captcha_validated, (value) => {
  console.log('is_captcha_validated : ', value)
  if (value === true) {
    cloud_store.create_connexion()
  }
})

watch(is_cloud_running, (value, oldValue) => {
  if (value === false && oldValue == true) {
    cloud_store.$patch({ internal_error: true })
  }
})

onMounted(() => {
  if (process.client) {
    const config = useRuntimeConfig()
    if (config.public.NODE_ENV !== 'production') {
      cloud_store.$patch({ is_captcha_validated: true })
    }
  }
})

async function submit_recaptcha (token) {
  try {
    const config = useRuntimeConfig()
    console.log('ReCaptcha token:', token)
    const response = await $fetch.raw(`${config.public.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
    console.log(response)
    cloud_store.$patch({ is_captcha_validated: response.status == 200 })
    recaptcha.reset()
  } catch (error) {
    console.log('ReCaptcha login error:', error)
  }
}
</script>
