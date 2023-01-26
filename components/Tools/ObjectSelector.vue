<template>
  <v-row v-if="allowed_objects.length" class="justify-left">
    <v-col v-for="object in allowed_objects" :key="object" cols="2" md="2">
      <v-card v-ripple class="card ma-2" hover elevation="5" v-bind="on" rounded>
        <v-img :src="props.component_options.geode_objects[object].image" cover />
        <!-- @click="props.step.set_geode_object(object)" -->
        <v-tooltip activator="parent" location="bottom">
          {{ props.component_options.geode_objects[object].tooltip }}
        </v-tooltip>
      </v-card>
    </v-col>
    <!-- </v-row> -->
  </v-row>
  <v-row v-else>
    <p class="ma-4">
      This file format isn't supported! Please check the <a href="https://docs.geode-solutions.com/formats/"
        target="_blank">
        supported file formats documentation</a> for more information
    </p>
  </v-row>
</template>


<script setup>
const allowed_objects = ref([])

const props = defineProps({
  component_options: { type: Object, required: true }
})

const tool_route = 'validitychecker'
const files = ['corbi.og_brep']

async function get_allowed_objects (files) {
  // if (multiple) {
  //   files = changed_files
  // } else {
  //   files = [changed_files]
  // }
  // this.$emit("update:modelValue", files[0]);
  const params = new FormData()
  params.append('filename', files[0])
  console.log(files[0])
  const { data } = await api_fetch(`/${tool_route}/allowedobjects`, { body: params, method: 'POST' })
  console.log(data.value)
  allowed_objects.value = data.value.objects
}


onMounted(() => {
  get_allowed_objects(files)
})


</script>