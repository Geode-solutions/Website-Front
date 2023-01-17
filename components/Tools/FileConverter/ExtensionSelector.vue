<template>
  <v-row align="center">
    <v-col cols="auto">
      Select file format
    </v-col>
    <v-col>
      <v-chip v-if="extension">
        {{ extension }}
      </v-chip>
    </v-col>
  </v-row>
  <v-row v-if="file_extensions.length" class="flex-column">
    <v-col>
      <v-row class="justify-left">
        <v-col v-for="file_extension in file_extensions" :key="file_extension" cols="2">
          <v-card class=" card ma-2" hover @click="set_file_format(file_extension)">
            <v-card-title class="justify-center">
              {{ file_extension }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
const file_extensions = ['toto', 'tutu']
const extension = 'toto'
</script>