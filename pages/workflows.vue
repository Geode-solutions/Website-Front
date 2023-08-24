<template>
    <v-row no-gutters>
        <v-col cols="12" style="contain:layout">
        <ToolsErrorsBanner />
        <ToolsErrorsSnackers />
        </v-col>
    </v-row>
    <v-row class="fill-height" no-gutters>
        <v-navigation-drawer :rail="mini" :expand-on-hover="mini" absolute>
            <v-list>
                <v-list-item v-for="(workflow, i) in workflows_list" :key="i" :to="workflow.to" link router exact :prepend-icon="workflow.icon" :title="workflow.title">
                    <template #append>
                        <v-badge v-if="workflow.badge" :content="workflow.badge" color="primary" inline />
                    </template>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-col class="pa-4">
            <NuxtPage keep-alive />
        </v-col>
    </v-row>
</template>

<script setup>
    import workflows_list from '@/assets/workflows_list'
    import { useDisplay } from 'vuetify'

    const title = 'Workflows'
    useHead({
    title: title,
    titleTemplate: (title) => `${title} - Geode-solutions`
    })

    const { name } = useDisplay()
    const mini = computed(() => {
    switch (name.value) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return true
        case 'lg': return false
        case 'xl': return false
        default: return false
    }
    })
</script>
