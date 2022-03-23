<template>
  <v-card class="card" loading elevation="2">
    <v-card-title>Cloud instance is starting...</v-card-title>
    <v-card-subtitle>Why do you have to wait?</v-card-subtitle>
    <v-card-text>
      We start our server only on demand... and this takes a few seconds before
      you can use our free tools (up to 30 seconds).
      <br>
      This is aligned with an energy sobriety strategy. So be patient
      <v-icon color="primary" size="20">
        mdi-emoticon-excited-outline
      </v-icon>
      <br>
      We are currently trying to reduce this waiting launch time to improve your
      experience with our free tools.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CloudLoading',
}
</script>