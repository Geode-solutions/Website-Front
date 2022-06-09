<template>
  <v-container>
    <v-expansion-panels multiple focusable v-model="display">
      <v-expansion-panel
        v-for="(modelCheck, index) in modelChecks"
        :key="index"
        class="card"
      >
        <v-expansion-panel-header>
          <div>
            <div v-if="modelCheck.value == null">
              <v-tooltip right>
                <template #activator="{ on }">
                <v-progress-circular
                  
                  size="20"
                  color="primary"
                  indeterminate
                  v-on="on"
                ></v-progress-circular>
                </template>
                <span>This check is in progress</span>
              </v-tooltip>
            </div>
            <div v-else-if="modelCheck.value == modelCheck.expected_value">
              <v-tooltip right>
                <template #activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
              >
                mdi-check
              </v-icon>
              </template>
              <span>This check has passed</span>
              </v-tooltip>
            </div>
            <div v-else-if="modelCheck.value == 'error'"><v-tooltip right>
                <template #activator="{ on }">
              <v-icon
                color="error"
                v-on="on"
              >
              mdi-alert
              </v-icon>
              </template>
              <span>This check returned an internal error</span>
              </v-tooltip>
            </div>
            <div
                v-else color="error"
              >
            <v-icon > mdi-close </v-icon>
            </div>
            {{ modelCheck.validity_sentence }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <InspectorResultsPanels
            v-if="!modelCheck.is_leaf"
            :index="index"
            :modelChecks="modelCheck.list_invalidity"
            :object="object"
            :filename="filename"
            @updateResult="updateResult"
          />
          <v-container v-else-if="modelCheck.value!=null" class="pt-6">
            Result = {{ modelCheck.value }}
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import InspectorResultsPanels from '@/components/InspectorResultsPanels.vue'

export default {
  name: 'InspectorResultsPanels',
  components: { InspectorResultsPanels },
  props: {
    modelChecks: {
      type: Array,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },


  data() {
    return {
      resultOptions: {
        in_progress:
        {
          icon: 'mdi-file-check',
          color: 'Supported file formats',
          tooltip: 'https://docs.geode-solutions.com/formats/',
        },
        passed:
        {
          icon: 'mdi-check',
          color: 'Supported file formats',
          tooltip: 'This check has passed',
        },
        failed:
        {
          icon: 'mdi-github',
          color: 'OpenGeode-Inspector GitHub repo',
          tooltip: 'https://github.com/Geode-solutions/OpenGeode-Inspector',
        },
        error:
        {
          icon: 'mdi-close',
          color: 'error',
          tooltip: 'This check returned an internal error',
        },
      },

    }
  },
  watch: {
    modelChecks: {
      handler(value) {
        let nb_results = 0
        for (let index = 0; index < this.modelChecks.length; index++) {
          const current_check = this.modelChecks[index]
          if (current_check.value == null) {
            continue
          }
          if (current_check.value != current_check.expected_value) {
            this.$emit('updateResult', this.index, false)
            return
          }
          nb_results++
        }
        if (nb_results == this.modelChecks.length) {
          this.$emit('updateResult', this.index, true)
        }
      },
      deep: true,
    },
  },
  methods: {
    updateResult(index, value) {
      this.modelChecks[index].value = value
    },
    GetTestsResults() {
      for (let index = 0; index < this.modelChecks.length; index++) {
        const current_check = this.modelChecks[index]
        if (current_check.is_leaf) {
          const params = new FormData()
          params.append('object', this.object)
          params.append('filename', this.filename)
          params.append('test', current_check.route)
          this.$axios
            .post(`${this.ID}/validitychecker/inspectfile`, params, {timeout: 1000*30})
            .then((response) => {
              console.log(response.data.Result)
              current_check.value = response.data.Result
            })
        }
      }
    },
  },
  created() {
    this.GetTestsResults()
  },
  computed: {
    ...mapState(['ID']),
    display: function () {
      let values = new Array()
      for (let i = 0; i < this.modelChecks.length; i++) {
        if (!this.modelChecks[i].is_leaf) {
          values.push(i)
        }
      }
      return values
    },
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
