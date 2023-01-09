<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <h1 class="text-h2 py-5" align="center">
          Validity checker
        </h1>
        <v-col>
          <v-row class="justify-center">
            <v-col v-for="(item, i) in items" :key="i" cols="11" md="5">
              <v-card v-ripple class="card" hover elevation="5" :href="item.href" target="_blank" contain>
                <v-row class="justify-center">
                  <v-col cols="auto">
                    <v-icon size="128" class="justify-center">
                      {{ item.icon }}
                    </v-icon>
                  </v-col>
                </v-row>
                <v-card-title primary-title class="justify-center text-h6" align="center">
                  {{ item.title }}
                </v-card-title>
                <v-card-text class="justify-center text-body-1">
                  {{ item.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-col>
        <ToolLauncher />
      </v-col>

      <v-col v-if="is_cloud_running" class="pb-5">
        <v-stepper v-model="current_step" class="stepper" vertical elevation="5">
          <v-stepper-step :complete="current_step > 1" step="1" @click="set_step(1)">
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
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-file-input chips :multiple="multiple" color="#3b3b3b" :label="input_message"
              :accept="accepted_extensions" :rules="input_rules" show-size @click:clear="objects = []"
              @change="get_allowed_objects" />
          </v-stepper-content>

          <v-stepper-step :complete="current_step > 2" step="2" @click="set_step(2)">
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
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-row v-if="objects.length">
              <v-col>
                <v-row class="justify-left">
                  <v-col v-for="object in objects" :key="object" cols="2" md="2">
                    <v-tooltip location="bottom">
                      <template #activator="{ on }">
                        <v-card v-ripple class="card ma-2" hover elevation="5" v-on="on">
                          <v-img :src="
                            require('@/assets/tools/' +
                              geode_objects[object].image)
                          " cover @click="Setgeode_object(object)" />
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
                This file format isn't supported! Please check the <a href="https://docs.geode-solutions.com/formats/"
                  target="_blank">
                  supported file formats documentation</a> for more information
              </p>
            </v-row>
          </v-stepper-content>

          <v-stepper-step step="3" :complete="current_step > 3" @click="set_step(3)">
            Inspect your file
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-btn :loading="loading" color="primary" @click="inspect_file(files[0])">
              Inspect
              <template #loader>
                <v-progress-circular indeterminate size="20" color="white" width="3" />
              </template>
            </v-btn>
            <v-btn variant="text" @click="set_step(2)">
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">
            Inspection results
          </v-stepper-step>
          <v-stepper-content step="4">
            <ToolsInspectorResultsPanels v-if="model_checks.length" :model-checks="model_checks" :object="geode_object"
              :filename="files[0].name" class="pa-2" />
          </v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col v-if="is_cloud_running">
        <ToolsPackagesVersions :versions="versions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { mapState } from 'pinia'
import geode_objects from '~~/assets/tools/geode_objects'

const accepted_extensions = ''
const extension = ''
const current_step = 1
const file_extensions = []
const files = []
const geode_object = ''
const input_message = 'Please select a file'
const input_rules = [(value) => !!value || 'The file is mandatory']
const items = [
  {
    icon: 'mdi-file-check',
    title: 'Supported file formats',
    href: 'https://docs.geode-solutions.com/formats/',
  },
  {
    icon: 'mdi-github',
    title: 'OpenGeode-Inspector GitHub repo',
    href: 'https://github.com/Geode-solutions/OpenGeode-Inspector',
  },
]
const loading = false
const model_checks = []
const multiple = false
const objects = []
const success = false
const versions = []

const title = 'Validity checker'
watch: {
  is_cloud_running(newValue) {
    if (newValue === true) {
      this.get_allowed_files()
      this.get_packages_versions()
    }
  }
  onActivated(() => {
    if (this.is_cloud_running === true) {
      this.get_allowed_files()
      this.get_packages_versions()
    })
  async function get_allowed_files () {
    const data = await this.$axios.$get(
      `${this.ID}/validitychecker/allowedfiles`
    )
    const extensions = data.extensions.map((extension) => '.' + extension)
    this.accepted_extensions = extensions.join(',')
  }
  async function get_packages_versions () {
    const data = await this.$axios.$get(`${this.ID}/validitychecker/versions`)
    this.versions = data.versions
  }

  async function get_allowed_objects (changedFiles) {
    this.success = true
    this.message = 'File(s) selected'
    if (this.multiple) {
      this.files = changedFiles
    } else {
      this.files = [changedFiles]
    }

    const params = new FormData()
    params.append('filename', this.files[0].name)

    const data = await this.$axios.$post(
      `${this.ID}/validitychecker/allowedobjects`,
      params
    )
    this.objects = data.objects
    this.current_step = this.current_step + 1
  }
  function set_geode_object(object) {
    this.geode_object = object
    this.current_step = this.current_step + 1
  }

  function set_step (step) {
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
    this.set_step(4)
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
  async function upload_file () {
    const self = this
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async function (event) {
        try {
          const params = new FormData()
          params.append('file', event.target.result)
          params.append('filename', self.files[0].name)
          params.append('filesize', self.files[0].size)

          self.loading = true
          let response = await self.$axios.post(`${self.ID}/validitychecker/uploadfile`, params)
          self.loading = false

          resolve(response);
        } catch (err) {
          self.loading = false
          reject(err);
        }
      }
      reader.readAsDataURL(this.files[0])
    })
</script>
