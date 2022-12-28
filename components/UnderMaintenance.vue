<template>
  <v-row justify="center">
    <v-col
      cols="11"
      class="ma-3"
    >
      <v-card class="card" elevation="5">
        <v-card-title class="justify-center">
          <v-icon color="orange" size="20">
            mdi-traffic-cone
          </v-icon>
          Under maintenance 
          <v-icon color="orange" size="20">
            mdi-traffic-cone
          </v-icon>
        </v-card-title>

        <v-card-text align="center">
          This tool is currently under maintenance, please try later
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UnderMaintenance',
}
</script>
