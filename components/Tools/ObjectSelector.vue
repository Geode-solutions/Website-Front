<template>
  <v-row class="justify-left">
    <v-col v-for="object in objects" :key="object" cols="2" md="2">
      <!-- <v-tooltip location="bottom">
        <template v-slot:activator="{ on }">
          <v-card v-ripple class="card ma-2" hover elevation="5" v-bind="on" rounded>
            <v-img :src="props.component_options.geode_objects[object].image" cover /> -->
      <!-- @click="props.step.set_geode_object(object)" -->
      <!-- </v-card>
        </template> -->
      <!-- props.component_options.geode_objects[object].tooltip -->
      <!-- <span>Programmatic tooltip</span>
      </v-tooltip> -->
      <v-card v-ripple class="card ma-2" hover elevation="5" v-bind="on" rounded>
        <v-img :src="props.component_options.geode_objects[object].image" cover />
        <v-tooltip activator="parent" location="bottom">
          {{ props.component_options.geode_objects[object].tooltip }}
        </v-tooltip>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup>
const objects = ['BRep', 'CrossSection']

const props = defineProps({
  component_options: { type: Object, required: true }
})

</script>