<template>
  <v-card class="card" elevation="2">
    <v-card-title>
      <v-icon color="error" size="20">
        mdi-close-octagon
      </v-icon>
      Internal error
      <v-icon color="error" size="20">
        mdi-close-octagon
      </v-icon>
      </v-card-title>
    <v-card-subtitle>Oops, something went wrong...</v-card-subtitle>
    <v-card-text>
      The request could not be handled by the server, please try refreshing the page
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'InternalError',
}
</script>
