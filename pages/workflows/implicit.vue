<template>
    <v-container>
        <h1 class="text-h2 py-6" align="center">Implicit</h1>
        <v-col v-if="!is_cloud_running">
            <Launcher :site_key="site_key" />
        </v-col>
        <v-col v-else>
            <v-container class="mt-10 w-75">
                <v-stepper v-model="step" hide-actions :items="items">
                    <template v-slot:item.1>
                        <WorkflowsImplicitFirststep />
                    </template>

                    <template v-slot:item.2>
                        <WorkflowsImplicitSecondstep />
                    </template>

                    <template v-slot:item.3>
                        <WorkflowsImplicitThirdstep />
                    </template>

                    <v-container>
                        <v-row class="mx-5">
                            <v-col cols="auto">
                                <v-btn :disabled="step == 1">back</v-btn>
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
console.log(is_cloud_running)
const inputsStore = useInputStore()
const viewer_store = use_viewer_store()
const { constraints, isovalues, axis, coordinate, metric } = storeToRefs(inputsStore)
const site_key = useRuntimeConfig().public.SITE_KEY
const loading = ref(false);
const toggle_loading = useToggle(loading)
const step = ref(1)
const items = ['Select data', 'Extract section', 'Remesh', 'Result']


const title = 'Implicit'
useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`
})

async function sendStepOne() {
    const params = new FormData();
    params.append('constraints', JSON.stringify(constraints.value));
    params.append('isovalues', JSON.stringify(isovalues.value));
    await api_fetch('workflows/implicit/step1', { method: 'POST', body: params },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
            },
        }
    )
}

async function sendStepTwo() {
    console.log("axis", axis)
    console.log("coordinate", coordinate)
    const params = new FormData();
    params.append('axis', axis.value);
    params.append('coordinate', coordinate.value);
    await api_fetch('workflows/implicit/step2', { method: 'POST', body: params },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
            },
        }
    )
}

async function sendStepThree() {
    const params = new FormData();
    params.append('metric', metric.value);
    await api_fetch('workflows/implicit/step3', { method: 'POST', body: params },
        {
            'response_function': (response) => {
                viewer_store.reset()
                viewer_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })
                viewer_store.toggle_edge_visibility({ "id": response._data.id, "visibility": true })
            },
        }
    )
}

function next() {
    toggle_loading()
    console.log("next", step.value)
    if (step.value == 1) {
        sendStepOne()
    }
    else if (step.value == 2) {
        sendStepTwo()
    }
    else if (step.value == 3) {
        sendStepThree()
    }
    step.value++
    toggle_loading()
}
</script>
