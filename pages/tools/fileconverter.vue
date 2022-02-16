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
        <v-card class="card" loading elevation="2">
          <v-card-title>Cloud instance is starting...</v-card-title>
          <v-card-subtitle>Why do you have to wait?</v-card-subtitle>
          <v-card-text>
            We start our server only on demand... and this takes a few seconds
            before you can use our free tools (up to 30 seconds).
            <br />
            This is aligned with an energy sobriety strategy. So be patient
            <v-icon color="primary" size="20"
              >mdi-emoticon-excited-outline</v-icon
            >
            <br />
            We are currently trying to reduce this waiting launch time to
            improve your experience with our free tools.
          </v-card-text>
        </v-card>
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
export default {
  name: 'File',
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cloudRunning: false,
      // API: 'http://localhost:5000',
      API: 'https://api.geode-solutions.com',
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
      GeodeObjects: {
        BRep: {
          tooltip: 'BRep',
          image: 'BRep.svg',
        },
        EdgedCurve2D: {
          tooltip: 'EdgedCurve2D',
          image: 'edged_curve2d.svg',
        },
        EdgedCurve3D: {
          tooltip: 'EdgedCurve3D',
          image: 'edged_curve3d.svg',
        },
        Graph: {
          tooltip: 'Graph',
          image: 'edged_curve.svg',
        },
        // HybridSolidy3D: {
        //   tooltip: "HybridSolid3D",
        //   image: "HybridSolid3D.svg",
        // },
        PointSet2D: {
          tooltip: 'PointSet2D',
          image: 'point_set2d.svg',
        },
        PointSet3D: {
          tooltip: 'PointSet3D',
          image: 'point_set3d.svg',
        },
        PolygonalSurface2D: {
          tooltip: 'PolygonalSurface2D',
          image: 'polygonal_surface2d.svg',
        },
        PolygonalSurface3D: {
          tooltip: 'PolygonalSurface3D',
          image: 'polygonal_surface3d.svg',
        },
        PolyhedralSolid3D: {
          tooltip: 'PolyhedralSolid3D',
          image: 'polyhedral_solid.svg',
        },
        Section: {
          tooltip: 'Section',
          image: 'section.svg',
        },
        TetrahedralSolid3D: {
          tooltip: 'TetrahedralSolid3D',
          image: 'tetrahedral_solid.svg',
        },
        TriangulatedSurface2D: {
          tooltip: 'TriangulatedSurface2D',
          image: 'triangulated_surface2d.svg',
        },
        TriangulatedSurface3D: {
          tooltip: 'TriangulatedSurface3D',
          image: 'triangulated_surface3d.svg',
        },
        VertexSet: {
          tooltip: 'VertexSet',
          image: 'VertexSet.svg',
        },
      },
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
    this.CreateBackEnd() // Lauches the AWS Lambda function
  },
  mounted() {},
  methods: {
    async CreateBackEnd() {
      if (process.client) {
        await this.$axios
          .$post(`${this.API}/tools/createbackend`)
          .then((response) => {
            console.log('response :', response)
            if (response.status == 200) {
              this.ID = response.ID
              this.cloudRunning = true
            } else {
              CreateBackEnd()
            }
          })
        this.GetAllowedFiles()
        this.PingTask()
      }
    },
    GetAllowedFiles() {
      this.$axios.post(`${this.path}/allowedfiles`).then((response) => {
        // consoile.log('response : ', response)
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
          // console.log('response :', response)
          this.fileExtensions = response.data.outputfileextensions
          // console.log('this.fileExtensions :', this.fileExtensions)
        })
      this.currentStep = this.currentStep + 1
    },
    setFileFormat(extension) {
      this.extension = extension
      this.currentStep = 4
    },
    async ConvertFile() {
      // console.log('ConvertFile')
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
              // console.log('response.headers :', response.headers)
              let newFilename =
                self.files[0].name.replace(/\.[^/.]+$/, '') +
                '.' +
                self.extension
              // console.log('newFilename :', newFilename)
              fileDownload(response.data, newFilename)
            }
          })
      }
      await reader.readAsDataURL(this.files[0])
    },
    PingTask() {
      setInterval(() => {
        // NProgress.done()
        this.$axios.post(`${this.path}/ping`).then((response) => {
          // console.log('ping', response.status)
          if (response.status != 200) {
            this.cloudRunning = false
            this.ID = ''
            // console.log('restarting server')
            this.CreateBackEnd()
          }
        })
        // .catch((error) =>
        // console.log('error', error)
        // )
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