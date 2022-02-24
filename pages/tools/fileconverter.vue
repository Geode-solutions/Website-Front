<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <h1 class="text-h2 py-5" align="center">File converter</h1>
        <v-col>
          <v-row justify="space-around">
            <v-col v-for="(item, i) in items" :key="i" cols="11" md="5">
              <v-card
                class="card"
                nuxt
                hover
                elevation="5"
                v-ripple
                :href="item.href"
                target="_blank"
                contain
              >
                <v-row justify="center" align="center">
                  <v-col cols="auto">
                    <v-icon
                      v-if="item.icon.match(/mdi-.*/)"
                      size="128"
                      class="justify-center"
                    >
                      {{ item.icon }}
                    </v-icon>
                    <v-img
                      v-else
                      :src="require('@/assets/logo.svg')"
                      alt="Geode-solutions logo"
                      width="50%"
                      class="mx-auto"
                      contain
                    />
                  </v-col>
                </v-row>
                <v-card-title
                  primary-title
                  class="justify-center text-h6"
                  align="center"
                >
                  <br />
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
        <cloud-loading> </cloud-loading>
      </v-col>

      <v-col v-else>
        <v-stepper class="stepper" v-model="currentStep" vertical>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1"
            @click="currentStep = 1"
          >
            <v-row align="center"
              ><v-col cols="auto">Please select a file to convert</v-col>
              <v-col>
                <v-chip v-if="files.length"> {{ files[0].name }} </v-chip>
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
            >
            </v-file-input>
          </v-stepper-content>

          <v-stepper-step
            :complete="currentStep > 2"
            step="2"
            @click="currentStep = 2"
          >
            <v-row align="center"
              ><v-col cols="auto">Confirm the data type</v-col>
              <v-col>
                <v-chip v-if="GeodeObject"> {{ GeodeObject }} </v-chip>
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
                          nuxt
                          class="card ma-2"
                          hover
                          v-on="on"
                          elevation="5"
                          v-ripple
                        >
                          <v-img
                            :src="
                              require('@/assets/tools/' +
                                GeodeObjects[object].image)
                            "
                            contain
                            @click="GetOutputFileExtensions(object)"
                          >
                          </v-img>
                        </v-card>
                      </template>
                      <span>{{ GeodeObjects[object].tooltip }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step
            :complete="currentStep > 3"
            step="3"
            @click="currentStep = 3"
          >
            <v-row align="center"
              ><v-col cols="auto">Select file format</v-col>
              <v-col>
                <v-chip v-if="extension"> {{ extension }} </v-chip>
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
                      nuxt
                      hover
                      v-on="on"
                      active-class=""
                      @click="setFileFormat(fileExtension)"
                    >
                      <v-card-title class="justify-center">{{
                        fileExtension
                      }}</v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step step="4"> Convert your file</v-stepper-step>
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
import CloudLoading from '../../components/CloudLoading.vue'
import geode_objects from './geode_objects'

export default {
  name: 'fileconverter',
  components: { CloudLoading },
  data() {
    return {
      loading: false,
      cloudRunning: false,
      API: 'http://localhost:5000',
      // API: 'https://api.geode-solutions.com',
      ID: '', // For connection with the back-end
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
          icon: 'mdi-github',
          title: 'Visit OpenGeode GitHub repo',
          href: 'https://github.com/Geode-solutions/OpenGeode',
        },
        {
          icon: '',
          title: 'Visit the native file formats documentation',
          href: 'https://docs.geode-solutions.com/formats/',
        },
      ],
    }
  },
  computed: {
    path() {
      return this.API + '/' + this.ID
    },
  },
  created() {
    this.CheckID() // Lauches the AWS Lambda function
  },
  mounted() {},
  methods: {
    CheckID() {
      if (process.client) {
        var ID = localStorage.getItem('ID')
        console.log('ID', ID)
        if (ID === null) {
          this.CreateBackEnd()
        } else {
          this.ID = ID
          this.$axios
            .post(`${this.path}/ping`)
            .then((response) => {
              if (response.status == 200) {
                this.cloudRunning = true
                this.PingTask()
              } else {
                this.CreateBackEnd()
              }
            })
            .catch((error) => {
              this.CreateBackEnd()
            })
        }
      }
    },
    async CreateBackEnd() {
      await this.$axios
        .post(`${this.API}/tools/createbackend`)
        .then((response) => {
          if (response.status == 200) {
            this.ID = response.data.ID
            localStorage.setItem('ID', this.ID)
            this.cloudRunning = true
          } else {
            console.log('Task creation failed !')
            this.CreateBackEnd()
          }
        })
      this.GetAllowedFiles()
      this.PingTask()
    },
    GetAllowedFiles() {
      this.$axios.post(`${this.path}/allowedfiles`).then((response) => {
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
      params.append('fileName', this.files[0].name)
      this.$axios
        .post(`${this.path}/allowedobjects`, params)
        .then((response) => {
          this.objects = response.data.objects
        })
      this.currentStep = this.currentStep + 1
    },
    GetOutputFileExtensions(object) {
      const params = new FormData()
      params.append('object', object)
      this.GeodeObject = object
      this.$axios
        .post(`${this.path}/outputfileextensions`, params)
        .then((response) => {
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

        await self.$axios
          .post(`${self.path}/convertfile`, params)
          .then((response) => {
            if (response.status == 200) {
              let newFilename =
                self.files[0].name.replace(/\.[^/.]+$/, '') +
                '.' +
                self.extension
              fileDownload(response.data, newFilename)
            }
          })
      }
      await reader.readAsDataURL(this.files[0])
    },
    PingTask() {
      setInterval(() => {
        this.$nuxt.$loading.finish()
        this.$axios.post(`${this.path}/ping`).then((response) => {
          if (response.status != 200) {
            console.log('PingTask response : ', response)
            this.cloudRunning = false
            this.ID = ''
            this.CreateBackEnd()
          }
        })
      }, 10 * 1000)
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