<template>
  <v-container>
    This tool uses our Open-Source codes
    <v-tooltip location="right">
      <template #activator="{ on }">
        <v-icon color="primary" class="justify-right" v-on="on">
          mdi-information-outline
        </v-icon>
      </template>
      <span v-for="package_version in packages_versions" :key="package_version.package">
        {{ package_version.package }} v{{ package_version.version }}
        <br>
      </span>
    </v-tooltip>
  </v-container>
</template>

<script setup>
const packages_versions = defineProps({ 'packages_versions': [] })
</script>
