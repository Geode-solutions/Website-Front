<template>
  <v-container>
    <v-expansion-panels
      v-model="opened_panels"
      multiple
    >
      <v-expansion-panel
        v-for="(modelCheck) in modelChecks"
        :key="index"
        class="card"
        :title="modelCheck.sentence"
      >
        <InspectorValidityBadge :value="modelCheck.value" />
        <InspectorResultsPanels
          v-if="!modelCheck.is_leaf"
          :index="index"
          :model-checks="modelCheck.children"
          :object="object"
          :filename="filename"
          @updateResult="updateResult"
        />
        <v-container
          v-else-if="modelCheck.value == false"
          class="pt-6"
        >
          Invalid = {{ modelCheck.list_invalidities }}
        </v-container>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { mapState } from 'pinia'


export default {
  name: 'InspectorResultsPanels',
  components: { InspectorResultsPanels, ValidityBadge },
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
    }
  },
  data () {
    []
    return {
      opened_panels: []
    }
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
  watch: {
    modelChecks: {
      handler () {
        let nb_results = 0
        for (let index = 0; index < this.modelChecks.length; index++) {
          const current_check = this.modelChecks[index]
          if (current_check.value == null) {
            continue
          }
          if (current_check.value != true) {
            this.$emit('updateResult', this.index, false)
            return
          } else if (current_check.value == true) {
            console.log('index :', index)
            let index_of_index = this.opened_panels.indexOf(index)
            console.log('this.sopened_panels :', this.opened_panels)
            console.log('index_of_index :', index_of_index)
            if (index_of_index > -1) { // only splice array when item is found
              this.opened_panels.splice(index_of_index, 1)
            }
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
  created () {
    this.GetTestsResults()
    this.opened_panels = Array.from(Array(this.modelChecks.length).keys())
  },
  methods: {
    updateResult (index, value) {
      this.modelChecks[index].value = value
    },
    async GetTestsResults () {
      for (let index = 0; index < this.modelChecks.length; index++) {
        const current_check = this.modelChecks[index]
        if (current_check.is_leaf) {
          const params = new FormData()
          params.append('object', this.object)
          params.append('filename', this.filename)
          params.append('test', current_check.route)

          try {
            let response = await this.$axios.post(`${this.ID}/validitychecker/inspectfile`, params)
            current_check.value = response.data.Result
            current_check.list_invalidities = response.data.list_invalidities
          } catch (err) {
            current_check.value = 'error'
          }
        }
      }
    },
  },
}
</script>
