<template>
  <v-container>
    This tool uses our Open-Source codes
    <v-tooltip location="end">
      <span v-for="package_version in packages_versions" :key="package_version.package">
        {{ package_version.package }} v{{ package_version.version }}
        <br>
      </span>
      <template #activator="{ props }">
        <v-icon v-bind="props" color="primary" class="justify-right">
          mdi-information-outline
        </v-icon>
      </template>
    </v-tooltip>
  </v-container>
</template>

<script setup>
import { use_cloud_store } from '@/stores/cloud'
const cloud_store = use_cloud_store()
const { is_cloud_running } = storeToRefs(cloud_store)

const packages_versions = ref([])

const props = defineProps({
  tool_route: { type: String, required: true }
})
const { tool_route } = props

watch(is_cloud_running, (value) => {
  if (value === true) {
    get_packages_versions()
  }
})

onMounted(() => {
  if (is_cloud_running.value === true) {
    get_packages_versions()
  }
})

onActivated(() => {
  if (is_cloud_running.value === true) {
    get_packages_versions()
  }
})

async function get_packages_versions () {
  const { data } = await api_fetch(`${tool_route}/versions`, { method: 'GET' })
  packages_versions.value = data.value.versions
}
</script>
