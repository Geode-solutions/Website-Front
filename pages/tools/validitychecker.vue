<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <ToolsHeader
          tool_name="Validity checker"
          :cards_list="cards_list"
        />
      </v-col>
      <v-col>
        <ToolsLauncher />
      </v-col>
      {{ is_cloud_running }}
      <v-col
        v-if="is_cloud_running"
        class="pb-5"
      >
        <ToolsStepper />
        <!-- <v-stepper v-model="current_step" class="stepper" vertical elevation="5"> -->
        <!-- <v-stepper-step :complete="current_step > 1" step="1" @click="set_current_step(1)"> -->
        <v-row align="center">
          <v-col cols="auto">
            Please select a file to check
          </v-col>
          <v-col>
            <v-chip v-if="files.length">
              {{ files[0].name }}
            </v-chip>
          </v-col>
        </v-row>
        <!-- </v-stepper-step> -->
        <!-- <v-stepper-step :complete="current_step > 2" step="2" @click="set_current_step(2)"> -->
        <v-row align="center">
          <v-col cols="auto">
            Confirm the data type
          </v-col>
          <v-col>
            <v-chip v-if="geode_object">
              {{ geode_object }}
            </v-chip>
          </v-col>
        </v-row>
        <!-- </v-stepper-step> -->

        <!-- <v-stepper-content step="2"> -->
        <v-row v-if="objects.length">
          <v-col>
            <v-row class="justify-left">
              <v-col
                v-for="object in objects"
                :key="object"
                cols="2"
                md="2"
              >
                <v-tooltip location="bottom">
                  <template #activator="{ on }">
                    <v-card
                      v-ripple
                      class="card ma-2"
                      hover
                      elevation="5"
                      v-on="on"
                    >
                      <v-img
                        :src="geode_objects[object].image"
                        cover
                        @click="set_geode_object(object)"
                      />
                    </v-card>
                  </template>
                  <span>{{ geode_objects[object].tooltip }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else>
          <p class="ma-4">
            This file format isn't supported! Please check the <a
              href="https://docs.geode-solutions.com/formats/"
              target="_blank"
            >
              supported file formats documentation</a> for more information
          </p>
        </v-row>
        <!-- </v-stepper-content> -->

        <!-- <v-stepper-step step="3" :complete="current_step > 3" @click="set_current_step(3)"> -->
        Inspect your file
        <!-- </v-stepper-step> -->
        <!-- <v-stepper-content step="3"> -->
        <v-btn
          :loading="loading"
          color="primary"
          @click="inspect_file(files[0])"
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
        <!-- </v-stepper-content> -->

        <!-- <v-stepper-step step="4"> -->
        Inspection results
        <!-- </v-stepper-step> -->
        <!-- <v-stepper-content step="4"> -->
        <ToolsValidityCheckerResultsPanels
          v-if="model_checks.length"
          :model-checks="model_checks"
          :object="geode_object"
          :filename="files[0].name"
          class="pa-2"
        />
        <!-- </v-stepper-content> -->
        <!-- </v-stepper> -->
      </v-col>
      <v-col v-if="is_cloud_running">
        <ToolsPackagesVersions :packages_versions="tools_store.packages_versions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import cards_list from '@/assets/tools/validitychecker/cards'
import { use_tools_store } from '@/stores/tools'
import { use_cloud_store } from '@/stores/cloud'
import { storeToRefs } from 'pinia';
const tools_store = use_tools_store()
const cloud_store = use_cloud_store()
const { is_cloud_running } = storeToRefs(cloud_store)

const tool = 'validitychecker'
const accepted_extensions = ''
const extension = ''
const file_extensions = []
const files = []
const geode_object = ''

const loading = false
const model_checks = []
const multiple = false
const objects = []
const success = false




watch(cloud_store.is_cloud_running, (value) => {
  console.log('is_cloud_running', is_cloud_running)
  if (value === true) {
    tools_store.get_allowed_files(this.tool)
    tools_store.get_packages_versions(this.tool)
  }
})

onActivated(() => {

  console.log('cloud_store', cloud_store)
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
  console.log('upload_file okay')
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
