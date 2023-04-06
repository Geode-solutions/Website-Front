<template>
  <v-snackbar :style="{ 'margin-bottom': calcMargin(index) }" v-for="(error, index) in errors" :key="index" v-model="show"
    color="error" location="bottom right" transition="slide-x-reverse-transition">
    <v-row>
      <v-col cols="1" class="white--text">
        <v-tooltip location="left">
          <span>
            {{ error.code }} {{ error.route }}
            <br>
          </span>
          <template #activator="{ props }">
            <v-icon v-bind="props" color="white" class="justify-right">
              mdi-information-outline
            </v-icon>
          </template>
        </v-tooltip>
      </v-col>
      <v-col cols="auto" class="banner_item">{{ error.message }}</v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn icon flat size="20" @click="errors_store.delete_error(index)" color="error">
          <v-icon icon="mdi-close" size="20" color="white" />
        </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script setup>
import { use_errors_store } from '@/stores/errors'
const errors_store = use_errors_store()

const { errors } = storeToRefs(errors_store)

const timeout = 10000
const show = true

function calcMargin (i) {
  return (i * 55) + 'px'
}
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