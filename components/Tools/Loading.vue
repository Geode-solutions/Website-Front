<template>
  <v-row justify="center">
    <v-col cols="11" class="ma-3">
      <v-card loading elevation="5" class="card">
        <v-card-title class="justify-center" align="center">
          Cloud instance is starting...
        </v-card-title>
        <v-card-subtitle align="center">
          Why do you have to wait?
        </v-card-subtitle>
        <v-card-text align="center">
          We start our server only on demand... and this takes a few seconds (up to 30) before
          you can use our free tools.
          <br>
          This is aligned with an energy sobriety strategy. So be patient
          <v-icon color="primary" size="20">
            mdi-emoticon-excited-outline
          </v-icon>
          <br>
          <v-icon color="warning" size="20">
            mdi-alert
          </v-icon>
          Warning, the server will automatically shut down after 5 minutes of inactivity.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

