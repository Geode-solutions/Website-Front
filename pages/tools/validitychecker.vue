<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <ToolsHeader tool_name="Validity checker" :cards_list="cards_list" />
      </v-col>
      <!-- <v-col>
        <ToolsLauncher />
      </v-col> -->
      <v-col class="pb-5">
        <!-- v-if="is_cloud_running" -->
        <ToolsStepper :stepper_tree="stepper_tree" />
      </v-col>
      <v-col v-if="is_cloud_running">
        <ToolsPackagesVersions :packages_versions="props.packages_versions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import cards_list from '@/assets/tools/validitychecker/cards'
import stepper_tree from '@/assets/tools/validitychecker/stepper_tree'

import { use_tools_store } from '@/stores/tools'
import { use_cloud_store } from '@/stores/cloud'
import { storeToRefs } from 'pinia'
const tools_store = use_tools_store()
const cloud_store = use_cloud_store()
const { is_cloud_running, is_captcha_validated } = storeToRefs(cloud_store)
const { packages_versions } = storeToRefs(tools_store)

const tool = 'validitychecker'

watch(is_cloud_running.value, (value) => {
  if (value === true) {
    tools_store.get_allowed_files(tool)
    tools_store.get_packages_versions(tool)
  }
})

onActivated(() => {
  if (is_cloud_running === true) {
    tools_store.get_allowed_files(this.tool)
    tools_store.get_packages_versions(this.tool)
  }
})


function set_geode_object (object) {
  this.geode_object = object
  this.current_step = this.current_step + 1
}

function set_current_step (step) {
  if (step <= 3) {
    this.model_checks = []
  }
  if (step <= 2) {
    this.geode_object = ''
  }
  if (step <= 1) {
    this.files = []
  }
  this.current_step = step
}

async function inspect_file () {
  await this.upload_file()
  // console.log('upload_file okay')
  this.set_current_step(4)
  await this.get_tests_names()
}
async function get_tests_names () {
  const self = this
  const params = new FormData()
  params.append('object', self.geode_object)
  await self.$axios
    .post(`${self.ID}/validitychecker/testsnames`, params)
    .then((response) => {
      if (response.status == 200) {
        self.model_checks = response.data.model_checks
      }
    })
}
// async function upload_file () {
//   const self = this
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload = async function (event) {
//       try {
//         const params = new FormData()
//         params.append('file', event.target.result)
//         params.append('filename', self.files[0].name)
//         params.append('filesize', self.files[0].size)

//         self.loading = true
//         let response = await self.$axios.post(`${self.ID}/validitychecker/uploadfile`, params)
//         self.loading = false

//         resolve(response);
//       } catch (err) {
//         self.loading = false
//         reject(err);
//       }
//     }

//     // reader.readAsDataURL(this.files[0])
//   })
</script>
