<template>
  <v-container>
    <v-expansion-panels v-model="display" multiple focusable>
      <v-expansion-panel
        v-for="(modelCheck, index) in modelChecks"
        :key="index"
        class="card"
      >
        <v-expansion-panel-header>
          <v-row dense>
            <v-col cols="auto">
              <ValidityBadge :value="modelCheck.value" :expected_value="modelCheck.expected_value"/>
            </v-col>
            <v-col>
              {{ modelCheck.validity_sentence }}
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <InspectorResultsPanels
            v-if="!modelCheck.is_leaf"
            :index="index"
            :model-checks="modelCheck.list_invalidity"
            :object="object"
            :filename="filename"
            @updateResult="updateResult"
          />
          <v-container v-else-if="modelCheck.value != null" class="pt-6">
            Invalid = {{ modelCheck.value }}
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import InspectorResultsPanels from '@/components/InspectorResultsPanels.vue'
import ValidityBadge from '@/components/ValidityBadge.vue'

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
    },
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
      handler() {
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
  created() {
    this.GetTestsResults()
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
            .post(`${this.ID}/validitychecker/inspectfile`, params)
            .then((response) => {
              current_check.value = response.data.Result
            })
        }
      }
    },
  },
}
</script>
