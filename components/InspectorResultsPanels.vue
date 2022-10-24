<template>
  <v-container>
    <v-expansion-panels multiple focusable v-model="panels">
      <v-expansion-panel
        v-for="(modelCheck, index) in modelChecks"
        :key="index"
        class="card"
      >
        <v-expansion-panel-header>
          <v-row dense>
            <v-col cols="auto">
              <ValidityBadge :value="modelCheck.value"/>
            </v-col>
            <v-col>
              {{ modelCheck.sentence }}
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <InspectorResultsPanels
            v-if="!modelCheck.is_leaf"
            :index="index"
            :model-checks="modelCheck.children"
            :object="object"
            :filename="filename"
            @updateResult="updateResult"
          />
          <v-container v-else-if="modelCheck.value == false" class="pt-6">
            Invalid = {{ modelCheck.list_invalidities }}
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
    }
  },
  data() {[]
    return {
      panels: []
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
      handler() {
        let nb_results = 0
        for (let index = 0; index < this.modelChecks.length; index++) {
          const current_check = this.modelChecks[index]
          if (current_check.value == null) {
            continue
          }
          if (current_check.value != true) {
            this.$emit('updateResult', this.index, false)
            return
          }else if(current_check.value == true){
            // if(!current_check.is_leaf){
              console.log('current_check.sentence :', current_check.sentence)
            // if(current_check.sentence=='Unique vertices linked to components with invalid topology'){
              console.log('index :', index)
              console.log('panels :', this.panels)
              let index_of = this.panels.indexOf(index, 0)
              console.log('index_of : ', index_of)
              this.panels.splice(index_of, 1)
              console.log('this.panels :', this.panels)
            // }
            
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
    this.panels = Array.from(Array(this.modelChecks.length).keys())
  },
  methods: {
    updateResult(index, value) {
      this.modelChecks[index].value = value
    },
    async GetTestsResults() {
      for (let index = 0; index < this.modelChecks.length; index++) {
        const current_check = this.modelChecks[index]
        if (current_check.is_leaf) {
          const params = new FormData()
          params.append('object', this.object)
          params.append('filename', this.filename)
          params.append('test', current_check.route)
          
          try{
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
