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
            <Badge :value="modelCheck.value" :expected_value="modelCheck.expected_value"/>
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
import Badge from '@/components/Badge.vue'

export default {
  name: 'InspectorResultsPanels',
  components: { InspectorResultsPanels, Badge },
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
            .post(`${this.ID}/validitychecker/inspectfile`, params)
            .then((response) => {
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
