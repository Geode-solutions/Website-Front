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
import { mapActions } from 'vuex'

export default {
  name: 'ValidityChecker',
  head() {
    return {
      title: 'Validity checker',
    }
  },
  created() {
    if (process.client) {
      this.createConnexion()
    }
  },
  methods: {
    ...mapActions(['createConnexion']),
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>

