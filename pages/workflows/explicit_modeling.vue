<template>
    <h1 class="text-h2 py-6" align="center">Explicit modeling</h1>
    <v-col v-if="!is_cloud_running">
        <Launcher :site_key="site_key"/>
    </v-col>
    <v-col v-if="is_cloud_running">
        <v-container class="mt-10 w-50">
            <v-sheet rounded="lg" class="my-10 pa-5 elevation-5" color="transparent" align="center">            
                <h3 class="mb-5">Generated BRep has : </h3>
                <p>{{ nb_blocks }} Blocks</p>
                <p>{{ nb_surfaces }} Surfaces</p>
                <p>{{ nb_lines }} Lines</p>
                <p>{{ nb_corners }} Corners</p>
            </v-sheet> 
        </v-container>
    </v-col>
</template>


<script setup>
    import { useToggle } from '@vueuse/core'
    import { storeToRefs } from 'pinia'

    const cloud_store = use_cloud_store()
    const { is_cloud_running } = storeToRefs(cloud_store)
    const inputsStore = useInputStore()
    inputsStore.setDefault()
    const { globalMetric, surfaceMetrics, blockMetrics } = storeToRefs(inputsStore)
    const site_key = useRuntimeConfig().public.SITE_KEY

    const loading = ref(false)
    const toggle_loading = useToggle(loading)
    const nb_corners = ref()
    const nb_lines = ref()
    const nb_surfaces = ref()
    const nb_blocks = ref()

    const title = 'Explicit'
    useHead({
        title: title,
        titleTemplate: (title) => `${title} - Geode-solutions`
    })
    console.log(is_cloud_running)
    onActivated(()=>{
        if (is_cloud_running) {
            console.log("coucou")
            getBRepStats()
        } else {
            console.log("hello")
            watch(is_cloud_running, (newValue, oldValue) => {
                if ((newValue)&&(!(oldValue))) {
                    console.log("watch ok")
                    getBRepStats()
                }
            })
        }
    })


    async function getBRepStats () {
        toggle_loading()

        await api_fetch('workflows/explicit_modeling/get_brep_stats', { method: 'POST'},
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
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
