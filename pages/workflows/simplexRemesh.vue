<template>
    <h1 class="text-h2 py-6" align="center">Simplex remesh</h1>
    <v-col v-if="!is_cloud_running">
        <ToolsLauncher />
    </v-col>
    <v-col v-if="is_cloud_running">
        <v-container class="mt-10 w-50">
            <v-container rounded="lg" class="my-10 pa-0" color="black">
                <label class="text-medium-emphasis text-body-2">Global metric</label>
                <v-text-field v-model="metric" id="metric" name="metric" @input="setGlobalMetric"></v-text-field>
                <v-container>
                    <v-expansion-panels v-model="panel">
                        <v-expansion-panel class="mb-4">
                            <v-expansion-panel-title>
                                Set individual surface metrics
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-sheet :max-height="260" class="overflow-auto" color="transparent">
                                    <div v-for="n in surfaceIDS.length-1">
                                        <WorkflowsSimplexRemeshSurfaceMetric :num="n" :id="surfaceIDS[n]" ></WorkflowsSimplexRemeshSurfaceMetric>
                                    </div>
                                </v-sheet>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
        
                        <v-expansion-panel class="mb-4">
                            <v-expansion-panel-title>
                                Set individual block metrics
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-sheet :max-height="260" class="overflow-auto" color="transparent">
                                    <div v-for="n in blockIDS.length-1">
                                        <WorkflowsSimplexRemeshBlockMetric :num="n" :id="blockIDS[n]" ></WorkflowsSimplexRemeshBlockMetric>
                                    </div>
                                </v-sheet>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-container>
    
                
                <v-row justify="center">
                    <v-btn class="ma-5" :loading="loading" @click="sendMetrics" color="primary">Send data</v-btn>
                </v-row>
            </v-container> 
        </v-container>
    </v-col>
</template>


<script setup>
    import { useToggle } from '@vueuse/core'
    import {useInputStore} from "@/stores/inputs"
    import {use_cloud_store} from "@/stores/cloud"
    import { storeToRefs } from 'pinia'

    const cloud_store = use_cloud_store()
    const { is_cloud_running } = storeToRefs(cloud_store)
    const inputsStore = useInputStore()
    inputsStore.setDefault()
    const { globalMetric, surfaceMetrics, blockMetrics } = storeToRefs(inputsStore)

    const loading = ref(false)
    const toggle_loading = useToggle(loading)
    const surfaceIDS = ref([])
    const blockIDS = ref([])
    const panel = ref([]) //to close expansion panels when typing new gobal metric
    const metric = ref()

    const title = 'Remesh'
    useHead({
        title: title,
        titleTemplate: (title) => `${title} - Geode-solutions`
    })

    const setGlobalMetric = () => {
        inputsStore.setGlobalMetric(metric)
        panel.value = []
    }

    watch(is_cloud_running, async () => {
        toggle_loading()

        await api_fetch('simplexRemesh/get_brep_info', { method: 'POST'},
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
                    surfaceIDS.value = response._data.surfacesIDS
                    blockIDS.value = response._data.blocksIDS
                    toggle_loading()
                },
                'response_error_function': () => { toggle_loading() }
            }
        )
    })

    async function sendMetrics () {
        toggle_loading()

        const params = new FormData()
        params.append('globalMetric', globalMetric.value[0]._rawValue)
        const json_surfaces = JSON.stringify(surfaceMetrics.value)
        params.append('surfaceMetrics',json_surfaces)
        const json_blocks = JSON.stringify(blockMetrics.value)
        params.append('blockMetrics',json_blocks)

        await api_fetch('simplexRemesh/remesh', { method: 'POST', body: params },
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
                    toggle_loading()
                },
                'response_error_function': () => { toggle_loading() }
            }
        )
    }


</script>


<style scoped>
.disabled {
    display: none;
}
</style>