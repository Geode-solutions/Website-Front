<template>
  <v-progress-circular
    v-if="value == null"
    size="20"
    color="primary"
    indeterminate
    v-on="on"
  >
  </v-progress-circular>

  <v-icon
    v-else-if="value == 'error'"
    color="error">
    mdi-alert-circle-outline
  </v-icon>

  <v-icon
    v-else-if="value == expected_value"
    color="primary">
    mdi-check-circle-outline
  </v-icon>
  <v-icon
    v-else-if="value != expected_value"
    color="primary">
    mdi-close-circle-outline
  </v-icon>
</template>

<script>
export default {
  name: 'ValidityBadge',
  props: {
    value: {
      required: true,
    },
    expected_value: {
      required: true,
    },
  }
}
</script>
