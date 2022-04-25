<template>
  <v-container>
    <v-row class="flex-column">
      <v-col>
        <h1 class="text-h2 py-5" align="center">Validity checker</h1>
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

      <v-col v-else class="pb-5">
        <v-stepper v-model="currentStep" class="stepper" vertical>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1"
            @click=";(currentStep = 1), (files = [])"
          >
            <v-row align="center">
              <v-col cols="auto"> Please select a file to check </v-col>
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
            @click=";(currentStep = 2), (GeodeObject = '')"
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
                            @click="SetGeodeObject(object)"
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

          <v-stepper-step step="3"> Inspect your file </v-stepper-step>
          <v-stepper-content step="3">
            <v-btn color="primary" @click="InspectFile(files[0])">
              Inspect
            </v-btn>
            <v-btn
              text
              @click=";(currentStep = currentStep - 1), (GeodeObject = '')"
            >
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4"> Inspection results </v-stepper-step>
          <v-stepper-content step="4">
            <v-expansion-panel>
              <v-expansion-panel-content></v-expansion-panel-content>
            </v-expansion-panel>
          </v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col v-if="cloudRunning">
        This tool uses our Open-Source codes
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon color="primary" class="justify-right" v-on="on">
              mdi-information-outline
            </v-icon>
          </template>
          <span v-for="version in versions" :key="version.package">
            {{ version.package }} v{{ version.version }}
            <br />
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CloudLoading from '@/components/CloudLoading.vue'
import geode_objects from '@/assets/geode_objects'
export default {
  name: 'ValidityChecker',
  components: { CloudLoading },
  head() {
    return {
      title: 'Validity checker',
    }
  },
  data() {
    return {
      acceptedExtensions: '',
      extension: '',
      currentStep: 1,
      fileExtensions: [],
      files: [],
      GeodeObject: '',
      GeodeObjects: geode_objects,
      inputMessage: 'Please select a file',
      inputRules: [(value) => !!value || 'The file is mandatory'],
      items: [
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
      ],
      loading: false,
      multiple: false,
      objects: [],
      success: false,
      modelValid: '',
      versions: [],
    }
  },
  computed: {
    ...mapState(['ID', 'cloudRunning']),
  },
  watch: {
    cloudRunning(newValue) {
      if (newValue === true) {
        this.GetAllowedFiles()
        this.GetPackagesVersions()
      }
    },
  },
  methods: {
    async GetAllowedFiles() {
      const data = await this.$axios.$post(
        `${this.ID}/validitychecker/allowedfiles`
      )
      const extensions = data.extensions.map((extension) => '.' + extension)
      this.acceptedExtensions = extensions.join(',')
    },
    async GetPackagesVersions() {
      const data = await this.$axios.$get(`${this.ID}/validitychecker/versions`)
      this.versions = data.versions
    },

    async GetAllowedObjects(changedFiles) {
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
      this.currentStep = this.currentStep + 1
    },

    async GetAllowedObjects(changedFiles) {
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
      this.currentStep = this.currentStep + 1
    },
    SetGeodeObject(object) {
      this.GeodeObject = object
      this.currentStep = this.currentStep + 1
    },
    async InspectFile() {
      const self = this
      const reader = new FileReader()
      reader.onload = async function (event) {
        const params = new FormData()
        params.append('object', self.GeodeObject)
        params.append('file', event.target.result)
        params.append('filename', self.files[0].name)

        console.log(`${self.ID}/validitychecker/inspectfile`)
        await self.$axios
          .post(`${self.ID}/validitychecker/inspectfile`, params)
          .then((response) => {
            if (response.status == 200) {
              self.modelValid = response.data.valid
            }
          })
      }
    },
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
