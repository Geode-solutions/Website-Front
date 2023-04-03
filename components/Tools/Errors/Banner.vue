<template>
  <div v-for="error, index in errors" class="pa-0">
    <v-banner class="banners" height="50" elevation="3">
      <v-banner-text>
        <v-row>
          <v-col cols="auto" class="white--text">
            <p class="banner_item">
              {{ error.code }}
            </p>
          </v-col>
          <v-col cols="2">
            <p class="banner_item">
              {{ error.route }}
            </p>
          </v-col>
          <v-col cols="5" class="banner_item">{{ error.message }}</v-col>
          <v-spacer />
          <v-col cols="1">
            <v-btn icon flat size="20" @click="errors_store.delete_error(index)" color="error">
              <v-icon icon="mdi-close" size="20" color="white" />
            </v-btn>
          </v-col>
        </v-row>
      </v-banner-text>
    </v-banner>
  </div>
</template>

<script setup>
import { use_errors_store } from '@/stores/errors'
const errors_store = use_errors_store()

const { errors } = storeToRefs(errors_store)
</script>

<style>
.banners {
  background-color: #D50000;
}

.banner_item {
  color: white;
  font-style: bold;
}
</style>