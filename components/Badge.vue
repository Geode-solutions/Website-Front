<template>
    <v-progress-circular
        v-if="value == null"
        size="20"
        color="primary"
        indeterminate
    ></v-progress-circular>
    <v-icon v-else-if="value == 'error'" color="error"> mdi-alert-circle-outline </v-icon>
    <v-icon
        v-else-if="value == expected_value"
        color="primary"
    >
        mdi-check-circle-outline
    </v-icon>
</template>

<!-- 
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
                mdi-check-circle-outline
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
            <v-icon > mdi-close-circle-outline </v-icon>
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
</template> -->

<script>

export default {
  name: 'Badge',
  props: {
    value: {
      type: Array,
      required: true,
    },
    expected_value: {
      type: String,
      required: true,
    },
  }
}
</script>

