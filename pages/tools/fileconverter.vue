<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <h1 class="text-h2 py-5" align="center">
          File converter
        </h1>
        <v-col>
          <v-row class="justify-center">
            <v-col v-for="(item, i) in items" :key="i" cols="11" md="5">
              <v-card v-ripple class="card" hover elevation="5" :href="item.href" target="_blank" cover>
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
          <v-stepper-step :complete="current_step > 1" step="1" @click="current_step = 1">
            <v-row align="center">
              <v-col cols="auto">
                Please select a file to convert
              </v-col>
              <v-col v-if="files.length">
                <v-chip v-for="(file, index) in files" :key="index">
                  {{ file.name }}
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-file-input chips multiple color="#3b3b3b" :label="input_message" :accept="accepted_extensions"
              :rules="input_rules" show-size @click:clear="objects = []" @change="GetAllowedObjects" />
          </v-stepper-content>

          <v-stepper-step :complete="current_step > 2" step="2" @click="current_step = 2">
            <v-row align="center">
              <v-col cols="auto">
                Confirm the data type
              </v-col>
              <v-col>
                <v-chip v-if="GeodeObject">
                  {{ GeodeObject }}
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
                          <v-img :src="geode_objects[object].image" cover @click="get_output_fle_extensions(object)" />
                        </v-card>
                      </template>
                      <span>{{ GeodeObjects[object].tooltip }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row v-else>
              <p class="ma-4">
                <span v-if="files.length == 1">This file format is not supported! </span>
                <span v-else>This file format combination is not supported! </span>
                Please check the <a href="https://docs.geode-solutions.com/formats/" target="_blank">
                  supported file formats documentation</a> for more information
              </p>
            </v-row>
          </v-stepper-content>

          <v-stepper-step :complete="current_step > 3" step="3" @click="current_step = 3">
            <v-row align="center">
              <v-col cols="auto">
                Select file format
              </v-col>
              <v-col>
                <v-chip v-if="extension">
                  {{ extension }}
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-row v-if="file_extensions.length" class="flex-column">
              <v-col>
                <v-row class="justify-left">
                  <v-col v-for="fileExtension in file_extensions" :key="fileExtension" cols="2" md="2">
                    <v-card class="card ma-2" hover @click="set_file_format(fileExtension)">
                      <v-card-title class="justify-center">
                        {{ fileExtension }}
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step step="4" @click="current_step = 4">
            Convert your file
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-btn :loading="loading" color="primary" @click="convert_file(files)">
              Convert
              <template #loader>
                <v-progress-circular indeterminate size="20" color="white" width="3" />
              </template>
            </v-btn>
            <v-btn variant="text" @click="current_step = 3">
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col v-if="is_cloud_running">
        <ToolsPackagesVersions :packages_versions="packages_versions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// import fileDownload from 'js-file-download'
import geode_objects from '@/assets/tools/geode_objects'
const tools_store = use_tools_store()



const name = 'FileConverter'
const tool_route = 'fileconverter'
const accepted_extensions = ''
const extension = ''
const current_step = 1
const file_extensions = []
const files = []
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
    title: 'OpenGeode GitHub repo',
    href: 'https://github.com/Geode-solutions/OpenGeode',
  },
]
const loading = false
const objects = []
const success = false

// watch(is_cloud_running, (newValue, oldValue) => {
//   if (newValue === true) {
//     this.get_allowed_files()
//     this.get_packages_versions()
//   }
// }
// })
onActivated(() => {
  if (this.is_cloud_running === true) {
    tools_store.get_allowed_files(tool_route)
    tools_store.get_packages_versions(tool_route)
  }
})


async function get_output_file_extensions (object) {
  const params = new FormData()
  params.append('object', object)
  this.GeodeObject = object

  const data = await this.$axios.$post(`${this.ID}/fileconverter/outputfileextensions`, params)
  this.file_extensions = data.outputfileextensions
  this.current_step = this.current_step + 1
}
function set_file_format (extension) {
  this.extension = extension
  this.current_step = 4
}
async function convert_file () {
  const self = this
  for (let i = 0; i < self.files.length; i++) {

    let reader = new FileReader()
    reader.onload = async function (event) {
      let params = new FormData()

      params.append('object', self.GeodeObject)
      params.append('file', event.target.result)
      params.append('filename', self.files[i].name)
      params.append('filesize', self.files[i].size)
      params.append('extension', self.extension)
      params.append('responseType', 'blob')
      params.append('responseEncoding', 'binary')
      self.loading = true

      try {
        await self.$axios
          .post(`${self.ID}/fileconverter/convertfile`, params, { responseType: 'blob' })
          .then((response) => {
            if (response.status == 200) {
              let new_file_name = response.headers['new-file-name']
              // fileDownload(response.data, new_file_name)
            }
            self.loading = false
          })
      } catch (err) {
        self.loading = false
      }
    }
    reader.readAsDataURL(self.files[i])
  }
}
</script>

