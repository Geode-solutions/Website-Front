<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple focusable>
      <v-expansion-panel
        v-for="modelCheck in modelChecks"
        :key="modelCheck.validity_sentence"
        class="card"
      >
        <v-expansion-panel-header>
          <div>
            <v-icon v-if="modelCheck.is_valid" color="teal"> mdi-check </v-icon>
            <v-icon v-else-if="!modelCheck.is_valid" color="error">
              mdi-close
            </v-icon>
            <v-icon v-else color="grey"> mdi-help </v-icon>
            {{ modelCheck.validity_sentence }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ExpansionPanels
            v-if="!modelCheck.is_leaf"
            :modelChecks="modelCheck.list_invalidity"
          />
          <v-container v-else>
            <ul>
              <li v-for="item in modelCheck.list_invalidity" :key="item">
                {{ item }}
              </li>
            </ul>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import ExpansionPanels from '@/components/ExpansionPanels.vue'

export default {
  name: 'ExpansionPanels',
  components: { ExpansionPanels },
  props: {
    modelChecks: {
      type: Object,
      required: true,
    },
  },
  methods: {
    all() {
      this.panel = [...Array(this.panelsCount).keys()].map((k, i) => i)
    },
    none() {
      this.panel = []
    },
  },
  data() {
    return {
      // modelChecks: [],
      panel: [],
      panelsCount: 2,
    }
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
