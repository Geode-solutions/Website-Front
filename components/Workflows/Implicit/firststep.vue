<template>
    <v-container>
        <v-sheet rounded="lg" class="mb-8 pa-3 text-center" elevation="5">
            <p class="mb-2 text-medium-emphasis text-body-2">Bounding box points : </p>
            <v-divider class="border-opacity-50 mb-3"></v-divider>
            <WorkflowsImplicitBbox></WorkflowsImplicitBbox>
        </v-sheet>
        <v-row justify="center" align="center" class="mb-3">
            <v-sheet rounded="lg" class="pa-3 text-center" elevation="5" width="72%">
                <p class="mb-2 text-medium-emphasis text-body-2">Number of constraints : </p>
                <v-btn class="ma-1" size="x-small" elevation="5" icon="mdi-minus" @click=decrement()></v-btn>
                {{ nb_constraints }}
                <v-btn class="ma-1" size="x-small" elevation="5" icon="mdi-plus" @click=increment()></v-btn>
            </v-sheet>
            <v-btn class="ma-5" color="primary" :disabled="autofilled" @click="autofillConstraint">Exemple set</v-btn>
        </v-row>
        <br/>
        <v-sheet :max-height="260" class="overflow-auto elevation-4 px-10 pt-2 mb-3 mt-n5" color="transparent" rounded="lg" :class="{disabled: nb_constraints==0}">
            <div v-for="n in nb_constraints" :key="n">
                <WorkflowsImplicitConstraint :id="n" ></WorkflowsImplicitConstraint>
            </div>
        </v-sheet>
        <label class="text-medium-emphasis text-body-2">Minimization scheme</label>
        <v-select v-model="function_type" class="mb-n3" :items="['Laplacian', 'Hessian', 'Curvature', 'Boundary free - Laplacian', 'Boundary free - Hessian', 'Boundary free - Curvature']" v-on:update:focused="alterFunction"></v-select>
        <label class="text-medium-emphasis text-body-2">Minimal grid cell size</label>
        <v-text-field v-model="cell_size" id="cell_size" name="cell_size" @input="alterCellSize"></v-text-field>
        <v-sheet rounded="lg" width="100%" class="pa-3 text-center" elevation="5">
            <p class="mb-2 text-medium-emphasis text-body-2">Number of isovalues : </p>
            <v-btn class="ma-1" size="x-small" elevation="5" icon="mdi-minus" @click=decrementISO()></v-btn>
            {{ nb_isovalues }}
            <v-btn class="ma-1" size="x-small" elevation="5" icon="mdi-plus" @click=incrementISO()></v-btn>
        </v-sheet>
        <br/>
        <v-sheet :max-height="210" class="overflow-auto elevation-4 mb-6 px-10" color="transparent" rounded="lg" :class="{disabled: nb_isovalues==0}">
            <div v-for="n in nb_isovalues">
                <WorkflowsImplicitIsovalue :id="n"></WorkflowsImplicitIsovalue>
            </div>
        </v-sheet>
        <br/>
    </v-container>
</template>

<script setup>
    const inputsStore = useInputStore()
    const cloud_store = use_cloud_store()
    const { is_cloud_running } = storeToRefs(cloud_store)
    const nb_constraints = ref(0)
    const function_type = ref("")
    const cell_size = ref()
    const nb_isovalues= ref(0)
    const autofilled = ref(false)
    const autofilled_constrains = ref([])

    const alterFunction = () => {
        inputsStore.setFunction(function_type.value)
    }
    const alterCellSize = () => {
        inputsStore.setCellSize(cell_size.value)
    }

    onMounted(()=>{
        if (is_cloud_running.value) {
            getConstraints()
        } else {
            watch(is_cloud_running, () => {
                getConstraints()
            })
        }
    })

    async function getConstraints () {
        await api_fetch('workflows/ong/get_constraints', { method: 'POST'},
            {
                'response_function': (response) => {
                    autofilled_constrains.value = JSON.parse(response._data.constraints)
                }
            }
        )
    }

    function increment() {
        if (nb_constraints.value < 50) {
            // .value is needed in javascript
            inputsStore.addConstraint({"x":"", "y":"", "z":"", "value":"", "weight":""})
            nb_constraints.value++
        } 
    }
    function decrement() {
        if (nb_constraints.value > 0) {
            nb_constraints.value--
            inputsStore.popConstraint()
        }  
    }
    function incrementISO() {
        if (nb_isovalues.value < 50) {
            nb_isovalues.value++
            inputsStore.addIsovalue(0)
        } 
    }
    function decrementISO() {
        if (nb_isovalues.value > 0) {
            nb_isovalues.value--
            inputsStore.popIsovalue()
        }  
    }
    function autofillConstraint() {
        autofilled.value = true
        for (let i = 0; i < autofilled_constrains.value.length; i++) {
            const constraint = autofilled_constrains.value[i]
            const x = {"x": constraint[0], "y": constraint[1], "z": constraint[2], "value": constraint[3], "weight": constraint[4]}
            nb_constraints.value++
            inputsStore.addConstraint(x)
        }
    }
</script>

<style scoped>
.disabled {
    display: none;
}
</style>