<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <h1 class="text-h2 py-5" align="center">File converter</h1>
        <v-col>
          <v-row justify="space-around">
            <v-col v-for="(item, i) in items" :key="i" cols="11" md="5">
              <v-card
                v-ripple
                class="card"
                hover
                elevation="5"
                :href="item.href"
                target="_blank"
                contain
              >
                <v-row justify="center" align="center">
                  <v-col cols="auto">
                    <v-icon size="128" class="justify-center">
                      {{ item.icon }}
                    </v-icon>
                  </v-col>
                </v-row>
                <v-card-title
                  primary-title
                  class="justify-center text-h6"
                  align="center"
                >
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
      <v-col v-if="!cloudRunning">
        <cloud-loading />
      </v-col>

      <v-col v-else>
        <v-stepper v-model="currentStep" class="stepper" vertical>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1"
            @click="currentStep = 1"
          >
            <v-row align="center">
              <v-col cols="auto"> Please select a file to convert </v-col>
              <v-col>
                <v-chip v-if="files.length">
                  {{ files[0].name }}
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-file-input
              chips
              rounded
              :multiple="multiple"
              color="#3b3b3b"
              :label="inputMessage"
              :accept="acceptedExtensions"
              :rules="inputRules"
              show-size
              :success="success"
              @click:clear="objects = []"
              @change="GetAllowedObjects"
            />
          </v-stepper-content>

          <v-stepper-step
            :complete="currentStep > 2"
            step="2"
            @click="currentStep = 2"
          >
            <v-row align="center">
              <v-col cols="auto"> Confirm the data type </v-col>
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
                <v-row justify="left">
                  <v-col
                    v-for="object in objects"
                    :key="object"
                    cols="2"
                    md="2"
                  >
                    <v-tooltip bottom>
                      <template #activator="{ on }">
                        <v-card
                          v-ripple
                          class="card ma-2"
                          hover
                          elevation="5"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              require('@/assets/tools/' +
                                GeodeObjects[object].image)
                            "
                            contain
                            @click="GetOutputFileExtensions(object)"
                          />
                        </v-card>
                      </template>
                      <span>{{ GeodeObjects[object].tooltip }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-else>
              <p>
                This file format isn't supported! Please check the supported
                file formats documentation for more information
              </p>
            </v-row>
          </v-stepper-content>

          <v-stepper-step
            :complete="currentStep > 3"
            step="3"
            @click="currentStep = 3"
          >
            <v-row align="center">
              <v-col cols="auto"> Select file format </v-col>
              <v-col>
                <v-chip v-if="extension">
                  {{ extension }}
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-row v-if="fileExtensions.length" class="flex-column">
              <v-col>
                <v-row justify="left">
                  <v-col
                    v-for="fileExtension in fileExtensions"
                    :key="fileExtension"
                    cols="2"
                    md="2"
                  >
                    <v-card
                      class="card ma-2"
                      hover
                      v-on="on"
                      @click="setFileFormat(fileExtension)"
                    >
                      <v-card-title class="justify-center">
                        {{ fileExtension }}
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step step="4"> Convert your file </v-stepper-step>
          <v-stepper-content step="4">
            <v-btn color="primary" @click="ConvertFile(files[0])">
              Convert
            </v-btn>
            <v-btn text @click="currentStep = 3"> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fileDownload from 'js-file-download'
import CloudLoading from '@/components/CloudLoading.vue'
import geode_objects from '@/assets/geode_objects'

import { mapState } from 'vuex'

export default {
  name: 'FileConverter',
  components: { CloudLoading },
  data() {
    return {
      loading: false,
      cloudRunning: false,
      API: this.$config.API_URL,
      currentStep: 1,
      extension: '',
      fileExtensions: [],
      objects: [],
      files: [],
      acceptedExtensions: '',
      inputRules: [(value) => !!value || 'The file is mandatory'],
      inputMessage: 'Please select a file',
      success: false,
      GeodeObject: '',
      GeodeObjects: geode_objects,
      items: [
        {
          icon: 'mdi-file-check-outline',
          title: 'Supported file formats',
          href: 'https://docs.geode-solutions.com/formats/',
        },
        {
          icon: 'mdi-github',
          title: 'OpenGeode GitHub repo',
          href: 'https://github.com/Geode-solutions/OpenGeode',
        },
      ],
    }
  },
  computed: {
    ...mapState(['ID', 'cloudRuning']),
    path() {
      return this.API + '/' + this.ID
    },
  },
  created() {
    this.CheckID()
  },
  mounted() {},
  methods: {
    CheckID() {
      if (process.client) {
        console.log(this.$config.API_URL)
        var ID = localStorage.getItem('ID')
        if (ID === null) {
          this.CreateBackEnd()
        } else {
          this.ID = ID
          this.$axios
            .post(`/ping`)
            .then((response) => {
              if (response.status == 200) {
                this.cloudRunning = true
                this.GetAllowedFiles()
                this.PingTask()
              } else {
                this.CreateBackEnd()
              }
            })
            .catch(() => {
              this.CreateBackEnd()
            })
        }
      }
    },
    GetAllowedFiles() {
      this.$axios.post(`/allowedfiles`).then((response) => {
        const extensions = response.data.extensions.map(
          (extension) => '.' + extension
        )
        this.acceptedExtensions = extensions.join(',')
      })
    },
    GetAllowedObjects(changedFiles) {
      this.success = true
      this.message = 'File(s) selected'
      if (this.multiple) {
        this.files = changedFiles
      } else {
        this.files = [changedFiles]
      }

      const params = new FormData()
      params.append('filename', this.files[0].name)
      this.$axios.post(`/allowedobjects`, params).then((response) => {
        console.log('allowedobjects : ', response)
        this.objects = response.data.objects
      })
      this.currentStep = this.currentStep + 1
    },
    GetOutputFileExtensions(object) {
      const params = new FormData()
      params.append('object', object)
      this.GeodeObject = object
      this.$axios.post(`/outputfileextensions`, params).then((response) => {
        this.fileExtensions = response.data.outputfileextensions
      })
      this.currentStep = this.currentStep + 1
    },
    setFileFormat(extension) {
      this.extension = extension
      this.currentStep = 4
    },
    async ConvertFile() {
      const self = this
      const reader = new FileReader()
      reader.onload = async function (event) {
        const params = new FormData()

        params.append('object', self.GeodeObject)
        params.append('file', event.target.result)
        params.append('filename', self.files[0].name)
        params.append('extension', self.extension)
        params.append('responseType', 'blob')

        await self.$axios.post(`/convertfile`, params).then((response) => {
          if (response.status == 200) {
            let newFilename =
              self.files[0].name.replace(/\.[^/.]+$/, '') + '.' + self.extension
            fileDownload(response.data, newFilename)
          }
        })
      }
      await reader.readAsDataURL(this.files[0])
    },
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.stepper {
  border-radius: 10px;
}
</style>