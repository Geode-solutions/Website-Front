<template>
  <v-progress-circular
    v-if="value == null"
    size="20"
    color="primary"
    indeterminate
  >
  </v-progress-circular>
  <v-icon
    v-else-if="value == 'error'"
    color="error">
    mdi-alert-circle-outline
  </v-icon>
  <v-icon
    v-else-if="value == true"
    color="primary">
    mdi-check-circle-outline
  </v-icon>
  <v-icon
    v-else-if="value == false"
    color="error">
    mdi-close-circle
  </v-icon>
</template>

<script>
export default {
  name: 'ValidityBadge',
  props: {
    value: {
      required: true,
    },
  }
}
</script>
