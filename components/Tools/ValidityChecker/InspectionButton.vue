<template>
  <v-btn
    :loading="props.loading"
    color="primary"
    @click="props.click"
  >
    Inspect
    <template #loader>
      <v-progress-circular
        indeterminate
        size="20"
        color="white"
        width="3"
      />
    </template>
  </v-btn>
  <v-btn
    variant="text"
    @click="set_current_step(2)"
  >
    Cancel
  </v-btn>
</template>

<script setup>

const props = defineProps({
  loading: { type: Boolean, required: true },
  click: { type: Function, required: true },
})

</script>

