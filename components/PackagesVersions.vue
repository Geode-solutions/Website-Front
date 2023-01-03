<template>
  <v-container>
    This tool uses our Open-Source codes
    <v-tooltip location="right">
      <template #activator="{ on }">
        <v-icon
          color="primary"
          class="justify-right"
          v-on="on"
        >
          mdi-information-outline
        </v-icon>
      </template>
      <span
        v-for="version in versions"
        :key="version.package"
      >
        {{ version.package }} v{{ version.version }}
        <br>
      </span>
    </v-tooltip>
  </v-container>
</template>

<script>
export default {
  name: 'PackagesVersions',
  props: {
    versions: {
      type: Array,
      required: true,
    },
  },
}
</script>
