<template>
  <v-btn :loading="loading" color="primary" @click="convert_file(files)">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step = 3">
    Cancel
  </v-btn>
</template>

<script setup>
// const props = defineProps({
//   component_options: { type: Object, required: true }
// })

const loading = ref(false)

async function convert_file () {
  for (let i = 0; i < self.files.length; i++) {

    let reader = new FileReader()
    reader.onload = async function (event) {
      let params = new FormData()

      params.append('object', self.geode_object)
      params.append('file', event.target.result)
      params.append('filename', self.files[i].name)
      params.append('filesize', self.files[i].size)
      params.append('extension', self.extension)
      params.append('responseType', 'blob')
      params.append('responseEncoding', 'binary')
      loading.value = true

      try {
        const { data } = await api_fetch(`/fileconverter/convertfile`, { body: params, method: 'POST', responseType: 'blob' })
        let new_file_name = data.value.headers['new-file-name']
        fileDownload(response.data, new_file_name)
        loading.value = false
      } catch (err) {
        console.log(err)
        loading.value = false
      }
    }
    reader.readAsDataURL(files[i])
  }
}

</script>