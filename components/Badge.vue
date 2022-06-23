<template>
    <div>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-progress-circular
            v-if="value == null"
            size="20"
            color="primary"
            indeterminate
            v-on="on"
        ></v-progress-circular>
        <v-icon
          v-else-if="value == 'error'"
          v-on="on"
          color="error"
        >
          mdi-alert-circle-outline
        </v-icon>
        <v-icon
            v-else-if="value == expected_value"
            v-on="on"
            color="primary"
        >
            mdi-check-circle-outline
        </v-icon>
      </template>
      <span v-if="value == null">This check is in progress</span>
      <span v-else-if="value == 'error'">This check returned an internal error</span>
      <span v-else-if="value == expected_value">This check has passed</span>
      <span v-else-if="value != expected_value">This check has failed</span>
    </v-tooltip>
    </div>
</template>

<script>
export default {
  name: 'Badge',
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
