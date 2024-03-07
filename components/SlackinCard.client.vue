<template>
  <v-container class="text-center">
    <v-dialog v-model="show" persistent>
      <v-card class="bg-primary size-card text-center">
        <v-card-text class="text-h5 text-wrap">
          Join <b>Geode-solutions</b> on Slack.
          <v-row>
            <v-form
              @submit.prevent="sendInvitation"
              class="mx-auto text-center"
            >
              <v-col class="mx-auto text-center mt-4">
                <v-text-field
                  size="30"
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  placeholder="you@yourdomain.com"
                  hide-details
                  required
                  type="email"
                ></v-text-field>
              </v-col>
              <v-col>
                <Recaptcha
                  :site_key="site_key"
                  :is_captcha_validated="is_captcha_validated"
                />
              </v-col>
              <v-col>
                <v-btn
                  type="submit"
                  class="mx-auto bouton-close text-h5 bg-primary"
                  outline
                  :disabled="!is_captcha_validated"
                >
                  GET MY INVITE &nbsp;
                  <v-icon size="3.5vh" color="white" icon="mdi-send" />
                </v-btn>
              </v-col>
            </v-form>

            <v-col v-if="errorMessage" class="mx-auto text-center">
              <v-alert icon="$warning" closable type="error">{{
                errorMessage
              }}</v-alert>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="successMessage" class="mx-auto text-center">
              <v-alert closable type="success">{{ successMessage }}</v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mx-auto">
          <v-btn @click="closeSlack" class="bouton-close">Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  const cloud_store = use_cloud_store()
  const { is_captcha_validated } = storeToRefs(cloud_store)

  const site_key = useRuntimeConfig().public.RECAPTCHA_SITE_KEY

  const email = ref("")
  const errorMessage = ref("")
  const successMessage = ref("")

  const props = defineProps({
    show: { type: Boolean, required: true },
    slackToken: { type: String, required: true },
  })
  const { show, slackToken } = toRefs(props)

  const emit = defineEmits(["close"])

  const emailRules = [
    (v) => !!v || "Email is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ]

  const closeSlack = () => {
    errorMessage.value = ""
    emit("close")
  }

  const sendInvitation = async () => {
    const data = { token: slackToken, email: email.value }
    try {
      const response = await $fetch.raw(
        `/.netlify/functions/slack?email=${email.value}`,
      )
      console.log("response", response)
      if (response.status == 400) {
        errorMessage.value = "A mail has been already sent."
      } else {
        successMessage.value = "Invitation sent successfully"
      }
      console.log(`Invite sent to ${email.value}`)
      successMessage.value = "Invitation sent successfully"
    } catch (error) {
      console.error("Error:", error)
      errorMessage.value = "An error occurred. Please try again later."
    }
  }
</script>

<style scoped>
  .size-card {
    max-width: 400px;
  }

  .bouton-close {
    border: solid 1px white;
  }
</style>
