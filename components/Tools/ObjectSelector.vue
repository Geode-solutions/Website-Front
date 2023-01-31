<template>
  <v-row v-if="allowed_objects.length" class="justify-left">
    <v-col v-for="object in allowed_objects" :key="object" cols="2" md="2">
      <v-card v-ripple class="card ma-2" hover elevation="5" v-bind="on" rounded>
        <v-img :src="geode_objects[object].image" @click="set_geode_object(object)" cover />
        <v-tooltip activator="parent" location="bottom">
          {{ geode_objects[object].tooltip }}
        </v-tooltip>
      </v-card>
    </v-col>
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
// import { useVModel } from "@vueuse/core"

const props = defineProps({
  component_options: { type: Object, required: true },
})
const { geode_objects, input_files } = props.component_options

const stepper_tree = inject('stepper_tree')
const { tool_route } = stepper_tree

// const emit = defineEmits(['update:step_model'])
// const value = useVModel(props, "step_model", emit)
const allowed_objects = ref([])

async function get_allowed_objects (input_files) {
  const params = new FormData()
  params.append('filename', input_files[0].name)
  console.log(input_files[0].name)
  const { data } = await api_fetch(`/${tool_route}/allowedobjects`, { body: params, method: 'POST' })
  console.log(data.value)
  allowed_objects.value = data.value.objects
}

function set_geode_object (geode_object) {
  stepper_tree.geode_object = geode_object
  stepper_tree.current_step_index++

}


onMounted(() => {
  get_allowed_objects(input_files)
})


</script>