<template>
    <v-container>
        <v-col>
            <h1 class="text-h2 py-6" align="center">Explicit modeling</h1>
        </v-col>
        <v-col v-if="!is_cloud_running">
            <Launcher :site_key="site_key" />
        </v-col>
        <v-col v-else>
            <v-container class="w-75">
                <v-stepper v-model="step" hide-actions :items="items">
                    <template v-slot:item.1>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="mb-2 text-medium-emphasis text-body-1">Several independant input surfaces with
                                        intersections</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template v-slot:item.2>
                        <p class="mb-2 text-body-1 text-center">Congratulations! <br />
                            You just build a BRep from a set of surfaces, all in a few clicks </p>
                        <v-card rounded="lg" class="mt-6 pa-5 elevation-5" color="transparent" align="center">
                            <h3 class="mb-5">The generated BRep has:</h3>
                            <p>{{ nb_blocks }} Blocks</p>
                            <p>{{ nb_surfaces }} Surfaces</p>
                            <p>{{ nb_lines }} Lines</p>
                            <p>{{ nb_corners }} Corners</p>
                        </v-card>
                    </template>

                    <v-container>
                        <v-row class="mx-5">
                            <v-col cols="auto">
                                <v-btn :disabled="step == 1" @click="reset">reset</v-btn>
                            </v-col>
                            <v-spacer />
                            <v-col cols="auto">
                                <v-btn :disabled="step == items.length" :loading="loading" @click="next">next</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-stepper>
                <v-col>
                    <RemoteRenderingView />
                </v-col>
            </v-container>
        </v-col>
    </v-container>
</template>

<script setup>
import { useToggle } from '@vueuse/core'

const cloud_store = use_cloud_store()
const { is_cloud_running } = storeToRefs(cloud_store)
const viewer_store = use_viewer_store()
const websocket_store = use_websocket_store()
const { is_client_created } = storeToRefs(websocket_store)
const site_key = useRuntimeConfig().public.SITE_KEY
const loading = ref(false)
const toggle_loading = useToggle(loading)
const nb_corners = ref("-")
const nb_lines = ref("-")
const nb_surfaces = ref("-")
const nb_blocks = ref("-")
const step = ref(1)
const items = ['Input data', 'Result']

const title = 'Explicit modeling'
useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`
})

const cloud_socket_ready = computed(() => {
    return is_cloud_running.value && is_client_created.value
})

onMounted(() => {
    if (cloud_socket_ready.value) {
        displayBase()
    } else {
        watch(cloud_socket_ready, () => {
            displayBase()
        })
    }
})

async function displayBase() {
    toggle_loading()
    await api_fetch('workflows/explicit/get_base_data', { method: 'POST' },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_1, "id": response._data.id1 })
                viewer_store.toggle_edge_visibility({ "id": response._data.id1, "visibility": true })
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_2, "id": response._data.id2 })
                viewer_store.toggle_edge_visibility({ "id": response._data.id2, "visibility": true })
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_3, "id": response._data.id3 })
                viewer_store.toggle_edge_visibility({ "id": response._data.id3, "visibility": true })
            },
        }
    )
    toggle_loading()
}

async function getBRepStats() {
    toggle_loading()
    await api_fetch('workflows/explicit/get_brep_stats', { method: 'POST' },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
                viewer_store.toggle_edge_visibility({ "id": response._data.id, "visibility": true })
                nb_corners.value = response._data.nb_corners
                nb_lines.value = response._data.nb_lines
                nb_surfaces.value = response._data.nb_surfaces
                nb_blocks.value = response._data.nb_blocks
            },
        }
    )
    toggle_loading()
}

function next() {
    if (step.value == 1) {
        getBRepStats()
    }
    step.value++
}

function reset() {
    step.value = 1
    displayBase()
}
</script>
