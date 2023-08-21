<template>
    <h1 class="text-h2 py-6" align="center">ONG</h1>
    <v-col v-if="!is_cloud_running">
        <Launcher :site_key="site_key"/>
    </v-col>
    <v-col v-if="is_cloud_running">
        <v-container class="mt-10 w-50">
            <v-row justify="center">
                <h1 v-if="!firstDisabled">First step</h1>
                <h1 v-else-if="!secondDisabled">Second step</h1>
                <h1 v-else-if="!thirdDisabled">Third step</h1>
                <h1 v-else>X step</h1>
            </v-row>
            <v-container rounded="lg" class="my-10 pa-0" color="black">
                <WorkflowsOngFirststep :class="{disabled: firstDisabled}"></WorkflowsOngFirststep>
                <v-row justify="center">
                    <v-btn :class="{disabled: firstDisabled}" class="mx-5" :loading="loading" @click="sendStepOne" color="primary">Send data</v-btn>
                    <v-btn :class="{disabled:!oneDone||firstDisabled}" class="mx-5" @click="goToStepTwo">Go to next step</v-btn>
                </v-row>
                <WorkflowsOngSecondstep :class="{disabled: secondDisabled}"></WorkflowsOngSecondstep>
                <v-row justify="center">
                    <v-btn :class="{disabled: secondDisabled}" class="ma-5" @click="goToStepOne">Go back</v-btn>
                    <v-btn :class="{disabled: secondDisabled}" class="ma-5" :loading="loading" @click="sendStepTwo" color="primary">Send data</v-btn>
                    <v-btn :class="{disabled:!twoDone||secondDisabled}" class="ma-5" @click="goToStepThree">Go to next step</v-btn>
                </v-row>
                <WorkflowsOngThirdstep :class="{disabled: thirdDisabled}"></WorkflowsOngThirdstep>
                <v-row justify="center">
                    <v-btn :class="{disabled: thirdDisabled}" class="ma-5" @click="goToStepTwo">Go back</v-btn>
                    <v-btn :class="{disabled: thirdDisabled}" class="ma-5" :loading="loading" @click="sendStepThree" color="primary">Send data</v-btn>
                </v-row>
            </v-container> 
        </v-container>
    </v-col>
</template>

<script setup>
    import { useToggle } from '@vueuse/core'
    import { storeToRefs } from 'pinia'

    const cloud_store = use_cloud_store()
    const { is_cloud_running } = storeToRefs(cloud_store)
    const inputsStore = useInputStore()
    const { constraints, isovalues, bbox_points, cellSize, scalar_function, axis, direction, metric } = storeToRefs(inputsStore)
    inputsStore.setDefault()
    const site_key = useRuntimeConfig().public.SITE_KEY
    const firstDisabled = ref(false);
    const secondDisabled = ref(true);
    const thirdDisabled = ref(true);
    const oneDone = ref(false);
    const twoDone = ref(false);
    const threeDone = ref(false);
    const loading = ref(false);
    const toggle_loading = useToggle(loading)

    const title = 'ONG'
    useHead({
        title: title,
        titleTemplate: (title) => `${title} - Geode-solutions`
    })

    async function sendStepOne () {
        toggle_loading()
        const params = new FormData();
        const bbox_json = alterBbox()
        const constraints_json = alterConstraints()
        const isovalues_json = alterIsovalues()
        params.append('bbox_points', JSON.stringify(bbox_json))
        params.append('constraints', JSON.stringify(constraints_json));
        params.append('isovalues', JSON.stringify(isovalues_json));
        params.append('function_type', scalar_function.value);
        params.append('cell_size', cellSize.value[0]);
        await api_fetch('workflows/ong/step1', { method: 'POST', body: params },
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
                    oneDone.value = true
                    toggle_loading()
                },
                'response_error_function': () => { toggle_loading() }
            }
        )
    }

    async function sendStepTwo () {
        loading.value = true;
        const params = new FormData();
        params.append('axis', axis.value[0]._rawValue);
        params.append('direction', direction.value[0]._rawValue);
        await api_fetch('workflows/ong/step2', { method: 'POST', body: params },
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
                    twoDone.value = true
                    toggle_loading()
                },
                'response_error_function': () => { toggle_loading() }
            }
        )
    }

    async function sendStepThree () {
        loading.value = true;
        const params = new FormData();
        params.append('metric', metric.value[0]._rawValue);
        await api_fetch('workflows/ong/step3', { method: 'POST', body: params },
            {
                'request_error_function': () => { 
                    toggle_loading() 
                },
                'response_function': (response) => {
                    threeDone.value = true
                    toggle_loading()
                },
                'response_error_function': () => { toggle_loading() }
            }
        )
    }

    function alterBbox() {
        let bbox_json = JSON.stringify(bbox_points.value[0]._rawValue)
        return bbox_json
    }

    function alterConstraints() {
        let constraints_json = []
        for (let i = 0; i < constraints.value.length; i++) {
            if (constraints.value[i]._rawValue != undefined) {
                constraints_json.push(JSON.stringify(constraints.value[i]._rawValue))
            } else {
                constraints_json.push(JSON.stringify(constraints.value[i]))
            }
        }
        return constraints_json
    }

    function alterIsovalues() {
        let isovalues_json = []
        for (let i = 0; i < isovalues.value.length; i++) {
            isovalues_json.push(isovalues.value[i]._rawValue)
        }
        return isovalues_json
    }

    const goToStepOne = () => {
        firstDisabled.value = false
        secondDisabled.value = true
        thirdDisabled.value = true
    };
    const goToStepTwo = () => {
        firstDisabled.value = true
        secondDisabled.value = false
        thirdDisabled.value = true
    };
    const goToStepThree = () => {
        firstDisabled.value = true
        secondDisabled.value = true
        thirdDisabled.value = false
    };
</script>

<style scoped>
.disabled {
    display: none;
}
</style>