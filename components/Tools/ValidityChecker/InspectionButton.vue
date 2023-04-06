<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="inspect_file()">
      Inspect
      <template #loader>
        <v-progress-circular indeterminate size="20" color="white" width="3" />
      </template>
    </v-btn>
    <v-btn variant="text" @click="set_current_step(2)">
      Cancel
    </v-btn>
  </div>
</template>

<script setup>
import { use_errors_store } from '@/stores/errors'
const errors_store = use_errors_store()

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files, input_geode_object } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

const loading = ref(false)


async function inspect_file () {
  await upload_file()
  await get_tests_names()
  stepper_tree.current_step_index++
}

async function upload_file () {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function (event) {
      const params = new FormData()
      params.append('file', event.target.result)
      params.append('filename', input_files[0].name)
      params.append('filesize', input_files[0].size)

      loading.value = true
      const route = `${tool_route}/uploadfile`

      await api_fetch(route, {
        onRequest ({ options }) {
          options.method = 'POST'
          options.body = params
        },
        onRequestError ({ error }) {
          errors_store.add_error({ "code": 400, "route": route, 'message': error.message })
          loading.value = false
        },
        onResponse ({ response }) {
          if (response.ok) {
            loading.value = false
            // resolve(data)
          }
        },
        onResponseError ({ response, error }) {
          loading.value = false
          errors_store.add_error({ "code": response.status, "route": route, 'message': response._data.error_message })
          console.log(error)
          reject(error)
          console.log(response)
        }
      })
    }
    reader.readAsDataURL(input_files[0])
  })
}

async function get_tests_names () {
  const params = new FormData()
  params.append('object', input_geode_object)
  const route = `${tool_route}/testsnames`
  // await api_fetch(route, {
  //   method: 'POST', body: params, async onResponse ({ response }) {
  //     stepper_tree.model_checks = response._data.modelChecks
  //   },
  //   onResponseError ({ response }) {
  //     errors_store.add_error({ "code": response.status, "route": route, 'message': response._data.error_message })
  //     console.log(error)
  //     console.log(response)
  //   }
  // })


  await api_fetch(route, {
    onRequest ({ options }) {
      options.method = 'POST'
      options.body = params
    },
    onRequestError ({ error }) {
      errors_store.add_error({ "code": 400, "route": route, 'message': error.message })
      loading.value = false
    },
    onResponse ({ response }) {
      if (response.ok) {
        stepper_tree.model_checks = response._data.modelChecks
      }
    },
    onResponseError ({ response }) {
      errors_store.add_error({ "code": response.status, "route": route, 'message': response._data.error_message })
      console.log(error)
      console.log(response)
    }
  })
}

</script>

