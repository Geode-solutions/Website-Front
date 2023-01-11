<template>
  <v-container>
    <h1 class="text-h2 py-5" align="center">
      {{ tool_name }}
    </h1>
    <v-col>
      <v-row class="justify-center">
        <v-col v-for="(card, i) in cards_list" :key="i" cols="11" md="5">
          <v-card :title="card.title" :text="card.text" class="card" hover elevation="5" :href="card.href"
            rounded="20px" target="_blank">
            <v-row class="justify-center">
              <v-col cols="auto">
                <v-icon :icon="card.icon" color="primary" size="128" class="justify-center" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
const props = defineProps({
  tool_name: { type: String, required: true },
  cards_list: { type: [], required: true }
})
</script>