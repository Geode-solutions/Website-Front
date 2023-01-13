<template>
  <v-tooltip location="bottom">
    <template #activator="{ on }">
      <v-card v-ripple class="card ma-2" hover elevation="5" v-on="on">
        <v-img :src="geode_objects[object].image" cover @click="set_geode_object(object)" />
      </v-card>
    </template>
    <span>{{ props.geode_objects[object].tooltip }}</span>
  </v-tooltip>

</template>


<script setup>

const props = defineProps({
  geode_objects: { type: Object, required: true }
})

</script>