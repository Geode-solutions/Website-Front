<template>
    <v-container align="center">
        <h1 class="text-h2 py-6" align="center">Explicit modeling</h1>
        <v-col v-if="!is_cloud_running">
            <Launcher :site_key="site_key" />
        </v-col>
        <v-col v-else class="my-10 w-50" align="center">
            <v-btn :loading="loading" @click="getBRepStats" color="primary">Generate BRep</v-btn>
            <v-card rounded="lg" class="mt-6 pa-5 elevation-5" color="transparent" align="center">
                <h3 class="mb-5">Generated BRep has : </h3>
                <p>{{ nb_blocks }} Blocks</p>
                <p>{{ nb_surfaces }} Surfaces</p>
                <p>{{ nb_lines }} Lines</p>
                <p>{{ nb_corners }} Corners</p>
            </v-card>
        </v-col>
        <RemoteRenderingView :client="client" />
    </v-container>
</template>

<script setup>
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const cloud_store = use_cloud_store()
const { is_cloud_running } = storeToRefs(cloud_store)
const inputsStore = useInputStore()
inputsStore.setDefault()
const viewer_store = use_viewer_store()
const websocket_store = use_websocket_store()
const { client, is_client_created } = storeToRefs(websocket_store)
const { globalMetric, surfaceMetrics, blockMetrics } = storeToRefs(inputsStore)
const site_key = useRuntimeConfig().public.SITE_KEY
const loading = ref(false)
const toggle_loading = useToggle(loading)
const nb_corners = ref("-")
const nb_lines = ref("-")
const nb_surfaces = ref("-")
const nb_blocks = ref("-")

const title = 'Explicit'
useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`
})

onMounted(() => {
    if (is_cloud_running.value) {
        displayBase()
    } else {
        watch(is_cloud_running, () => {
            displayBase()
        })
    }
})

async function displayBase() {
    toggle_loading()
    await api_fetch('workflows/explicit/get_base_data', { method: 'POST' },
        {
            'request_error_function': () => {
                toggle_loading()
            },
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_1, "id": response._data.id1 })
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_2, "id": response._data.id2 })
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_3, "id": response._data.id3 })
                toggle_loading()
            },
            'response_error_function': () => { toggle_loading() }
        }
    )
}

async function getBRepStats() {
    toggle_loading()
    await api_fetch('workflows/explicit/get_brep_stats', { method: 'POST' },
        {
            'request_error_function': () => {
                toggle_loading()
            },
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
                nb_corners.value = response._data.nb_corners
                nb_lines.value = response._data.nb_lines
                nb_surfaces.value = response._data.nb_surfaces
                nb_blocks.value = response._data.nb_blocks
                toggle_loading()
            },
            'response_error_function': () => { toggle_loading() }
        }
    )
}
</script>
