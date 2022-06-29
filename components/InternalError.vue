<template>
  <v-row justify="center">
    <v-col
      cols="11"
      class="ma-3"
    >
      <v-card class="card" elevation="5">
        <v-card-title class="justify-center">
          <v-icon color="error" size="20">
            mdi-close-octagon
          </v-icon>
          Internal error 
          <v-icon color="error" size="20">
            mdi-close-octagon
          </v-icon>
        </v-card-title>
        <v-card-subtitle align="center">Oops, something went wrong...</v-card-subtitle>
        <v-card-text align="center">
          The request could not be handled by the server, please try refreshing the page
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InternalError',
}
</script>
