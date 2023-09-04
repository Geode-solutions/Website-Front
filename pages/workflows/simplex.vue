<template>
    <v-container>
        <v-col>
            <h1 class="text-h2 py-6" align="center">Simplex remesh</h1>
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
                                    <p class="text-medium-emphasis text-body-1">Global metric</p>
                                    <v-slider v-model="metric" :min="min_metric" :max="max_metric" :step="step_metric"
                                        thumb-label></v-slider>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template v-slot:item.2>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="text-medium-emphasis text-body-1">Faults metric</p>
                                    <v-slider v-model="faults_metric" :min="min_metric" :max="max_metric"
                                        :step="step_metric" thumb-label></v-slider>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <v-container>
                        <v-row class="mx-5">
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
const inputsStore = useInputStore()
const { metric, faults_metric } = storeToRefs(inputsStore)
metric.value = 200
faults_metric.value = 50
const min_metric = 10
const max_metric = 300
const step_metric = 10
const step = ref(1)
const items = ['Set global metric', 'Set faults metric', 'Result']

const title = 'Remesh'
useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`
})

const cloud_socket_ready = computed(() => {
    return is_cloud_running.value && is_client_created.value
})

onMounted(() => {
    if (cloud_socket_ready.value) {
        initialize()
    } else {
        watch(cloud_socket_ready, () => {
            initialize()
        })
    }
})

async function initialize() {
    toggle_loading()
    viewer_store.reset()
    await api_fetch('workflows/simplex/initialize', { method: 'POST' },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
            },
        }
    )
    toggle_loading()
}

async function sendMetrics() {
    toggle_loading()
    const params = new FormData()
    params.append('metric', metric.value)
    params.append('faults_metric', faults_metric.value)
    await api_fetch('workflows/simplex/remesh', { method: 'POST', body: params },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
                viewer_store.toggle_edge_visibility({ "id": response._data.id, "visibility": true })
            },
        }
    )
    toggle_loading()
}

function next() {
    if (step.value == 2) {
        sendMetrics()
    }
    step.value++
}
</script>