<template>
  <v-row class="fill-height" no-gutters>
    <v-navigation-drawer :rail="mini" :expand-on-hover="mini" absolute>
      <v-list>
        <v-list-item v-for="(tool, i) in tools_list" :key="i" :to="tool.to" link router exact :prepend-icon="tool.icon"
          :title="tool.title">
          <template #append>
            <v-badge v-if="tool.badge" :content="tool.badge" color="primary" inline />
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
import tools_list from '@/assets/tools_list'
import { useDisplay } from 'vuetify'

const title = 'Free tools'
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
