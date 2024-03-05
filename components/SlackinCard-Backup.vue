<template>
  <v-container>
    <v-dialog v-model="show" persistent>
      <v-card class="v-card-slack">
        <v-card-text class="v-card-text-slack"
          >Join <b>Geode-solutions</b> on Slack.
          <v-row>
            <v-form @submit.prevent="sendInvitation">
              <v-col>
                <v-text-field
                  v-model="email"
                  label="Email"
                  placeholder="you@yourdomain.com"
                  required
                  type="email"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="!is_captcha_validated"
                class="align"
                cols="12"
                align-self="center"
              >
                <h4 class="pb-3">
                  Please complete the recaptcha to launch the app
                </h4>
                <Recaptcha :site_key="site_key" />
              </v-col>

              <v-col>
                <v-btn type="submit" class="bouton-send">GET MY INVITE</v-btn>
              </v-col>
            </v-form>

            <v-col v-if="errorMessage">
              <v-alert type="error">{{ errorMessage }}</v-alert>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="successMessage">
              <v-alert type="success">{{ successMessage }}</v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="v-card-actions-slack">
          <v-btn @click="closeSlack" class="bouton-close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  const cloud_store = use_cloud_store()
  const { is_captcha_validated } = storeToRefs(cloud_store)

  const email = ref("")
  const errorMessage = ref("")
  const successMessage = ref("")

  const props = defineProps({
    show: { type: Boolean, required: true },
    slackToken: { type: String, required: true },
  })
  const { show, slackToken } = toRefs(props)

  const emit = defineEmits(["close"])

  const closeSlack = () => {
    emit("close")
  }

  const sendInvitation = async () => {
    if (!is_captcha_validated.value) {
      errorMessage.value = "Please complete the recaptcha to be invited."
      return
    }
    const data = { token: slackToken, email: email.value }

    try {
      const response = await $fetch.raw(
        `/.netlify/functions/slack?email=${email.value}`,
      )
      console.log(response)
      if (!response.ok) {
        const errorBody = await response.json()
        throw new Error(
          `Invalid response ${response.status}: ${errorBody.error}`,
        )
      }

      const responseBody = await response.json()

      const { ok, error: providedError } = responseBody

      if (!ok) {
        throw new Error(providedError)
      }

      console.log(`Invite sent to ${email.value}`)
      successMessage.value = "Invitation sent successfully"
    } catch (error) {
      console.error("Error:", error)
      errorMessage.value = error.message || "An error occurred"
    }
  }
</script>

<style scoped>
  .v-card-slack {
    background-color: #00897b;
    border-radius: 16px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    max-width: 300px;
    z-index: 100;
  }

  .v-card-title-slack {
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: center;
  }

  .v-card-text-slack {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 16px;
  }

  .v-card-actions-slack {
    padding: 16px;
    color: white;
    display: flex;
    justify-content: center;
  }
  input {
    background-color: white;
  }
  .invite-slack {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .error-message {
    color: red;
  }
  .success-message {
    color: green;
  }
  .bouton-send {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #00897b;
    border: solid 2px #00897b;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 20px;
    transition: all 0.3s ease;
  }

  .bouton-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: solid 1px white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    padding: 5px 10px;
    transition: all 0.3s ease;
  }
</style>
