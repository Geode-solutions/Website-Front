<template>
  <div class="pa-5">
    <v-btn :loading="loading" color="primary" @click="upload_file()">
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

const props = defineProps({
  tool_name: { type: String, required: true },
  files: { type: Array, required: true }
})
const loading = ref(false)


async function inspect_file () {
  await upload_file()
  // console.log('upload_file okay')
  this.set_current_step(4)
  await get_tests_names()
}


async function upload_file () {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function (event) {
      try {
        const params = new FormData()
        params.append('file', event.target.result)
        params.append('filename', props.files[0].name)
        params.append('filesize', props.files[0].size)

        loading.value = true
        await api_fetch(`${props.tool_name}/uploadfile`, params, { method: 'POST' })
        loading.value = false

        resolve(response);
      } catch (err) {
        loading.value = false
        reject(err)
      }
    }

    // reader.readAsDataURL(this.files[0])
  })
}


async function get_tests_names () {
  const self = this
  const params = new FormData()
  params.append('object', self.geode_object)
  const { data } = await api_fetch(`${props.tool_name}/testsnames`, params)
  self.model_checks = data.value.model_checks

}
</script>

