<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="set_current_step(2)"> Cancel </v-btn>
  </div>
</template>

<script setup>
  const stepper_tree = inject("stepper_tree")
  const { files, geode_object, route_prefix } = stepper_tree
  const props = defineProps({
    variable_to_update: { type: String, required: true },
    variable_to_increment: { type: String, required: true },
  })
  const { variable_to_update, variable_to_increment } = props
  const loading = ref(false)
  const toggle_loading = useToggle(loading)

  async function inspect_file() {
    await get_tests_names()
    stepper_tree[variable_to_increment]++
  }

  async function get_tests_names() {
    const params = new FormData()
    params.append("geode_object", geode_object)
    const route = `${route_prefix}/tests_names`
    await api_fetch(
      route,
      { method: "POST", body: params },
      {
        response_function: (response) => {
          stepper_tree[variable_to_update] = response._data.model_checks
          console.log("variable_to_update", stepper_tree[variable_to_update])
        },
      },
    )
  }
</script>

<style scoped>
  .v-btn {
    text-transform: unset !important;
  }
</style>
