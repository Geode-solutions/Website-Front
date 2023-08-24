<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <h1 class="text-h2 py-5" align="center">
                    Workflows home page
                </h1>
                <p class="text-h6 font-weight-light" align="justify">
                    Some workflows entirely free to use.
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque, urna quis pretium congue, quam orci gravida dui, dictum pulvinar tortor lacus at nunc. Morbi consectetur, est nec aliquam varius, nisi diam semper libero, non hendrerit libero dolor a purus. In sollicitudin justo nec dui congue, ac eleifend mi dapibus. Duis consequat, lacus fringilla tempus luctus, odio nulla molestie magna, et mollis nisi orci et nunc. Sed sed nisl vitae quam dapibus auctor. Proin sed pretium nisl. Proin nisl nulla, molestie vitae tortor ut, vulputate tincidunt odio. Vestibulum mattis nisi orci, ac pellentesque mauris porta in.
                </p>
                <div class="my-2" align="center">
                    <CommonContactUsButton />
                </div>
            </v-col>
            <v-col>
                <v-row justify="space-around">
                    <v-col v-for="(workflow, i) in workflows_list.slice(-workflows_list.length + 1, workflows_list.length)" :key="i" cols="11"
                        md="4">
                        <v-card v-ripple class="card pa-5" hover elevation="5" :to="workflow.to">
                            <v-row justify="center" align="center">
                                <v-col cols="auto">
                                    <v-icon color="primary" size="100" class="justify-center">
                                        {{ workflow.icon }}
                                    </v-icon>
                                </v-col>
                                <v-col v-if="workflow.chip" cols="auto">
                                    <v-chip color="primary">
                                        {{ workflow.chip }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                        <v-card-title primary-title class="text-center text-h4" v-text="workflow.title" />
                        <v-card-text class="text-center text-body-1" v-text="workflow.text" />
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import workflows_list from '@/assets/workflows_list'
</script>

<style scoped>
    .card {
    border-radius: 15px
    }
</style>

