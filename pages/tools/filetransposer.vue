<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="card" elevation="2">
          <v-card-title>Coming soon!</v-card-title>
          <v-card-text>
            This free tool is currently under development. Stay tuned!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FileTransposer',
  head() {
    return {
      title: 'File transposer',
    }
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>