
<template>
    <v-row>
        <v-col align="center" class="mx-3">
            <p class="font-italic">Min :</p>
            <v-row>
                <v-col>
                    <label for="x_min" class="text-medium-emphasis text-body-2">X_min</label>
                    <v-text-field v-model="bbox.x_min" id="x_min" name="x_min" @input="alterBbox"></v-text-field>
                </v-col>
                <v-col>
                    <label for="y_min" class="text-medium-emphasis text-body-2">Y_min</label>
                    <v-text-field  v-model="bbox.y_min" id="y_min" name="y_min" @input="alterBbox"></v-text-field>
                </v-col>
                <v-col>
                    <label for="z_min" class="text-medium-emphasis text-body-2">Z_min</label>
                    <v-text-field v-model="bbox.z_min" id="z_min" name="z_min" @input="alterBbox"></v-text-field>
                </v-col>
            </v-row>
        </v-col>
        <v-col align="center" class="mx-3">
            <p class="font-italic">Max :</p>
            <v-row>
                <v-col>
                    <label for="x_max" class="text-medium-emphasis text-body-2">X_max</label>
                    <v-text-field v-model="bbox.x_max" id="x_max" name="x_max" @input="alterBbox"></v-text-field>
                </v-col>
                <v-col>
                    <label for="y_max" class="text-medium-emphasis text-body-2">Y_max</label>
                    <v-text-field  v-model="bbox.y_max" id="y_max" name="y_max" @input="alterBbox"></v-text-field>
                </v-col>
                <v-col>
                    <label for="z_max" class="text-medium-emphasis text-body-2">Z_max</label>
                    <v-text-field v-model="bbox.z_max" id="z_max" name="z_max" @input="alterBbox"></v-text-field>
                </v-col>
            </v-row>
            
        </v-col>
    </v-row>
</template>


<script setup>
    import {useInputStore} from "@/stores/inputs"

    const inputsStore = useInputStore()    

    const bbox = ref({x_min:"", y_min:"", z_min:"", x_max:"", y_max:"", z_max:""});

    const alterBbox = () => {
        inputsStore.modifyBBoxPoints(bbox)
    }

</script>
