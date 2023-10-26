<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="decrement_current_step()">Cancel</v-btn>
  </div>
</template>

<script setup>
  const stepper_tree = inject("stepper_tree")
  const { route_prefix } = stepper_tree
  const props = defineProps({
    input_geode_object: { type: String, required: true },
  })
  const { input_geode_object } = props
  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function inspect_file() {
    await get_tests_names()
    stepper_tree["current_step_index"]++
  }

  function decrement_current_step() {
    stepper_tree["current_step_index"]--
  }

  async function get_tests_names() {
    const params = new FormData()
    params.append("input_geode_object", input_geode_object)
    const route = `${route_prefix}/tests_names`
    toggle_loading()
    await api_fetch(
      route,
      { method: "POST", body: params },
      {
        response_function: (response) => {
          stepper_tree["model_checks"] = response._data.model_checks
        },
      },
    )
    toggle_loading()
  }
</script>

<style scoped>
  .v-btn {
    text-transform: unset !important;
  }
</style>
